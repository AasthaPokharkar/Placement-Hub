import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  FileText,
  Search,
  Layers,
  ArrowRight,
  TrendingUp,
  Award,
  AlertTriangle,
  Building2,
  Users,
  Sparkles,
  GitPullRequest
} from 'lucide-react';
import { Github } from '../components/Icons';
import { useApp } from '../context/AppContext';

export const LandingPage = () => {
  const { jobs } = useApp();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#FFDDDD]/80 via-[#FFF4DE] to-[#FFE8C4]/60 p-8 sm:p-16 border border-[#FFCED8] shadow-sm">
        <div className="text-center max-w-3xl mx-auto relative z-10">
          {/* Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFCED8] text-[#b84b64] text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#b84b64]" />
            Verified Skills & Evidence Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none mb-6">
            Empowering Students with{' '}
            <span className="bg-gradient-to-r from-[#b84b64] via-[#c75d74] to-[#b86e24] bg-clip-text text-transparent">
              Evidence-Backed
            </span>{' '}
            Placements
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-8 font-medium">
            No inflated claims. No keyword-stuffed fabrications. Placement Hub links every student skill directly to GitHub pull requests, commit trees, and registrar scores—generating 100% truthful, ATS-optimized resumes and helping college placement officers rank batch candidates transparently.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#b84b64] hover:bg-[#a53c54] text-white font-bold text-sm shadow-md shadow-[#FFCED8] transition-all"
            >
              <Search className="w-4 h-4" />
              Explore Verified Job Openings
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#FFDDDD]/60 text-slate-800 font-bold text-sm border border-[#FFCED8] shadow-xs transition-all"
            >
              <FileCheck className="w-4 h-4 text-[#b84b64]" />
              Manage Skills & Proof
            </Link>
            <Link
              to="/tpo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FFE8C4] hover:bg-[#feddad] text-[#b86e24] font-bold text-sm border border-[#FFCED8] transition-all"
            >
              <Users className="w-4 h-4 text-[#b86e24]" />
              TPO Officer Desk
            </Link>
          </div>

          {/* Quick Proof Trust Badges */}
          <div className="mt-12 pt-8 border-t border-[#FFCED8]/70 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="bg-white/90 p-4 rounded-2xl border border-[#FFCED8] shadow-2xs">
              <div className="text-[#b84b64] font-black text-2xl">100%</div>
              <div className="text-xs text-slate-600 font-semibold">Verifiable Skill Proofs</div>
            </div>
            <div className="bg-white/90 p-4 rounded-2xl border border-[#FFCED8] shadow-2xs">
              <div className="text-[#b84b64] font-black text-2xl">0%</div>
              <div className="text-xs text-slate-600 font-semibold">Fabricated ATS Claims</div>
            </div>
            <div className="bg-white/90 p-4 rounded-2xl border border-[#FFE8C4] shadow-2xs">
              <div className="text-[#b86e24] font-black text-2xl">3.8x</div>
              <div className="text-xs text-slate-600 font-semibold">Faster Recruiter Screening</div>
            </div>
            <div className="bg-white/90 p-4 rounded-2xl border border-[#FFE8C4] shadow-2xs">
              <div className="text-[#b86e24] font-black text-2xl">Auto</div>
              <div className="text-xs text-slate-600 font-semibold">Duplicate Deduplication</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
            Why Placement Hub Replaces Legacy Campus Portals
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Designed to solve the trust deficit between college applicants and hiring managers with automated verification pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-7 border border-[#FFCED8] shadow-xs hover:border-[#b84b64] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFDDDD] text-[#b84b64] flex items-center justify-center mb-5 shadow-2xs">
              <Github className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Evidence-Linked Skills</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              Students cannot simply list "Docker" or "React" without proof. Every claimed skill must link to a live repository, commit history, or proctored test badge.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#b84b64] bg-[#FFDDDD] px-3 py-1.5 rounded-xl w-fit">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Automated proof status checks
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-7 border border-[#FFE8C4] shadow-xs hover:border-[#b86e24] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE8C4] text-[#b86e24] flex items-center justify-center mb-5 shadow-2xs">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Truthful ATS Resume Engine</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              Generates tailored, clean single-page PDF resumes for individual job requirements. If a claim lacks proof, the engine flags it instead of hallucinating.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#b86e24] bg-[#FFF4DE] border border-[#FFE8C4] px-3 py-1.5 rounded-xl w-fit">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Flags unbacked student claims
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-7 border border-[#FFCED8] shadow-xs hover:border-[#b84b64] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFCED8] text-[#b84b64] flex items-center justify-center mb-5 shadow-2xs">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Placement Officer Batch Matcher</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              Allows college placement directors to paste or pick job criteria and instantly rank eligible batch students by evidence-weighted matching algorithms.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#b84b64] bg-[#FFDDDD] px-3 py-1.5 rounded-xl w-fit">
              <TrendingUp className="w-4 h-4" />
              Transparent match breakdowns
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Preview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Campus Drives & Openings</h2>
            <p className="text-slate-500 text-xs sm:text-sm">Active hiring pipelines with consolidated duplicate openings</p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#b84b64] hover:text-[#913247]"
          >
            View all {jobs.length} jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.slice(0, 4).map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl border border-[#FFE8C4] p-6 shadow-xs hover:border-[#FFCED8] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#b84b64] to-[#e06d85] text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {job.logoText}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{job.title}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {job.company} • {job.location}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold rounded-xl bg-[#FFF4DE] text-[#b86e24] border border-[#FFE8C4]">
                    {job.packageLPA}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">{job.description}</p>

                {job.duplicateNote && (
                  <div className="mb-4 p-2.5 bg-[#FFF4DE] border border-[#FFE8C4] rounded-xl text-[11px] text-[#b86e24] flex items-center gap-1.5 font-medium">
                    <Layers className="w-3.5 h-3.5 shrink-0" />
                    <span>{job.duplicateNote}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {job.requiredSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#FFDDDD]/60 text-[#b84b64]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#FFE8C4]/70 flex items-center justify-between">
                <span className="text-xs text-slate-400">Deadline: {job.deadline}</span>
                <Link
                  to={`/jobs/${job.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#b84b64] hover:text-[#913247]"
                >
                  View Details & Match Score <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Methodology Callout */}
      <section className="bg-gradient-to-r from-[#241318] via-[#3a1d26] to-[#241318] rounded-3xl p-8 sm:p-12 text-white shadow-md border border-[#FFCED8]/20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFCED8]/20 text-[#FFCED8] text-xs font-bold mb-4 border border-[#FFCED8]/30">
            <Award className="w-4 h-4" /> The Placement Hub Guarantee
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-4">
            Eliminating "Resume Inflation" Across College Campuses
          </h2>
          <p className="text-[#FFDDDD]/80 text-xs sm:text-sm leading-relaxed mb-6">
            In conventional campus placements, 68% of student resumes feature unsupported claims that fail in round-one technical screenings. Placement Hub ensures every student claim is accompanied by verifiable GitHub code repositories, pull requests, automated linters, and college registrar records.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link
              to="/resume"
              className="px-5 py-2.5 rounded-xl bg-[#b84b64] hover:bg-[#a53c54] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              Test Resume Generator
            </Link>
            <Link
              to="/batch-matching"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FFE8C4] font-bold text-xs sm:text-sm border border-white/20 transition-all"
            >
              View Batch Match Algorithm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
