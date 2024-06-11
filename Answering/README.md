# Custom LLM Answering Service Utility

This Node.js public utility provides the capability to interact with any custom LLM for answering of your choice. Here we are integrating OpenAI and Azure OpenAI for answering.

## Project Structure

- Answering
    - base.js
    - config/
        - answer.json
    - src/
        - routes/
            - utilityRoutes.js
        - controllers/
            - utilityController.js
    - constants/
        - answerRequest.js
    - server.js
    - package.json

## Getting Started

### 1. Clone the Repository

```
git clone git@github.com:Koredotcom/SearchAssist-Toolkit.git
```

```
cd SearchAssist-Toolkit/
```

```
cd Answering
```

### 2. Install Dependencies (Optional)

```
npm install
```

### 3. Run the Server
```
node server.js
```

In your local machine the server will be running on {{protocol}}://{{host}}:{{port}}. 

If you this message on running the service proceed: ```Server is running on http://localhost:8888```

## API Endpoints

### Answer Endpoint
**API Path**: ```{{host}}/searchassistAnswering```
**Method**: ```POST```

## Sample Request Payload:

```
{
    "searchResults": {
        "template": {
            "originalQuery": "real estate marketting strategy",
            "chunk_result": {
                "generative": [
                    {
                        "_source": {
                            "chunkText": " moreu0021 Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?"
                        }
                    },
                    {
                        "_source": {
                            "chunkText": " the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable and remind you of your goals when work gets hard. This could be as simple as an occasional text asking how your marketing is going this week or as formal as a one-on-one meeting with a business coach. Pros and Cons of Being a Part-Time Real Estate Agent Not sure if going part-time is for you? Here’s a quick breakdown of the pros and cons. | | Should You Become a Part-Time Real Estate Agent? | | Pros: | | Cons: | | - Flexible schedule. You can set your hours around your other responsibilities. - Less pressure to scale quickly. You can build your client base at your own pace while relying on income from another job. - Extra cash. You can supplement your primary income with sales commissions. | | - Time commitment. It may take longer for your business to gain momentum if you’re only part-time. - Demanding clients. Some clients may expect more attention and time than you can give. - High competition. Many clients prefer to work with a full-time agent, and there are plenty to choose from. Ready to Level Up Your Marketing? If you’re pursuing a part-time real estate career, your time is even more valuable than somebody who has an unlimited amount of time to dedicate to their business. So, you need to work smarter when generating leads, not harder. This is where PropStream comes in handy. With PropStream, you can effortlessly find listing leads by searching for local homeowners with selling motivation. Examples of selling motivation you can search using PropStream are: - Divorce - Pre-foreclosure - Bankruptcy - Pre-probate And moreu0021 Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?"
                        }
                    }
                ]
            }
        }
    }
}
```
## Sample Response Payload:
```
{
    "answer": {
        "graph_answer": {
            "payload": {
                "center_panel": {
                    "type": "citation_snippet",
                    "data": [
                        {
                            "title": "",
                            "answer": "To level up your real estate marketing strategy, you can use PropStream to effortlessly find listing leads by searching for local homeowners with selling motivation, such as divorce, pre-foreclosure, bankruptcy, pre-probate, and more. You can easily save leads to marketing lists and create your campaign in one convenient location. ",
                            "snippet_type": "generative_model",
                            "isPresentedAnswer": true,
                            "message": "Presented Answer",
                            "score": "0%",
                            "timeTaken": "1.605ms",
                            "snippet_content": [
                                {
                                    "answer_fragment": "To level up your real estate marketing strategy, you can use PropStream to effortlessly find listing leads by searching for local homeowners with selling motivation, such as divorce, pre-foreclosure, bankruptcy, pre-probate, and more. You can easily save leads to marketing lists and create your campaign in one convenient location. ",
                                    "sources": [
                                        {
                                            "chunk_id": "chk-2"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        },
        "debug_payload": {
            "prompt": {
                "promptText": [
                    {
                        "role": "system",
                        "content": "You are an AI system responsible for generating answers and references based on user-provided context. The user will provide context, and your task is to answer the user's query at the end. Your response should adhere to the following format: **'Some relevant answer[chunk_id] Another relevant data[chunk_id]'**. In this format, you must strictly include the relevant answer or information followed by the chunk_id, which serves as a reference to the source of the data within the provided context. Importantly, place only the correct chunk_ids within square brackets. These chunk_ids must be located exclusively at the end of each content and indicated explicitly with a key 'chunk id.' Do not include any other text, words, or characters within square brackets. Your responses should also be properly formatted with all necessary special characters like new lines, tabs, and bullets, as required for clarity and presentation. If there are multiple answers present in the provided context, you should include all of them in your response. You should only provide an answer if you can extract the information directly from the content provided by the user. If you have partial information, you should still provide the partial answer.Always send relevant and correct chunk_ids with the answer fragments. You must not fabricate or create chunk_ids; they should accurately reference the source of each piece of information.If you cannot find the answer to the user's query within the provided content, your response should be 'I don't know.'.GENERATE ANSWERS AND REFERENCES EXCLUSIVELY BASED ON THE CONTENT PROVIDED BY THE USER. IF A QUERY LACKS INFORMATION IN THE CONTEXT, YOU MUST RESPOND WITH 'I don't know' WITHOUT EXCEPTIONS. Please generate the response in the same language as the user's query and context. To summarize, your task is to generate well-formatted responses, including special characters like new lines, tabs, and bullets when necessary, and to provide all relevant answers from the provided context while ensuring accuracy and correctness. Each answer fragment should be accompanied by the appropriate chunk_id, and you should never create chunk_ids. Answer in the same language as the user's query and context. Content:  moreu0021 Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?, source_name:  chunk_id: chk-1. \nContent:  the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable and remind you of your goals when work gets hard. This could be as simple as an occasional text asking how your marketing is going this week or as formal as a one-on-one meeting with a business coach. Pros and Cons of Being a Part-Time Real Estate Agent Not sure if going part-time is for you? Here’s a quick breakdown of the pros and cons. | | Should You Become a Part-Time Real Estate Agent? | | Pros: | | Cons: | | - Flexible schedule. You can set your hours around your other responsibilities. - Less pressure to scale quickly. You can build your client base at your own pace while relying on income from another job. - Extra cash. You can supplement your primary income with sales commissions. | | - Time commitment. It may take longer for your business to gain momentum if you’re only part-time. - Demanding clients. Some clients may expect more attention and time than you can give. - High competition. Many clients prefer to work with a full-time agent, and there are plenty to choose from. Ready to Level Up Your Marketing? If you’re pursuing a part-time real estate career, your time is even more valuable than somebody who has an unlimited amount of time to dedicate to their business. So, you need to work smarter when generating leads, not harder. This is where PropStream comes in handy. With PropStream, you can effortlessly find listing leads by searching for local homeowners with selling motivation. Examples of selling motivation you can search using PropStream are: - Divorce - Pre-foreclosure - Bankruptcy - Pre-probate And moreu0021 Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?, source_name:  chunk_id: chk-2. "
                    },
                    {
                        "role": "user",
                        "content": "From the content that I have provided, solve the query : ' real estate marketting strategy ' 'EXCLUDE ANY irrelevant information, such as 'Note:' from the response. NEVER FABRICATE ANY CHUNK_ID."
                    }
                ],
                "moreInfo": [
                    {
                        "key": "Model",
                        "value": "Custom Integration gpt-3.5-turbo"
                    },
                    {
                        "key": "Temperature",
                        "value": 0.5
                    },
                    {
                        "key": "Frequency Penalty",
                        "value": 0
                    },
                    {
                        "key": "TopP",
                        "value": 1
                    }
                ]
            },
            "llmResponse": {
                "responseDetails": {
                    "completionText": {
                        "answer": "To level up your real estate marketing strategy, you can use PropStream to effortlessly find listing leads by searching for local homeowners with selling motivation, such as divorce, pre-foreclosure, bankruptcy, pre-probate, and more. You can easily save leads to marketing lists and create your campaign in one convenient location. ",
                        "chunkIds": [
                            "chk-2"
                        ]
                    },
                    "moreInfo": [
                        {
                            "key": "Completion Tokens",
                            "value": 68
                        },
                        {
                            "key": "Prompt Tokens",
                            "value": 928
                        },
                        {
                            "key": "Total Tokens",
                            "value": 996
                        }
                    ]
                },
                "responseTime": {
                    "moreInfo": [
                        {
                            "key": "Completion Time",
                            "value": 1.605
                        }
                    ]
                }
            },
            "generativeChunks": [
                {
                    "chunkText": " moreu0021 Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?",
                    "score": "",
                    "sentToLLM": true,
                    "usedInAnswer": false,
                    "chunk_id": "",
                    "chunkRerank": false,
                    "additionalInfo": {},
                    "moreInfo": [
                        {
                            "key": "Chunk Title"
                        },
                        {
                            "key": "Page Number"
                        }
                    ]
                },
                {
                    "chunkText": " the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable and remind you of your goals when work gets hard. This could be as simple as an occasional text asking how your marketing is going this week or as formal as a one-on-one meeting with a business coach. Pros and Cons of Being a Part-Time Real Estate Agent Not sure if going part-time is for you? Here’s a quick breakdown of the pros and cons. | | Should You Become a Part-Time Real Estate Agent? | | Pros: | | Cons: | | - Flexible schedule. You can set your hours around your other responsibilities. - Less pressure to scale quickly. You can build your client base at your own pace while relying on income from another job. - Extra cash. You can supplement your primary income with sales commissions. | | - Time commitment. It may take longer for your business to gain momentum if you’re only part-time. - Demanding clients. Some clients may expect more attention and time than you can give. - High competition. Many clients prefer to work with a full-time agent, and there are plenty to choose from. Ready to Level Up Your Marketing? If you’re pursuing a part-time real estate career, your time is even more valuable than somebody who has an unlimited amount of time to dedicate to their business. So, you need to work smarter when generating leads, not harder. This is where PropStream comes in handy. With PropStream, you can effortlessly find listing leads by searching for local homeowners with selling motivation. Examples of selling motivation you can search using PropStream are: - Divorce - Pre-foreclosure - Bankruptcy - Pre-probate And moreu0021 Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?",
                    "score": "",
                    "sentToLLM": true,
                    "usedInAnswer": true,
                    "chunk_id": "",
                    "chunkRerank": false,
                    "additionalInfo": {},
                    "moreInfo": [
                        {
                            "key": "Chunk Title"
                        },
                        {
                            "key": "Page Number"
                        }
                    ]
                }
            ]
        }
    }
}
```

