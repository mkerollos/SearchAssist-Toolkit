import ast
import pandas as pd
import os
import argparse
import traceback
from datetime import datetime
from openai import OpenAI
from rag_evaluator.api.XOSearch import XOSearchAPI, get_bot_response
from rag_evaluator.config.configManager import ConfigManager
from rag_evaluator.evaluators.list_evaluator import list_similarity_score
from rag_evaluator.evaluators.ragasEvaluator import RagasEvaluator
from rag_evaluator.evaluators.cragEvaluator import CragEvaluator
from rag_evaluator.utils.evaluationResult import ResultsConverter
from rag_evaluator.utils.dbservice import dbService
from dotenv import load_dotenv
from multiprocessing.pool import ThreadPool
from tqdm import tqdm

load_dotenv(override=True)

def process_single_api_call(api, query, ground_truth_answer, ground_truth_record_title):
    tqdm.write(f"Making SA search call for query: {query}")
    response = get_bot_response(api, query)
    if not response:
        response =  {
            'query': query,
            'ground_truth_answer': ground_truth_answer,
            'ground_truth_record_title': ground_truth_record_title,
            'context': [],
            'context_title': '',
            'answer': "Failed to get response"
        }
    else:
        response['ground_truth_answer'] = ground_truth_answer
        response['ground_truth_record_title'] = ground_truth_record_title

    return response

def call_search_api(queries, ground_truths_answers, ground_truths_record_titles):
    config = ConfigManager().get_config()    
    api = XOSearchAPI()

    results = []

    with ThreadPool(processes=config.get('koreai').get('api_workers')) as pool:
        args_list = [(api, query, ground_truth_answer, ground_truth_record_title) 
                    for query, ground_truth_answer, ground_truth_record_title in zip(queries, ground_truths_answers, ground_truths_record_titles)]
        
        results = list(tqdm(
            pool.imap(lambda x: process_single_api_call(*x), args_list),
            total=len(queries),
            desc="Processing XO API Calls"
        ))

    return results


