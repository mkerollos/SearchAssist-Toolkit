import os
import json
from llama_index.core import SimpleDirectoryReader
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.schema import MetadataMode
from llama_index.finetuning import generate_qa_embedding_pairs
from llama_index.core.evaluation import EmbeddingQAFinetuneDataset
from llama_index.llms.openai import OpenAI
from llama_index.finetuning import SentenceTransformersFinetuneEngine
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core import VectorStoreIndex
from llama_index.core.schema import TextNode
from tqdm.notebook import tqdm
import pandas as pd
from sentence_transformers.evaluation import InformationRetrievalEvaluator
from sentence_transformers import SentenceTransformer
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import utils
import os
import shutil
import random
import glob
import math
import html
import argparse
import json


with open('./Config.json', 'r') as configfile:
    config = json.load(configfile)

Model = config['Model']
FineTunedModelPath = config['FineTunedModelPath']
Input_Folder = config['Input_Folder']
Train_Folder = config['Train_Folder']
Validation_Folder = config['Validation_Folder']
Validation_Split_Ratio= config['Validation_Split_Ratio']

def main():
    global Model, FineTunedModelPath, Input_Folder, Train_Folder, Validation_Folder,Validation_Split_Ratio
    
    parser = argparse.ArgumentParser(description="Assign multiple values to multiple variables.")
    parser.add_argument("--Model", default=Model, help="Model Id")
    parser.add_argument("--FineTunedModelPath", default=FineTunedModelPath, help="Output")
    parser.add_argument("--Input_Folder", default=Input_Folder , help="Input")
    parser.add_argument("--Train_Folder", default=Train_Folder, help="Training Folder")
    parser.add_argument("--Validation_Folder", default=Validation_Folder, help="Validation Folder")
    parser.add_argument("--Validation_Split_Ratio", default=Validation_Split_Ratio ,help="Validation_Split_Ratio")
    
    args = parser.parse_args()
    Model = args.Model
    FineTunedModelPath = args.FineTunedModelPath
    Input_Folder = args.Input_Folder
    Train_Folder = "./" + args.Train_Folder
    Validation_Folder = "./" + args.Validation_Folder
    Validation_Split_Ratio = args.Validation_Split_Ratio


def data_file_found(file_path):
    xls_to_pdf(file_path)
    os.remove(file_path)
    print(f"Data file processed and removed: {file_path}")

def xls_to_pdf(excel_file):
    def get_file_type(file_path):
        if file_path.endswith('.csv'):
            return "CSV"
        elif file_path.endswith('.xlsx') or file_path.endswith('.xls'):
            return "Excel"
        else:
            return None

    filetype = get_file_type(excel_file)
    if filetype == "CSV":
        df = pd.read_csv(excel_file)
    else:
        df = pd.read_excel(excel_file)

    os.makedirs(Train_Folder, exist_ok=True)

    def create_paragraph(text):
        text = html.escape(text)
        return Paragraph(text, style)

    pdf_filenames = []
    style = getSampleStyleSheet()['Normal']
    
    for index, row in df.iterrows():
        if len(row) < 2:
            continue
        user_query = row.iloc[0]
        expected_ans = row.iloc[1]
        if not isinstance(user_query, str) or not user_query.strip():
            continue

        pdf_filename = os.path.join(Train_Folder, f"{index + 1}.pdf")
        # Remove existing file if it exists
        if os.path.exists(pdf_filename):
            os.remove(pdf_filename)
        
        pdf_filenames.append(pdf_filename)
        pdf = SimpleDocTemplate(pdf_filename, pagesize=letter)
        content = []
        content.append(create_paragraph(f"User_Query: {user_query}"))
        content.append(create_paragraph(f"Expected_Ans: {expected_ans}"))
        pdf.build(content)
    
    print("PDF files have been created successfully in the 'train' folder.")

def Check_Csv_xlsx():
    print(Train_Folder)
    paths = []
    for root, dirs, files in os.walk(Train_Folder):
        for file in files:
            file_path = os.path.join(root, file)
            if file.endswith('.xlsx') or file.endswith('.csv'):
                xls_to_pdf(file_path)
                data_file_found(file_path)
    return paths

