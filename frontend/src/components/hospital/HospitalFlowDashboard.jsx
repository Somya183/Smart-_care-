import React, { useEffect, useState } from 'react';
import { Building2, Bell, CheckCircle2, UserCheck, BedDouble, Users, RefreshCw, Stethoscope, AlertTriangle } from 'lucide-react';
import { fetchUrgencyRequests, acceptUrgencyRequest, allotDoctorAndSlot, fetchHospitalSeats } from '../../services/smartcareApi';
import { useSocket } from '../../context/SocketContext';

export const HospitalFlowDashboard = () => {
  const [activeTab, setActiveTab] = useState('urgency');
  const [requests, setRequests] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket, joinDepartment } = useSocket();

  const hospitalId = 'hosp_101'; // Default active hospital demo

  const loadData = async () => {
    try {
      setLoading(true);
      const reqRes = await fetchUrgencyRequests(hospitalId);
      setRequests(reqRes.requests || []);

      const seatRes = await fetchHospitalSeats(hospitalId);
      setSeats(seatRes.seats || []);
    } catch (err) {
      console.error('Error loading hospital data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    joinDepartment(hospitalId);

    function onNewCase(newCase) {
      console.log('[Socket] New urgency request received:', newCase);
      setRequests(prev => [newCase, ...prev]);
    }

    if (socket) {
      socket.on('triage:new_case', onNewCase);
    }

    return () => {
      if (socket) socket.off('triage:new_case', onNewCase);
    };
  }, [socket]);

  // Step 5: Accept Request & Register Patient
  const handleAcceptRequest = async (requestId) => {
    try {
      await acceptUrgencyRequest(requestId);
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Step 7: Allot Doctor & Slot Time
  const handleAllotDoctor = async (requestId) => {
    try {
      await allotDoctorAndSlot(requestId, 'doc_201', 'Slot A-101 (Immediate)');
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Hospital Login info */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs text-emerald-400 font-mono">HOSPITAL LOGIN: City Care General (ID: {hospitalId})</span>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Building2 className="text-emerald-400" /> Hospital Staff Control Portal
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('urgency')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'urgency' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bell size={14} /> Urgency Requests ({requests.length})
          </button>

          <button
            onClick={() => setActiveTab('patients')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'patients' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users size={14} /> Patient Directory
          </button>

          <button
            onClick={() => setActiveTab('beds')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'beds' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BedDouble size={14} /> Live Bed Manager
          </button>
        </div>
      </div>

      {/* STEP 4 & 5: URGENCY REQUEST INBOX & ACCEPTANCE */}
      {activeTab === 'urgency' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="text-amber-400" size={18} /> Real-Time Urgency Requests
          </h3>

          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="glass-panel p-8 text-center text-slate-400">
              No pending urgency requests right now.
            </div>
          ) : (
            <div className="grid gap-4">
              {requests.map((req) => (
                <div key={req.requestId} className="glass-panel p-5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-lg text-white">{req.patientName}</h4>
                      <span className="text-xs px-2.5 py-0.5 rounded font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {req.diseasePrediction}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-2">
                      Requested Seat: <strong className="text-white">{req.seatName}</strong> • Status: <strong className="text-amber-400">{req.status}</strong>
                    </p>
                    <p className="text-xs text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800">
                      "{req.symptomsText}"
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {req.status === 'PENDING' && (
                      <button
                        onClick={() => handleAcceptRequest(req.requestId)}
                        className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 flex items-center gap-1.5 transition"
                      >
                        <CheckCircle2 size={14} /> Accept Request & Register
                      </button>
                    )}

                    {req.status === 'ACCEPTED' && (
                      <button
                        onClick={() => handleAllotDoctor(req.requestId)}
                        className="px-4 py-2 rounded-lg bg-cyan-600 text-white font-bold text-xs hover:bg-cyan-500 flex items-center gap-1.5 transition"
                      >
                        <Stethoscope size={14} /> Allot Doctor & Assign Slot
                      </button>
                    )}

                    {req.status === 'DOCTOR_ALLOTTED' && (
                      <span className="text-xs px-3 py-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-center">
                        Registered & Doctor Allotted ({req.allottedDoctor})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* STEP 2 & 6: REGISTER PATIENT DIRECTORY */}
      {activeTab === 'patients' && (
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="text-cyan-400" size={18} /> Registered Patient Records
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Predicted Condition</th>
                  <th className="p-3">Assigned Seat</th>
                  <th className="p-3">Allotted Doctor</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.requestId} className="border-b border-slate-800/60 hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-white">{r.patientName}</td>
                    <td className="p-3">{r.diseasePrediction}</td>
                    <td className="p-3">{r.seatName}</td>
                    <td className="p-3 text-cyan-400">{r.allottedDoctor || 'Pending Assignment'}</td>
                    <td className="p-3 font-bold text-emerald-400">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STEP 3 & 8: HOSPITAL AVAILABLE BEDS & SEAT UPDATE */}
      {activeTab === 'beds' && (
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BedDouble className="text-emerald-400" size={18} /> Real-Time Hospital Seat & Bed Layout
          </h3>

          <div className="grid grid-cols-3 gap-4">
            {seats.map((s) => (
              <div
                key={s.id}
                className={`p-4 rounded-xl border flex items-center justify-between ${
                  s.isOccupied
                    ? 'bg-red-500/10 border-red-500/30 text-red-300'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm text-white">{s.name}</h4>
                  <span className="text-xs opacity-75">Type: {s.type}</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded font-bold uppercase border">
                  {s.isOccupied ? 'Occupied' : 'Available'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