## Configurations

File for configurations: `config/answer.json`
Sample configuration which can be edited depending on the use case.
Set the answering LLM you want to use, currently in this servce we have support for 2 LLMs which are ["openai", "azure_openai"].

If you have selected "openai" as the answering LLM then set a valid apiKey for it. 
Else if you have selected "azure_openai" as the answering LLM then set a valid userSubDomain, deploymentId & apiKey.
Once you have edited the configurations, restart the server using the same command ```node server.js```

```
{
    "ANSWERING_LLM": "azure_openai",
    "ANSWERING_TYPE": "Custom Integration",
    "openai": {
        "endpoint": "https://api.openai.com/v1/chat/completions",
        "apiKey": "REMOVED",
        "prompt": [{
                "role": "system",
                "content": "You are an AI system responsible for generating answers and references based on user-provided context. The user will provide context, and your task is to answer the user's query at the end. Your response should adhere to the following format: **'Some relevant answer[chunk_id] Another relevant data[chunk_id]'**. In this format, you must strictly include the relevant answer or information followed by the chunk_id, which serves as a reference to the source of the data within the provided context. Importantly, place only the correct chunk_ids within square brackets. These chunk_ids must be located exclusively at the end of each content and indicated explicitly with a key 'chunk id.' Do not include any other text, words, or characters within square brackets. Your responses should also be properly formatted with all necessary special characters like new lines, tabs, and bullets, as required for clarity and presentation. If there are multiple answers present in the provided context, you should include all of them in your response. You should only provide an answer if you can extract the information directly from the content provided by the user. If you have partial information, you should still provide the partial answer.Always send relevant and correct chunk_ids with the answer fragments. You must not fabricate or create chunk_ids; they should accurately reference the source of each piece of information.If you cannot find the answer to the user's query within the provided content, your response should be 'I don't know.'.GENERATE ANSWERS AND REFERENCES EXCLUSIVELY BASED ON THE CONTENT PROVIDED BY THE USER. IF A QUERY LACKS INFORMATION IN THE CONTEXT, YOU MUST RESPOND WITH 'I don't know' WITHOUT EXCEPTIONS. Please generate the response in the same language as the user's query and context. To summarize, your task is to generate well-formatted responses, including special characters like new lines, tabs, and bullets when necessary, and to provide all relevant answers from the provided context while ensuring accuracy and correctness. Each answer fragment should be accompanied by the appropriate chunk_id, and you should never create chunk_ids. Answer in the same language as the user's query and context. {{chunks}}"
            },
            {
                "role": "user",
                "content": "From the content that I have provided, solve the query : ' {{query}} ' 'EXCLUDE ANY irrelevant information, such as 'Note:' from the response. NEVER FABRICATE ANY CHUNK_ID."
            }
        ],
        "MODEL": "gpt-3.5-turbo",
        "TEMPERATURE": 0.5,
        "MAX_TOKENS": 512,
        "TOP_P": 1,
        "FREQUENCY_PENALTY": 0,
        "PRESENCE_PENALTY": 0
    },
    "azure_openai": {
        "endpoint": "https://{userSubDomain}.openai.azure.com/openai/deployments/{deploymentId}/chat/completions?api-version={apiVersion}",
        "userSubDomain": REMOVED,
        "deploymentId": REMOVED,
        "apiVersion": "2023-03-15-preview",
        "apiKey": REMOVED,
        "prompt": [
            {
                "role": "system",
                "content": "You are an AI system responsible for generating answers and references based on user-provided context. The user will provide context, and your task is to answer the user's query at the end. Your response should adhere to the following format: **'Some relevant answer[chunk_id] Another relevant data[chunk_id]'**. In this format, you must strictly include the relevant answer or information followed by the chunk_id, which serves as a reference to the source of the data within the provided context. Importantly, place only the correct chunk_ids within square brackets. These chunk_ids must be located exclusively at the end of each content and indicated explicitly with a key 'chunk id.' Do not include any other text, words, or characters within square brackets. Your responses should also be properly formatted with all necessary special characters like new lines, tabs, and bullets, as required for clarity and presentation. If there are multiple answers present in the provided context, you should include all of them in your response. You should only provide an answer if you can extract the information directly from the content provided by the user. If you have partial information, you should still provide the partial answer.Always send relevant and correct chunk_ids with the answer fragments. You must not fabricate or create chunk_ids; they should accurately reference the source of each piece of information.If you cannot find the answer to the user's query within the provided content, your response should be 'I don't know.'.GENERATE ANSWERS AND REFERENCES EXCLUSIVELY BASED ON THE CONTENT PROVIDED BY THE USER. IF A QUERY LACKS INFORMATION IN THE CONTEXT, YOU MUST RESPOND WITH 'I don't know' WITHOUT EXCEPTIONS. Please generate the response in the same language as the user's query and context. To summarize, your task is to generate well-formatted responses, including special characters like new lines, tabs, and bullets when necessary, and to provide all relevant answers from the provided context while ensuring accuracy and correctness. Each answer fragment should be accompanied by the appropriate chunk_id, and you should never create chunk_ids. Answer in the same language as the user's query and context. {{chunks}}"
            },
            {
                "role": "user",
                "content": "From the content that I have provided, solve the query : ' {{query}} ' 'EXCLUDE ANY irrelevant information, such as 'Note:' from the response. NEVER FABRICATE ANY CHUNK_ID."
            }
        ],
        "MODEL": "gpt-3.5-turbo",
        "TEMPERATURE": 0.5,
        "MAX_TOKENS": 512,
        "TOP_P": 1,
        "FREQUENCY_PENALTY": 0,
        "PRESENCE_PENALTY": 0
    }
}
```

