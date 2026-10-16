import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Briefcase,
  FileCheck2,
  FileText,
  Clock,
  ShieldCheck,
  Users,
  Layers,
  Menu,
  X,
  LogOut,
  LogIn,
  Sparkles
} from 'lucide-react';
import { GitHubVerificationModal } from './GitHubVerificationModal';

export const Navbar = () => {
  const { currentUser, logout, login } = useApp();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? 'bg-[#FFCED8] text-[#b84b64] font-bold shadow-xs'
        : 'text-slate-700 hover:text-[#b84b64] hover:bg-[#FFDDDD]/60'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-base font-medium transition-colors ${
      isActive
        ? 'bg-[#FFCED8] text-[#b84b64] font-bold'
        : 'text-slate-700 hover:text-[#b84b64] hover:bg-[#FFDDDD]/60'
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFF4DE]/90 backdrop-blur-md border-b border-[#FFE8C4] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#b84b64] to-[#e06d85] flex items-center justify-center text-white shadow-md shadow-[#FFCED8] group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-[#b84b64] transition-colors">
                  Placement<span className="text-[#b84b64]">Hub</span>
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold -mt-1">
                  Evidence-Backed Campus Hiring
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/70 p-1.5 rounded-2xl border border-[#FFE8C4]">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/jobs" className={navLinkClass}>
                <Briefcase className="w-4 h-4" />
                Job Openings
              </NavLink>
              <NavLink to="/skills" className={navLinkClass}>
                <FileCheck2 className="w-4 h-4" />
                Skills & Evidence
              </NavLink>
              <NavLink to="/resume" className={navLinkClass}>
                <FileText className="w-4 h-4" />
                Resume Builder
              </NavLink>
              <NavLink to="/tracker" className={navLinkClass}>
                <Clock className="w-4 h-4" />
                Applications
              </NavLink>
              <div className="h-5 w-px bg-[#FFE8C4] mx-1"></div>
              <NavLink to="/tpo" className={navLinkClass}>
                <ShieldCheck className="w-4 h-4 text-[#b84b64]" />
                TPO Desk
              </NavLink>
              <NavLink to="/batch-matching" className={navLinkClass}>
                <Layers className="w-4 h-4 text-[#b86e24]" />
                Batch Matching
              </NavLink>
            </nav>

            {/* Right Section: Verify GitHub button & User Status & Switcher */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setShowVerifyModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#FFCED8] bg-[#FFDDDD]/70 hover:bg-[#FFCED8] text-[#b84b64] text-xs font-bold transition-all shadow-2xs"
                title="Scan and verify GitHub repository commits"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Scan Repo Proof
              </button>

              {currentUser ? (
                <div className="flex items-center gap-2.5">
                  <Link
                    to={currentUser.role === 'tpo' ? '/tpo' : '/dashboard'}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-2xl border border-[#FFE8C4] bg-white hover:bg-[#FFDDDD]/40 transition-colors shadow-2xs"
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-xs ${currentUser.role === 'tpo' ? 'bg-[#b86e24]' : 'bg-[#b84b64]'}`}>
                      {currentUser.name.charAt(0)}
                    </div>
                    <div className="text-left text-xs">
                      <p className="font-bold text-slate-800 leading-tight truncate max-w-[120px]">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium capitalize">{currentUser.role === 'tpo' ? 'Placement Officer' : 'Student'}</p>
                    </div>
                  </Link>

                  {/* Role Switcher */}
                  <button
                    onClick={() => {
                      const newRole = currentUser.role === 'tpo' ? 'student' : 'tpo';
                      login(newRole);
                    }}
                    title="Switch role"
                    className="px-2.5 py-1.5 text-xs font-bold rounded-xl border border-[#FFCED8] bg-[#FFDDDD] text-[#b84b64] hover:bg-[#FFCED8] transition-colors"
                  >
                    Switch to {currentUser.role === 'tpo' ? 'Student' : 'TPO'}
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-[#FFE8C4]/60 rounded-xl transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#b84b64] transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                  <Link
                    to="/login?mode=register"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-[#b84b64] hover:bg-[#a63d55] rounded-xl shadow-sm transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-white border border-[#FFE8C4] focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#FFE8C4] bg-[#FFF4DE] px-4 pt-2 pb-6 space-y-2">
            <NavLink to="/" end className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
              <Users className="w-4 h-4" /> Student Dashboard
            </NavLink>
            <NavLink to="/skills" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
              <FileCheck2 className="w-4 h-4" /> Skills & Evidence
            </NavLink>
            <NavLink to="/jobs" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
              <Briefcase className="w-4 h-4" /> Job Openings
            </NavLink>
            <NavLink to="/resume" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
              <FileText className="w-4 h-4" /> Resume Generator
            </NavLink>
            <NavLink to="/tracker" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
              <Clock className="w-4 h-4" /> Application Tracker
            </NavLink>
            <div className="pt-2 border-t border-[#FFE8C4]">
              <NavLink to="/tpo" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
                <ShieldCheck className="w-4 h-4 text-[#b84b64]" /> Placement Officer Dashboard
              </NavLink>
              <NavLink to="/batch-matching" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
                <Layers className="w-4 h-4 text-[#b86e24]" /> Batch Matching
              </NavLink>
            </div>

            <div className="pt-4 border-t border-[#FFE8C4] flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowVerifyModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-xs font-bold rounded-xl bg-[#FFCED8] text-[#b84b64] text-center"
              >
                Scan GitHub Repo Proof
              </button>

              {currentUser ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 bg-white rounded-xl border border-[#FFE8C4] text-xs">
                    <span className="font-bold text-slate-800">{currentUser.name}</span> ({currentUser.role})
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        login(currentUser.role === 'tpo' ? 'student' : 'tpo');
                        setMobileMenuOpen(false);
                      }}
                      className="flex-1 py-2 text-xs font-bold bg-[#FFDDDD] text-[#b84b64] rounded-xl text-center"
                    >
                      Switch to {currentUser.role === 'tpo' ? 'Student' : 'TPO'}
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                        navigate('/login');
                      }}
                      className="px-3 py-2 text-xs font-bold bg-white text-slate-700 border border-[#FFE8C4] rounded-xl"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-bold text-white bg-[#b84b64] rounded-xl"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* GitHub Verification Modal */}
      <GitHubVerificationModal
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
      />
    </>
  );
};