def load_data_and_call_api(excel_file, sheet_name):
    df = pd.read_excel(excel_file, sheet_name=sheet_name, engine='openpyxl')
    queries = df['query'].fillna('').tolist()
    ground_truths_answers = df['ground_truths_answers'].fillna('').tolist()
    ground_truths_record_titles = df['ground_truths_record_titles'].fillna('').apply(lambda x: ast.literal_eval(x) if x else [])


    api_results = call_search_api(queries, ground_truths_answers, ground_truths_record_titles)

    # Create a new DataFrame with API results
    results_df = pd.DataFrame(api_results)
    current_file_dir = os.path.dirname(os.path.abspath(__file__))
    relative_output_dir = os.path.join(current_file_dir, "outputs", "sa_api_outputs")
    os.makedirs(relative_output_dir, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    base_filename = os.path.splitext(os.path.basename(excel_file))[0]
    output_filename = f"{base_filename}_sa_api_results_{timestamp}.xlsx"
    output_file_path = os.path.join(relative_output_dir, output_filename)
    results_df.to_excel(output_file_path, index=False)

    print(f"API results saved to {output_file_path}")

    # Return the data in the format expected by the evaluators
    return (
        results_df['query'].tolist(),
        results_df['answer'].tolist(),
        results_df['ground_truth_answer'].tolist(),
        results_df['ground_truth_record_title'].tolist(),
        results_df['context'].tolist(),
        results_df['context_title'].tolist()
    )



def evaluate_with_ragas_and_crag(excel_file, sheet_name, config, run_ragas=True, run_crag=True, llm_model=""):
    try:
        queries, answers, ground_truths_answers, ground_truths_record_titles, contexts, context_titles = load_data_and_call_api(excel_file, sheet_name)
        
        # Create DataFrame for context title scores
        context_title_scores = pd.DataFrame(columns=['context_title_score', 'received_content_title', 'ground_truth_title'])

        for ground_truth_record_title, context_title in zip(ground_truths_record_titles, context_titles):
            score = list_similarity_score(ground_truth_record_title, context_title)
            context_title_scores.loc[len(context_title_scores)] = {
                'context_title_score': score, 
                'received_content_title': context_title, 
                'ground_truth_title': ground_truth_record_title
            }
        
        ragas_results = pd.DataFrame([])
        crag_results = pd.DataFrame([])

        if run_ragas:
            ragas_evaluator = RagasEvaluator()
            ragas_results = ragas_evaluator.evaluate(queries, answers, ground_truths_answers, contexts, model=llm_model)

        if run_crag:
            openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
            crag_evaluator = CragEvaluator(config['openai']['model_name'], openai_client)
            crag_results = crag_evaluator.evaluate(queries, answers, ground_truths_answers, contexts)
            
        total_set_result = ragas_results[1]
        ragas_results = ragas_results[0]
        result_converter = ResultsConverter(ragas_results, crag_results)

        if run_ragas:
            result_converter.convert_ragas_results()

        if run_crag:
            result_converter.convert_crag_results()

        if len(ragas_results.index) > 0 and len(crag_results.index) > 0:
            combined_results = result_converter.get_combined_results()
            # Add context title scores to combined results
            combined_results = pd.concat([combined_results, context_title_scores], axis=1)
            return combined_results
        elif len(ragas_results.index) > 0:
            return pd.concat([ragas_results, context_title_scores], axis=1), total_set_result   
        elif len(crag_results.index) > 0:
            return pd.concat([crag_results, context_title_scores], axis=1)
    except Exception as e:
        print("Encountered error while running evaluation: ", traceback.format_exc())
        raise Exception(e)

# for running from api
def run(input_file, sheet_name="", evaluate_ragas=False, evaluate_crag=False, use_search_api=False, llm_model=None, save_db=False):
    try:
        config = ConfigManager().get_config()

        run_ragas = evaluate_ragas
        run_crag = evaluate_crag
         # If no specific sheet is provided, get all sheet names
        if sheet_name:
            sheet_names = [sheet_name]
        else:
            excel_file_path = input_file
            try:
                sheet_names = pd.ExcelFile(excel_file_path, engine='openpyxl').sheet_names
            except Exception as e:
                raise Exception("Error in reading the excel file: " + str(e))
        # Define the relative path directory where you want to save the output file
        current_file_dir = os.path.dirname(os.path.abspath(__file__))
        relative_output_dir = os.path.join(current_file_dir, "outputs")
        os.makedirs(relative_output_dir, exist_ok=True)

        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        base_filename = os.path.splitext(os.path.basename(input_file))[0]
        output_filename = f"{base_filename}_evaluation_output_{timestamp}.xlsx"
        output_file_path = os.path.join(relative_output_dir, output_filename)

        run_ragas = evaluate_ragas
        run_crag = evaluate_crag
        if not run_ragas and not run_crag:
            run_crag = True
            run_ragas = True

        with pd.ExcelWriter(output_file_path, engine='openpyxl') as writer:
            for sheet_name in sheet_names:
                print(f"Processing sheet: {sheet_name}")
                results = evaluate_with_ragas_and_crag(input_file, sheet_name, config,
                                                    run_crag=run_crag,
                                                    run_ragas=run_ragas,
                                                    use_search_api=use_search_api, 
                                                    llm_model=llm_model)
                results.to_excel(writer, sheet_name=sheet_name, index=False)
                if(save_db):
                    dbService(results[0], results[1], timestamp)

                print(f"Results for sheet '{sheet_name}' saved to '{output_filename}'.")
                
        print(f"All results have been saved to '{output_filename}'.")
        return f"All results have been saved to '{output_filename}'."
    except Exception as e:
        raise Exception(f"RAG Evaluation has been failed with an error: {e}")

def main():
    try:
        # Setup command-line argument parsing
        parser = argparse.ArgumentParser(description='Evaluate Ragas and Crag based on Excel input.')
        parser.add_argument('--input_file', type=str, required=True, help='Path to the input Excel file.')
        parser.add_argument('--sheet_name', type=str, help='Specific sheet name to evaluate (defaults to all sheets).')
        parser.add_argument('--evaluate_ragas', action='store_true', help='Run only Ragas evaluation.')
        parser.add_argument('--evaluate_crag', action='store_true', help='Run only Crag evaluation.')
        parser.add_argument('--llm_model', type=str, help="Use Azure OpenAI to evaluate the responses.")
        parser.add_argument('--save_db', action='store_true', help='Save the results to MongoDB.')
        args = parser.parse_args()

        config = ConfigManager().get_config()

        # If no specific sheet is provided, get all sheet names
        if args.sheet_name:
            sheet_names = [args.sheet_name]
        else:
            excel_file_path = args.input_file
            sheet_names = pd.ExcelFile(excel_file_path).sheet_names

        # Define the relative path directory where you want to save the output file
        current_file_dir = os.path.dirname(os.path.abspath(__file__))
        relative_output_dir = os.path.join(current_file_dir, "outputs")
        os.makedirs(relative_output_dir, exist_ok=True)

        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        base_filename = os.path.splitext(os.path.basename(args.input_file))[0]
        output_filename = f"{base_filename}_evaluation_output_{timestamp}.xlsx"
        output_file_path = os.path.join(relative_output_dir, output_filename)

        run_ragas = args.evaluate_ragas
        run_crag = args.evaluate_crag
        if not run_ragas and not run_crag:
            run_crag = True
            run_ragas = True

        llm_model = args.llm_model

        with pd.ExcelWriter(output_file_path, engine='openpyxl') as writer:
            for sheet_name in sheet_names:
                print(f"Processing sheet: {sheet_name}")
                results = evaluate_with_ragas_and_crag(args.input_file, sheet_name, config,
                                                       run_crag=run_crag,
                                                       run_ragas=run_ragas,
                                                       llm_model=llm_model)

                results.to_excel(writer, sheet_name=sheet_name, index=False)
                if(args.save_db):
                    dbService(results[0], results[1], timestamp)

                print(f"Results for sheet '{sheet_name}' saved to '{output_filename}'.")

        print(f"All results have been saved to '{output_filename}'.")
    except Exception as e:
        raise Exception("RAG Evaluation has been failed with an error!!!")

if __name__ == "__main__":
    main()
