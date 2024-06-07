
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
### 5. Set the OpenAI key in the terminal session.
Replace the OpenAI key and run this command in the terminal to store the API key in the session.
```
export OPENAI_API_KEY=OPENAI_API_KEY
```

### 4. Run the Script

```
python FineTuneEmbedding.py --Model BAAI/bge-base-zh-v1.5
```
### 5. Optional parameters

```
python FineTuneEmbedding.py --Model BAAI/bge-base-zh-v1.5 --Input_Folder Dataset --FineTunedModelPath Output --Train_Folder Train --Validation_Folder val
```




| Arguments                | Description               | Requirement | Default           |
|--------------------------|---------------------------|-------------|-------------------|
| `--Model`                | Model ID                  | Mandatory   |                   |
| `--Input_Folder`         | Input Folder Path         | Optional    | Data              |
| `--FineTunedModelPath`   | Output Path               | Optional    | FineTunedModel    |
| `--Train_Folder`         | Training Folder Name      | Optional    | Train             |
| `--Validation_Folder`    | Validation Folder Name    | Optional    | Validation        |



### Possible issues can occur

ImportError: tokenizers>=0.14,<0.19 is required for a normal functioning of this module, but found tokenizers==0.19.1

```
pip uninstall tokenizers
```

### Solution

```
pip install tokenizers==0.15.1
```