const regexPattern = /chk-[a-zA-Z0-9-]+/g;

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
                chunkIdMap[chunkId]['used_in_answer'] = true;
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
    return [answer, imageUrl, chunkData, citationType];
}

async function generateAnswerFromOpenaiResponse(openaiResponse, chunkIdMap) {
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
        let chunkIdsList = answerSplitObj.match(regexPattern);

        if (chunkIdsList) {
            const response = await frameAnswerFromChunks(answerSplitObj, chunkIdMap);
            let answer = response[0];
            let imageUrl = response[1];
            let citationType = response[3];
            llmAnswer['type'] = citationType;
            let result_data = llmAnswer['data'][0];
            result_data['title'] = "";
            result_data['answer'] = answer;
            if (imageUrl) {
                result_data['image_url'] = imageUrl;
            }
            answerFound = true;
        }
        return [answerFound, llmAnswer];
    }
    return [answerFound, llmAnswer];
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
        chunkIdMap[chunk_id]['sent_to_LLM'] = false;
        chunkIdMap[chunk_id]['used_in_answer'] = false;
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
            sent_to_LLM: false,
            used_in_answer: false,
            chunk_id: chunkId
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
        chunkIdMap[chunkIndex].sent_to_LLM = true;
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

function formAnswerDebugPayload(answerConfigs, prompt, completion_time, prompt_tokens, completion_tokens, total_tokens, ans, openaiResponse) {
    let { MODEL, TEMPERATURE, TOP_P, FREQUENCY_PENALTY } = answerConfigs;
    const debug_payload_info = {
        prompt: {
            promptText: prompt,
            moreInfo: [
                { "key": "Model", "value": MODEL },
                { "key": "Temperature", "value": TEMPERATURE },
                { "key": "Frequency Penalty", "value": FREQUENCY_PENALTY },
                { "key": "TopP", "value": TOP_P }
            ]
        },
        llmResponse: {
            responseDetails: {
                completionText: { answer: null, chunkIds: [] },
                moreInfo: []
            },
            responseTime: { moreInfo: [] }
        }
    };

    const populateMoreInfo = (key, value) => {
        debug_payload_info.llmResponse.responseDetails.moreInfo.push({ key, value });
    };

    debug_payload_info.llmResponse.responseTime.moreInfo.push({ "Completion time": completion_time });
    debug_payload_info.llmResponse.responseDetails.completionText.answer = ans;

    const regexPattern = /chk-[a-zA-Z0-9-]+/g;
    let answerText = openaiResponse;
    if (typeof answerText !== 'string') {
        answerText = JSON.stringify(answerText);
    }
    let chunkIds = answerText.match(regexPattern);
    debug_payload_info.llmResponse.responseDetails.completionText.chunkIds = chunkIds;
    populateMoreInfo("Completion Tokens", completion_tokens);
    populateMoreInfo("Prompt Tokens", prompt_tokens);
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