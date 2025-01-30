# src/config/configManager.py

import json
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(override=True)

class ConfigManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ConfigManager, cls).__new__(cls)
            cls._instance.config = cls._instance._load_config()
        return cls._instance

    def _load_config(self):
        return {
            "koreai": {
                "api_mode": os.getenv("KORE_API_MODE"),
                "api_workers": int(os.getenv("KORE_API_WORKERS", 8)),
                "app_id": os.getenv("KORE_APP_ID"),
                "client_id": os.getenv("KORE_CLIENT_ID"),
                "client_secret": os.getenv("KORE_CLIENT_SECRET"),
                "domain": os.getenv("KORE_DOMAIN")
            },
            "openai": {
                "model_name": os.getenv("OPENAI_MODEL_NAME"),
                "embedding_name": os.getenv("OPENAI_EMBEDDING_NAME")
            },
            "azure": {
                "openai_api_version": os.getenv("AZURE_OPENAI_API_VERSION"),
                "base_url": os.getenv("AZURE_BASE_URL"),
                "model_name": os.getenv("AZURE_MODEL_NAME"),
                "model_deployment": os.getenv("AZURE_MODEL_DEPLOYMENT"),
                "embedding_deployment": os.getenv("AZURE_EMBEDDING_DEPLOYMENT"),
                "embedding_name": os.getenv("AZURE_EMBEDDING_NAME")
            },
            "MongoDB": {
                "url": os.getenv("MONGODB_URL"),
                "dbName": os.getenv("MONGODB_DB_NAME"),
                "collectionName": os.getenv("MONGODB_COLLECTION_NAME")
            },
            "RAGAS": {
                "api_workers": int(os.getenv("RAGAS_EVALUATION_WORKERS", 50)),
            }
        }

    def get_config(self):
        return self.config