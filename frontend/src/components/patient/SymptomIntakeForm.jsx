import React, { useState } from 'react';
import { Sparkles, HeartPulse, Send, Thermometer, Activity, AlertCircle } from 'lucide-react';
import { submitTriageIntake } from '../../services/api';

export const SymptomIntakeForm = ({ onIntakeSubmitted }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    symptomsText: '',
    painLevel: 5,
    heartRate: '85',
    oxygenSat: '98',
    temperature: '37.0',
    medicalHistory: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.symptomsText.trim()) {
      setError('Please describe your current symptoms');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const payload = {
        patientName: formData.patientName || 'Patient Walk-In',
        symptomsText: formData.symptomsText,
        painLevel: Number(formData.painLevel),
        vitals: {
          heartRate: formData.heartRate,
          oxygenSat: formData.oxygenSat,
          temperature: formData.temperature
        },
        medicalHistory: formData.medicalHistory ? formData.medicalHistory.split(',') : []
      };

      const result = await submitTriageIntake(payload);
      onIntakeSubmitted(result);
    } catch (err) {
      setError(err.message || 'Failed to submit intake');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Emergency AI Triage Intake</h2>
          <p className="text-sm text-slate-400">
            Submit your symptoms and vital signs for real-time AI emergency level scoring.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Patient Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. John Smith"
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Describe Your Symptoms (Natural Language) *
          </label>
          <textarea
            rows={3}
            placeholder="e.g., Severe crushing chest pain radiating to left arm with shortness of breath..."
            value={formData.symptomsText}
            onChange={(e) => setFormData({ ...formData, symptomsText: e.target.value })}
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pain Scale (1 to 10)
            </label>
            <span className="font-extrabold text-cyan-400 text-lg">{formData.painLevel} / 10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.painLevel}
            onChange={(e) => setFormData({ ...formData, painLevel: e.target.value })}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          <div>
            <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
              <HeartPulse size={12} className="text-red-400" /> Heart Rate (BPM)
            </label>
            <input
              type="number"
              value={formData.heartRate}
              onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
              <Activity size={12} className="text-cyan-400" /> SpO2 (%)
            </label>
            <input
              type="number"
              value={formData.oxygenSat}
              onChange={(e) => setFormData({ ...formData, oxygenSat: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
              <Thermometer size={12} className="text-amber-400" /> Temp (°C)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.temperature}
              onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Medical History / Known Conditions (Comma separated)
          </label>
          <input
            type="text"
            placeholder="e.g. Hypertension, Diabetes, Asthma"
            value={formData.medicalHistory}
            onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-4 text-base py-3"
        >
          {loading ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <>
              <Send size={18} /> Run AI Triage & Enter Emergency Queue
            </>
          )}
        </button>
      </form>
    </div>
  );
};
