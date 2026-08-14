import React, { useState, useEffect } from 'react';
import { User, Stethoscope, MapPin, ArrowRight, Activity, Building2, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const HomePage = ({ onSelectFlow }) => {
  // Sliding Image Gallery Slides
  const slides = [
    {
      id: 1,
      image: '/smartcare_hero_hospital.jpg',
      title: 'SmartCare Emergency Corridor',
      statusTitle: 'System Status',
      statusValue: 'Triage Efficiency: 98.4%'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&auto=format&fit=crop&q=80',
      title: 'Cardiac & ICU Monitoring Bay',
      statusTitle: 'ICU Readiness',
      statusValue: 'Real-time Vitals Sync Active'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&auto=format&fit=crop&q=80',
      title: 'Emergency Trauma & Surgical OR',
      statusTitle: 'Ambulance Gateway',
      statusValue: '108 Dispatch Priority Sync'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80',
      title: 'Pretrained AI Triage Engine',
      statusTitle: 'AI Diagnostic Model',
      statusValue: 'Automatic Department Matching'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Outer Window Container Card matching design frame */}
      <div className="bg-slate-50 text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200/80">
        
        {/* Top Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          
          {/* Left Column: Hero Text & Info */}
          <div className="lg:col-span-6 space-y-5">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-semibold">
              <MapPin size={14} className="text-blue-600" />
              <span>AI-Powered Emergency Care Active</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Smarter Care.<br />
              <span className="text-blue-700">Faster Emergency Care.</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              SmartCare utilizes advanced AI to prioritize patient care, stream real-time vital data, and optimize clinical workflows for better outcomes.
            </p>
          </div>

          {/* Right Column: Sliding Image Gallery Banner Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group h-[280px] sm:h-[320px]">
              
              {/* Sliding Image Item */}
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />

                  {/* Title Overlay on top center */}
                  <div className="absolute top-6 left-0 right-0 text-center">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 drop-shadow-md tracking-tight bg-white/70 backdrop-blur-sm inline-block px-6 py-1.5 rounded-full border border-white/50">
                      SmartCare
                    </h3>
                  </div>

                  {/* Floating System Status Box at bottom left */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/80 shadow-md">
                    <p className="text-[10px] font-bold tracking-wider uppercase text-blue-700 mb-0.5">
                      {slide.statusTitle}
                    </p>
                    <p className="text-sm font-extrabold text-slate-900">
                      {slide.statusValue}
                    </p>
                  </div>
                </div>
              ))}

              {/* Prev / Next Slide Arrow Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-xs transition opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-xs transition opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={18} />
              </button>

              {/* Slide Indicator Dots */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentSlide ? 'bg-white w-4' : 'bg-white/50'
                    }`}
                  />
                ))}
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
