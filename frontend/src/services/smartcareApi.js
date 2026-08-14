const API_BASE = 'http://localhost:5000/api/v1/smartcare';

export const predictDisease = async (intakeData) => {
  const res = await fetch(`${API_BASE}/predict-disease`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(intakeData)
  });
  if (!res.ok) throw new Error('Disease prediction failed');
  return res.json();
};

export const fetchHospitals = async (query = '') => {
  const res = await fetch(`${API_BASE}/hospitals?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to fetch hospitals');
  return res.json();
};

export const fetchHospitalSeats = async (hospitalId) => {
  const res = await fetch(`${API_BASE}/hospitals/${hospitalId}/seats`);
  if (!res.ok) throw new Error('Failed to fetch hospital seats');
  return res.json();
};

export const createUrgencyRequest = async (requestData) => {
  const res = await fetch(`${API_BASE}/urgency-request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData)
  });
  if (!res.ok) throw new Error('Failed to submit urgency request');
  return res.json();
};

export const fetchUrgencyRequests = async (hospitalId = '') => {
  const res = await fetch(`${API_BASE}/urgency-requests?hospitalId=${hospitalId}`);
  if (!res.ok) throw new Error('Failed to fetch urgency requests');
  return res.json();
};

export const acceptUrgencyRequest = async (requestId) => {
  const res = await fetch(`${API_BASE}/urgency-request/${requestId}/accept`, {
    method: 'PATCH'
  });
  if (!res.ok) throw new Error('Failed to accept request');
  return res.json();
};

export const allotDoctorAndSlot = async (requestId, doctorId, slotTime) => {
  const res = await fetch(`${API_BASE}/urgency-request/${requestId}/allot-doctor`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ doctorId, slotTime })
  });
  if (!res.ok) throw new Error('Failed to allot doctor');
  return res.json();
};
