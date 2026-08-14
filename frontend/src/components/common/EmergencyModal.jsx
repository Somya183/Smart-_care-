import React, { useState } from 'react';
import { Truck, X, MapPin, CheckCircle2, ShieldAlert, Phone, Navigation, Home, Building, Plus } from 'lucide-react';

export const EmergencyModal = ({ isOpen, onClose, onStartTriage }) => {
  const [ambulanceStatus, setAmbulanceStatus] = useState('idle'); // 'idle' | 'dispatched'
  
  // Address Form State
  const [addressType, setAddressType] = useState('home'); // 'home' | 'work' | 'custom'
  const [customAddress, setCustomAddress] = useState('Flat 402, Block B, Green Park Extension, New Delhi - 110016');
  const [landmark, setLandmark] = useState('Near Metro Station Gate No. 2');

  const [assignedUnit, setAssignedUnit] = useState({
    vehicleNo: 'DL 01 EQ 4208',
    type: 'ALS ICU Advanced Life Support Ambulance',
    driverName: 'Rajesh Kumar',
    driverPhone: '+91 98765 43210',
    paramedicLead: 'Dr. Vikram Sharma',
    hospital: 'AIIMS Emergency & Trauma Centre, New Delhi',
    etaMinutes: 5
  });

  if (!isOpen) return null;

  const handleAutoDetectGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCustomAddress(`GPS Location Pin (${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E), New Delhi`);
        },
        (error) => {
          console.log('GPS Geolocation error:', error);
        }
      );
    }
  };

  const handleCallAmbulance = () => {
    setAmbulanceStatus('dispatched');
  };

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
                National Emergency Ambulance (108 / 102)
              </h2>
              <p className="text-xs text-red-100 font-semibold">SmartCare Rapid Ambulance Pickup Gateway</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs">

          {/* IDLE STATE: ADD EMERGENCY ADDRESS & DISPATCH BUTTON */}
          {ambulanceStatus === 'idle' && (
            <>
              {/* DISPATCH AMBULANCE BUTTON */}
              <div className="space-y-2">
                <label className="font-bold text-slate-900 text-xs block uppercase tracking-wider text-slate-500">
                  Immediate 108 Emergency Ambulance Dispatch
                </label>
                
                <button
                  onClick={handleCallAmbulance}
                  className="w-full p-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm flex items-center justify-between shadow-lg shadow-red-600/30 transition active:scale-[0.99] group"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
                      <Truck size={22} />
                    </div>
                    <div>
                      <span className="block text-base leading-tight">Call & Dispatch Ambulance Now</span>
                      <span className="text-[11px] text-red-100 font-medium">Dispatches nearest 108 / 102 ALS Unit</span>
                    </div>
                  </div>
                  <span className="bg-white text-red-700 font-black px-3 py-1.5 rounded-lg text-xs tracking-wider">
                    108 DISPATCH
                  </span>
                </button>
              </div>

              {/* CRITICAL PATIENT INTAKE SHORTCUT */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 font-medium">Able to describe symptoms?</span>
                <button
                  onClick={() => {
                    onClose();
                    onStartTriage();
                  }}
                  className="text-red-700 font-bold hover:underline flex items-center gap-1"
                >
                  <ShieldAlert size={14} />
                  Start Level 1 AI Triage Intake →
                </button>
              </div>
            </>
          )}

          {/* DISPATCHED STATE: SHOW LIVE INDIAN AMBULANCE DATA & TRACKER */}
          {ambulanceStatus === 'dispatched' && (
            <div className="space-y-5 text-center py-1">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300 animate-bounce">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 font-extrabold text-xs inline-block mb-1 border border-red-300">
                  108 AMBULANCE DISPATCHED & EN ROUTE
                </span>
                <h3 className="text-2xl font-black text-slate-900">Vehicle No: {assignedUnit.vehicleNo}</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Pickup Address Confirmed • Driver En Route
                </p>
              </div>



              {/* INDIAN AMBULANCE DATASET CARD */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 text-left text-xs">
                
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-600">Ambulance Type:</span>
                  <span className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    {assignedUnit.type}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-600">Estimated Arrival Time (ETA):</span>
                  <span className="text-lg font-black text-red-600">{assignedUnit.etaMinutes} Minutes</span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-600">Ambulance Driver:</span>
                  <span className="font-extrabold text-slate-900 flex items-center gap-1">
                    {assignedUnit.driverName} <span className="text-blue-700 font-bold">({assignedUnit.driverPhone})</span>
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

              {/* Driver Call Action */}
              <a
                href={`tel:${assignedUnit.driverPhone}`}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition"
              >
                <Phone size={16} />
                Call Ambulance Driver Now ({assignedUnit.driverName})
              </a>

              {/* Reset / Done Button */}
              <button
                onClick={() => setAmbulanceStatus('idle')}
                className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition text-xs"
              >
                Back to Address Options
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
