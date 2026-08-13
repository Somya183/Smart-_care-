const priorityQueueEngine = require('../services/priorityQueueEngine');
const websocketService = require('../services/websocketService');

// Mock data seed for active queue items
let activeQueue = [
  {
    queueId: 'q_001',
    caseId: 'case_101',
    patientName: 'Eleanor Vance',
    triageLevel: 1,
    severityLabel: 'Critical / Resuscitation',
    department: 'Cardiology ER',
    vitalsRiskScore: 40,
    waitStartTime: new Date(Date.now() - 5 * 60000).toISOString(), // 5 mins ago
    status: 'WAITING'
  },
  {
    queueId: 'q_002',
    caseId: 'case_102',
    patientName: 'Marcus Miller',
    triageLevel: 2,
    severityLabel: 'Emergent',
    department: 'General ER',
    vitalsRiskScore: 30,
    waitStartTime: new Date(Date.now() - 25 * 60000).toISOString(), // 25 mins ago
    status: 'WAITING'
  },
  {
    queueId: 'q_003',
    caseId: 'case_103',
    patientName: 'Sophia Lin',
    triageLevel: 3,
    severityLabel: 'Urgent',
    department: 'General ER',
    vitalsRiskScore: 0,
    waitStartTime: new Date(Date.now() - 40 * 60000).toISOString(), // 40 mins ago
    status: 'WAITING'
  },
  {
    queueId: 'q_004',
    caseId: 'case_104',
    patientName: 'David Kim',
    triageLevel: 4,
    severityLabel: 'Less Urgent',
    department: 'General ER',
    vitalsRiskScore: 0,
    waitStartTime: new Date(Date.now() - 15 * 60000).toISOString(),
    status: 'WAITING'
  }
];

exports.getDepartmentQueue = async (req, res) => {
  const { deptId } = req.params;

  // Recalculate priority scores using the dynamic queue engine
  const reordered = priorityQueueEngine.reorderQueue(activeQueue);

  // Broadcast real-time update
  websocketService.broadcastQueueUpdate(deptId, reordered);

  return res.json({
    department: deptId || 'All Departments',
    totalWaiting: reordered.length,
    queue: reordered
  });
};

exports.updateQueueItemStatus = async (req, res) => {
  const { queueId, newStatus } = req.body;

  const itemIndex = activeQueue.findIndex(q => q.queueId === queueId || q.caseId === queueId);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Queue item not found' });
  }

  activeQueue[itemIndex].status = newStatus;

  if (newStatus === 'DISCHARGED' || newStatus === 'ADMITTED' || newStatus === 'WITH_DOCTOR') {
    // Remove from active queue or mark in-progress
    const updatedQueue = priorityQueueEngine.reorderQueue(activeQueue);
    websocketService.broadcastQueueUpdate(activeQueue[itemIndex].department, updatedQueue);
  }

  websocketService.notifyPatientStatusChange(activeQueue[itemIndex].caseId, {
    status: newStatus,
    timestamp: new Date().toISOString()
  });

  return res.json({
    success: true,
    updatedItem: activeQueue[itemIndex]
  });
};
