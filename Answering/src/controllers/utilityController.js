const axios = require('axios');
const helperService = require('../../utils/helper.js');

const answeringService = async (userQuery, openaiConfig, chunksSentToLLM) => {
  try {
    let prompt = openaiConfig.openai.prompt;
    //read prompt from constants ---todo
    //write the definition for modifying the prompt
    prompt = await helperService.modifyPrompt(prompt, userQuery, chunksSentToLLM);
    // console.log("modified prompt ====>", prompt);
    const requestData = {
      "model": "gpt-3.5-turbo",
      "messages": prompt,
      "temperature": 0.5,
      "max_tokens": 512,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0
    }
    const response = await axios.post(openaiConfig.openai.endpoint, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiConfig.openai.apiKey}`,
      },
    });
    console.log("open-ai response ====>", response.data?.choices[0]?.message)
    //test this logic of chunksSentToLLM bcz chunkIdMap structure was different
    const kwargs = await helperService.getContextArrayChunks(prompt, chunksSentToLLM);
    const chunkIdMap = kwargs.chunk_id_map;
    // console.log("chunkIdMap =====>", chunkIdMap);
    // const chunkIdMap = await helperService.formChunkIdMap(chunksSentToLLM);
    //format the llm response
    const answer = await helperService.generateAnswerFromOpenaiResponse(response.data, chunkIdMap);
    // console.log("answer ====>", answer.data);
    return answer;
  } catch (error) {
    console.error(error);
    throw new Error('Error calling OpenAI service');
  }
};

module.exports = {
  answeringService,
};