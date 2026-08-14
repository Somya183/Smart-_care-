import React, { useState, useEffect } from 'react';
import { PatientAuthPage } from './PatientAuthPage';
import { Sparkles, Building2, Search, BedDouble, CheckCircle2, ArrowRight, ShieldAlert, HeartPulse, Clock, FileText, User } from 'lucide-react';
import { predictDisease, fetchHospitals, fetchHospitalSeats, createUrgencyRequest } from '../../services/smartcareApi';
import { useSocket } from '../../context/SocketContext';

export const PatientFlowWizard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patientUser, setPatientUser] = useState(null);

  const [step, setStep] = useState(1);
  const [symptomsText, setSymptomsText] = useState(
    'E.g., I woke up with a sharp pain in my lower right abdomen that has been getting worse over the last 3 hours...'
  );
  const [painLevel, setPainLevel] = useState(7);

  const [aiResult, setAiResult] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [finalTicket, setFinalTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  const { socket, joinPatientTracker } = useSocket();

  const handleAuthSuccess = (user) => {
    setPatientUser(user);
    setIsAuthenticated(true);
  };

  const handleGuestIntake = () => {
    setPatientUser({ name: 'Guest Patient', email: 'guest@smartcare.org', dob: '01/01/1990' });
    setIsAuthenticated(true);
  };

  // Run AI System Disease Prediction
  const handleRunAI = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const data = await predictDisease({ symptomsText, painLevel });
      setAiResult(data.prediction);
      await loadHospitals('');
      setStep(2); // Move to Hospitals & Disease Breakdown
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search Hospitals
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
      setStep(3); // Move to Seat Selector
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Urgency Request to Hospital Flow
  const handleSubmitUrgencyRequest = async () => {
    if (!selectedHospital || !selectedSeat) return;
    setLoading(true);
    try {
      const res = await createUrgencyRequest({
        patientName: patientUser?.name || 'John Doe',
        symptomsText,
        diseasePrediction: aiResult?.primaryPrediction?.name || 'Acute Abdomen',
        hospitalId: selectedHospital.id,
        seatId: selectedSeat.id,
        seatName: selectedSeat.name
      });
      setFinalTicket(res.request);
      joinPatientTracker(res.request.requestId);
      setStep(4); // Ticket summary
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Render Login & Signup Page if not authenticated yet
  if (!isAuthenticated) {
    return (
      <PatientAuthPage
        onAuthSuccess={handleAuthSuccess}
        onGuestIntake={handleGuestIntake}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Patient User Header Card */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <User size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">{patientUser?.name}</h3>
            <p className="text-xs text-slate-500 font-medium">{patientUser?.email}</p>
          </div>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 underline"
        >
          Switch Account
        </button>
      </div>

      {/* STEP 1: Matching Screenshot 4 (Triage Progress Sidebar + Main Intake Card) */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Left Stepper Card (Triage Progress) */}
          <div className="md:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-5">
            <h3 className="font-bold text-slate-900 text-sm">Triage Progress</h3>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              
              {/* Item 1 */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-xs text-blue-900 leading-tight">Symptom Description</h4>
                  <span className="text-[11px] text-blue-600 font-semibold">In Progress</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 border border-slate-300 font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-500 leading-tight">Medical History</h4>
                  <span className="text-[11px] text-slate-400 font-medium">Pending</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 border border-slate-300 font-bold text-xs flex items-center justify-center">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-500 leading-tight">Review & Submit</h4>
                </div>
              </div>

            </div>
          </div>

          {/* Main Card (Step 1: Symptom Description) */}
          <div className="md:col-span-8 bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-6">
            
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Step 1: Symptom Description
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Please describe your symptoms in detail. This helps our AI prioritize your care.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-slate-900">What brings you in today?</h3>

              {/* Prompt Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Helpful prompts:</span>
                <button
                  type="button"
                  onClick={() => setSymptomsText(prev => prev + ' Started 2 hours ago.')}
                  className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 font-medium transition"
                >
                  When did it start?
                </button>
                <button
                  type="button"
                  onClick={() => setSymptomsText(prev => prev + ' It is getting progressively worse.')}
                  className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 font-medium transition"
                >
                  Is it getting worse?
                </button>
                <button
                  type="button"
                  onClick={() => setSymptomsText(prev => prev + ' Experiencing mild chest tightness.')}
                  className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 font-medium transition"
                >
                  Any chest pain?
                </button>
              </div>

              {/* Main Textarea */}
              <textarea
                rows={5}
                value={symptomsText}
                onChange={(e) => setSymptomsText(e.target.value)}
                className="w-full text-sm text-slate-800 p-3.5 bg-white border border-slate-300 rounded-xl focus:border-blue-700 focus:outline-none"
              />
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-5">
              <button
                type="button"
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                Save Draft
              </button>

              <button
                type="button"
                onClick={handleRunAI}
                disabled={loading}
                className="btn-blue px-6 py-2.5 text-xs font-bold shadow-xs flex items-center gap-2"
              >
                {loading ? 'Processing AI...' : 'Next Step →'}
              </button>
            </div>

          </div>

        </div>
      )}

      {/* STEP 2: AI Predictions & Hospital Selection */}
      {step === 2 && (
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">AI Diagnosis & Triage</span>
              <h2 className="text-2xl font-black text-slate-900">Recommended Hospitals</h2>
            </div>

            {aiResult && (
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs">
                {aiResult.severity} Level Assessment
              </span>
            )}
          </div>

          <div className="grid gap-4">
            {hospitals.map((hosp) => (
              <div
                key={hosp.id}
                onClick={() => handleSelectHospital(hosp)}
                className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-blue-500 cursor-pointer transition flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-base text-slate-900">{hosp.name}</h3>
                  <p className="text-xs text-slate-500 mb-2">{hosp.location} &bull; {hosp.distanceKm} km away</p>
                  <div className="flex gap-2">
                    {hosp.specialties.map(spec => (
                      <span key={spec} className="text-xs px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold uppercase block text-slate-500">Available Beds</span>
                  <span className="text-2xl font-black text-emerald-600">{hosp.availableBeds}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Select Bed / Seat */}
      {step === 3 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase">Selected: {selectedHospital?.name}</span>
            <h2 className="text-xl font-black text-slate-900">Select Available Hospital Seat / Bed</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {seats.map((seat) => (
              <div
                key={seat.id}
                onClick={() => !seat.isOccupied && setSelectedSeat(seat)}
                className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                  seat.isOccupied
                    ? 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed'
                    : selectedSeat?.id === seat.id
                    ? 'bg-blue-50 border-blue-600 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{seat.name}</h4>
                  <span className="text-xs text-slate-500">Type: {seat.type}</span>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded font-bold ${
                    seat.isOccupied
                      ? 'bg-red-100 text-red-800'
                      : 'bg-emerald-100 text-emerald-800'
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
            className="btn-blue w-full py-3 text-sm font-bold"
          >
            {loading ? 'Submitting Urgency Request...' : 'Confirm Seat & Proceed to Ticket'}
          </button>
        </div>
      )}

      {/* STEP 4: Allotted Ticket */}
      {step === 4 && finalTicket && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-lg mx-auto text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300">
            <CheckCircle2 size={28} />
          </div>

          <div>
            <span className="text-xs text-slate-400 font-mono">REQUEST ID: {finalTicket.requestId}</span>
            <h2 className="text-2xl font-black text-slate-900">Ticket Allotted</h2>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-left space-y-3">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-xs text-slate-500 font-semibold">Seat Name</span>
              <span className="text-sm font-bold text-slate-900">{finalTicket.seatName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-500 font-semibold">Assigned Doctor</span>
              <span className="text-sm font-bold text-blue-700">{finalTicket.allottedDoctor || 'Dr. Henderson'}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
