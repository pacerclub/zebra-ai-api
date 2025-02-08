const express = require('express');
const { analyzeTask, reviewCode, distributeTask } = require('../controllers/aiController');

const router = express.Router();

// Route for task distribution
router.post('/distribute-task', distributeTask);

// Route for analyzing and breaking down tasks
router.post('/analyze-task', analyzeTask);

// Route for code review
router.post('/review-code', reviewCode);

module.exports = router;
