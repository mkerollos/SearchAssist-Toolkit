# src/evaluators/ragasEvaluator.py

from datasets import Dataset
# Ragas Metrics updated to work with latest version
from ragas.metrics import (
    ResponseRelevancy,
    Faithfulness,
    ContextRecall,
    LLMContextPrecisionWithReference,
    AnswerCorrectness,
    SemanticSimilarity
)
from langchain_openai.chat_models import AzureChatOpenAI
from langchain_openai.embeddings import AzureOpenAIEmbeddings
from ragas.llms import LangchainLLMWrapper
from ragas.embeddings import LangchainEmbeddingsWrapper
from langchain_openai import ChatOpenAI
from langchain_openai import OpenAIEmbeddings
from ragas import evaluate, RunConfig
from .baseEvaluator import BaseEvaluator
from rag_evaluator.config.configManager import ConfigManager


class RagasEvaluator(BaseEvaluator):
    def evaluate(self, queries, answers, ground_truths, contexts, model):
        config_manager = ConfigManager()
        config = config_manager.get_config()
        # Wrap the model in the Langchain wrapper
        if model == "azure":
            azure_llm = AzureChatOpenAI(
                api_key= config["azure"]["api_key"],
                openai_api_version= config["azure"]["openai_api_version"],
                azure_endpoint= config["azure"]["base_url"],
                azure_deployment= config["azure"]["model_deployment"],
                model= config["azure"]["model_name"],
                validate_base_url=False,
            )

            azure_embeddings = AzureOpenAIEmbeddings(
                api_key= config["azure"]["api_key"],
                openai_api_version= config["azure"]["openai_api_version"],
                azure_endpoint= config["azure"]["base_url"],
                azure_deployment= config["azure"]["embedding_deployment"],
                model= config["azure"]["embedding_name"],
            )
            evaluator_llm = LangchainLLMWrapper(azure_llm)
            evaluator_embeddings = LangchainEmbeddingsWrapper(azure_embeddings)
        else:
            evaluator_llm = LangchainLLMWrapper(ChatOpenAI(model=config["openai"]["model_name"]))
            evaluator_embeddings = LangchainEmbeddingsWrapper(OpenAIEmbeddings(model=config["openai"]["embedding_name"]))
            
        # Define the metrics to evaluate and set the per metric evaluation models
        metrics = [
            ResponseRelevancy(llm=evaluator_llm, embeddings=evaluator_embeddings),
            Faithfulness(llm=evaluator_llm),
            ContextRecall(llm=evaluator_llm),
            LLMContextPrecisionWithReference(llm=evaluator_llm, name="context_precision"),
            AnswerCorrectness(llm=evaluator_llm, embeddings=evaluator_embeddings),
            SemanticSimilarity(embeddings=evaluator_embeddings, name="answer_similarity")
        ]
        ground_truths = [str(ground_truth).strip() for ground_truth in ground_truths]
        # Update the required columns names in the dataset
        data = {
            'user_input': queries,
            'response': answers,
            'retrieved_contexts': contexts,
            'reference': ground_truths
        }
        dataset = Dataset.from_dict(data)
        config = ConfigManager().get_config()
        run_config = RunConfig(timeout=300, max_workers=config.get('RAGAS').get'api_workers'))
        result = evaluate(dataset, metrics=metrics, run_config=run_config)
        result_df = result.to_pandas()
        return result_df, result

    def process_results(self, results):
        return results.to_pandas()
