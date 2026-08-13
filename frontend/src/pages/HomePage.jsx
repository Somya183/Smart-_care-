import React from 'react';
import { User, Stethoscope, MapPin, ArrowRight, Activity, Building2, ShieldCheck, Sparkles } from 'lucide-react';

export const HomePage = ({ onSelectFlow }) => {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Outer Window Container Card matching the design frame */}
      <div className="bg-slate-50 text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200/80">
        
        {/* Top Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          
          {/* Left Column: Hero Text & Info */}
          <div className="lg:col-span-6 space-y-5">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-semibold">
              <MapPin size={14} className="text-blue-600" />
              <span>AI-Powered Triage Active</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Smarter Care.<br />
              <span className="text-blue-700">Faster Triage.</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              SmartCare utilizes advanced AI to prioritize patient care, stream real-time vital data, and optimize clinical workflows for better outcomes.
            </p>
          </div>

          {/* Right Column: Hero Visual Banner Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
              {/* Main Image */}
              <img
                src="/smartcare_hero_hospital.jpg"
                alt="SmartCare Smart Hospital Corridor"
                className="w-full h-[280px] sm:h-[320px] object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Title overlay in top center of image */}
              <div className="absolute top-6 left-0 right-0 text-center">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 drop-shadow-md tracking-tight bg-white/60 backdrop-blur-sm inline-block px-6 py-1.5 rounded-full border border-white/40">
                  SmartCare
                </h3>
              </div>

              {/* Floating System Status Box at bottom left */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/80 shadow-md">
                <p className="text-[10px] font-bold tracking-wider uppercase text-blue-700 mb-0.5">
                  System Status
                </p>
                <p className="text-sm font-extrabold text-slate-900">
                  Triage Efficiency: <span className="text-blue-600">98.4%</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Card 1: Patient Portal */}
          <div
            onClick={() => onSelectFlow('patient')}
            className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Icon Box */}
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-5 shadow-md shadow-blue-500/20 group-hover:scale-110 transition">
                <User size={24} />
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition">
                Patient Portal
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                Report symptoms, check-in securely, and view your real-time wait status before arriving at the ER.
              </p>
            </div>

            {/* Action Link */}
            <div className="flex items-center text-blue-600 font-bold text-xs sm:text-sm group-hover:translate-x-1 transition">
              <span>Start Check-in</span>
              <ArrowRight size={16} className="ml-1.5" />
            </div>
          </div>

          {/* Card 2: Hospital Staff */}
          <div
            onClick={() => onSelectFlow('hospital')}
            className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Icon Box */}
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-blue-700 flex items-center justify-center mb-5 border border-slate-200 group-hover:scale-110 transition">
                <Stethoscope size={24} />
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition">
                Hospital Staff
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                Access the clinical dashboard, manage live triage queues, and monitor ambulance ETAs in real-time.
              </p>
            </div>

            {/* Action Link */}
            <div className="flex items-center text-blue-600 font-bold text-xs sm:text-sm group-hover:translate-x-1 transition">
              <span>Secure Login</span>
              <ArrowRight size={16} className="ml-1.5" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
