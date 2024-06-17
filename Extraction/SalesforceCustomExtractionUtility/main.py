import pandas as pd
from utils.logger import get_logger
import salesforceData_extraction as sfdc
import argparse
import asyncio
import chunks_extraction as sa_utility

logger = get_logger()
async def datasync_handler(input_directory_path, output_directory_path):
    
    try:
        salesforce_data = await sfdc.extractData() 
        logger.info("chunk extraction started")
        # data=await sa_utility.helper(input_directory_path, output_directory_path)
    except Exception as e:
        logger.error("Error in data sync main method", exc_info=True)


if __name__ == "__main__":
    # Use argparse to handle command-line arguments
    parser = argparse.ArgumentParser(description="Process HTML files and output JSON files.")
    parser.add_argument("input_directory_path", nargs = '?', type=str, default= ".data/input/", help="Path to the input directory containing HTML files.")
    parser.add_argument("output_directory_path", nargs = '?', type=str, default= ".data/output/",help="Path to the output directory for JSON files.")

    args = parser.parse_args()

    # Run the main function with the parsed arguments
    asyncio.run(datasync_handler(args.input_directory_path, args.output_directory_path))

