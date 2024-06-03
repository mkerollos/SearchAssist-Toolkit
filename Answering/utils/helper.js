const regexPattern = /chk-[a-zA-Z0-9-]+/g;

function transformChunkMap(chunkIdMap, chunkIds) {
    const generativeChunks = [];

    for (const chunkId in chunkIdMap) {
        if (chunkIdMap.hasOwnProperty(chunkId)) {
            const chunk = chunkIdMap[chunkId];
            chunk.usedInAnswer = chunkIds.includes(chunkId);

            const additionalInfo = {
                chunkId: chunk.chunkId,
                docId: chunk.docId,
                sourceId: chunk.sourceId,
                chunkType: chunk.chunkType,
                extractionMethod: chunk.extractionMethod,
            };

            const moreInfo = [
                { key: "Chunk Title", value: chunk.chunkTitle },
                { key: "Page Number", value: chunk.pageNumber }
            ];

            delete chunk.chunkId;
            delete chunk.docId;
            delete chunk.sourceId;
            delete chunk.chunkType;
            delete chunk.extractionMethod;
            delete chunk.pageNumber;
            delete chunk.chunkTitle;

            chunk.additionalInfo = additionalInfo;
            chunk.moreInfo = moreInfo;

            generativeChunks.push(chunk);
        }
    }
    return generativeChunks;
}

async function frameAnswerFromChunks(openaiAns, chunkIdMap) {
    let answerText = openaiAns;
    let answerTextTemp = answerText;
    let citationType = '',
        imageUrl = '';
    let answer = [],
        answerFragments = [],
        chunkData = {},
        answerSourceDocs = {};
    const lastIndex = answerTextTemp.lastIndexOf("[");
    answerTextTemp = answerTextTemp.slice(0, lastIndex);
    let chunkIds = answerText.match(regexPattern);

    generativeChunks = transformChunkMap(chunkIdMap, chunkIds);

    if (chunkIds.length > 0) {
        let chunkId = chunkIds[0].split(',')[0];
        if (chunkIdMap[chunkId] && 'chunkMeta' in chunkIdMap[chunkId] && chunkIdMap[chunkId]['chunkMeta']) {
            if ('imageUrl' in chunkIdMap[chunkId]['chunkMeta']) {
                imageUrl = chunkIdMap[chunkId]['chunkMeta']['imageUrl'];
            }
        }
    }
    for (let chunk_index = 0; chunk_index < chunkIds.length; chunk_index++) {
        let source = chunkIds[chunk_index];
        let answerFragmentDict = {},
            answerSources = [],
            answerFragmentSourceDocs = {};
        let answerFragment = answerTextTemp.split(`[${source}]`)[0];
        answerFragmentDict["answer_fragment"] = answerFragment;
        answerTextTemp = answerTextTemp.replace(`[${source}]`, "").replace(answerFragment, "");
        let chunkIdSplit = source.split(',');

        for (let chunk_id_index = 0; chunk_id_index < chunkIdSplit.length; chunk_id_index++) {
            let chunkId = chunkIdSplit[chunk_id_index];
            chunkId = chunkId.trim();
            chunkData = chunkIdMap[chunkId];
            if (chunkData) {
                chunkIdMap[chunkId]['usedInAnswer'] = true;
                let docId = chunkData["docId"];
                let sourceId = chunkData["sourceId"];
                let sourceType = chunkData["sourceType"];
                if (!(docId in answerFragmentSourceDocs)) {
                    answerFragmentSourceDocs[docId] = true;
                    answerSourceDocs[docId] = true;
                    let title = chunkData['recordTitle'];
                    if (!title) {
                        title = chunkData['sourceName'];
                    }
                    let url = chunkData['sourceUrl'];
                    answerSources.push({
                        'title': title,
                        'url': url,
                        'chunk_id': chunkId,
                        'doc_id': docId,
                        'source_id': sourceId,
                        'source_type': sourceType
                    });
                }
            }
        }
        answerFragmentDict['sources'] = answerSources;
        answerFragments.push(answerFragmentDict);
    }
    answer = answerFragments;
    if (imageUrl) {
        citationType = 'image_snippet';
    } else if (answerSourceDocs.length > 1) {
        citationType = 'active_citation_snippet';
    } else {
        citationType = 'citation_snippet';
    }
    return [answer, imageUrl, chunkData, citationType, generativeChunks];
}

