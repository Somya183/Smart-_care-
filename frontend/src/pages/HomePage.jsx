import React from 'react';
import { User, Building2, Sparkles, ArrowRight, ShieldCheck, Activity, BedDouble, Stethoscope, Bell } from 'lucide-react';

export const HomePage = ({ onSelectFlow }) => {
  return (
    <div className="space-y-10 py-4 max-w-5xl mx-auto">
      {/* Header Hub Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Sparkles size={14} /> AI System for Hospital Disease Prediction & Interaction
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Smart<span className="text-cyan-400">Care</span> Unified Health Platform
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          Seamless end-to-end integration between AI-based Patient Disease Prediction & Intake and Hospital Seat Allocation & Urgency Response.
        </p>
      </div>

      {/* Shared Hub Choice Cards */}
      <div className="grid grid-cols-2 gap-8">
        {/* Patient Flow Card */}
        <div
          onClick={() => onSelectFlow('patient')}
          className="glass-panel p-8 cursor-pointer hover:border-cyan-500/50 hover:shadow-cyan-500/10 hover:shadow-2xl transition group relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 border border-cyan-500/30 group-hover:scale-110 transition">
            <User size={32} />
          </div>

          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            Patient Portal
          </span>
          <h2 className="text-2xl font-bold text-white mb-3">Patient Flow Workflow</h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            Log in, input symptoms to get AI disease prediction & categorization, search hospitals, choose available bed/seat names, and receive allotted slot, time & doctor ticket.
          </p>

          <div className="space-y-2 border-t border-slate-800/80 pt-4 mb-6">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Sparkles size={14} className="text-cyan-400" /> AI System to define/suggest disease
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Building2 size={14} className="text-blue-400" /> Searchable List of Hospitals
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <BedDouble size={14} className="text-emerald-400" /> Interactive Hospital Seat Name Selector
            </div>
          </div>

          <div className="flex items-center text-cyan-400 font-bold text-sm group-hover:translate-x-2 transition">
            Enter Patient Flow <ArrowRight size={16} className="ml-2" />
          </div>
        </div>

        {/* Hospital Flow Card */}
        <div
          onClick={() => onSelectFlow('hospital')}
          className="glass-panel p-8 cursor-pointer hover:border-emerald-500/50 hover:shadow-emerald-500/10 hover:shadow-2xl transition group relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/30 group-hover:scale-110 transition">
            <Building2 size={32} />
          </div>

          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
            Hospital Portal
          </span>
          <h2 className="text-2xl font-bold text-white mb-3">Hospital Flow Workflow</h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            Hospital login, manage patient database, monitor available beds in real-time, accept urgency requests, register patients, and allot doctors & update seat counts.
          </p>

          <div className="space-y-2 border-t border-slate-800/80 pt-4 mb-6">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Bell size={14} className="text-amber-400" /> Real-time Urgency Request Alerts
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck size={14} className="text-emerald-400" /> Accept Request & Register Patient
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Stethoscope size={14} className="text-cyan-400" /> Doctor Allocation & Seat Sync
            </div>
          </div>

          <div className="flex items-center text-emerald-400 font-bold text-sm group-hover:translate-x-2 transition">
            Enter Hospital Flow <ArrowRight size={16} className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