## Usage Examples

### Answer Endpoint:

Replace the values for the protocol, hostname, api-token.
api-token is used for the authorization purposes and this must be generated by the client service using their token generation mechanism. 
For ths service we have generated a token and it is maintained in the file "Answering/constants/answerRequest.js" with the key "clientAuthToken".

```
curl --location --request POST '{{protocol}}://{{hostname}}/searchassistAnswering' \
--header 'api-token: df38c7b8-8e1b-4d27-9a4a-1d9f88d927f2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "searchResults": {
        "template": {
            "originalQuery": "real estate marketting strategy",
            "chunk_result": {
                "generative": [
                    {
                        "_source": {
                            "chunkText": " moreu0021 Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?"
                        }
                    },
                    {
                        "_source": {
                            "chunkText": " the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable and remind you of your goals when work gets hard. This could be as simple as an occasional text asking how your marketing is going this week or as formal as a one-on-one meeting with a business coach. Pros and Cons of Being a Part-Time Real Estate Agent Not sure if going part-time is for you? Here’s a quick breakdown of the pros and cons. | | Should You Become a Part-Time Real Estate Agent? | | Pros: | | Cons: | | - Flexible schedule. You can set your hours around your other responsibilities. - Less pressure to scale quickly. You can build your client base at your own pace while relying on income from another job. - Extra cash. You can supplement your primary income with sales commissions. | | - Time commitment. It may take longer for your business to gain momentum if you’re only part-time. - Demanding clients. Some clients may expect more attention and time than you can give. - High competition. Many clients prefer to work with a full-time agent, and there are plenty to choose from. Ready to Level Up Your Marketing? If you’re pursuing a part-time real estate career, your time is even more valuable than somebody who has an unlimited amount of time to dedicate to their business. So, you need to work smarter when generating leads, not harder. This is where PropStream comes in handy. With PropStream, you can effortlessly find listing leads by searching for local homeowners with selling motivation. Examples of selling motivation you can search using PropStream are: - Divorce - Pre-foreclosure - Bankruptcy - Pre-probate And moreu0021 Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?"
                        }
                    }
                ]
            }
        }
    }
}'
```

