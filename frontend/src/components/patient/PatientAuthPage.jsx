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

            {/* Divider */}
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                Or sign in with
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition"
              >
                <svg className="w-4 h-4 fill-slate-900" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.9.13-9.76-1.94-14.58-6.22-3.41-3.03-7.37-7.85-11.89-14.46-7.89-11.53-13.91-24.81-18.06-39.84-4.14-15.03-6.21-29.43-6.21-43.2 0-16.73 4.28-30.82 12.85-42.27 8.57-11.45 19.39-17.27 32.48-17.47 4.9.13 10.23 1.25 15.98 3.36 5.75 2.11 9.94 3.23 12.57 3.35 2.21-.12 6.53-1.29 12.98-3.5 6.45-2.21 11.57-3.23 15.35-3.07 10.02.82 18.73 4.41 26.13 10.77-18.75 11.33-28.02 27.27-27.81 47.81.21 15.77 6.07 28.48 17.58 38.13 4.29 3.65 9.07 6.42 14.35 8.31-2.9 8.52-6.9 16.92-12.01 25.2zM119.22 31.84c0-7.85 2.76-15.54 8.28-23.07 5.52-7.53 12.54-12.28 21.06-14.26.24 1.15.36 2.21.36 3.19 0 7.85-2.88 15.65-8.64 23.4-5.76 7.75-12.79 12.43-21.06 14.04-.24-1.04-.36-2.14-.36-3.3z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>

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
