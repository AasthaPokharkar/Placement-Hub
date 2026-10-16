import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Building2,
  MapPin,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  FileText,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { Github } from '../components/Icons';

export const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { jobs, studentProfile, applications, applyToJob } = useApp();
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyNote, setApplyNote] = useState('');

  const job = jobs.find(j => j.id === jobId) || jobs[0];
  const hasApplied = applications.some(a => a.jobId === job.id);

  // Match calculation logic
  const required = job.requiredSkills || [];
  const preferred = job.preferredSkills || [];
  const studentSkills = studentProfile.skills;
  const studentSkillNames = studentSkills.map(s => s.name);

  const matchingRequired = required.filter(r => studentSkillNames.includes(r));
  const missingRequired = required.filter(r => !studentSkillNames.includes(r));
  const matchingPreferred = preferred.filter(p => studentSkillNames.includes(p));

  // Count verified proofs
  const verifiedMatchedSkills = matchingRequired.filter(r => {
    const found = studentSkills.find(s => s.name === r);
    return found && found.verified;
  });

  // Calculate weighted match score
  const requiredScore = (matchingRequired.length / (required.length || 1)) * 70;
  const preferredScore = (matchingPreferred.length / (preferred.length || 1)) * 20;
  const evidenceBonus = (verifiedMatchedSkills.length / (required.length || 1)) * 10;
  const finalMatchScore = Math.min(99, Math.round(requiredScore + preferredScore + evidenceBonus));

  const handleApply = (e) => {
    e.preventDefault();
    const success = applyToJob(job.id, applyNote);
    if (success) {
      setApplySuccess(true);
      setTimeout(() => {
        navigate('/tracker');
      }, 1500);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Back button */}
      <div>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#b84b64] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all Job Openings
        </Link>
      </div>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-[#FFCED8] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#b84b64] to-[#e06d85] text-white font-black text-xl flex items-center justify-center shadow-sm">
              {job.logoText}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{job.title}</h1>
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#FFF4DE] text-[#b86e24] border border-[#FFE8C4]">
                  {job.packageLPA}
                </span>
              </div>
              <p className="text-sm text-slate-600 flex items-center gap-2 mt-1 font-medium">
                <Building2 className="w-4 h-4 text-[#b84b64]" />
                <span className="font-bold text-slate-800">{job.company}</span>
                <span>•</span>
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.department}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/resume?jobId=${job.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#FFCED8] bg-[#FFDDDD] text-[#b84b64] hover:bg-[#FFCED8] font-bold text-xs transition-colors shadow-2xs"
            >
              <FileText className="w-4 h-4" />
              Generate ATS Resume
            </Link>
          </div>
        </div>

        {/* Duplicate Notice */}
        {job.duplicateNote && (
          <div className="mt-6 p-3.5 bg-[#FFF4DE] border border-[#FFE8C4] rounded-2xl text-xs text-[#b86e24] flex items-center gap-2 font-medium">
            <Layers className="w-4 h-4 text-[#b86e24] shrink-0" />
            <span>
              <strong>Deduplicated Campus Opening:</strong> {job.duplicateNote}
            </span>
          </div>
        )}
      </div>

      {/* Match Score & Evidence Breakdown Banner */}
      <div className="bg-gradient-to-br from-[#241318] via-[#3d1e28] to-[#241318] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#FFCED8]/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFCED8]/20 border border-[#FFCED8]/30 text-[#FFCED8] text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Evidence-Weighted Match Analysis
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Candidate Alignment Score: <span className="text-[#FFE8C4]">{finalMatchScore}%</span>
            </h2>
            <p className="text-[#FFDDDD]/80 text-xs sm:text-sm mt-1 max-w-xl font-medium">
              Calculated using transparent ATS scoring weights: 70% mandatory skills, 20% preferred skills, and 10% verified repository proofs.
            </p>
          </div>

          {/* Quick Metrics Breakdown Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-white">{matchingRequired.length}/{required.length}</div>
              <div className="text-[10px] text-[#FFDDDD] uppercase tracking-wider mt-0.5 font-bold">Required</div>
            </div>
            <div className="border-x border-white/15 px-3">
              <div className="text-2xl font-black text-[#FFCED8]">{verifiedMatchedSkills.length}</div>
              <div className="text-[10px] text-[#FFDDDD] uppercase tracking-wider mt-0.5 font-bold">Verified</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#FFE8C4]">{missingRequired.length}</div>
              <div className="text-[10px] text-[#FFDDDD] uppercase tracking-wider mt-0.5 font-bold">Missing</div>
            </div>
          </div>
        </div>

        {/* Detailed Match & Missing Skills Breakdown */}
        <div className="mt-8 pt-6 border-t border-[#FFCED8]/20 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Matching Skills */}
          <div className="bg-[#30161f]/80 rounded-2xl p-4 border border-[#FFCED8]/20">
            <h3 className="text-xs font-bold text-[#FFCED8] uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Matching Skills with Proof ({matchingRequired.length})
            </h3>
            <div className="space-y-2">
              {matchingRequired.map(sk => {
                const proofObj = studentSkills.find(s => s.name === sk);
                return (
                  <div key={sk} className="flex items-center justify-between text-xs bg-[#241318]/80 p-2.5 rounded-xl border border-[#FFCED8]/20">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{sk}</span>
                      {proofObj?.verified && (
                        <span className="text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800 font-bold">
                          Verified
                        </span>
                      )}
                    </div>
                    {proofObj?.evidenceUrl ? (
                      <a
                        href={proofObj.evidenceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-[#FFCED8] hover:text-white flex items-center gap-1 font-bold"
                      >
                        <Github className="w-3 h-3" /> Repo Attached
                      </a>
                    ) : (
                      <span className="text-[10px] text-amber-400 font-bold">Claim Unbacked</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="bg-[#30161f]/80 rounded-2xl p-4 border border-[#FFCED8]/20">
            <h3 className="text-xs font-bold text-[#FFE8C4] uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <XCircle className="w-4 h-4 text-rose-400" />
              Missing Job Requirements ({missingRequired.length})
            </h3>
            {missingRequired.length > 0 ? (
              <div className="space-y-2">
                {missingRequired.map(sk => (
                  <div key={sk} className="flex items-center justify-between text-xs bg-[#241318]/80 p-2.5 rounded-xl border border-[#FFCED8]/20">
                    <span className="font-medium text-slate-300">{sk}</span>
                    <Link
                      to="/skills"
                      className="text-[10px] text-[#FFCED8] hover:text-white underline font-bold"
                    >
                      Add & verify proof in profile
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-300">All mandatory skills matched! Exceptional candidate alignment.</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Job Details & Application Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Job Description & Eligibility */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-[#FFE8C4] p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Role Overview</h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{job.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">College Eligibility & Academic Criteria</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-[#FFF4DE]/60 rounded-2xl border border-[#FFE8C4] text-xs">
                  <span className="text-slate-500 block mb-0.5 font-medium">Minimum CGPA</span>
                  <span className="font-black text-slate-800 text-sm">{job.eligibility.minimumCgpa} / 10.0</span>
                </div>
                <div className="p-3.5 bg-[#FFF4DE]/60 rounded-2xl border border-[#FFE8C4] text-xs">
                  <span className="text-slate-500 block mb-0.5 font-medium">Eligible Batch</span>
                  <span className="font-black text-slate-800 text-sm">Class of {job.eligibility.batch}</span>
                </div>
                <div className="p-3.5 bg-[#FFF4DE]/60 rounded-2xl border border-[#FFE8C4] text-xs">
                  <span className="text-slate-500 block mb-0.5 font-medium">Branches Allowed</span>
                  <span className="font-black text-slate-800 text-sm">{job.eligibility.allowedBranches.join(', ')}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Preferred Additional Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.preferredSkills.map(ps => (
                  <span key={ps} className="px-3 py-1 rounded-xl text-xs font-bold bg-[#FFDDDD]/60 text-[#b84b64]">
                    {ps}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Apply Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#FFCED8] p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-2">Submit Application</h3>
            <p className="text-xs text-slate-500 mb-4 font-medium">
              Your profile, verified GitHub commit history, and registrar-verified academic records will be packaged into the recruitment feed.
            </p>

            {hasApplied ? (
              <div className="p-4 bg-[#FFDDDD]/60 border border-[#FFCED8] rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#b84b64] mx-auto" />
                <p className="text-xs font-bold text-[#b84b64]">Application Submitted</p>
                <p className="text-[11px] text-slate-600 font-medium">
                  Track live interview stages and recruiter feedback in your tracker.
                </p>
                <Link
                  to="/tracker"
                  className="inline-block mt-2 text-xs font-bold text-[#b84b64] underline"
                >
                  Open Tracker →
                </Link>
              </div>
            ) : applySuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-xs text-emerald-800 font-bold">
                Application successfully submitted! Redirecting to tracker...
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Candidate Note to Hiring Manager (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Highlight specific repositories or verified project deliverables..."
                    value={applyNote}
                    onChange={(e) => setApplyNote(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl border border-[#FFCED8] bg-[#FFF4DE]/30 focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
                  />
                </div>

                <div className="p-3.5 bg-[#FFF4DE]/60 rounded-2xl border border-[#FFE8C4] text-[11px] text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#b84b64]" />
                    Truthful Disclosure Attached
                  </div>
                  <p className="font-medium">Includes {verifiedMatchedSkills.length} verified GitHub proof links and registrar CGPA {studentProfile.cgpa}.</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#b84b64] hover:bg-[#a63d55] text-white font-bold text-sm shadow-md shadow-[#FFCED8] transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit Verified Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