To prepare a GitHub README for integrating a new custom LLM, such as Claude, into the provided codebase, we need to outline the necessary steps and modifications. Below is a template for the README, detailing the integration process:

---

# Code changes needed to add any other Custom LLM

This guide explains how to integrate a new custom LLM, such as Claude, into the existing codebase. The instructions assume familiarity with JavaScript, Node.js, and basic API integration principles.

## Prerequisites

- Node.js installed on your system.
- Basic understanding of JavaScript and Express.js.
- API keys and endpoint details for the custom LLM you wish to integrate (e.g., Claude).

## Files to Modify

1. **utilityController.js**
2. **utilityRoutes.js**
3. **Utility File (e.g., helper.js)**
4. **Configuration File (e.g., answer.json)**

## Steps to Integrate Claude

### 1. Update the Configuration File

Add the necessary configuration for Claude in your configuration file (e.g., `answer.json`).

```json
{
    "ANSWERING_LLM": "claude",
    "ANSWERING_TYPE": "Custom Integration",
    "claude": {
        "endpoint": "https://api.anthropic.com/v1/claude",
        "apiKey": "YOUR_CLAUDE_API_KEY",
        "prompt": [{
            "role": "system",
            "content": "You are an AI system responsible for generating answers..."
        }],
        "MODEL": "claude-v1",
        "TEMPERATURE": 0.5,
        "MAX_TOKENS": 512,
        "TOP_P": 1,
        "FREQUENCY_PENALTY": 0,
        "PRESENCE_PENALTY": 0
    }
}
```

