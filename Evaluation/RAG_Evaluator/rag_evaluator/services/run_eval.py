import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
from werkzeug.utils import secure_filename
import pandas as pd
from main import run

async def process_files(excel_file, config_file):
    # Configure upload folder
    INPUT_UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "../")
    CONFIG_UPLOAD_FOLDER = os.path.join(INPUT_UPLOAD_FOLDER, "config")
    
    excel_file_name = excel_file.split("/")[-1]
    print("excel_file_name:", excel_file_name)
    
    excel_filename = secure_filename(excel_file_name)
    print("excel_filename:", excel_filename)
    

    excel_path = os.path.join(INPUT_UPLOAD_FOLDER, excel_filename)
    config_path = os.path.join(CONFIG_UPLOAD_FOLDER, 'config.json')
    
    # Save the uploaded files
    with open(config_file, 'r') as f:
        s = f.read()
        with open(config_path, 'w') as f2:
            f2.write(s)
            
    excelFile = pd.read_excel(excel_file)
    excelFile.to_excel(excel_path, index=False)
    
    return excel_path


async def runeval(excel_file, config_file, params):
    
    excel_path = await process_files(excel_file, config_file)
    try:
        return run(excel_path, evaluate_ragas=params.get("evaluate_ragas"), evaluate_crag=params.get("evaluate_crag"), use_search_api=params.get("use_search_api"), llm_model=params.get("llm_model"), save_db=params.get("save_db"))
    except Exception as e:
        raise Exception("Error in running evaluation: " + str(e))
    
    
    