async function generateAnswerFromOpenaiResponse(openaiResponse, chunkIdMap, completion_time) {
    const llmAnswer = {
        'type': 'answer_snippet',
        'data': [{
            'title': "",
            'answer': "",
            'snippet_type': 'generative_model'
        }]
    }
    let openaiAnswer = openaiResponse.choices;
    let answerFound = false;
    if (openaiAnswer && openaiAnswer.length > 0) {
        let answerSplitObj = openaiAnswer[0]['message']['content'];
        llmAnswer['data'][0]['answer'] = answerSplitObj;
        llmAnswer['type'] = 'no_answer_snippet';
        let chunkIdsList = answerSplitObj.match(regexPattern);

        if (chunkIdsList) {
            const response = await frameAnswerFromChunks(answerSplitObj, chunkIdMap);
            let answer = response[0];
            let imageUrl = response[1];
            let citationType = response[3];
            var generativeChunks = response[4] || [];
            llmAnswer['type'] = citationType;
            llmAnswer['data'][0]["isPresentedAnswer"] = true;
            llmAnswer['data'][0]["message"] = "Presented Answer";
            llmAnswer['data'][0]["score"] = "0%";
            llmAnswer['data'][0]["timeTaken"] = `${completion_time} ms`;

            let result_data = llmAnswer['data'][0];
            result_data['title'] = "";
            result_data['snippet_content'] = answer;
            let ans = "";
            result_data['snippet_content'].forEach((content) => {
                ans += content?.answer_fragment;
            });
            llmAnswer['data'][0]['answer'] = ans;
            if (imageUrl) {
                result_data['image_url'] = imageUrl;
            }
            answerFound = true;
        }
        return [answerFound, llmAnswer, generativeChunks];
    }
    return [answerFound, llmAnswer, generativeChunks];
}

async function formChunkIdMap(chunksSentToLLM) {
    const chunkIdMap = {};
    const searchResults = chunksSentToLLM;
    // const snippetResult = {
    //     'type': 'answer_snippet',
    //     'data': [{ 'title': "", 'answer': "", 'snippet_type': 'generative_model' }]
    // }
    for (let result_index = 0; result_index < searchResults.length; result_index++) {
        let result = searchResults[result_index];
        const chunk_id = result['chunkId'] || result['_source.chunkId'];
        chunkIdMap[chunk_id] = result;
        chunkIdMap[chunk_id]['score'] = result['_score'] ? result['_score'] : result['vector_score'];
        chunkIdMap[chunk_id]['sentToLLM'] = false;
        chunkIdMap[chunk_id]['usedInAnswer'] = false;
    }
    return chunkIdMap;
}

const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

function numTokensFromString(string) {
    const tokens = tokenizer.tokenize(string);
    return tokens.length;
}


async function getContextArrayChunks(prompt, chunksSentToLLM) {
    const snippetResult = {
        type: 'answer_snippet',
        data: [{
            title: "",
            answer: "",
            snippet_type: "generative_model"
        }]
    };

    let snippetFound = false;
    const chunkIdMap = {};
    const promptContent = [];
    let checkText = "";

    for (let index = 0; index < chunksSentToLLM.length; index++) {
        const chunkIndex = `chk-${index + 1}`;
        const result = chunksSentToLLM[index];
        const chunkId = result._source?.chunkId || '';
        chunkIdMap[chunkIndex] = {
            ...result._source,
            score: result._score || "",
            sentToLLM: true,
            usedInAnswer: false,
            chunk_id: chunkId,
            chunkRerank: false
        };
    }

    const promptType = 'citation_snippet';
    const promptLength = await numTokensFromString('');
    const maxTokenSize = 3000;
    const numberOfChunks = 5;
    let prevChunkScore = 0.0;

    for (const [chunkIndex, chunk] of Object.entries(chunkIdMap).slice(0, numberOfChunks)) {
        const currChunkScore = chunk.score || 0.0;
        prevChunkScore = currChunkScore;

        const sourceName = chunk.recordTitle || chunk.sourceName || "";
        const content = chunk.chunkText || "";
        const numTokens = await numTokensFromString(checkText);

        if (numTokens + promptLength > maxTokenSize) {
            break;
        }

        const checkTextTemp = `Content: ${content}, source_name: ${sourceName} chunk_id: ${chunkIndex}. `;
        checkText += checkTextTemp;
        chunkIdMap[chunkIndex].sentToLLM = true;
        promptContent.push(checkTextTemp);
    }

    const mergedPromptContent = promptContent.join("\n");

    let prompt_content = []
    prompt_content.push(mergedPromptContent);

    try {
        var kwargs = {};
        kwargs['context_array'] = prompt_content;
        kwargs['chunk_id_map'] = chunkIdMap;
        kwargs['llm_answer'] = snippetResult;
        kwargs['promptType'] = promptType;
    } catch (error) {
        console.error(error);
    }

    return kwargs;
}