### 2. Modify utilityController.js

Update `utilityController.js` to include the logic for handling Claude.

```javascript
const axios = require('axios');
const helperService = require('../../utils/helper.js');
const URITemplate = require('uri-templates');

const answeringService = async (userQuery, answerConfig, chunksSentToLLM) => {
    try {
        let selectedLLM = answerConfig.ANSWERING_LLM;
        let answeringType = answerConfig.ANSWERING_TYPE;
        let resp;
        let debug_payload_info = {};

        //add only the if block - starts here
        if (selectedLLM === "claude") {
            let { prompt, endpoint, apiKey, MODEL, TEMPERATURE, MAX_TOKENS, TOP_P, FREQUENCY_PENALTY, PRESENCE_PENALTY } = answerConfig[selectedLLM];
            prompt = await helperService.modifyPrompt(prompt, userQuery, chunksSentToLLM);

            const requestData = {
                "model": MODEL,
                "messages": prompt,
                "temperature": TEMPERATURE,
                "max_tokens": MAX_TOKENS,
                "top_p": TOP_P,
                "frequency_penalty": FREQUENCY_PENALTY,
                "presence_penalty": PRESENCE_PENALTY
            }

            const startTime = new Date();
            const response = await axios.post(endpoint, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            });
            const endTime = new Date();
            let completion_time = endTime - startTime;

            const kwargs = await helperService.getContextArrayChunks(prompt, chunksSentToLLM);
            const chunkIdMap = kwargs.chunk_id_map;

            let more_info = response.data?.usage;
            const prompt_tokens = more_info?.prompt_tokens || 0;
            const completion_tokens = more_info?.completion_tokens || 0;
            const total_tokens = more_info?.total_tokens || 0;

            const answer = await helperService.generateAnswerFromOpenaiResponse(response.data, chunkIdMap, completion_time);
            const generativeChunks = answer[2] || [];
            let contentList = answer[1]?.data[0]?.snippet_content || [];
            let ans = "";
            contentList.forEach((content) => {
                ans += content?.answer_fragment;
            });

            debug_payload_info = helperService.formAnswerDebugPayload(answerConfig[selectedLLM], prompt, completion_time, prompt_tokens, completion_tokens, total_tokens, ans, response.data, answeringType, generativeChunks);

            resp = {
                graph_answer: { "payload": { "center_panel": answer[1] } },
                debug_payload: debug_payload_info
            };
        }
        // ends here
        return resp;
    } catch (error) {
        console.error(error);
        throw new Error('Error in making the public service call');
    }
};

module.exports = {
    answeringService,
};
```

