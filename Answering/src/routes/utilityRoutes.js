const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');
const { predefinedRequestData, clientAuthToken, REQUEST_TIMEOUT } = require('../../constants/answerRequest');
const base = require('../../base');
const path = require('path');

const authenticateToken = (req, res, next) => {
  const authToken = req.headers['api-token'];
  if (authToken === clientAuthToken) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

router.post('/answer', authenticateToken, async (req, res) => {
  try {
    console.log("<========== Public Answering Service Request is received ==========>");
    const userQuery = req.body?.searchResults?.template?.spellCorrectedQuery || req.body?.searchResults?.template?.originalQuery || predefinedRequestData.answer_hook_user_input.spellCorrectedQuery;
    const chunksSentToLLM = req.body?.searchResults?.template?.chunk_result?.generative || predefinedRequestData.answer_hook_user_input.template.chunk_result.generative;
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