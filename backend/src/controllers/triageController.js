const aiTriageService = require('../services/aiTriageService');
const priorityQueueEngine = require('../services/priorityQueueEngine');
const websocketService = require('../services/websocketService');

// In-memory mock database store for demo fallback / fast testing
const mockCases = [];
const mockQueue = [];

exports.assessAndSubmitTriage = async (req, res) => {
  try {
    const { patientName = 'Anonymous Patient', symptomsText, painLevel, vitals, medicalHistory } = req.body;

    if (!symptomsText) {
      return res.status(400).json({ error: 'Symptoms text is required for AI triage assessment' });
    }

    // Run AI Triage engine calculation
    const assessment = aiTriageService.assessIntake({
      symptomsText,
      painLevel,
      vitals,
      medicalHistory
    });

    const caseId = `case_${Date.now()}`;
    const newCase = {
      caseId,
      patientName,
      symptomsText,
      painLevel,
      vitals,
      triageLevel: assessment.triageLevel,
      severityLabel: assessment.severityLabel,
      assignedDepartment: assessment.assignedDepartment,
      aiConfidence: assessment.aiConfidence,
      riskFactors: assessment.riskFactors,
      vitalsRiskScore: assessment.vitalsRiskScore,
      recommendedActions: assessment.recommendedActions,
      status: 'WAITING',
      createdAt: new Date().toISOString()
    };

    mockCases.push(newCase);

    // Insert into dynamic queue
    const queueItem = {
      queueId: `q_${Date.now()}`,
      caseId,
      patientName,
      triageLevel: assessment.triageLevel,
      severityLabel: assessment.severityLabel,
      department: assessment.assignedDepartment,
      vitalsRiskScore: assessment.vitalsRiskScore,
      waitStartTime: new Date().toISOString(),
      status: 'WAITING'
    };

    mockQueue.push(queueItem);

    // Re-order queue using Dynamic Priority Queue engine
    const reorderedQueue = priorityQueueEngine.reorderQueue(mockQueue);

    // Broadcast WebSocket updates
    websocketService.notifyNewCase(assessment.assignedDepartment, newCase);
    websocketService.broadcastQueueUpdate(assessment.assignedDepartment, reorderedQueue);

    const patientQueuePos = reorderedQueue.find(q => q.caseId === caseId)?.queuePosition || 1;

    return res.status(201).json({
      success: true,
      caseId,
      triageAssessment: assessment,
      queuePosition: patientQueuePos,
      estimatedWaitMins: patientQueuePos * 12
    });
  } catch (error) {
    console.error('Triage assessment error:', error);
    return res.status(500).json({ error: 'Failed to process triage intake' });
  }
};

exports.getCaseDetails = async (req, res) => {
  const { caseId } = req.params;
  const foundCase = mockCases.find(c => c.caseId === caseId);

  if (!foundCase) {
    return res.status(404).json({ error: 'Triage case not found' });
  }

  const currentQueue = priorityQueueEngine.reorderQueue(mockQueue);
  const queueInfo = currentQueue.find(q => q.caseId === caseId);

  return res.json({
    case: foundCase,
    queuePosition: queueInfo ? queueInfo.queuePosition : 1,
    priorityScore: queueInfo ? queueInfo.priorityScore : 0
  });
};
