import React, { useState } from 'react';
import { User, Lock, ArrowRight, Eye, EyeOff, BriefcaseMedical } from 'lucide-react';

export const PatientAuthPage = ({ onAuthSuccess, onGuestIntake }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    emailOrPhone: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: formData.fullName || (authMode === 'login' ? 'John Doe' : 'Jane Doe'),
      email: formData.email || formData.emailOrPhone || 'patient@example.com'
    };
    onAuthSuccess(user);
  };

  return (
    <div className="min-h-[640px] flex flex-col items-center justify-center py-8 px-4 bg-[#f0f4fc]">
      
      {/* ========================================================================= */}
      {/* LOGIN SCREEN (Matching Image 1) */}
      {/* ========================================================================= */}
      {authMode === 'login' && (
        <div className="w-full max-w-sm bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6 text-slate-800">
          
          {/* Logo & Subtitle */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-100/80 text-blue-600 mx-auto flex items-center justify-center border border-blue-200">
              <BriefcaseMedical size={22} className="stroke-[2.2]" />
            </div>
            <h1 className="text-2xl font-black text-blue-600 tracking-tight">SmartCare</h1>
            <p className="text-xs font-semibold text-slate-400">Secure Patient Portal</p>
          </div>

          {/* Heading */}
          <div className="text-center space-y-1 pt-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
            <p className="text-xs text-slate-500 font-medium">
              Please enter your details to access your records.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Email or Phone */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-800">Email or Phone Number</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="patient@example.com"
                  required
                  value={formData.emailOrPhone}
                  onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
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

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition active:scale-[0.99] mt-2"
            >
              <span>Login</span>
              <ArrowRight size={15} />
            </button>



            {/* Switch to Signup */}
            <p className="text-center text-slate-500 font-medium pt-2">
              New to SmartCare?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className="font-bold text-blue-600 hover:underline"
              >
                Join Us
              </button>
            </p>

          </form>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SIGN UP SCREEN (Matching Image 2: Join SmartCare) */}
      {/* ========================================================================= */}
      {authMode === 'signup' && (
        <div className="w-full max-w-sm space-y-5 text-slate-800">
          
          {/* Header Outside Card */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Join SmartCare</h1>
            <p className="text-xs text-slate-500 font-medium">
              Create your account to start managing your care.
            </p>
          </div>

          {/* Form Card Container */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Full Name</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Email Address</label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Phone Number</label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                <p className="text-[11px] text-slate-400 font-medium">Must be at least 8 characters long.</p>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-600 text-[11px] leading-relaxed">
                  <input
                    type="checkbox"
                    required
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 accent-blue-600 shrink-0"
                  />
                  <span>
                    I agree to the <a href="#terms" className="font-bold text-blue-600 hover:underline">Terms of Service</a> and{' '}
                    <a href="#privacy" className="font-bold text-blue-600 hover:underline">Privacy Policy</a>.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition active:scale-[0.99] mt-3"
              >
                <span>Create Account</span>
                <ArrowRight size={15} />
              </button>

              {/* Switch to Login */}
              <p className="text-center text-slate-500 font-medium pt-3">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Log In
                </button>
              </p>

            </form>
          </div>

        </div>
      )}

    </div>
  );
};
