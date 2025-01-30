import requests
from typing import Dict, List, Tuple, Optional
from rag_evaluator.config.configManager import ConfigManager
from rag_evaluator.utils.jti import JTI

def generate_JWT_token(client_id, client_secret):
      
    jwt_token = JTI.get_hs_key(client_id, client_secret, "JWT", "HS256")    
    return jwt_token

class XOSearchAPI:
    def __init__(self):
        config = ConfigManager().get_config()
        self.client_id = config.get('koreai').get('client_id')
        self.client_secret = config.get('koreai').get('client_secret')
        self.auth_token = generate_JWT_token(self.client_id, self.client_secret)
        self.app_id = config.get('koreai').get('app_id')
        self.domain = config.get('koreai').get('domain')
        self.base_url = f'https://{self.domain}/api/public/bot/{self.app_id}'

    def _make_request(self, endpoint: str, data: Dict) -> Optional[Dict]:
        headers = {
            'auth': self.auth_token,
            'Content-Type': 'application/json'
        }
        try:

            response = requests.post(f"{self.base_url}/{endpoint}", json=data, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return None

    def advanced_search(self, query: str) -> Optional[Dict]:
        data = {
            "query": query,
            "includeChunksInResponse": True,
            "includeMetaDataAnswers": ["chunkMeta.recordTitle"]
        }
        return self._make_request('advancedSearch', data)

    def get_chunks(self) -> Optional[Dict]:
        data ={
        }
        hasMore = True
        chunks =  []
        try:
            while hasMore:
                response = self._make_request('chunk/list', data)
                hasMore = response.get("hasMore", False)
                print(f"hasMore = {hasMore}")
                if hasMore:
                    nextCursor = response.get("nextCursor")
                    print(f"nextCursor = {nextCursor}")
                    data = {
                        "nextCursor": response.get("nextCursor")
                    }
                    for chunk in response.get("chunks"):
                        chunks.append({
                            "recordTitle": chunk.get("recordTitle"),
                            "chunkText": chunk.get("chunkText")
                        })
        except Exception as e:
            print(e)
        return chunks


class AnswerProcessor:
    @staticmethod
    def get_context(answer: Dict) -> Tuple[List[str], str]:
        contexts = []
        context_titles = set()
        for chunk in answer.get('chunk_result', {}).get('generative', []):
            source = chunk.get('_source', {})
            if source.get('sentToLLM'):
                contexts.append(source.get('chunkText', ''))
                context_titles.add(source.get('recordTitle', ''))
        return contexts, list(context_titles)

    @staticmethod
    def extract_answer(answer: Dict) -> str:
        center_panel = (answer.get('response', {})
                        .get('answer_payload', {})
                        .get('center_panel', {}))
        if not center_panel:
            return "No Answer Found"
        snippet_content = center_panel.get('data', [{}])[0].get('snippet_content', [{}])
        answer_string = " ".join(content.get('answer_fragment', "No Answer Found") for content in snippet_content) if snippet_content else "No Answer Found"
        return answer_string


def get_bot_response(api: XOSearchAPI, query: str) -> Optional[Dict]:
    answer = api.advanced_search(query)
    if not answer:
        return None

    context_data, context_title = AnswerProcessor.get_context(answer)
    bot_answer = AnswerProcessor.extract_answer(answer)

    return {
        'query': query,
        'context': context_data,
        'context_title': context_title,
        'answer': bot_answer
    }


# Example usage
if __name__ == "__main__":
    api = XOSearchAPI()
    query = "what is eva?"
    truth = "Example ground truth"
    result = get_bot_response(api, query, truth)
    if result:
        print(result)
    else:
        print("Failed to get response")
