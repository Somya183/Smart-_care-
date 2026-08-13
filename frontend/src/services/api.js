const API_BASE = 'http://localhost:5000/api/v1';

export const submitTriageIntake = async (intakeData) => {
  const response = await fetch(`${API_BASE}/triage/assess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(intakeData)
  });
  if (!response.ok) {
    throw new Error('Failed to submit triage intake');
  }
  return response.json();
};

export const fetchDepartmentQueue = async (deptId = '') => {
  const response = await fetch(`${API_BASE}/queue/department/${deptId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch department queue');
  }
  return response.json();
};

export const updateQueueStatus = async (queueId, newStatus) => {
  const response = await fetch(`${API_BASE}/queue/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ queueId, newStatus })
  });
  if (!response.ok) {
    throw new Error('Failed to update patient status');
  }
  return response.json();
};
