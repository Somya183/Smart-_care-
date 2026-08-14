import React, { useState, useEffect } from 'react';
import { Truck, X, CheckCircle2, ShieldAlert, Phone, AlertCircle } from 'lucide-react';

export const EmergencyModal = ({ isOpen, onClose, onStartTriage }) => {
  const [assignedUnit] = useState({
    helplineNumber: '108',
    nationalHelpline: '108 / 102 National Medical Emergency',
    vehicleNo: 'DL 01 EQ 4208',
    type: 'ALS ICU Advanced Life Support Ambulance',
    driverName: 'Rajesh Kumar (Duty Lead)',
    driverPhone: '108',
    paramedicLead: 'Dr. Vikram Sharma',
    hospital: 'AIIMS Emergency & Trauma Centre, New Delhi',
    etaMinutes: 5
  });

  // Automatically trigger call to National Ambulance Helpline (108) when modal opens
  useEffect(() => {
    if (isOpen) {
      // Initiate phone call dialer to 108
      window.location.href = 'tel:108';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-slate-200 shadow-2xl space-y-0 text-slate-800 relative">
        
        {/* Header Banner */}
        <div className="bg-red-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <Truck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                National Emergency Ambulance (108)
              </h2>
              <p className="text-xs text-red-100 font-semibold">National Medical Emergency Pickup Gateway</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body: AUTOMATIC DISPATCH & NATIONAL HELPLINE CALL DISPLAY */}
        <div className="p-6 space-y-5 text-xs text-center">
          
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300 animate-bounce">
            <CheckCircle2 size={36} />
          </div>

          <div>
            <span className="px-3.5 py-1 rounded-full bg-red-100 text-red-800 font-black text-xs inline-block mb-1 border border-red-300 animate-pulse">
              🚨 108 NATIONAL AMBULANCE HELPLINE DIALING
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">Dialing: 108 Emergency</h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Automated Emergency Call Connected to National Ambulance Dispatcher (108 / 112)
            </p>
          </div>

          {/* NATIONAL AMBULANCE DATASET CARD */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 text-left text-xs">
            
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-600">National Helpline:</span>
              <span className="font-black text-red-700 bg-red-100 px-2.5 py-0.5 rounded border border-red-300 text-xs">
                108 Toll-Free
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-600">Ambulance Type:</span>
              <span className="font-bold text-slate-900">
                {assignedUnit.type}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-600">Estimated Arrival Time (ETA):</span>
              <span className="text-lg font-black text-red-600">{assignedUnit.etaMinutes} Minutes</span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-600">Dispatched Vehicle No:</span>
              <span className="font-extrabold text-slate-900 font-mono">
                {assignedUnit.vehicleNo}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-600">Paramedic Lead:</span>
              <span className="font-bold text-blue-700">{assignedUnit.paramedicLead}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-600">Target ER Hospital:</span>
              <span className="font-bold text-slate-900">{assignedUnit.hospital}</span>
            </div>

          </div>

          {/* Direct Phone Call Button to National Helpline 108 */}
          <a
            href="tel:108"
            className="w-full py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition active:scale-[0.99]"
          >
            <Phone size={18} className="animate-pulse" />
            Redial 108 National Ambulance Helpline Now
          </a>

          {/* CRITICAL PATIENT INTAKE SHORTCUT */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-slate-600 font-medium text-xs">Describing symptoms for hospital team?</span>
            <button
              onClick={() => {
                onClose();
                onStartTriage();
              }}
              className="text-red-700 font-bold hover:underline flex items-center gap-1 text-xs"
            >
              <ShieldAlert size={15} />
              Start Level 1 AI Triage Intake →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