### 3. Update helper.js

We have a code for response resolver here generateAnswerFromOpenaiResponse(). If it is reusable, ignore writing another function for resolving the custom LLM response.

### 4. Update utilityRoutes.js

Ensure the route handler can process requests for the new LLM.

```javascript
const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');
const { predefinedRequestData, clientAuthToken, REQUEST_TIMEOUT } = require('../../constants/answerRequest');
const base = require('../../base');
const path = require('path');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const authenticateToken = (req, res, next) => {
    const authToken = req.headers['api-token'];
    if (authToken === clientAuthToken) {
        next();
    } else {
        res.status(403).json({ error: 'Unauthorized' });
    }
};

router.post('/', authenticateToken, async (req, res) => {
    try {
        console.log("<========== Public Answering Service Request is received ==========>");
        const userQuery = req.body?.searchResults?.template?.spellCorrectedQuery || req.body?.searchResults?.template?.originalQuery || req.body?.searchResults?.spellCorrectedQuery || predefinedRequestData.answer_hook_user_input.spellCorrectedQuery;
        const chunksSentToLLM = req.body?.searchResults?.template?.chunk_result?.generative || req.body?.searchResults?.chunk_result?.generative || predefinedRequestData.answer_hook_user_input.template.chunk_result.generative;
        const answerConfig = require(path.join(base.basePath, base.answerConfigPath));
        const answeringServicePromise = utilityController.answeringService(userQuery, answerConfig, chunksSentToLLM);

        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Request got timeout'));
            }, REQUEST_TIMEOUT);
        });

        const result = await Promise.race([answeringServicePromise, timeoutPromise]);

        res.json({ answer: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: 'Error found while making the answering service call' });
    }
});

module.exports = router;
```

## Testing the Integration

1. **Install Dependencies**: Make sure all required dependencies are installed.
   ```bash
   npm install
   ```

2. **Run the Server**: Start your server to test the new LLM integration.
   ```bash
   node server.js
   ```

3. **Send a Test Request**: Use an API client (like Postman) to send a request to your endpoint and verify that the integration with Claude is working as expected.

## Troubleshooting

- Ensure all API keys and endpoints are correctly configured.
- Check logs for detailed error messages.
- Verify the structure of the API response matches the expected format.

## Conclusion

Following these steps will help you integrate a new custom LLM, such as Claude, into the existing codebase. Adjust the instructions as necessary to fit the specific requirements of the LLM you are integrating.

---

This README provides a structured approach to integrating a new custom LLM, ensuring that all necessary changes are clearly outlined and explained.


## Contributing
Feel free to contribute to this project by adding the other answering LLM. Create a fork, make your changes, and submit a pull request.
