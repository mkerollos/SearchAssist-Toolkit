
# RAGAS Evaluation For Search assist

Main task is to create a script that automatically fetches the search assist response and calculates the answer relevancy, context recall, context precision,faithfulness,answer correctness,context url.
This utility takes a excel file (Query,GroundTruth) as an input along with search assist appId and auth token for advanced search api.Ragas evaluation framework is used compute the evaluation metrices from response provided by searchassist advanced search API and an excel file is given as output.

## Refrence Link

[RAGAS](https://docs.ragas.io/en/latest/index.html)
[DeepEval](https://docs.confident-ai.com)

## Table of Contents

- Requirements
- Configuration
- Installation and Usage

## Requirements

To use this utility, the following dependencies libraries are required:
- openpyxl
- requests
- ragas
- pandas

## Configuration

Before running the utility, make sure to properly set up the config file(config,json):
- Go to `config.json`
    - Create excel with two columns [Query,GroundTruth] and paste file path with `input_excel_file` key in `config.json`. In this excel file give the values for Query and GroundTruth.

    - Get the AppId and jwt auth token for the search app that you want to evaluate and pase it in the `config.json`.

    - Give the output excel file path.

- Go to `ragasEval.py' and add openAI API key in os env.
    - `os.environ["OPENAI_API_KEY"] = "openAIKey"`

##  Usage
1. Run the RAGAS evaluation script
    - go the RAGAS evaluation directory and run `python3 main.py'

2. The output will be 11 headers given below
- question
- answer (search assist response) 
- contexts (chunk sent to llm)
- ground_truth
- answer_relevancy
- faithfulness
- context_recall
- context_precision
- answer_correctness
- answer_similarity
- context_url (source url used to crawl the chunk )










