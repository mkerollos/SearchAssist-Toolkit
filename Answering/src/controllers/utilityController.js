const axios = require('axios');
const helperService = require('../../utils/helper.js');
const URITemplate = require('uri-templates');

const answeringService = async (userQuery, answerConfig, chunksSentToLLM) => {
  try {
    let selectedLLM = answerConfig.ANSWERING_LLM;
    let resp;
    let debug_payload_info = {};

    if (selectedLLM === "openai") {
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

      const answer = await helperService.generateAnswerFromOpenaiResponse(response.data, chunkIdMap);
      let contentList = answer[1]?.data[0]?.answer || [];
      let ans = "";
      contentList.forEach((content) => {
        ans += content?.answer_fragment;
      });

      debug_payload_info = helperService.formAnswerDebugPayload(answerConfig[selectedLLM], prompt, completion_time, prompt_tokens, completion_tokens, total_tokens, ans, response.data);

      resp = {
        graph_answer: { "payload": { "center_panel": answer[1] } },
        debug_payload: debug_payload_info
      };

    }
    else if (selectedLLM == "azure_openai") {
      let { prompt, endpoint, apiKey, MODEL, TEMPERATURE, MAX_TOKENS, TOP_P, FREQUENCY_PENALTY, PRESENCE_PENALTY, userSubDomain, deploymentId, apiVersion } = answerConfig[selectedLLM];
      prompt = await helperService.modifyPrompt(prompt, userQuery, chunksSentToLLM);

      const requestData = {
        "model": MODEL,
        "messages": prompt,
        "temperature": TEMPERATURE,
        "max_tokens": MAX_TOKENS,
        "top_p": TOP_P,
        "frequency_penalty": FREQUENCY_PENALTY,
        "presence_penalty": PRESENCE_PENALTY
      };

      endpoint = decodeURIComponent(URITemplate(endpoint).fillFromObject({ userSubDomain, deploymentId, apiVersion }));
      const startTime = new Date();
      const response = await axios.post(endpoint, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
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

      const answer = await helperService.generateAnswerFromOpenaiResponse(response.data, chunkIdMap);

      let contentList = answer[1]?.data[0]?.answer || [];
      let ans = "";
      contentList.forEach((content) => {
        ans += content?.answer_fragment;
      });

      debug_payload_info = helperService.formAnswerDebugPayload(answerConfig[selectedLLM], prompt, completion_time, prompt_tokens, completion_tokens, total_tokens, ans, response.data);
      resp = {
        graph_answer: { "payload": { "center_panel": answer[1] } },
        debug_payload: debug_payload_info
      };
    }
    return resp;
  } catch (error) {
    console.error(error);
    throw new Error('Error in making the public service call');
  }
};

module.exports = {
  answeringService,
};