import React, { useState } from 'react';
import { Stethoscope, Lock, ArrowRight, Eye, EyeOff, Building2, ShieldCheck, Mail, UserCheck } from 'lucide-react';

export const DoctorAuthPage = ({ onAuthSuccess, onDemoDoctorLogin }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    emailOrId: '',
    email: '',
    licenseId: '',
    department: 'Emergency & Trauma',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = formData.fullName.trim();
    if (!name && formData.emailOrId) {
      const emailPrefix = formData.emailOrId.split('@')[0];
      const cleanParts = emailPrefix.split(/[\._\-]/).filter(Boolean);
      name = cleanParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      if (!name.toLowerCase().startsWith('dr')) {
        name = 'Dr. ' + name;
      }
    }
    if (!name) name = 'Logged In Doctor';

    const staffUser = {
      name: name,
      role: formData.department || 'Emergency & Trauma',
      department: formData.department || 'Emergency & Trauma'
    };
    onAuthSuccess(staffUser);
  };

  return (
    <div className="min-h-[640px] flex flex-col items-center justify-center py-8 px-4 bg-[#f0f4fc]">
      
      {/* ========================================================================= */}
      {/* DOCTOR & STAFF LOGIN SCREEN */}
      {/* ========================================================================= */}
      {authMode === 'login' && (
        <div className="w-full max-w-sm bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6 text-slate-800">
          
          {/* Logo & Subtitle */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-100/80 text-blue-600 mx-auto flex items-center justify-center border border-blue-200">
              <Stethoscope size={22} className="stroke-[2.2]" />
            </div>
            <h1 className="text-2xl font-black text-blue-600 tracking-tight">SmartCare</h1>
            <p className="text-xs font-semibold text-slate-400">Doctor & Hospital Staff Portal</p>
          </div>

          {/* Heading */}
          <div className="text-center space-y-1 pt-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
            <p className="text-xs text-slate-500 font-medium">
              Please enter your clinical credentials to access your dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Staff Email or Doctor ID */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-800">Doctor ID or Staff Email</label>
              <div className="relative">
                <UserCheck size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="dr.henderson@smartcare.org"
                  required
                  value={formData.emailOrId}
                  onChange={(e) => setFormData({ ...formData, emailOrId: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block font-bold text-slate-800">Password</label>
                <a href="#forgot" className="text-[11px] font-bold text-blue-600 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Role / Department Selection */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-800">Clinical Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition"
              >
                <option value="Emergency & Trauma">Emergency & Trauma (ER Senior Lead)</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Bed Manager">Bed Manager & Allotment Staff</option>
              </select>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition active:scale-[0.99] mt-2"
            >
              <span>Sign In to Clinical Portal</span>
              <ArrowRight size={15} />
            </button>

            {/* Switch to Signup */}
            <p className="text-center text-slate-500 font-medium pt-2">
              New Medical Staff?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className="font-bold text-blue-600 hover:underline"
              >
                Register Here
              </button>
            </p>

          </form>

        </div>
      )}

      {/* ========================================================================= */}
      {/* REGISTER STAFF SCREEN (Join Clinical Team) */}
      {/* ========================================================================= */}
      {authMode === 'signup' && (
        <div className="w-full max-w-sm space-y-5 text-slate-800">
          
          {/* Header Outside Card */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Join Clinical Team</h1>
            <p className="text-xs text-slate-500 font-medium">
              Register as a certified hospital clinician or triage nurse.
            </p>
          </div>

          {/* Form Card Container */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              
              {/* Full Name & Credentials */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Full Name & Credentials</label>
                <input
                  type="text"
                  placeholder="Dr. Sarah Henderson, MD"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
              </div>

              {/* Hospital Email */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Hospital Email Address</label>
                <input
                  type="email"
                  placeholder="s.henderson@hospital.org"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
              </div>

              {/* License ID */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Medical Registration / License ID</label>
                <input
                  type="text"
                  placeholder="MED-889021-US"
                  required
                  value={formData.licenseId}
                  onChange={(e) => setFormData({ ...formData, licenseId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
              </div>

              {/* Create Password */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Create Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition active:scale-[0.99] mt-3"
              >
                <span>Request Clinical Access</span>
                <ArrowRight size={15} />
              </button>

              {/* Switch to Login */}
              <p className="text-center text-slate-500 font-medium pt-3">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Log In Here
                </button>
              </p>

            </form>
          </div>

        </div>
      )}

    </div>
  );
};
