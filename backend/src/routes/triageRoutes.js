const express = require('express');
const router = express.Router();
const triageController = require('../controllers/triageController');

// Submit symptom intake for AI assessment
router.post('/assess', triageController.assessAndSubmitTriage);

// Get case assessment details
router.get('/case/:caseId', triageController.getCaseDetails);

module.exports = router;