async function modifyPrompt(prompt, query, chunksSentToLLM) {
    try {
        const kwargs = await getContextArrayChunks(prompt, chunksSentToLLM);
        const contextArray = kwargs.context_array;
        const promptJson = prompt;

        const newPromptJson = promptJson.map(promptItem => {
            let content = promptItem.content || '';
            content = content.replace("{{chunks}}", contextArray[0] || '');
            content = content.replace("{{query}}", query);
            return {
                role: promptItem.role,
                content
            };
        });

        const modifiedPromptJson = JSON.stringify(newPromptJson, null, 4);
        const modifiedPrompt = JSON.parse(modifiedPromptJson);

        return modifiedPrompt;
    } catch (error) {
        console.error(error);
        return prompt;
    }
}

function formAnswerDebugPayload(answerConfigs, prompt, completion_time, prompt_tokens, completion_tokens, total_tokens, ans, openaiResponse, answeringType, generativeChunks) {
    let { MODEL, TEMPERATURE, TOP_P, FREQUENCY_PENALTY, MODE, RESPONSE_TOKEN_LIMIT, PRESENCE_PENALTY } = answerConfigs;
    let MODEL_NAME = MODEL ? answeringType + ' ' + MODEL : answeringType;
    const debug_payload_info = {
        prompt: {
            // promptText: prompt,
            promptText: '',
            moreInfo: [
                { "key": "Model", "value": MODEL_NAME },
                /*
                { "key": "Temperature", "value": TEMPERATURE },
                { "key": "Frequency Penalty", "value": FREQUENCY_PENALTY },
                { "key": "TopP", "value": TOP_P },
                { "key": "Mode", "value": MODE },
                { "key": "Response Token Limit", "value": RESPONSE_TOKEN_LIMIT },
                { "key": "Presence Penalty", "value": PRESENCE_PENALTY }*/
            ]
        },
        llmResponse: {
            responseDetails: {
                completionText: { answer: null, chunkIds: [] },
                moreInfo: []
            },
            responseTime: { moreInfo: [] }
        },
        generativeChunks: generativeChunks || []
    };

    const populateMoreInfo = (key, value) => {
        debug_payload_info.llmResponse.responseDetails.moreInfo.push({ key, value });
    };
    // debug_payload_info.llmResponse.responseTime.moreInfo.push({ key: 'Completion Time', value: completion_time/1000});
    debug_payload_info.llmResponse.responseDetails.completionText.answer = ans;

    const regexPattern = /chk-[a-zA-Z0-9-]+/g;
    let answerText = openaiResponse;
    if (typeof answerText !== 'string') {
        answerText = JSON.stringify(answerText);
    }
    let chunkIds = answerText.match(regexPattern);
    debug_payload_info.llmResponse.responseDetails.completionText.chunkIds = chunkIds;
    populateMoreInfo("Completion Tokens", completion_tokens);
    // populateMoreInfo("Prompt Tokens", prompt_tokens);
    populateMoreInfo("Total Tokens", total_tokens);

    return debug_payload_info;
}

module.exports = {
    generateAnswerFromOpenaiResponse,
    formChunkIdMap,
    modifyPrompt,
    getContextArrayChunks,
    formAnswerDebugPayload
};