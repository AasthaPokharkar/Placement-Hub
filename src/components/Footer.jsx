import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, FileCheck, CheckCircle } from 'lucide-react';
import { Github } from './Icons';

export const Footer = () => {
  return (
    <footer className="bg-[#241318] text-[#FFDDDD]/80 text-sm border-t border-[#FFCED8]/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-black text-lg">
              <div className="w-8 h-8 rounded-xl bg-[#b84b64] flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-4 h-4" />
              </div>
              Placement<span className="text-[#FFCED8]">Hub</span>
            </div>
            <p className="text-xs text-[#FFDDDD]/70 leading-relaxed">
              Bridging college students and forward-thinking recruiters with tamper-evident, repository-verified skills, ATS-aligned honest resumes, and algorithmic batch matching.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#3a1d26] border border-[#FFCED8]/30 text-xs text-[#FFE8C4] font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-[#FFCED8]" />
              Zero Hallucinated Claims
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider text-[#FFCED8]">Candidate Portal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Student Profile & Stats</Link></li>
              <li><Link to="/skills" className="hover:text-white transition-colors">Skills & Proof Verification</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition-colors">Campus Job Listings</Link></li>
              <li><Link to="/resume" className="hover:text-white transition-colors">ATS Honest Resume Generator</Link></li>
              <li><Link to="/tracker" className="hover:text-white transition-colors">Live Application Tracker</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider text-[#FFCED8]">Placement Cell (TPO)</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/tpo" className="hover:text-white transition-colors">TPO Overview & Shortlisting</Link></li>
              <li><Link to="/batch-matching" className="hover:text-white transition-colors">Algorithmic Batch Matching</Link></li>
              <li><a href="#audit" onClick={(e) => { e.preventDefault(); alert("Academic audit log: verified against Git commit trees and Registrar database."); }} className="hover:text-white transition-colors">Academic Audit Trail</a></li>
              <li><a href="#export" onClick={(e) => { e.preventDefault(); alert("Recruiter verified pool active for campus placement cycle 2025-2026."); }} className="hover:text-white transition-colors">Recruiter Export (CSV/PDF)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider text-[#FFCED8]">Integrity Standards</h4>
            <div className="bg-[#3a1d26]/80 p-3.5 rounded-2xl border border-[#FFCED8]/20 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-[#FFE8C4]">
                <Github className="w-4 h-4 text-[#FFCED8] shrink-0 mt-0.5" />
                <span>Deep git commit & PR verification to prevent fabricated skills.</span>
              </div>
              <div className="flex items-start gap-2 text-[#FFE8C4]">
                <FileCheck className="w-4 h-4 text-[#FFCED8] shrink-0 mt-0.5" />
                <span>Unsupported resume claims automatically highlighted before submission.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#FFCED8]/20 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFDDDD]/60 gap-4">
          <p>© 2026 Placement Hub — Truthful, Evidence-Backed Campus Recruitment Platform.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#FFE8C4]">
              <span className="w-2 h-2 rounded-full bg-[#FFCED8] animate-pulse"></span>
              Live Prototype Mode
            </span>
            <span>Warm Pastel Palette Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
