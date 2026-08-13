import React, { useState, useEffect } from 'react';
import { User, Sparkles, Building2, Search, BedDouble, Calendar, CheckCircle2, ArrowRight, ShieldAlert, HeartPulse, Clock } from 'lucide-react';
import { predictDisease, fetchHospitals, fetchHospitalSeats, createUrgencyRequest } from '../../services/smartcareApi';
import { useSocket } from '../../context/SocketContext';

export const PatientFlowWizard = () => {
  const [step, setStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState({ name: 'Alex Johnson', email: 'alex@example.com' });
  const [symptomsText, setSymptomsText] = useState('Severe crushing chest pain radiating to left arm with shortness of breath and sweating');
  const [painLevel, setPainLevel] = useState(8);

  const [aiResult, setAiResult] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [finalTicket, setFinalTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  const { socket, joinPatientTracker } = useSocket();

  // Step 2: Run AI System Disease Prediction
  const handleRunAI = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await predictDisease({ symptomsText, painLevel });
      setAiResult(data.prediction);
      await loadHospitals('');
      setStep(3); // Move to List of Hospital
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Search Hospitals
  const loadHospitals = async (q) => {
    try {
      const data = await fetchHospitals(q);
      setHospitals(data.hospitals || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectHospital = async (hosp) => {
    setSelectedHospital(hosp);
    try {
      const data = await fetchHospitalSeats(hosp.id);
      setSeats(data.seats || []);
      setStep(4); // Move to Categorization & Disease Breakdown
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectSeat = (seat) => {
    setSelectedSeat(seat);
  };

  // Step 5 -> 6: Submit Urgency Request to Hospital Flow
  const handleSubmitUrgencyRequest = async () => {
    if (!selectedHospital || !selectedSeat) return;
    setLoading(true);
    try {
      const res = await createUrgencyRequest({
        patientName: patientInfo.name,
        symptomsText,
        diseasePrediction: aiResult.primaryPrediction.name,
        hospitalId: selectedHospital.id,
        seatId: selectedSeat.id,
        seatName: selectedSeat.name
      });
      setFinalTicket(res.request);
      joinPatientTracker(res.request.requestId);
      setStep(6); // Move to Allotted Slot, Time & Doctor Ticket
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Socket listener for live status updates from Hospital Flow
  useEffect(() => {
    if (!finalTicket?.requestId || !socket) return;

    function onStatusChange(data) {
      if (data.requestId === finalTicket.requestId) {
        setFinalTicket(prev => ({
          ...prev,
          status: data.status,
          allottedDoctor: data.allottedDoctor || prev.allottedDoctor,
          slotTime: data.slotTime || prev.slotTime
        }));
      }
    }

    socket.on('patient:status_changed', onStatusChange);
    return () => socket.off('patient:status_changed', onStatusChange);
  }, [finalTicket?.requestId, socket]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Wizard Progress Bar */}
      <div className="glass-panel p-4 flex items-center justify-between">
        {[
          { num: 1, title: 'Patient Login' },
          { num: 2, title: 'AI System Suggest' },
          { num: 3, title: 'List of Hospital' },
          { num: 4, title: 'Disease Categorization' },
          { num: 5, title: 'Hospital Seat Name' },
          { num: 6, title: 'Allotted Slot & Doctor' }
        ].map((item) => (
          <div key={item.num} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center transition ${
                step === item.num
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                  : step > item.num
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              {step > item.num ? '✓' : item.num}
            </div>
            <span className={`text-xs font-semibold hidden md:inline ${step === item.num ? 'text-white' : 'text-slate-500'}`}>
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: PATIENT LOGIN */}
      {step === 1 && (
        <div className="glass-panel p-6 max-w-lg mx-auto space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <User className="text-cyan-400" size={24} />
            <div>
              <h2 className="text-xl font-bold text-white">Step 1: Patient Login</h2>
              <p className="text-xs text-slate-400">Enter your credentials to begin intake.</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              value={patientInfo.name}
              onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Email Address</label>
            <input
              type="email"
              value={patientInfo.email}
              onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
            />
          </div>

          <button onClick={() => setStep(2)} className="btn-primary w-full mt-2">
            Proceed to AI System <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* STEP 2: AI SYSTEM TO DEFINE / SUGGEST */}
      {step === 2 && (
        <div className="glass-panel p-6 max-w-xl mx-auto space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <Sparkles className="text-cyan-400 animate-pulse" size={24} />
            <div>
              <h2 className="text-xl font-bold text-white">Step 2: AI System to Define/Suggest</h2>
              <p className="text-xs text-slate-400">Describe symptoms for AI disease prediction.</p>
            </div>
          </div>

          <form onSubmit={handleRunAI} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Describe Natural Language Symptoms</label>
              <textarea
                rows={3}
                value={symptomsText}
                onChange={(e) => setSymptomsText(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-400">Pain Scale (1 to 10)</label>
                <span className="font-bold text-cyan-400">{painLevel} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Analyzing Symptoms...' : 'Run AI Prediction & Find Hospitals'}
            </button>
          </form>
        </div>
      )}

      {/* STEP 3: LIST OF HOSPITAL (WITH SEARCH BAR) */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="glass-panel p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="text-cyan-400" size={24} />
              <div>
                <h2 className="text-lg font-bold text-white">Step 3: List of Hospitals</h2>
                <p className="text-xs text-slate-400">Select a hospital matching your suggested medical specialty.</p>
              </div>
            </div>

            <div className="w-72 relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search hospital by name or specialty..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  loadHospitals(e.target.value);
                }}
                className="pl-9 text-xs"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {hospitals.map((hosp) => (
              <div
                key={hosp.id}
                onClick={() => handleSelectHospital(hosp)}
                className="glass-panel p-5 cursor-pointer hover:border-cyan-500/50 transition flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg text-white">{hosp.name}</h3>
                  <p className="text-xs text-slate-400 mb-2">{hosp.location} • {hosp.distanceKm} km away</p>
                  <div className="flex gap-2">
                    {hosp.specialties.map(spec => (
                      <span key={spec} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold uppercase block text-slate-400">Available Beds</span>
                  <span className="text-2xl font-black text-emerald-400">{hosp.availableBeds}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: CATEGORIZATION AND PREDICTION OF SPECIFIC DISEASES */}
      {step === 4 && aiResult && (
        <div className="glass-panel p-6 space-y-6">
          <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">Step 4: AI Disease Categorization</span>
              <h2 className="text-2xl font-black text-white">{aiResult.primaryPrediction.name}</h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-bold uppercase">
              {aiResult.severity} Urgency
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block font-semibold mb-1">AI Prediction Confidence</span>
              <span className="text-3xl font-extrabold text-cyan-400">{(aiResult.primaryPrediction.confidence * 100).toFixed(0)}%</span>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block font-semibold mb-1">Recommended Department</span>
              <span className="text-xl font-bold text-white">{aiResult.suggestedSpecialty}</span>
            </div>
          </div>

          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase block mb-2">Recommended Pre-Intake Actions</span>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
              {aiResult.recommendedActions.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setStep(3)} className="w-1/3 py-2.5 rounded-lg border border-slate-700 text-xs font-semibold">
              Back to Hospitals
            </button>
            <button onClick={() => setStep(5)} className="btn-primary w-2/3">
              Proceed to Select Hospital Seat Name <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: LIST OF HOSPITAL SEAT NAME */}
      {step === 5 && (
        <div className="glass-panel p-6 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs text-slate-400 font-mono">SELECTED: {selectedHospital?.name}</span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BedDouble className="text-cyan-400" /> Step 5: List of Hospital Seat Names
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {seats.map((seat) => (
              <div
                key={seat.id}
                onClick={() => !seat.isOccupied && handleSelectSeat(seat)}
                className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                  seat.isOccupied
                    ? 'bg-slate-950/60 border-slate-800 opacity-50 cursor-not-allowed'
                    : selectedSeat?.id === seat.id
                    ? 'bg-cyan-500/20 border-cyan-500 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <h4 className="font-bold text-white text-sm">{seat.name}</h4>
                  <span className="text-xs text-slate-400">Type: {seat.type}</span>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded font-bold ${
                    seat.isOccupied
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {seat.isOccupied ? 'Occupied' : 'Available'}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmitUrgencyRequest}
            disabled={!selectedSeat || loading}
            className="btn-primary w-full text-base py-3"
          >
            {loading ? 'Submitting Urgency Request...' : 'Confirm Seat & Request Hospital Registration'}
          </button>
        </div>
      )}

      {/* STEP 6: ALLOTTED SLOT, TIME AND DOCTOR */}
      {step === 6 && finalTicket && (
        <div className="glass-panel p-6 max-w-lg mx-auto space-y-6 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>

          <div>
            <span className="text-xs text-slate-400 font-mono">REQUEST ID: {finalTicket.requestId}</span>
            <h2 className="text-2xl font-black text-white">Step 6: Allotted Slot, Time & Doctor</h2>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3 text-left">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-xs text-slate-400 font-semibold">Registration Status</span>
              <span className="text-xs px-2.5 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {finalTicket.status}
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-xs text-slate-400 font-semibold">Hospital Seat Name</span>
              <span className="text-sm font-bold text-white">{finalTicket.seatName}</span>
            </div>

            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-xs text-slate-400 font-semibold">Allotted Doctor</span>
              <span className="text-sm font-bold text-cyan-400">
                {finalTicket.allottedDoctor || 'Assigning Doctor...'}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-slate-400 font-semibold">Scheduled Slot Time</span>
              <span className="text-sm font-bold text-emerald-400">
                {finalTicket.slotTime || 'Slot A-101 (Immediate)'}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Real-time updates enabled. As hospital staff registers your record or re-assigns doctors, this ticket updates automatically.
          </p>
        </div>
      )}
    </div>
  );
};
