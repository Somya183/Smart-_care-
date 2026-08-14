/**
 * SmartCare - Urgency Request & Patient Registration Service
 * Handles urgency requests from Patient Flow to Hospital Flow:
 * PENDING -> ACCEPTED -> REGISTERED -> DOCTOR_ALLOTTED -> COMPLETED
 */

const hospitalService = require('./hospitalService');
const websocketService = require('./websocketService');

class UrgencyRequestService {
  constructor() {
    this.requests = [];
  }

  createUrgencyRequest(data) {
    const {
      patientName,
      symptomsText,
      diseasePrediction,
      hospitalId,
      seatId,
      seatName
    } = data;

    const requestId = `req_${Date.now()}`;
    const newRequest = {
      requestId,
      patientName: patientName || 'Patient Guest',
      symptomsText,
      diseasePrediction,
      hospitalId: hospitalId || 'hosp_101',
      seatId,
      seatName: seatName || 'ER Bay 01',
      status: 'PENDING',
      allottedDoctor: null,
      slotTime: null,
      createdAt: new Date().toISOString()
    };

    this.requests.push(newRequest);

    // Notify Hospital Flow via WebSockets
    websocketService.notifyNewCase(newRequest.hospitalId, newRequest);

    return newRequest;
  }

  getAllRequests(hospitalId = '') {
    if (hospitalId) {
      return this.requests.filter(r => r.hospitalId === hospitalId);
    }
    return this.requests;
  }

  getRequestById(requestId) {
    return this.requests.find(r => r.requestId === requestId);
  }

  acceptUrgencyRequest(requestId) {
    const request = this.getRequestById(requestId);
    if (!request) return null;

    request.status = 'ACCEPTED';
    request.registeredAt = new Date().toISOString();

    // Mark seat as occupied
    if (request.seatId) {
      hospitalService.updateSeatOccupancy(request.hospitalId, request.seatId, true);
    }

    // Broadcast status change via WebSockets
    websocketService.notifyPatientStatusChange(requestId, {
      requestId,
      status: 'ACCEPTED',
      registeredAt: request.registeredAt
    });

    return request;
  }

  allotDoctorAndSlot(requestId, doctorId, slotTime) {
    const request = this.getRequestById(requestId);
    if (!request) return null;

    const hospital = hospitalService.getHospitalById(request.hospitalId);
    let doctorName = 'Dr. Sarah Jenkins, MD';

    if (hospital) {
      const doc = hospital.doctors.find(d => d.id === doctorId);
      if (doc) doctorName = doc.name;
    }

    request.status = 'DOCTOR_ALLOTTED';
    request.allottedDoctor = doctorName;
    request.slotTime = slotTime || 'Immediate (Slot A-101)';

    websocketService.notifyPatientStatusChange(requestId, {
      requestId,
      status: 'DOCTOR_ALLOTTED',
      allottedDoctor: doctorName,
      slotTime: request.slotTime
    });

    return request;
  }
}

module.exports = new UrgencyRequestService();
