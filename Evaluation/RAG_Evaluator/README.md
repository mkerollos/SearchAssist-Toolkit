# RAG Evaluator

## Overview

This repo is designed to evaluate queries and ground truths using the Ragas and Crag evaluators. The evaluation can be performed using data from an Excel file and optionally fetching responses via the SearchAI API. The script supports both Ragas and Crag evaluations, and the results are saved to an output Excel file or can be stored in mongoDB.

## Installation

### Prerequisites

- Python 3.12.x
- Poetry package manager (https://python-poetry.org/docs/#installing-with-the-official-installer)

OR

- Docker

### Installing Directly

1. Ensure you have Python and poetry installed. You can check this by running:
 ```sh
 python --version
 poetry --version
 ```

2. Install the necessary packages by running:
 ```sh
poetry install
 ```

### Running with Docker

Build the image using 
```sh
docker build -t rag_evaluator .
```

## Configuration

This package relies on environment values to operate correctly. Create a copy of `.env.example` and name it `.env`. Replace the values.

### KoreAI values

In the web console navigate to Automation AI > App Settings > Dev Tools > API Scopes. From here either create or edit an existing JWT App to get `KORE_APP_ID`, `KORE_CLIENT_ID` and `KORE_CLIENT_SECRET`. 

### OpenAI values

Model names can be found at https://platform.openai.com/docs/models#current-model-aliases for `OPENAI_MODEL_NAME` and https://platform.openai.com/docs/models#embeddings for `OPENAI_EMBEDDING_NAME`.

An OpenAI API key can be generated through https://platform.openai.com/api-keys. Ensure that this is created against the appropriate project (e.g. KoreAI). 

### Other configs

```
Replace the placeholders with your actual values. 
- If saving to MongoDB, set `url`, `dbName`, and `collectionName` in the `MongoDB` section of the config.json file.

- for Azure openai model, set `EVALUATION_MODEL_NAME`, `openai_api_version`, `base_url`, `model_deployment`, `model_name`, `embedding_deployment`, `embedding_name`, `model_version` in config.json file.

```json5
{
    "openai_api_version": "v1",
    "base_url": "https://api.openai.com",
    "model_deployment": "azure",
    "model_name": "gpt-3.5-turbo",
    "model_version": "latest"
}
```

## Usage

### Command-Line Arguments

- `--input_file`: Path to the input Excel file (required).
- `--sheet_name`: Specific sheet name to evaluate (optional, defaults to all sheets).
- `--evaluate_ragas`: Run only Ragas evaluation (optional).
- `--evaluate_crag`: Run only Crag evaluation (optional).
- `--use_search_api`: Use SearchAssist API to fetch responses (optional).
- `--save_db`: Save the evaluation results to MongoDB (optional).
- `--llm_model`: Specify the LLM model to use for evaluation (optional) (To use azure openai model, set it to "azure").

### Running Your First Experiment

### Example 1: Using Both Ragas and Crag Evaluators with SearchAssist API

To run an evaluation on a specific sheet using both Ragas and Crag evaluators and the SearchAssist API, follow these steps:

1. Prepare your Excel file with the following columns:
    - `query`: The query string.
    - `ground_truth`: The expected ground truth for the query.

2. Execute the script with the following command:

```sh
python rag_evaluator/main.py --input_file rag_evaluator/sample_input_file.xlsx --sheet_name "Sheet1" --use_search_api

# Docker equivalent
docker run -it --rm rag_evaluator python rag_evaluator/main.py --input_file rag_evaluator/sample_input_file.xlsx --sheet_name "Sheet1" --use_search_api
```
### Example 2: Using only Ragas Evaluator and without Search AI API

To run an evaluation using the Ragas evaluator, follow these steps:

1. Prepare your Excel file with the following columns:
    - `query`: The query string.
    - `ground_truth`: The expected ground truth for the query.
    - `contexts`: A list of contexts (optional).
    - `answer`: The answer string (optional).

2. Execute the script with the following command:

```sh
python rag_evaluator/main.py --input_file rag_evaluator/sample_input_file.xlsx --evaluate_ragas
```

### Example 3: Using only Ragas Evaluator with Search AI API and saving results to MongoDB

To run an evaluation using the Ragas evaluator with Azure openai model, Search AI API and save the results to MongoDB, follow these steps:

1. Prepare your Excel file with the following columns:
    - `query`: The query string.
    - `ground_truth`: The expected ground truth for the query.

2. Execute the script with the following command:
    
    ```sh
    python rag_evaluator/main.py --input_file rag_evaluator/sample_input_file.xlsx --evaluate_ragas --use_search_api --save_db -- llm_model azure
    ```
## Additional Details

### Output

The results are saved in the `./outputs` directory with a timestamped filename. The output file will contain the evaluation results for each sheet processed.

---

# API Documentation

## Overview

This FastAPI application provides two main endpoints: `/runeval` and `/mailService`. These endpoints allow users to run evaluations and send emails with the results, respectively.

## Endpoints

### 1. `/runeval`

#### Method: POST

**Summary**: Run Eval

**Description**: This endpoint allows users to run an evaluation based on the provided Excel file, config file, and parameters.

**Request Body**:
- **Content Type**: `application/json`
- **Schema**: `Body`
  - **Properties**:
    - `excel_file` (string): The path to the Excel file.
    - `config_file` (string): The path to the config file.
    - `params` (object): Evaluation parameters.
      - **Schema**: `Params`
        - **Properties**:
          - `sheet_name` (string): The name of the sheet in the Excel file.
          - `evaluate_ragas` (boolean): Whether to evaluate ragas. Default is `false`.
          - `evaluate_crag` (boolean): Whether to evaluate crag. Default is `false`.
          - `use_search_api` (boolean): Whether to use the search API. Default is `false`.
          - `llm_model` (string): The LLM model to use.
          - `save_db` (boolean): Whether to save the results to the database. Default is `false`.

**Responses**:
- **200**: Successful Response
  - **Content Type**: `application/json`
  - **Schema**: Empty object
- **422**: Validation Error
  - **Content Type**: `application/json`
  - **Schema**: `HTTPValidationError`
    - **Properties**:
      - `detail` (array): List of validation errors.
        - **Items**: `ValidationError`
          - **Properties**:
            - `loc` (array): Location of the error.
              - **Items**: `string` or `integer`
            - `msg` (string): Error message.
            - `type` (string): Error type.

### 2. `/mailService`

#### Method: POST

**Summary**: Mail Service

**Description**: This endpoint allows users to send an email with the evaluation results.

**Query Parameters**:
- `send_mail` (boolean): Whether to send the email. Default is `false`.

**Responses**:
- **200**: Successful Response
  - **Content Type**: `application/json`
  - **Schema**: Empty object
- **422**: Validation Error
  - **Content Type**: `application/json`
  - **Schema**: `HTTPValidationError`
    - **Properties**:
      - `detail` (array): List of validation errors.
        - **Items**: `ValidationError`
          - **Properties**:
            - `loc` (array): Location of the error.
              - **Items**: `string` or `integer`
            - `msg` (string): Error message.
            - `type` (string): Error type.

## Components

### Schemas

#### `Body`
- **Properties**:
  - `excel_file` (string): The path to the Excel file.
  - `config_file` (string): The path to the config file.
  - `params` (object): Evaluation parameters.
    - **Schema**: `Params`
      - **Properties**:
        - `sheet_name` (string): The name of the sheet in the Excel file.
        - `evaluate_ragas` (boolean): Whether to evaluate ragas. Default is `false`.
        - `evaluate_crag` (boolean): Whether to evaluate crag. Default is `false`.
        - `use_search_api` (boolean): Whether to use the search API. Default is `false`.
        - `llm_model` (string): The LLM model to use.
        - `save_db` (boolean): Whether to save the results to the database. Default is `false`.

#### `HTTPValidationError`
- **Properties**:
  - `detail` (array): List of validation errors.
    - **Items**: `ValidationError`
      - **Properties**:
        - `loc` (array): Location of the error.
          - **Items**: `string` or `integer`
        - `msg` (string): Error message.
        - `type` (string): Error type.

#### `Params`
- **Properties**:
  - `sheet_name` (string): The name of the sheet in the Excel file.
  - `evaluate_ragas` (boolean): Whether to evaluate ragas. Default is `false`.
  - `evaluate_crag` (boolean): Whether to evaluate crag. Default is `false`.
  - `use_search_api` (boolean): Whether to use the search API. Default is `false`.
  - `llm_model` (string): The LLM model to use.
  - `save_db` (boolean): Whether to save the results to the database. Default is `false`.

#### `ValidationError`
- **Properties**:
  - `loc` (array): Location of the error.
    - **Items**: `string` or `integer`
  - `msg` (string): Error message.
  - `type` (string): Error type.

---


## Future Improvements

- Add support for additional evaluators.
- Generate User friendly reports.
- Support for synthetic test data set generator.
- Support for custom LLMs(Claude etc).
- More to come....!

## Contributing

We welcome contributions to this project! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear and descriptive messages.
4. Push your changes to your fork.
5. Open a pull request with a detailed description of your changes.

For major changes, please open an issue first to discuss what you would like to change. This helps ensure that your contribution is aligned with the project's goals and avoids duplication of effort.