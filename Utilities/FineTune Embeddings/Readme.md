
# Fine-Tune Embedding Utility

This Python public utility is used to fine-tune the embedding models from Hugging Face directly using custom datasets, which helps developers to fine-tune the embeddings using domain-related datasets.

| Default location  | Description                                                                                                   |
|-------------------|---------------------------------------------------------------------------------------------------------------|
| Data              | This folder is intended for users to place their custom datasets for Fine-tuning. |
| Train             | This folder stores 70% of the split dataset for fine-tuning the model. The folder will be created automatically and deleted after the fine-tuning is done.                                     |
| Validation        | This folder stores 30% of the split dataset for evaluating both the fine-tuned and normal models. The folder will be created automatically and deleted after the fine-tuning is done.             |
| FineTunedModel    | This folder is designated for the placement of the fine-tuned model.                                           |


| Pre-request      | Python version 3.12.4 |
|------------------|-----------------------|



# Getting Started

### 1. Clone the Repository

```
git clone git@github.com:Koredotcom/SearchAssist-Toolkit.git
```

```
cd SearchAssist-Toolkit/Utilities/FineTune\ Embeddings/
```


### 2. Install Dependencies 

```
pip install -r requirements.txt
```
### 3. Set the OpenAI key in the terminal session.
Replace the OpenAI key and run this command in the terminal to store the API key in the session.

Linux
```
export OPENAI_API_KEY=OPENAI_API_KEY
```
Windows
```
set OPENAI_API_KEY=OPENAI_API_KEY
```

### 4. Run the Script

```
python FineTuneEmbedding.py 
```

 ### 5. Configuration
Default configuration will be set in the config.json file. If required, change the parameters based on your needs.
```
{
    "Model":"BAAI/bge-base-zh-v1.5",
    "FineTunedModelPath":"FineTunedModel",
    "Input_Folder":"Data",
    "Train_Folder":"Train",
    "Validation_Folder":"Validation",
    "Validation_Split_Ratio":0.3
}
```

| Note     | Validation_Split_Ratio must be set between 0.1 and 0.9. |
|------------------|-----------------------|

### 6. Optional parameters
If you need to temporarily change a configuration, you can pass parameters while running the script, and these parameters will overwrite the default configuration.

```
python FineTuneEmbedding.py --Model BAAI/bge-base-zh-v1.5 --Input_Folder Dataset --FineTunedModelPath Output --Train_Folder Train --Validation_Folder val --Validation_Split_Ratio 0.4
```




| Arguments                | Description               | Requirement | Default           |
|--------------------------|---------------------------|-------------|-------------------|
| `--Model`                | Model ID                  | Optional   |     BAAI/bge-base-zh-v1.5              |
| `--Input_Folder`         | Input Folder Path         | Optional    | Data              |
| `--FineTunedModelPath`   | Output Path               | Optional    | FineTunedModel    |
| `--Train_Folder`         | Training Folder Name      | Optional    | Train             |
| `--Validation_Folder`    | Validation Folder Name    | Optional    | Validation        |
| `--Validation_Split_Ratio`    | Validation Split Ratio    | Optional    | 0.3         |



### Possible issues can occur

ImportError: tokenizers>=0.14,<0.19 is required for a normal functioning of this module, but found tokenizers==0.19.1

```
pip uninstall tokenizers
```

### Solution

```
pip install tokenizers==0.15.1
```