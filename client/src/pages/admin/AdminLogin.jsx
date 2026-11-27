import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWebsite } from '../../context/WebsiteContext';
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const AdminLogin = () => {
  const { login } = useAuth();
  const { settings } = useWebsite();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('admin@rkfoundation.org');
  const [password, setPassword] = useState('Admin@RK2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    searchParams.get('expired') ? 'Session expired. Please log in again.' : ''
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6FAF7] via-white to-[#EDF5F0] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#14382C_0.8px,transparent_0.8px)] [background-size:24px_24px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3 px-4">
        <Link to="/" className="inline-flex items-center justify-center gap-3 group mb-1">
          <div className="w-12 h-12 rounded-sm bg-white flex items-center justify-center shadow-sm border border-[#E5E7EB] p-1.5">
            <img
              src="/logo-icon.png"
              alt="SAHYORA Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="text-left flex flex-col justify-center">
            <img
              src="/logo-wordmark.png"
              alt="SAHYORA"
              className="h-[18px] w-auto object-contain object-left"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="block text-[11px] font-medium text-[#14382C] italic mt-1">
              A belief in humanity
            </span>
          </div>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-sans font-semibold text-[#111827] tracking-tight">
          Admin Control <span className="italic text-[#14382C]">Center</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#4B5563]">
          Secure portal for Sahyora administrators
        </p>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white border border-[#14382C]/15 py-8 px-6 sm:px-9 shadow-card rounded-sm space-y-6">
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-sm text-xs font-medium flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] placeholder-slate-400 transition"
                  placeholder="admin@rkfoundation.org"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] placeholder-slate-400 transition"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#14382C] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-[#14382C] hover:bg-[#1B4D3E] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4 text-[#F2D869]" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            </button>
          </form>

          {/* Quick Demo Credentials Reminder */}
          <div className="p-3.5 bg-[#F9FAFB] rounded-sm border border-[#14382C]/15 text-xs text-[#4B5563] space-y-1">
            <span className="font-bold text-[#14382C] block">Default Super Admin Credentials:</span>
            <p>Email: <span className="text-[#111827] font-mono font-semibold">admin@rkfoundation.org</span></p>
            <p>Password: <span className="text-[#111827] font-mono font-semibold">Admin@RK2026!</span></p>
          </div>

          <div className="text-center pt-3 border-t border-[#F1F5F9]">
            <Link to="/" className="text-xs font-semibold text-[#14382C] hover:underline transition">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

