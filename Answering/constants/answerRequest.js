module.exports = {
    predefinedRequestData: {
        openai_opts: {
            "model": "gpt-3.5-turbo",
            "messages": [{
                    "role": "system",
                    "content": "You are an AI system responsible for generating answers and references based on user-provided context. The user will provide context, and your task is to answer the user's query at the end. Your response should adhere to the following format: **'Some relevant answer[chunk_id] Another relevant data[chunk_id]'**. In this format, you must strictly include the relevant answer or information followed by the chunk_id, which serves as a reference to the source of the data within the provided context. Importantly, place only the correct chunk_ids within square brackets. These chunk_ids must be located exclusively at the end of each content and indicated explicitly with a key 'chunk id.' Do not include any other text, words, or characters within square brackets. Your responses should also be properly formatted with all necessary special characters like new lines, tabs, and bullets, as required for clarity and presentation. If there are multiple answers present in the provided context, you should include all of them in your response. You should only provide an answer if you can extract the information directly from the content provided by the user. If you have partial information, you should still provide the partial answer.Always send relevant and correct chunk_ids with the answer fragments. You must not fabricate or create chunk_ids; they should accurately reference the source of each piece of information.If you cannot find the answer to the user's query within the provided content, your response should be 'I don't know.'.GENERATE ANSWERS AND REFERENCES EXCLUSIVELY BASED ON THE CONTENT PROVIDED BY THE USER. IF A QUERY LACKS INFORMATION IN THE CONTEXT, YOU MUST RESPOND WITH 'I don't know' WITHOUT EXCEPTIONS. Please generate the response in the same language as the user's query and context. To summarize, your task is to generate well-formatted responses, including special characters like new lines, tabs, and bullets when necessary, and to provide all relevant answers from the provided context while ensuring accuracy and correctness. Each answer fragment should be accompanied by the appropriate chunk_id, and you should never create chunk_ids. Answer in the same language as the user's query and context. Content:  more! Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?, source_name: Can You Be a Real Estate Agent Part-Time? (+ Tips!) chunk_id: chk-1. \nContent:  the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable and remind you of your goals when work gets hard. This could be as simple as an occasional text asking how your marketing is going this week or as formal as a one-on-one meeting with a business coach. Pros and Cons of Being a Part-Time Real Estate Agent Not sure if going part-time is for you? Here’s a quick breakdown of the pros and cons. | | Should You Become a Part-Time Real Estate Agent? | | Pros: | | Cons: | | - Flexible schedule. You can set your hours around your other responsibilities. - Less pressure to scale quickly. You can build your client base at your own pace while relying on income from another job. - Extra cash. You can supplement your primary income with sales commissions. | | - Time commitment. It may take longer for your business to gain momentum if you’re only part-time. - Demanding clients. Some clients may expect more attention and time than you can give. - High competition. Many clients prefer to work with a full-time agent, and there are plenty to choose from. Ready to Level Up Your Marketing? If you’re pursuing a part-time real estate career, your time is even more valuable than somebody who has an unlimited amount of time to dedicate to their business. So, you need to work smarter when generating leads, not harder. This is where PropStream comes in handy. With PropStream, you can effortlessly find listing leads by searching for local homeowners with selling motivation. Examples of selling motivation you can search using PropStream are: - Divorce - Pre-foreclosure - Bankruptcy - Pre-probate And more! Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?, source_name: Can You Be a Real Estate Agent Part-Time? (+ Tips!) chunk_id: chk-2. \nContent:  that return information. 7 Quick & Efficient Results Results within minutes. 8 No Minimums No minimum purchases required. Ever. 9 Quality Meets Affordability Some of the lowest rates in the biz! 12¢ per skip trace & 10¢ if you add on List Automator. 10 Find Contact Information on the Go Skip trace on the go via our mobile app., source_name: Skip Tracing for Real Estate - PropStream chunk_id: chk-3. \nContent:  Will you specialize in serving first-time homebuyers, investors, or luxury homebuyers? Highlight your area of expertise when reaching out to leads and on your marketing materials, social media, and website. Related: Finding Your Niche: 10 Profitable Markets for Real Estate Agents Create your branded materials Hire a photographer (or ask a talented friend) to take high-quality headshots and branded photos. You can use a free design tool or hire a designer to create printed marketing materials, for-sale signs, social media images, and your website. Start networking and marketing Look for in-person and virtual networking opportunities like business meet-and-greets, small business openings, community events, webinars, workshops, and conferences. Keep several business cards on you in case you meet someone who’s looking to buy or sell a home. Referrals are one of the most vital marketing tactics—so make sure to provide clients with excellent customer service each time you interact with them and make follow-up a priority. How to Increase Your Real Estate Knowledge Your learning shouldn’t stop once you’ve established your business. Your clients expect you to always know what’s happening in your niche and the local market. Set aside regular time to read up on industry trends. You can also set Google alerts for real estate terms, subscribe to industry newsletters, and follow other agents on social media. Another way to strengthen your niche expertise is to take a credible online course or get a certification. Real estate conferences, workshops, and webinars can also help you stay relevant and sharpen your skills. 6 Tips for Managing Time and Clients as a Part-Time Agent Balancing your schedule and avoiding burnout is critical to make it as an agent. The following strategies can help you manage time and communicate effectively with clients. 1. Set clear expectations with clients When working part-time hours, you must be transparent regarding when you’re available and, source_name: Can You Be a Real Estate Agent Part-Time? (+ Tips!) chunk_id: chk-4. \nContent:  effectively with clients. 1. Set clear expectations with clients When working part-time hours, you must be transparent regarding when you’re available and how much time you can commit—not responding when a client needs you can quickly erode their trust. 2. Batch your digital marketing work Marketing is one of the most important—and time-consuming—aspects of growing your real estate business. Get caught up on marketing materials by completing a week’s or month’s worth of one task at a time, a strategy known as “batching.” For example, you might set aside two hours on one day to write all your social media posts for the month. The next day, you might focus on compiling a list of leads and, the following day, sending them cold emails. 3. Use a calendar and digital reminders Are you worried you’ll forget to respond to a client’s question or, worse, not show up to a meeting? Avoid these mishaps by scheduling tasks, meetings, and admin work on your calendar or setting up reminders on your phone. 4. Leverage automated tools and platforms Many routine tasks can be automated with modern technology. Look online for platforms that can help you with tasks such as: - Lead generation - Marketing emails - Cold calling - SMS or email lead follow-up - Contract creation - Social media posting - Appointment scheduling |Psst! With PropStream, you can automate your lead generation with our List Automator add-on. Additionally, create an email or postcard campaign within the platform or perform a skip trace. | 5. Prioritize your tasks No matter how hard you try, there may be weeks when you can’t complete everything on a part-time schedule. Prioritize your to-do list daily to ensure the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable, source_name: Can You Be a Real Estate Agent Part-Time? (+ Tips!) chunk_id: chk-5. "
                },
                {
                    "role": "user",
                    "content": "From the content that I have provided, solve the query : ' real estate ' 'EXCLUDE ANY irrelevant information, such as 'Note:' from the response. NEVER FABRICATE ANY CHUNK_ID."
                }
            ],
            "temperature": 0.5,
            "max_tokens": 512,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
        },
        chunksSentToLLM: {
            'chk-1': {
                'sourceId': 'fs-992880ef-1f84-5d02-8ac1-8004e64affab',
                'recordTitle': 'Can You Be a Real Estate Agent Part-Time? (+ Tips!)',
                'docId': 'fc-832b712a-df4e-4cab-a989-564991054ac5',
                'recordUrl': 'https://www.propstream.com/real-estate-agent-blog/can-you-be-a-real-estate-agent-part-time-tips',
                'searchIndexId': 'sidx-413d28ae-e1ec-5e31-a066-c5a2fdf0927d',
                'chunkType': 'Text',
                'chunkContent': 'recordTitle : Can You Be a Real Estate Agent Part-Time? (+ Tips!); chunkText :  more! Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?; ',
                'createdOn': '2024-02-21T10:19:12.520482658Z',
                'chunkId': 'chk-e4801706-0254-4890-9937-2434fbc25bd8',
                'chunkText': ' more! Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?',
                'sourceUrl': 'https://www.propstream.com/',
                'chunkMeta': {},
                'sourceType': 'web',
                'chunkTitle': '',
                'extractionMethod': 'text',
                'sourceName': 'propstream',
                'score': 1.6271237,
                'sent_to_LLM': true,
                'used_in_answer': false,
                'chunk_id': 'chk-e4801706-0254-4890-9937-2434fbc25bd8'
            },
            'chk-2': {
                'sourceId': 'fs-992880ef-1f84-5d02-8ac1-8004e64affab',
                'recordTitle': 'Can You Be a Real Estate Agent Part-Time? (+ Tips!)',
                'docId': 'fc-832b712a-df4e-4cab-a989-564991054ac5',
                'recordUrl': 'https://www.propstream.com/real-estate-agent-blog/can-you-be-a-real-estate-agent-part-time-tips',
                'searchIndexId': 'sidx-413d28ae-e1ec-5e31-a066-c5a2fdf0927d',
                'chunkType': 'Text',
                'chunkContent': 'recordTitle : Can You Be a Real Estate Agent Part-Time? (+ Tips!); chunkText :  the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable and remind you of your goals when work gets hard. This could be as simple as an occasional text asking how your marketing is going this week or as formal as a one-on-one meeting with a business coach. Pros and Cons of Being a Part-Time Real Estate Agent Not sure if going part-time is for you? Here’s a quick breakdown of the pros and cons. | | Should You Become a Part-Time Real Estate Agent? | | Pros: | | Cons: | | - Flexible schedule. You can set your hours around your other responsibilities. - Less pressure to scale quickly. You can build your client base at your own pace while relying on income from another job. - Extra cash. You can supplement your primary income with sales commissions. | | - Time commitment. It may take longer for your business to gain momentum if you’re only part-time. - Demanding clients. Some clients may expect more attention and time than you can give. - High competition. Many clients prefer to work with a full-time agent, and there are plenty to choose from. Ready to Level Up Your Marketing? If you’re pursuing a part-time real estate career, your time is even more valuable than somebody who has an unlimited amount of time to dedicate to their business. So, you need to work smarter when generating leads, not harder. This is where PropStream comes in handy. With PropStream, you can effortlessly find listing leads by searching for local homeowners with selling motivation. Examples of selling motivation you can search using PropStream are: - Divorce - Pre-foreclosure - Bankruptcy - Pre-probate And more! Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?; ',
                'createdOn': '2024-02-21T10:19:12.520472293Z',
                'chunkId': 'chk-bfcb1dbf-456c-4e81-bf5f-b45d2ee1bee4',
                'chunkText': ' the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable and remind you of your goals when work gets hard. This could be as simple as an occasional text asking how your marketing is going this week or as formal as a one-on-one meeting with a business coach. Pros and Cons of Being a Part-Time Real Estate Agent Not sure if going part-time is for you? Here’s a quick breakdown of the pros and cons. | | Should You Become a Part-Time Real Estate Agent? | | Pros: | | Cons: | | - Flexible schedule. You can set your hours around your other responsibilities. - Less pressure to scale quickly. You can build your client base at your own pace while relying on income from another job. - Extra cash. You can supplement your primary income with sales commissions. | | - Time commitment. It may take longer for your business to gain momentum if you’re only part-time. - Demanding clients. Some clients may expect more attention and time than you can give. - High competition. Many clients prefer to work with a full-time agent, and there are plenty to choose from. Ready to Level Up Your Marketing? If you’re pursuing a part-time real estate career, your time is even more valuable than somebody who has an unlimited amount of time to dedicate to their business. So, you need to work smarter when generating leads, not harder. This is where PropStream comes in handy. With PropStream, you can effortlessly find listing leads by searching for local homeowners with selling motivation. Examples of selling motivation you can search using PropStream are: - Divorce - Pre-foreclosure - Bankruptcy - Pre-probate And more! Easily save leads to marketing lists and create your campaign in one convenient location. Want to see why agents love PropStream?',
                'sourceUrl': 'https://www.propstream.com/',
                'chunkMeta': {},
                'sourceType': 'web',
                'chunkTitle': '',
                'extractionMethod': 'text',
                'sourceName': 'propstream',
                'score': 1.5936368,
                'sent_to_LLM': true,
                'used_in_answer': false,
                'chunk_id': 'chk-bfcb1dbf-456c-4e81-bf5f-b45d2ee1bee4'
            },
            'chk-3': {
                'sourceId': 'fs-992880ef-1f84-5d02-8ac1-8004e64affab',
                'recordTitle': 'Skip Tracing for Real Estate - PropStream',
                'docId': 'fc-39565ba5-c073-4b11-a468-03a1d44acef7',
                'recordUrl': 'https://www.propstream.com/skip-tracing',
                'searchIndexId': 'sidx-413d28ae-e1ec-5e31-a066-c5a2fdf0927d',
                'chunkType': 'Text',
                'chunkContent': 'recordTitle : Skip Tracing for Real Estate - PropStream; chunkText :  that return information. 7 Quick & Efficient Results Results within minutes. 8 No Minimums No minimum purchases required. Ever. 9 Quality Meets Affordability Some of the lowest rates in the biz! 12¢ per skip trace & 10¢ if you add on List Automator. 10 Find Contact Information on the Go Skip trace on the go via our mobile app.; ',
                'createdOn': '2024-02-21T10:19:12.496220597Z',
                'chunkId': 'chk-4cbea4db-bad5-4115-963d-a9bc9db93350',
                'chunkText': ' that return information. 7 Quick & Efficient Results Results within minutes. 8 No Minimums No minimum purchases required. Ever. 9 Quality Meets Affordability Some of the lowest rates in the biz! 12¢ per skip trace & 10¢ if you add on List Automator. 10 Find Contact Information on the Go Skip trace on the go via our mobile app.',
                'sourceUrl': 'https://www.propstream.com/',
                'chunkMeta': {},
                'sourceType': 'web',
                'chunkTitle': '',
                'extractionMethod': 'text',
                'sourceName': 'propstream',
                'score': 1.5732728,
                'sent_to_LLM': true,
                'used_in_answer': false,
                'chunk_id': 'chk-4cbea4db-bad5-4115-963d-a9bc9db93350'
            },
            'chk-4': {
                'sourceId': 'fs-992880ef-1f84-5d02-8ac1-8004e64affab',
                'recordTitle': 'Can You Be a Real Estate Agent Part-Time? (+ Tips!)',
                'docId': 'fc-832b712a-df4e-4cab-a989-564991054ac5',
                'recordUrl': 'https://www.propstream.com/real-estate-agent-blog/can-you-be-a-real-estate-agent-part-time-tips',
                'searchIndexId': 'sidx-413d28ae-e1ec-5e31-a066-c5a2fdf0927d',
                'chunkType': 'Text',
                'chunkContent': 'recordTitle : Can You Be a Real Estate Agent Part-Time? (+ Tips!); chunkText :  Will you specialize in serving first-time homebuyers, investors, or luxury homebuyers? Highlight your area of expertise when reaching out to leads and on your marketing materials, social media, and website. Related: Finding Your Niche: 10 Profitable Markets for Real Estate Agents Create your branded materials Hire a photographer (or ask a talented friend) to take high-quality headshots and branded photos. You can use a free design tool or hire a designer to create printed marketing materials, for-sale signs, social media images, and your website. Start networking and marketing Look for in-person and virtual networking opportunities like business meet-and-greets, small business openings, community events, webinars, workshops, and conferences. Keep several business cards on you in case you meet someone who’s looking to buy or sell a home. Referrals are one of the most vital marketing tactics—so make sure to provide clients with excellent customer service each time you interact with them and make follow-up a priority. How to Increase Your Real Estate Knowledge Your learning shouldn’t stop once you’ve established your business. Your clients expect you to always know what’s happening in your niche and the local market. Set aside regular time to read up on industry trends. You can also set Google alerts for real estate terms, subscribe to industry newsletters, and follow other agents on social media. Another way to strengthen your niche expertise is to take a credible online course or get a certification. Real estate conferences, workshops, and webinars can also help you stay relevant and sharpen your skills. 6 Tips for Managing Time and Clients as a Part-Time Agent Balancing your schedule and avoiding burnout is critical to make it as an agent. The following strategies can help you manage time and communicate effectively with clients. 1. Set clear expectations with clients When working part-time hours, you must be transparent regarding when you’re available and; ',
                'createdOn': '2024-02-21T10:19:12.520449931Z',
                'chunkId': 'chk-022fe6e3-7e26-49d1-8c21-a60020c62d58',
                'chunkText': ' Will you specialize in serving first-time homebuyers, investors, or luxury homebuyers? Highlight your area of expertise when reaching out to leads and on your marketing materials, social media, and website. Related: Finding Your Niche: 10 Profitable Markets for Real Estate Agents Create your branded materials Hire a photographer (or ask a talented friend) to take high-quality headshots and branded photos. You can use a free design tool or hire a designer to create printed marketing materials, for-sale signs, social media images, and your website. Start networking and marketing Look for in-person and virtual networking opportunities like business meet-and-greets, small business openings, community events, webinars, workshops, and conferences. Keep several business cards on you in case you meet someone who’s looking to buy or sell a home. Referrals are one of the most vital marketing tactics—so make sure to provide clients with excellent customer service each time you interact with them and make follow-up a priority. How to Increase Your Real Estate Knowledge Your learning shouldn’t stop once you’ve established your business. Your clients expect you to always know what’s happening in your niche and the local market. Set aside regular time to read up on industry trends. You can also set Google alerts for real estate terms, subscribe to industry newsletters, and follow other agents on social media. Another way to strengthen your niche expertise is to take a credible online course or get a certification. Real estate conferences, workshops, and webinars can also help you stay relevant and sharpen your skills. 6 Tips for Managing Time and Clients as a Part-Time Agent Balancing your schedule and avoiding burnout is critical to make it as an agent. The following strategies can help you manage time and communicate effectively with clients. 1. Set clear expectations with clients When working part-time hours, you must be transparent regarding when you’re available and',
                'sourceUrl': 'https://www.propstream.com/',
                'chunkMeta': {},
                'sourceType': 'web',
                'chunkTitle': '',
                'extractionMethod': 'text',
                'sourceName': 'propstream',
                'score': 1.5574901,
                'sent_to_LLM': true,
                'used_in_answer': false,
                'chunk_id': 'chk-022fe6e3-7e26-49d1-8c21-a60020c62d58'
            },
            'chk-5': {
                'sourceId': 'fs-992880ef-1f84-5d02-8ac1-8004e64affab',
                'recordTitle': 'Can You Be a Real Estate Agent Part-Time? (+ Tips!)',
                'docId': 'fc-832b712a-df4e-4cab-a989-564991054ac5',
                'recordUrl': 'https://www.propstream.com/real-estate-agent-blog/can-you-be-a-real-estate-agent-part-time-tips',
                'searchIndexId': 'sidx-413d28ae-e1ec-5e31-a066-c5a2fdf0927d',
                'chunkType': 'Text',
                'chunkContent': 'recordTitle : Can You Be a Real Estate Agent Part-Time? (+ Tips!); chunkText :  effectively with clients. 1. Set clear expectations with clients When working part-time hours, you must be transparent regarding when you’re available and how much time you can commit—not responding when a client needs you can quickly erode their trust. 2. Batch your digital marketing work Marketing is one of the most important—and time-consuming—aspects of growing your real estate business. Get caught up on marketing materials by completing a week’s or month’s worth of one task at a time, a strategy known as “batching.” For example, you might set aside two hours on one day to write all your social media posts for the month. The next day, you might focus on compiling a list of leads and, the following day, sending them cold emails. 3. Use a calendar and digital reminders Are you worried you’ll forget to respond to a client’s question or, worse, not show up to a meeting? Avoid these mishaps by scheduling tasks, meetings, and admin work on your calendar or setting up reminders on your phone. 4. Leverage automated tools and platforms Many routine tasks can be automated with modern technology. Look online for platforms that can help you with tasks such as: - Lead generation - Marketing emails - Cold calling - SMS or email lead follow-up - Contract creation - Social media posting - Appointment scheduling |Psst! With PropStream, you can automate your lead generation with our List Automator add-on. Additionally, create an email or postcard campaign within the platform or perform a skip trace. | 5. Prioritize your tasks No matter how hard you try, there may be weeks when you can’t complete everything on a part-time schedule. Prioritize your to-do list daily to ensure the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable; ',
                'createdOn': '2024-02-21T10:19:12.520461327Z',
                'chunkId': 'chk-06104d84-ab62-4e1c-ac89-dc1c551cbb19',
                'chunkText': ' effectively with clients. 1. Set clear expectations with clients When working part-time hours, you must be transparent regarding when you’re available and how much time you can commit—not responding when a client needs you can quickly erode their trust. 2. Batch your digital marketing work Marketing is one of the most important—and time-consuming—aspects of growing your real estate business. Get caught up on marketing materials by completing a week’s or month’s worth of one task at a time, a strategy known as “batching.” For example, you might set aside two hours on one day to write all your social media posts for the month. The next day, you might focus on compiling a list of leads and, the following day, sending them cold emails. 3. Use a calendar and digital reminders Are you worried you’ll forget to respond to a client’s question or, worse, not show up to a meeting? Avoid these mishaps by scheduling tasks, meetings, and admin work on your calendar or setting up reminders on your phone. 4. Leverage automated tools and platforms Many routine tasks can be automated with modern technology. Look online for platforms that can help you with tasks such as: - Lead generation - Marketing emails - Cold calling - SMS or email lead follow-up - Contract creation - Social media posting - Appointment scheduling |Psst! With PropStream, you can automate your lead generation with our List Automator add-on. Additionally, create an email or postcard campaign within the platform or perform a skip trace. | 5. Prioritize your tasks No matter how hard you try, there may be weeks when you can’t complete everything on a part-time schedule. Prioritize your to-do list daily to ensure the most important tasks get done first. 6. Find someone to hold you accountable Find a mentor, friend, or fellow agent who can keep you accountable',
                'sourceUrl': 'https://www.propstream.com/',
                'chunkMeta': {},
                'sourceType': 'web',
                'chunkTitle': '',
                'extractionMethod': 'text',
                'sourceName': 'propstream',
                'score': 1.5222538,
                'sent_to_LLM': true,
                'used_in_answer': false,
                'chunk_id': 'chk-06104d84-ab62-4e1c-ac89-dc1c551cbb19'
            }
        },
        answer_hook_user_input: {
            "templateType": "search",
            "requestId": "fsh-30609230-8aa5-5611-a616-2a5bbd685d45",
            "template": {
                "originalQuery": "real estate marketting strategy",
                "spellCorrectedQuery": "real estate marketting strategy",
                "results": {
                    "web": {
                        "data": [{
                                "contentId": "fc-39565ba5-c073-4b11-a468-03a1d44acef7",
                                "sys_content_type": "web",
                                "score": 33.58158,
                                "keywords": [],
                                "config": {
                                    "pinIndex": -1,
                                    "boost": 1,
                                    "visible": true
                                },
                                "addedResult": false,
                                "customization": {},
                                "page_url": "https://www.propstream.com/skip-tracing",
                                "sys_source_name": "propstream",
                                "page_title": "Skip Tracing for Real Estate - PropStream",
                                "page_image_url": "https://www.propstream.com/hs-fs/hubfs/PropStream_September_2020/images/5efa6560145e8303700ff6fa_header-logo.png?width=200&name=5efa6560145e8303700ff6fa_header-logo.png",
                                "sys_racl": [
                                    "*"
                                ],
                                "page_preview": "Access property owners&#x27; telephone numbers and emails instantly with PropStream&#x27;s Skip Tracing Tools, the most trusted provider of <span class=\"highlightText\">real</span> <span class=\"highlightText\">estate</span> data and skip tracing services.",
                                "createdOn": "2024-02-06T09:47:34.672000"
                            },
                            {
                                "contentId": "fc-832b712a-df4e-4cab-a989-564991054ac5",
                                "sys_content_type": "web",
                                "score": 19.228872,
                                "keywords": [],
                                "config": {
                                    "pinIndex": -1,
                                    "boost": 1,
                                    "visible": true
                                },
                                "addedResult": false,
                                "customization": {},
                                "page_url": "https://www.propstream.com/real-estate-agent-blog/can-you-be-a-real-estate-agent-part-time-tips",
                                "sys_source_name": "propstream",
                                "page_title": "Can You Be a Real Estate Agent Part-Time? (+ Tips!)",
                                "page_image_url": "https://www.propstream.com/hubfs/Blog%20Images/PropStreamBlog-CanYouBeARealEstateAgentPartTimePlusTips@2x.jpg#keepProtocol",
                                "sys_racl": [
                                    "*"
                                ],
                                "page_preview": "Considering becoming a part-time <span class=\"highlightText\">real</span> <span class=\"highlightText\">estate</span> agent? In this post, we explored what you need to know about this career avenue. Click for more.",
                                "createdOn": "2024-02-06T09:47:38.967000"
                            },
                            {
                                "contentId": "fc-e44b2a6f-79b9-4603-8b0a-25e35e89d191",
                                "sys_content_type": "web",
                                "score": 8.066006,
                                "keywords": [],
                                "config": {
                                    "pinIndex": -1,
                                    "boost": 1,
                                    "visible": true
                                },
                                "addedResult": false,
                                "customization": {},
                                "page_url": "https://www.propstream.com/news/why-is-tampa-the-top-housing-market-for-2022",
                                "sys_source_name": "propstream",
                                "page_title": "Why is Tampa the Top Housing Market for 2022?",
                                "page_image_url": "https://www.propstream.com/hubfs/Blog%20Images/PropStreamBlog-tampa-the-top-housing-market.webp#keepProtocol",
                                "sys_racl": [
                                    "*"
                                ],
                                "page_preview": "Tampa is considered the most desirable <span class=\"highlightText\">real</span> <span class=\"highlightText\">estate</span> market in the United States right now. To learn more about this scorching hot market, click here.",
                                "createdOn": "2024-02-06T09:47:35.522000"
                            },
                            {
                                "contentId": "fc-3f468192-6e58-455b-9cc6-6513cd5ad4ff",
                                "sys_content_type": "web",
                                "score": 7.9699965,
                                "keywords": [],
                                "config": {
                                    "pinIndex": -1,
                                    "boost": 1,
                                    "visible": true
                                },
                                "addedResult": false,
                                "customization": {},
                                "page_url": "https://www.propstream.com/news/how-agents-can-find-off-market-inventory-listings-and-clients",
                                "sys_source_name": "propstream",
                                "page_title": "PropStream for Agents: Landing New Leads and Listings",
                                "page_image_url": "https://www.propstream.com/hubfs/Blog%20Images/PropStreamBlog-realtors@2x.webp#keepProtocol",
                                "sys_racl": [
                                    "*"
                                ],
                                "page_preview": "Want to learn how to find off-market inventory, listings, and clients as a <span class=\"highlightText\">real</span> <span class=\"highlightText\">estate</span> agent? Check out our latest Academy course. Click here for more",
                                "createdOn": "2024-02-06T09:47:36.695000"
                            },
                            {
                                "contentId": "fc-57ea9e40-ff85-443c-a1ed-0f782211b064",
                                "sys_content_type": "web",
                                "score": 3.0987973,
                                "keywords": [],
                                "config": {
                                    "pinIndex": -1,
                                    "boost": 1,
                                    "visible": true
                                },
                                "addedResult": false,
                                "customization": {},
                                "page_url": "https://www.propstream.com/news/propstream-is-attending-imn-west-single-family-rental-forum",
                                "sys_source_name": "propstream",
                                "page_title": "PropStream is Attending the IMN West Single Family Rental Forum",
                                "page_image_url": "https://www.propstream.com/hubfs/Blog%20Images/PropStreamBlog-IMNSingleFamilyRental.jpg#keepProtocol",
                                "sys_racl": [
                                    "*"
                                ],
                                "page_preview": "PropStream will be attending the IMN West Single Family Rental Forum, which takes place December 5-7, in Scottsdale, Arizona. Click here to learn more.",
                                "createdOn": "2024-02-06T09:47:38.010000"
                            },
                            {
                                "contentId": "fc-4663c218-7475-441d-b60e-9b51e8dfc7df",
                                "sys_content_type": "web",
                                "score": 3.0571003,
                                "keywords": [],
                                "config": {
                                    "pinIndex": -1,
                                    "boost": 1,
                                    "visible": true
                                },
                                "addedResult": false,
                                "customization": {},
                                "page_url": "https://www.propstream.com/real-estate-investor-blog/flipping-houses-and-taxes-what-you-need-to-know",
                                "sys_source_name": "propstream",
                                "page_title": "Flipping Houses and Taxes: What You Need to Know",
                                "page_image_url": "https://www.propstream.com/hubfs/Blog%20Images/PropStreamBlog-property-tax.jpg#keepProtocol",
                                "sys_racl": [
                                    "*"
                                ],
                                "page_preview": "Don’t let confusion around house-flipping taxes stop you from pursuing a great deal. Here’s what you need to know first.",
                                "createdOn": "2024-02-06T09:47:43.120000"
                            },
                            {
                                "contentId": "fc-fce728d6-360d-4e2e-a0f8-3c5f7cb3d1a5",
                                "sys_content_type": "web",
                                "score": 2.6485488,
                                "keywords": [],
                                "config": {
                                    "pinIndex": -1,
                                    "boost": 1,
                                    "visible": true
                                },
                                "addedResult": false,
                                "customization": {},
                                "page_url": "https://www.propstream.com/how-to-set-up-alerts-and-automations-in-list-automator",
                                "sys_source_name": "propstream",
                                "page_title": "How to Set Up Alerts and Automations In List Automator - PropStream Help Video Library",
                                "page_image_url": "https://www.propstream.com/hubfs/YouTube-_0021_LA%20-%20Alerts%20and%20automations.jpg#keepProtocol",
                                "sys_racl": [
                                    "*"
                                ],
                                "page_preview": "How to Set Up Alerts and Automations In List Automator - PropStream Help Video Library",
                                "createdOn": "2024-02-06T09:47:41.668000"
                            },
                            {
                                "contentId": "fc-60785fdc-ec74-4e97-924c-3222b08d64d4",
                                "sys_content_type": "web",
                                "score": 1.0597508,
                                "keywords": [],
                                "config": {
                                    "pinIndex": -1,
                                    "boost": 1,
                                    "visible": true
                                },
                                "addedResult": false,
                                "customization": {},
                                "page_url": "https://www.propstream.com/news/what-is-the-difference-between-a-fixed-rate-and-an-adjustable-rate-mortgage-arm",
                                "sys_source_name": "propstream",
                                "page_title": "What Is the Difference Between a Fixed-Rate and an Adjustable-Rate Mortgage (ARM)?",
                                "page_image_url": "https://www.propstream.com/hubfs/iStock-1313644413.jpg#keepProtocol",
                                "sys_racl": [
                                    "*"
                                ],
                                "page_preview": "In this article, we’ll explain the differences between fixed-rate mortgages and ARMs, their pros and cons, and more. Click here for the full explanation.",
                                "createdOn": "2024-02-06T09:47:44.952000"
                            },
                            {
                                "contentId": "fc-535690db-faef-444a-b749-0efd3024e476",
                                "sys_content_type": "web",
                                "score": 0.7701751,
                                "keywords": [],
                                "config": {
                                    "pinIndex": -1,
                                    "boost": 1,
                                    "visible": true
                                },
                                "addedResult": false,
                                "customization": {},
                                "page_url": "https://www.propstream.com/news/how-to-get-more-jobs-as-a-contractor-using-propstream",
                                "sys_source_name": "propstream",
                                "page_title": "How to Get More Jobs as a Contractor Using PropStream",
                                "page_image_url": "https://www.propstream.com/hubfs/Blog%20Images/PropStreamBlog-contractor-find-work.jpg#keepProtocol",
                                "sys_racl": [
                                    "*"
                                ],
                                "page_preview": "PropStream has the tools you need to find clients as a new contractor. Here’s how to find clients and make your pitch as a contractor using PropStream.",
                                "createdOn": "2024-02-06T09:47:40.585000"
                            }
                        ],
                        "doc_count": 9
                    }
                },
                "query_language": "en",
                "chunk_result": {
                    "generative": [{
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
                },
                "facets": [],
                "tabFacet": {
                    "fieldName": "sys_content_type",
                    "buckets": [{
                            "key": "web",
                            "doc_count": 9,
                            "name": "Web Results"
                        },
                        {
                            "key": "file",
                            "doc_count": 0,
                            "name": "Files"
                        }
                    ]
                },
                "resultType": "grouped",
                "graph_answer": {
                    "payload": {}
                },
                "debug": {},
                "rephrasedQuery": "real estate"
            },
            "relay": "default",
            "queryPipelineId": "fqp-f7f0cdde-0f3e-574e-8058-52a511f33800",
            "indexPipelineId": "fip-a16ec1b7-17a3-5ab0-8d21-daae6cce1edc"
        }
    },
    clientAuthToken: "df38c7b8-8e1b-4d27-9a4a-1d9f88d927f2",
    REQUEST_TIMEOUT: 10000
};