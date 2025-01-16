import pandas as pd
import os
import argparse
import traceback
from datetime import datetime
from openai import OpenAI
from rag_evaluator.config.configManager import ConfigManager
from rag_evaluator.evaluators.ragasEvaluator import RagasEvaluator
from rag_evaluator.evaluators.cragEvaluator import CragEvaluator
from rag_evaluator.utils.evaluationResult import ResultsConverter
from rag_evaluator.utils.dbservice import dbService
from dotenv import load_dotenv
from multiprocessing.pool import ThreadPool
from tqdm import tqdm

load_dotenv()

def process_single_api_call(api, query, truth, get_bot_response):
    response = get_bot_response(api, query, truth)
    if not response:
        response =  {
            'query': query,
            'ground_truth': truth,
            'context': [],
            'context_url': '',
            'answer': "Failed to get response"
        }
    return response

def call_search_api(queries, ground_truths):
    config = ConfigManager().get_config()    
    match config.get('koreai').get('api_mode'):
        case 'SA':
            from rag_evaluator.api.SASearch import SearchAssistAPI, get_bot_response
            api = SearchAssistAPI()
        case 'UXO':
            from rag_evaluator.api.XOSearch import XOSearchAPI, get_bot_response
            api = XOSearchAPI()
        case _:
            raise Exception("Unknown api specified. Must be 'UXO' or 'SA'")
        
    results = []

    with ThreadPool(processes=8) as pool:
        results = list(tqdm(pool.imap(process_single_api_call, [(api, query, truth, get_bot_response) for query, truth in zip(queries, ground_truths)]), 
                            total=len(queries),
                            desc="Processing XO API Calls"))
    for query, truth in zip(queries, ground_truths):
        response = get_bot_response(api, query, truth)
        if response:
            results.append(response)
        else:
            results.append({
                'query': query,
                'ground_truth': truth,
                'context': [],
                'context_url': '',
                'answer': "Failed to get response"
            })
    return results


def load_data_and_call_api(excel_file, sheet_name, config):
    df = pd.read_excel(excel_file, sheet_name=sheet_name, engine='openpyxl')
    queries = df['query'].fillna('').tolist()
    ground_truths = df['ground_truth'].fillna('').tolist()

    api_results = call_search_api(queries, ground_truths)

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
        results_df['ground_truth'].tolist(),
        results_df['context'].tolist()
    )


def load_data(excel_file, sheet_name):
    if sheet_name:
        df = pd.read_excel(excel_file, sheet_name=sheet_name, engine='openpyxl')
    else:
        df = pd.read_excel(excel_file, engine='openpyxl')

    queries = df['query'].fillna('').tolist()
    ground_truths = df['ground_truth'].fillna('').tolist()
    contexts = df['contexts'].fillna('[]').apply(eval).tolist()
    answers = df['answer'].fillna('').tolist()

    return queries, answers, ground_truths, contexts


def evaluate_with_ragas_and_crag(excel_file, sheet_name, config, run_ragas=True, run_crag=True, use_search_api= False, llm_model=""):
    try:
        if use_search_api:
            queries, answers, ground_truths, contexts = load_data_and_call_api(excel_file, sheet_name, config)
        else:
            queries, answers, ground_truths, contexts = load_data(excel_file, sheet_name)

        ragas_results = pd.DataFrame([])
        crag_results = pd.DataFrame([])

        if run_ragas:
            ragas_evaluator = RagasEvaluator()
            ragas_results = ragas_evaluator.evaluate(queries, answers, ground_truths, contexts, model=llm_model)

        if run_crag:
            openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
            crag_evaluator = CragEvaluator(config['openai']['model_name'], openai_client)
            crag_results = crag_evaluator.evaluate(queries, answers, ground_truths, contexts)
            
        total_set_result = ragas_results[1]
        ragas_results = ragas_results[0]
        result_converter = ResultsConverter(ragas_results, crag_results)

        if run_ragas:
            result_converter.convert_ragas_results()

        if run_crag:
            result_converter.convert_crag_results()

        if len(ragas_results.index) > 0 and len(crag_results.index) > 0:
            combined_results = result_converter.get_combined_results()
            return combined_results
        elif len(ragas_results.index) > 0:
            return result_converter.get_ragas_results(), total_set_result   
        elif len(crag_results.index) > 0:
            return result_converter.get_crag_results()
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
        parser.add_argument('--use_search_api', action='store_true', help='Use SearchAssist API to fetch responses.')
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
                                                       use_search_api=args.use_search_api, 
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
