const express = require('express');
const router = express.Router();
const aiDiseasePredictor = require('../services/aiDiseasePredictor');
const hospitalService = require('../services/hospitalService');
const urgencyRequestService = require('../services/urgencyRequestService');

// 1. Patient AI System: Disease Prediction
router.post('/predict-disease', (req, res) => {
  try {
    const { symptomsText, painLevel, vitals } = req.body;
    const prediction = aiDiseasePredictor.predictDisease({ symptomsText, painLevel, vitals });
    return res.json({ success: true, prediction });
  } catch (error) {
    return res.status(500).json({ error: 'Disease prediction failed' });
  }
});

// 2. Hospital List & Search
router.get('/hospitals', (req, res) => {
  const { q } = req.query;
  const list = hospitalService.getHospitals(q || '');
  return res.json({ success: true, hospitals: list });
});

// 3. Hospital Seat List
router.get('/hospitals/:id/seats', (req, res) => {
  const { id } = req.params;
  const seats = hospitalService.getHospitalSeats(id);
  return res.json({ success: true, seats });
});

// 4. Create Urgency Request (Patient Flow)
router.post('/urgency-request', (req, res) => {
  try {
    const request = urgencyRequestService.createUrgencyRequest(req.body);
    return res.status(201).json({ success: true, request });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create urgency request' });
  }
});

// 5. Hospital Flow: Get Urgency Requests & Patient Data
router.get('/urgency-requests', (req, res) => {
  const { hospitalId } = req.query;
  const list = urgencyRequestService.getAllRequests(hospitalId || '');
  return res.json({ success: true, requests: list });
});

// 6. Hospital Flow: Accept Request & Register Patient
router.patch('/urgency-request/:id/accept', (req, res) => {
  const updated = urgencyRequestService.acceptUrgencyRequest(req.params.id);
  if (!updated) return res.status(404).json({ error: 'Request not found' });
  return res.json({ success: true, request: updated });
});

// 7. Hospital Flow: Allot Doctor & Slot Time
router.patch('/urgency-request/:id/allot-doctor', (req, res) => {
  const { doctorId, slotTime } = req.body;
  const updated = urgencyRequestService.allotDoctorAndSlot(req.params.id, doctorId, slotTime);
  if (!updated) return res.status(404).json({ error: 'Request not found' });
  return res.json({ success: true, request: updated });
});

module.exports = router;
