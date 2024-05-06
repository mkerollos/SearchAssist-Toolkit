const axios = require('axios');
const helperService = require('../../utils/helper.js');
const URITemplate = require('uri-templates');

const answeringService = async (userQuery, answerConfig, chunksSentToLLM) => {
  try {
    let selectedLLM = answerConfig.ANSWERING_LLM;
    let resp;

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
      const response = await axios.post(endpoint, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      const kwargs = await helperService.getContextArrayChunks(prompt, chunksSentToLLM);
      const chunkIdMap = kwargs.chunk_id_map;

      const answer = await helperService.generateAnswerFromOpenaiResponse(response.data, chunkIdMap);
      resp = { graph_answer: { "payload": { "center_panel": answer[1] } } };

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
      }
      endpoint = decodeURIComponent(URITemplate(endpoint).fillFromObject({ userSubDomain: userSubDomain, deploymentId: deploymentId, apiVersion: apiVersion }))
      const response = await axios.post(endpoint, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
      });
      const kwargs = await helperService.getContextArrayChunks(prompt, chunksSentToLLM);
      const chunkIdMap = kwargs.chunk_id_map;

      const answer = await helperService.generateAnswerFromOpenaiResponse(response.data, chunkIdMap);
      resp = { graph_answer: { "payload": { "center_panel": answer[1] } } };
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