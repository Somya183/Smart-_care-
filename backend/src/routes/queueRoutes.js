const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

// Get real-time department queue sorted by priority score
router.get('/department/:deptId?', queueController.getDepartmentQueue);

// Update status of patient in queue
router.patch('/status', queueController.updateQueueItemStatus);

module.exports = router;