def move_30_percent_to_validation(Train_Folder, Validation_Folder):
    pdf_files = [f for f in os.listdir(Train_Folder) if f.endswith('.pdf')]
    if len(pdf_files) == 1:
        file = pdf_files[0]
        src = os.path.join(Train_Folder, file)
        dst = os.path.join(Validation_Folder, file)
        shutil.move(src, dst)
        print("There was only one file, and it has been moved to the 'validation' folder.")
        return
    random.shuffle(pdf_files)
    print("Validation Ratio: " + str(Validation_Split_Ratio))
    num_files_to_move = int(len(pdf_files) * float(Validation_Split_Ratio))
    files_to_move = pdf_files[:num_files_to_move]
    for file in files_to_move:
        src = os.path.join(Train_Folder, file)
        dst = os.path.join(Validation_Folder, file)
        shutil.move(src, dst)
    
    print(f"{num_files_to_move} PDF files have been moved to the 'validation' folder.")

def get_file_paths_train():
    paths = []
    
    for root, dirs, files in os.walk(Train_Folder):
        for file in files:
            file_path = os.path.join(root, file)
            if file.endswith('.pdf'):
                paths.append(file_path)
    return paths

def get_file_paths_val():
    paths=[]
    for r, d, f in os.walk(Validation_Folder):
        for file in f:
            if '.pdf' in file:
                paths.append(os.path.join(r, file))
    return paths

def load_corpus(files, verbose=False):
    if verbose:
        print(f"Loading files {files}")

    reader = SimpleDirectoryReader(input_files= files)
    docs = reader.load_data()
    if verbose:
        print(f"Loaded {len(docs)} docs")

    parser = SentenceSplitter()
    nodes = parser.get_nodes_from_documents(docs, show_progress=verbose)

    if verbose:
        print(f"Parsed {len(nodes)} nodes")

    return nodes

def evaluate_st(
    dataset,
    model_id,
    name,
):
    corpus = dataset.corpus
    queries = dataset.queries
    relevant_docs = dataset.relevant_docs

    evaluator = InformationRetrievalEvaluator(
        queries, corpus, relevant_docs, name=name
    )
    model = SentenceTransformer(model_id)
    output_path = "results/"
    Path(output_path).mkdir(exist_ok=True, parents=True)
    return evaluator(model, output_path=output_path,)

def training():
    if os.path.exists(Train_Folder):
        shutil.rmtree(Train_Folder)
    if os.path.exists(Validation_Folder):
        shutil.rmtree(Validation_Folder)
    os.makedirs(Train_Folder, exist_ok=True)
    os.makedirs(Validation_Folder, exist_ok=True)
    for filename in os.listdir(Input_Folder):
        src_file = os.path.join(Input_Folder, filename)
        dst_file = os.path.join(Train_Folder, filename)
        if os.path.isfile(src_file):
            shutil.copy(src_file, dst_file)
            print(f"Copied {src_file} to {dst_file}")

    Check_Csv_xlsx()
    move_30_percent_to_validation(Train_Folder, Validation_Folder)
    TRAIN_FILES =get_file_paths_train()
    VAL_FILES = get_file_paths_val()
    train_nodes = load_corpus(TRAIN_FILES, verbose=True)
    val_nodes = load_corpus(VAL_FILES, verbose=True)
    print("--Corpus Loaded--")
    print("generating Qa-embedding Pairs")
    train_dataset = generate_qa_embedding_pairs(
    llm=OpenAI(model="gpt-3.5-turbo"), nodes=train_nodes
    )
    val_dataset = generate_qa_embedding_pairs(
    llm=OpenAI(model="gpt-3.5-turbo"), nodes=val_nodes
    )
    train_dataset.save_json("train_dataset.json")
    val_dataset.save_json("val_dataset.json")

    train_dataset = EmbeddingQAFinetuneDataset.from_json("train_dataset.json")
    val_dataset = EmbeddingQAFinetuneDataset.from_json("val_dataset.json")

    print("--Model Initialized--")
    finetune_engine = SentenceTransformersFinetuneEngine(
    train_dataset,
    model_id= Model,
    model_output_path=FineTunedModelPath,
    val_dataset=val_dataset,
    show_progress_bar=True,
    )
    print("--Training started--")
    finetune_engine.finetune()
    embed_model = finetune_engine.get_finetuned_model()
    print("--Training Finished--")

    print("Evalution Started")
    base_result=evaluate_st(val_dataset, Model, name="bge")
    finetuned_result=evaluate_st(val_dataset,FineTunedModelPath , name="finetuned")
    print("---Base-BGE-Result:",base_result)
    print("---Finetuned-BGE-Result:",finetuned_result)
    try:
        shutil.rmtree(Train_Folder)
        shutil.rmtree(Validation_Folder)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    print('--Running script--')
    main()
    training()
    