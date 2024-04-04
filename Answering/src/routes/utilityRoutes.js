const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');
const { predefinedRequestData } = require('../../constants/answerRequest');
const base = require('../../base');
const path = require('path');

// Define the answer route (POST)
router.post('/answer', async (req, res) => {
  try {
    const userQuery = req.body?.template?.spellCorrectedQuery || req.body?.template?.originalQuery || predefinedRequestData.answer_hook_user_input.spellCorrectedQuery;
    const chunksSentToLLM = req.body?.template?.chunk_result?.generative || predefinedRequestData.answer_hook_user_input.template.chunk_result.generative;
    const answerConfig = require(path.join(base.basePath, base.answerConfigPath));
    const answer = await utilityController.answeringService(userQuery, answerConfig, chunksSentToLLM);
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: 'Error found while making the answering service call' });
  }
});

module.exports = router;