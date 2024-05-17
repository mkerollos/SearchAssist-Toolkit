# Node.js Public Utility API

This Node.js public utility provides the capability to interact with any custom LLM for answering of your choice. Here we are integrating OpenAI for answering.

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

git clone git@github.com:Koredotcom/SearchAssist-Toolkit.git

cd Answering

### 2. Install Dependencies

npm install

### 3. Run the Server
node server.js

The server will be running on http://localhost:8888.

## API Endpoints

### Answer Endpoint
**API Path**: /searchassistapi/answer
**Method**: POST

## Sample Request Payload:

```
{
    "template": {
        "originalQuery": "real estate marketting strategy",
        "spellCorrectedQuery": "real estate marketting strategy",
        "chunk_result": {
            "generative": [
                {
                    "_index": "fip-a16ec1b7-17a3-5ab0-8d21-daae6cce1edc_de055da7-bb9b-4993-bbf0-ad5d821f68fd_vector",
                    "_type": "_doc",
                    "_id": "bx4ty40BqWr-UgwVWwxi",
                    "_score": 1.6271237,
                    "_source": {
                        "sourceId": "fs-992880ef-1f84-5d02-8ac1-8004e64affab",
                        "recordTitle": "Can You Be a Real Estate Agent Part-Time? (+ Tips!)",
                        "docId": "fc-832b712a-df4e-4cab-a989-564991054ac5",
                        "recordUrl": "https://www.propstream.com/real-estate-agent-blog/can-you-be-a-real-estate-agent-part-time-tips",
                        "searchIndexId": "sidx-413d28ae-e1ec-5e31-a066-c5a2fdf0927d",
                        "chunkType": "Text",
                        "chunkContent": "recordTitle : Can You Be a Real Estate Agent Part-Time? (+ Tips!); chunkText :  more! Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?; ",
                        "createdOn": "2024-02-21T10:19:12.520482658Z",
                        "chunkId": "chk-e4801706-0254-4890-9937-2434fbc25bd8",
                        "chunkText": " more! Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?",
                        "sourceUrl": "https://www.propstream.com/",
                        "chunkMeta": {},
                        "sourceType": "web",
                        "chunkTitle": "",
                        "extractionMethod": "text",
                        "sourceName": "propstream"
                    }
                },
                {
                    "_index": "fip-a16ec1b7-17a3-5ab0-8d21-daae6cce1edc_de055da7-bb9b-4993-bbf0-ad5d821f68fd_vector",
                    "_type": "_doc",
                    "_id": "bh4ty40BqWr-UgwVWwxi",
                    "_score": 1.5936368,
                    "_ignored": [
                        "chunkContent.keyword",
                        "chunkText.keyword"
                    ],
                    "_source": {
                        "sourceId": "fs-992880ef-1f84-5d02-8ac1-8004e64affab",
                        "recordTitle": "Can You Be a Real Estate Agent Part-Time? (+ Tips!)",
                        "docId": "fc-832b712a-df4e-4cab-a989-564991054ac5",
                        "recordUrl": "https://www.propstream.com/real-estate-agent-blog/can-you-be-a-real-estate-agent-part-time-tips",
                        "searchIndexId": "sidx-413d28ae-e1ec-5e31-a066-c5a2fdf0927d",
                        "chunkType": "Text",
                        "chunkContent": "recordTitle : Can You Be a Real Estate Agent Part-Time? (+ Tips!); chunkText :  the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable and remind you of your goals when work gets hard. This could be as simple as an occasional text asking how your marketing is going this week or as formal as a one-on-one meeting with a business coach. Pros and Cons of Being a Part-Time Real Estate Agent Not sure if going part-time is for you? Here’s a quick breakdown of the pros and cons. | | Should You Become a Part-Time Real Estate Agent? | | Pros: | | Cons: | | - Flexible schedule. You can set your hours around your other responsibilities. - Less pressure to scale quickly. You can build your client base at your own pace while relying on income from another job. - Extra cash. You can supplement your primary income with sales commissions. | | - Time commitment. It may take longer for your business to gain momentum if you’re only part-time. - Demanding clients. Some clients may expect more attention and time than you can give. - High competition. Many clients prefer to work with a full-time agent, and there are plenty to choose from. Ready to Level Up Your Marketing? If you’re pursuing a part-time real estate career, your time is even more valuable than somebody who has an unlimited amount of time to dedicate to their business. So, you need to work smarter when generating leads, not harder. This is where PropStream comes in handy. With PropStream, you can effortlessly find listing leads by searching for local homeowners with selling motivation. Examples of selling motivation you can search using PropStream are: - Divorce - Pre-foreclosure - Bankruptcy - Pre-probate And more! Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?; ",
                        "createdOn": "2024-02-21T10:19:12.520472293Z",
                        "chunkId": "chk-bfcb1dbf-456c-4e81-bf5f-b45d2ee1bee4",
                        "chunkText": " the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable and remind you of your goals when work gets hard. This could be as simple as an occasional text asking how your marketing is going this week or as formal as a one-on-one meeting with a business coach. Pros and Cons of Being a Part-Time Real Estate Agent Not sure if going part-time is for you? Here’s a quick breakdown of the pros and cons. | | Should You Become a Part-Time Real Estate Agent? | | Pros: | | Cons: | | - Flexible schedule. You can set your hours around your other responsibilities. - Less pressure to scale quickly. You can build your client base at your own pace while relying on income from another job. - Extra cash. You can supplement your primary income with sales commissions. | | - Time commitment. It may take longer for your business to gain momentum if you’re only part-time. - Demanding clients. Some clients may expect more attention and time than you can give. - High competition. Many clients prefer to work with a full-time agent, and there are plenty to choose from. Ready to Level Up Your Marketing? If you’re pursuing a part-time real estate career, your time is even more valuable than somebody who has an unlimited amount of time to dedicate to their business. So, you need to work smarter when generating leads, not harder. This is where PropStream comes in handy. With PropStream, you can effortlessly find listing leads by searching for local homeowners with selling motivation. Examples of selling motivation you can search using PropStream are: - Divorce - Pre-foreclosure - Bankruptcy - Pre-probate And more! Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?",
                        "sourceUrl": "https://www.propstream.com/",
                        "chunkMeta": {},
                        "sourceType": "web",
                        "chunkTitle": "",
                        "extractionMethod": "text",
                        "sourceName": "propstream"
                    }
                },
                {
                    "_index": "fip-a16ec1b7-17a3-5ab0-8d21-daae6cce1edc_de055da7-bb9b-4993-bbf0-ad5d821f68fd_vector",
                    "_type": "_doc",
                    "_id": "VR4ty40BqWr-UgwVWwxi",
                    "_score": 1.5732728,
                    "_ignored": [
                        "chunkContent.keyword",
                        "chunkText.keyword"
                    ],
                    "_source": {
                        "sourceId": "fs-992880ef-1f84-5d02-8ac1-8004e64affab",
                        "recordTitle": "Skip Tracing for Real Estate - PropStream",
                        "docId": "fc-39565ba5-c073-4b11-a468-03a1d44acef7",
                        "recordUrl": "https://www.propstream.com/skip-tracing",
                        "searchIndexId": "sidx-413d28ae-e1ec-5e31-a066-c5a2fdf0927d",
                        "chunkType": "Text",
                        "chunkContent": "recordTitle : Skip Tracing for Real Estate - PropStream; chunkText :  that return information. 7 Quick & Efficient Results Results within minutes. 8 No Minimums No minimum purchases required. Ever. 9 Quality Meets Affordability Some of the lowest rates in the biz! 12¢ per skip trace & 10¢ if you add on List Automator. 10 Find Contact Information on the Go Skip trace on the go via our mobile app.; ",
                        "createdOn": "2024-02-21T10:19:12.496220597Z",
                        "chunkId": "chk-4cbea4db-bad5-4115-963d-a9bc9db93350",
                        "chunkText": " that return information. 7 Quick & Efficient Results Results within minutes. 8 No Minimums No minimum purchases required. Ever. 9 Quality Meets Affordability Some of the lowest rates in the biz! 12¢ per skip trace & 10¢ if you add on List Automator. 10 Find Contact Information on the Go Skip trace on the go via our mobile app.",
                        "sourceUrl": "https://www.propstream.com/",
                        "chunkMeta": {},
                        "sourceType": "web",
                        "chunkTitle": "",
                        "extractionMethod": "text",
                        "sourceName": "propstream"
                    }
                },
                {
                    "_index": "fip-a16ec1b7-17a3-5ab0-8d21-daae6cce1edc_de055da7-bb9b-4993-bbf0-ad5d821f68fd_vector",
                    "_type": "_doc",
                    "_id": "bB4ty40BqWr-UgwVWwxi",
                    "_score": 1.5574901,
                    "_ignored": [
                        "chunkContent.keyword",
                        "chunkText.keyword"
                    ],
                    "_source": {
                        "sourceId": "fs-992880ef-1f84-5d02-8ac1-8004e64affab",
                        "recordTitle": "Can You Be a Real Estate Agent Part-Time? (+ Tips!)",
                        "docId": "fc-832b712a-df4e-4cab-a989-564991054ac5",
                        "recordUrl": "https://www.propstream.com/real-estate-agent-blog/can-you-be-a-real-estate-agent-part-time-tips",
                        "searchIndexId": "sidx-413d28ae-e1ec-5e31-a066-c5a2fdf0927d",
                        "chunkType": "Text",
                        "chunkContent": "recordTitle : Can You Be a Real Estate Agent Part-Time? (+ Tips!); chunkText :  Will you specialize in serving first-time homebuyers, investors, or luxury homebuyers? Highlight your area of expertise when reaching out to leads and on your marketing materials, social media, and website. Related: Finding Your Niche: 10 Profitable Markets for Real Estate Agents Create your branded materials Hire a photographer (or ask a talented friend) to take high-quality headshots and branded photos. You can use a free design tool or hire a designer to create printed marketing materials, for-sale signs, social media images, and your website. Start networking and marketing Look for in-person and virtual networking opportunities like business meet-and-greets, small business openings, community events, webinars, workshops, and conferences. Keep several business cards on you in case you meet someone who’s looking to buy or sell a home. Referrals are one of the most vital marketing tactics—so make sure to provide clients with excellent customer service each time you interact with them and make follow-up a priority. How to Increase Your Real Estate Knowledge Your learning shouldn’t stop once you’ve established your business. Your clients expect you to always know what’s happening in your niche and the local market. Set aside regular time to read up on industry trends. You can also set Google alerts for real estate terms, subscribe to industry newsletters, and follow other agents on social media. Another way to strengthen your niche expertise is to take a credible online course or get a certification. Real estate conferences, workshops, and webinars can also help you stay relevant and sharpen your skills. 6 Tips for Managing Time and Clients as a Part-Time Agent Balancing your schedule and avoiding burnout is critical to make it as an agent. The following strategies can help you manage time and communicate effectively with clients. 1. Set clear expectations with clients When working part-time hours, you must be transparent regarding when you’re available and; ",
                        "createdOn": "2024-02-21T10:19:12.520449931Z",
                        "chunkId": "chk-022fe6e3-7e26-49d1-8c21-a60020c62d58",
                        "chunkText": " Will you specialize in serving first-time homebuyers, investors, or luxury homebuyers? Highlight your area of expertise when reaching out to leads and on your marketing materials, social media, and website. Related: Finding Your Niche: 10 Profitable Markets for Real Estate Agents Create your branded materials Hire a photographer (or ask a talented friend) to take high-quality headshots and branded photos. You can use a free design tool or hire a designer to create printed marketing materials, for-sale signs, social media images, and your website. Start networking and marketing Look for in-person and virtual networking opportunities like business meet-and-greets, small business openings, community events, webinars, workshops, and conferences. Keep several business cards on you in case you meet someone who’s looking to buy or sell a home. Referrals are one of the most vital marketing tactics—so make sure to provide clients with excellent customer service each time you interact with them and make follow-up a priority. How to Increase Your Real Estate Knowledge Your learning shouldn’t stop once you’ve established your business. Your clients expect you to always know what’s happening in your niche and the local market. Set aside regular time to read up on industry trends. You can also set Google alerts for real estate terms, subscribe to industry newsletters, and follow other agents on social media. Another way to strengthen your niche expertise is to take a credible online course or get a certification. Real estate conferences, workshops, and webinars can also help you stay relevant and sharpen your skills. 6 Tips for Managing Time and Clients as a Part-Time Agent Balancing your schedule and avoiding burnout is critical to make it as an agent. The following strategies can help you manage time and communicate effectively with clients. 1. Set clear expectations with clients When working part-time hours, you must be transparent regarding when you’re available and",
                        "sourceUrl": "https://www.propstream.com/",
                        "chunkMeta": {},
                        "sourceType": "web",
                        "chunkTitle": "",
                        "extractionMethod": "text",
                        "sourceName": "propstream"
                    }
                },
                {
                    "_index": "fip-a16ec1b7-17a3-5ab0-8d21-daae6cce1edc_de055da7-bb9b-4993-bbf0-ad5d821f68fd_vector",
                    "_type": "_doc",
                    "_id": "bR4ty40BqWr-UgwVWwxi",
                    "_score": 1.5222538,
                    "_ignored": [
                        "chunkContent.keyword",
                        "chunkText.keyword"
                    ],
                    "_source": {
                        "sourceId": "fs-992880ef-1f84-5d02-8ac1-8004e64affab",
                        "recordTitle": "Can You Be a Real Estate Agent Part-Time? (+ Tips!)",
                        "docId": "fc-832b712a-df4e-4cab-a989-564991054ac5",
                        "recordUrl": "https://www.propstream.com/real-estate-agent-blog/can-you-be-a-real-estate-agent-part-time-tips",
                        "searchIndexId": "sidx-413d28ae-e1ec-5e31-a066-c5a2fdf0927d",
                        "chunkType": "Text",
                        "chunkContent": "recordTitle : Can You Be a Real Estate Agent Part-Time? (+ Tips!); chunkText :  effectively with clients. 1. Set clear expectations with clients When working part-time hours, you must be transparent regarding when you’re available and how much time you can commit—not responding when a client needs you can quickly erode their trust. 2. Batch your digital marketing work Marketing is one of the most important—and time-consuming—aspects of growing your real estate business. Get caught up on marketing materials by completing a week’s or month’s worth of one task at a time, a strategy known as “batching.” For example, you might set aside two hours on one day to write all your social media posts for the month. The next day, you might focus on compiling a list of leads and, the following day, sending them cold emails. 3. Use a calendar and digital reminders Are you worried you’ll forget to respond to a client’s question or, worse, not show up to a meeting? Avoid these mishaps by scheduling tasks, meetings, and admin work on your calendar or setting up reminders on your phone. 4. Leverage automated tools and platforms Many routine tasks can be automated with modern technology. Look online for platforms that can help you with tasks such as: - Lead generation - Marketing emails - Cold calling - SMS or email lead follow-up - Contract creation - Social media posting - Appointment scheduling |Psst! With PropStream, you can automate your lead generation with our List Automator add-on. Additionally, create an email or postcard campaign within the platform or perform a skip trace. | 5. Prioritize your tasks No matter how hard you try, there may be weeks when you can’t complete everything on a part-time schedule. Prioritize your to-do list daily to ensure the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable; ",
                        "createdOn": "2024-02-21T10:19:12.520461327Z",
                        "chunkId": "chk-06104d84-ab62-4e1c-ac89-dc1c551cbb19",
                        "chunkText": " effectively with clients. 1. Set clear expectations with clients When working part-time hours, you must be transparent regarding when you’re available and how much time you can commit—not responding when a client needs you can quickly erode their trust. 2. Batch your digital marketing work Marketing is one of the most important—and time-consuming—aspects of growing your real estate business. Get caught up on marketing materials by completing a week’s or month’s worth of one task at a time, a strategy known as “batching.” For example, you might set aside two hours on one day to write all your social media posts for the month. The next day, you might focus on compiling a list of leads and, the following day, sending them cold emails. 3. Use a calendar and digital reminders Are you worried you’ll forget to respond to a client’s question or, worse, not show up to a meeting? Avoid these mishaps by scheduling tasks, meetings, and admin work on your calendar or setting up reminders on your phone. 4. Leverage automated tools and platforms Many routine tasks can be automated with modern technology. Look online for platforms that can help you with tasks such as: - Lead generation - Marketing emails - Cold calling - SMS or email lead follow-up - Contract creation - Social media posting - Appointment scheduling |Psst! With PropStream, you can automate your lead generation with our List Automator add-on. Additionally, create an email or postcard campaign within the platform or perform a skip trace. | 5. Prioritize your tasks No matter how hard you try, there may be weeks when you can’t complete everything on a part-time schedule. Prioritize your to-do list daily to ensure the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable",
                        "sourceUrl": "https://www.propstream.com/",
                        "chunkMeta": {},
                        "sourceType": "web",
                        "chunkTitle": "",
                        "extractionMethod": "text",
                        "sourceName": "propstream"
                    }
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

```
curl --location --request POST '{{protocol}}://{{hostname}}/searchassistAnswering' \
--header 'api-token: df38c7b8-8e1b-4d27-9a4a-1d9f88d927f2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "searchResults": {
        "template": {
            "originalQuery": "real estate marketting strategy",
            "spellCorrectedQuery": "real estate marketting strategy",
            "chunk_result": {
                "generative": [
                    {
                        "_index": "fip-a16ec1b7-17a3-5ab0-8d21-daae6cce1edc_de055da7-bb9b-4993-bbf0-ad5d821f68fd_vector",
                        "_type": "_doc",
                        "_id": "bx4ty40BqWr-UgwVWwxi",
                        "_score": 1.6271237,
                        "_source": {
                            "sourceId": "fs-992880ef-1f84-5d02-8ac1-8004e64affab",
                            "recordTitle": "Can You Be a Real Estate Agent Part-Time? (+ Tipsu0021)",
                            "docId": "fc-832b712a-df4e-4cab-a989-564991054ac5",
                            "recordUrl": "https://www.propstream.com/real-estate-agent-blog/can-you-be-a-real-estate-agent-part-time-tips",
                            "searchIndexId": "sidx-413d28ae-e1ec-5e31-a066-c5a2fdf0927d",
                            "chunkType": "Text",
                            "chunkContent": "recordTitle : Can You Be a Real Estate Agent Part-Time? (+ Tipsu0021); chunkText :  moreu0021 Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?; ",
                            "createdOn": "2024-02-21T10:19:12.520482658Z",
                            "chunkId": "chk-e4801706-0254-4890-9937-2434fbc25bd8",
                            "chunkText": " moreu0021 Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?",
                            "sourceUrl": "https://www.propstream.com/",
                            "chunkMeta": {},
                            "sourceType": "web",
                            "chunkTitle": "",
                            "extractionMethod": "text",
                            "sourceName": "propstream"
                        }
                    },
                    {
                        "_index": "fip-a16ec1b7-17a3-5ab0-8d21-daae6cce1edc_de055da7-bb9b-4993-bbf0-ad5d821f68fd_vector",
                        "_type": "_doc",
                        "_id": "bh4ty40BqWr-UgwVWwxi",
                        "_score": 1.5936368,
                        "_ignored": [
                            "chunkContent.keyword",
                            "chunkText.keyword"
                        ],
                        "_source": {
                            "sourceId": "fs-992880ef-1f84-5d02-8ac1-8004e64affab",
                            "recordTitle": "Can You Be a Real Estate Agent Part-Time? (+ Tipsu0021)",
                            "docId": "fc-832b712a-df4e-4cab-a989-564991054ac5",
                            "recordUrl": "https://www.propstream.com/real-estate-agent-blog/can-you-be-a-real-estate-agent-part-time-tips",
                            "searchIndexId": "sidx-413d28ae-e1ec-5e31-a066-c5a2fdf0927d",
                            "chunkType": "Text",
                            "chunkContent": "recordTitle : Can You Be a Real Estate Agent Part-Time? (+ Tipsu0021); chunkText :  the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable and remind you of your goals when work gets hard. This could be as simple as an occasional text asking how your marketing is going this week or as formal as a one-on-one meeting with a business coach. Pros and Cons of Being a Part-Time Real Estate Agent Not sure if going part-time is for you? Here’s a quick breakdown of the pros and cons. | | Should You Become a Part-Time Real Estate Agent? | | Pros: | | Cons: | | - Flexible schedule. You can set your hours around your other responsibilities. - Less pressure to scale quickly. You can build your client base at your own pace while relying on income from another job. - Extra cash. You can supplement your primary income with sales commissions. | | - Time commitment. It may take longer for your business to gain momentum if you’re only part-time. - Demanding clients. Some clients may expect more attention and time than you can give. - High competition. Many clients prefer to work with a full-time agent, and there are plenty to choose from. Ready to Level Up Your Marketing? If you’re pursuing a part-time real estate career, your time is even more valuable than somebody who has an unlimited amount of time to dedicate to their business. So, you need to work smarter when generating leads, not harder. This is where PropStream comes in handy. With PropStream, you can effortlessly find listing leads by searching for local homeowners with selling motivation. Examples of selling motivation you can search using PropStream are: - Divorce - Pre-foreclosure - Bankruptcy - Pre-probate And moreu0021 Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?; ",
                            "createdOn": "2024-02-21T10:19:12.520472293Z",
                            "chunkId": "chk-bfcb1dbf-456c-4e81-bf5f-b45d2ee1bee4",
                            "chunkText": " the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable and remind you of your goals when work gets hard. This could be as simple as an occasional text asking how your marketing is going this week or as formal as a one-on-one meeting with a business coach. Pros and Cons of Being a Part-Time Real Estate Agent Not sure if going part-time is for you? Here’s a quick breakdown of the pros and cons. | | Should You Become a Part-Time Real Estate Agent? | | Pros: | | Cons: | | - Flexible schedule. You can set your hours around your other responsibilities. - Less pressure to scale quickly. You can build your client base at your own pace while relying on income from another job. - Extra cash. You can supplement your primary income with sales commissions. | | - Time commitment. It may take longer for your business to gain momentum if you’re only part-time. - Demanding clients. Some clients may expect more attention and time than you can give. - High competition. Many clients prefer to work with a full-time agent, and there are plenty to choose from. Ready to Level Up Your Marketing? If you’re pursuing a part-time real estate career, your time is even more valuable than somebody who has an unlimited amount of time to dedicate to their business. So, you need to work smarter when generating leads, not harder. This is where PropStream comes in handy. With PropStream, you can effortlessly find listing leads by searching for local homeowners with selling motivation. Examples of selling motivation you can search using PropStream are: - Divorce - Pre-foreclosure - Bankruptcy - Pre-probate And moreu0021 Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?",
                            "sourceUrl": "https://www.propstream.com/",
                            "chunkMeta": {},
                            "sourceType": "web",
                            "chunkTitle": "",
                            "extractionMethod": "text",
                            "sourceName": "propstream"
                        }
                    }
                ]
            }
        }
    }
}'
```

## Contributing
Feel free to contribute to this project. Create a fork, make your changes, and submit a pull request.
