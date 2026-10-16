import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GraduationCap, ShieldCheck, UserCheck, ArrowRight, Info } from 'lucide-react';

export const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const isRegisterParam = searchParams.get('mode') === 'register';
  const [isRegister, setIsRegister] = useState(isRegisterParam);
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('National Institute of Technology');

  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalName = name.trim() || (role === 'tpo' ? "Dr. K. R. Ramanathan" : "Aastha Pokharkar");
    const finalEmail = email.trim() || (role === 'tpo' ? "tpo@college.edu" : "aastha.pokharkar@college.edu");

    login(role, {
      name: finalName,
      email: finalEmail,
      role: role,
      college: college,
      designation: role === 'tpo' ? 'Placement Officer & Academic Head' : 'Candidate (2026 Batch)'
    });

    if (role === 'tpo') {
      navigate('/tpo');
    } else {
      navigate('/dashboard');
    }
  };

  const fillQuickDemo = (demoRole) => {
    setRole(demoRole);
    if (demoRole === 'tpo') {
      setName("Dr. K. R. Ramanathan");
      setEmail("tpo@college.edu");
    } else {
      setName("Aastha Pokharkar");
      setEmail("aastha.pokharkar@college.edu");
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl border border-[#FFCED8] shadow-sm">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#b84b64] to-[#e06d85] flex items-center justify-center text-white mx-auto shadow-md shadow-[#FFCED8]">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
            {isRegister ? 'Create Placement Hub Account' : 'Sign in to Placement Hub'}
          </h2>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            {isRegister
              ? 'Join your college placement network with verified repository proofs'
              : 'Access your student dashboard or placement officer administration'}
          </p>
        </div>

        {/* Demo Mode Notice */}
        <div className="p-3.5 bg-[#FFF4DE] border border-[#FFE8C4] rounded-2xl text-xs text-[#b86e24] flex items-start gap-2">
          <Info className="w-4 h-4 text-[#b86e24] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Prototype Instant Access</p>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
              Sign in immediately using pre-loaded roles or input your own student credentials.
            </p>
            <div className="mt-2.5 flex gap-2">
              <button
                type="button"
                onClick={() => fillQuickDemo('student')}
                className="px-2.5 py-1 rounded-xl bg-[#FFDDDD] text-[#b84b64] border border-[#FFCED8] text-[11px] font-bold hover:bg-[#FFCED8]"
              >
                Load Student (Aastha)
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo('tpo')}
                className="px-2.5 py-1 rounded-xl bg-[#FFE8C4] text-[#b86e24] border border-[#FFE8C4] text-[11px] font-bold hover:bg-[#feddad]"
              >
                Load TPO (Officer)
              </button>
            </div>
          </div>
        </div>

        {/* Role Selection Tabs */}
        <div className="flex rounded-2xl bg-[#FFF4DE] p-1 border border-[#FFE8C4]">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              role === 'student'
                ? 'bg-white text-[#b84b64] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4 text-[#b84b64]" />
            Student Candidate
          </button>
          <button
            type="button"
            onClick={() => setRole('tpo')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              role === 'tpo'
                ? 'bg-white text-[#b86e24] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#b86e24]" />
            Placement Officer (TPO)
          </button>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aastha Pokharkar"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#FFCED8] bg-[#FFF4DE]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Institutional Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'tpo' ? "tpo@college.edu" : "student@college.edu"}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#FFCED8] bg-[#FFF4DE]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#FFCED8] bg-[#FFF4DE]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Affiliated College</label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#FFE8C4] text-sm bg-[#FFF4DE]/50 text-slate-600 font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#b84b64] hover:bg-[#a53c54] text-white font-bold text-sm shadow-md shadow-[#FFCED8] flex items-center justify-center gap-2 transition-all mt-2"
          >
            <span>{isRegister ? 'Register Verified Account' : 'Sign In Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#FFE8C4]">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-[#b84b64] hover:text-[#913247] font-bold"
          >
            {isRegister
              ? 'Already have an institutional account? Sign In'
              : "Don't have an account yet? Register here"}
          </button>
        </div>
      </div>
    </div>
  );
};
