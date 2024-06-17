import os
import json
import logging
from logging.handlers import TimedRotatingFileHandler, RotatingFileHandler
from dotenv import load_dotenv

load_dotenv()
loggerLevel = os.environ.get('loggerLevel', 'INFO').upper()

def get_logger(is_time_handler=True, is_file_handler=False):
    logs_dir = "./logs"
    # Create logs directory if it doesn't exist
    if not os.path.exists(logs_dir):
        os.makedirs(logs_dir)

    # Configure logger
    logger = logging.getLogger()
    logger.handlers.clear()  # Clear existing handlers

    # Configure logger level
    logger.setLevel(loggerLevel)

    # Configure log format
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

    # Configure file handler
    if is_time_handler:
        file_handler = TimedRotatingFileHandler(filename='./logs/PNCIngestionJob.log',
                                                 when='midnight',
                                                 interval=1,
                                                 backupCount=20,
                                                 encoding='utf-8')
        file_handler.suffix = '%Y-%m-%d'
    else:
        file_handler = RotatingFileHandler(filename='./logs/PNCIngestionJob.log',
                                           maxBytes=50 * 1024,  # 50 KB
                                           backupCount=20,
                                           encoding='utf-8')

    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    return logger

def write_json_to_file(json_data, file_name, operation='w'):
    # Construct file path
    file_path = os.path.join('./logs/json', file_name)
    logger = get_logger()

    try:
        # Ensure that the "files" folder exists
        if not os.path.exists('./logs/json'):
            os.makedirs('./logs/json')

        # Write JSON data to file
        with open(file_path, operation, encoding='utf-8')  as file:
            json.dump(json_data, file, indent=4)
    except Exception as e:
        logger.error(f'Error writing JSON data to {file_path}: {e}', exc_info=True)

def write_json_to_separate_file(json_data, file_name, operation='w'):
    # Construct file path
    file_path = os.path.join('.data/input', file_name)
    logger = get_logger()

    try:
        # Ensure that the "files" folder exists
        if not os.path.exists('.data/input'):
            os.makedirs('.data/input')

        # Write JSON data to file
        with open(file_path, operation, encoding='utf-8')  as file:
            json.dump(json_data, file, indent=4)
    except Exception as e:
        logger.error(f'Error writing JSON data to {file_path}: {e}', exc_info=True)

#Write refresh token to .env file
def write_refresh_token(json_data, operation='a'):
    # Construct file path
    file_path = os.path.join('./.env')
    logger = get_logger()

    try:
        # Ensure that the "files" folder exists
        # if not os.path.exists('./logs/input'):
        #     os.makedirs('./logs/input')

        # Write JSON data to file
        with open(file_path, operation, encoding='utf-8')  as file:
            file.write(str(json_data))
            # json.dump(json_data, file, indent=4)
    except Exception as e:
        logger.error(f'Error writing JSON data to {file_path}: {e}', exc_info=True)

