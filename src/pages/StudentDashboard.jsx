import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import { GitHubVerificationModal } from '../components/GitHubVerificationModal';

export const StudentDashboard = () => {
  const { studentProfile, setStudentProfile, applications, jobs } = useApp();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState(studentProfile.bio);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const verifiedSkills = studentProfile.skills.filter(s => s.verified);
  const flaggedSkills = studentProfile.skills.filter(s => s.claimsFlagged);

  const handleBioSave = () => {
    setStudentProfile(prev => ({ ...prev, bio: tempBio }));
    setIsEditingBio(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-[#241318] via-[#3d1e28] to-[#241318] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm border border-[#FFCED8]/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FFCED8]/20 border border-[#FFCED8]/40 flex items-center justify-center text-[#FFCED8] text-2xl font-black shadow-inner">
              {studentProfile.name.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black">{studentProfile.name}</h1>
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-[#FFCED8]/20 text-[#FFCED8] border border-[#FFCED8]/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {studentProfile.verificationStatus}
                </span>
              </div>
              <p className="text-[#FFDDDD]/80 text-xs sm:text-sm mt-1 font-medium">
                {studentProfile.degree} • Batch of {studentProfile.graduationYear}
              </p>
              <p className="text-[#FFE8C4] text-xs mt-0.5 font-medium">
                {studentProfile.college} • CGPA: <span className="font-bold text-white">{studentProfile.cgpa}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowVerifyModal(true)}
              className="px-4 py-2 rounded-xl bg-[#FFCED8] text-[#b84b64] font-bold text-xs hover:bg-[#ffb6c5] transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              Scan GitHub Repos
            </button>
            <Link
              to="/skills"
              className="px-4 py-2 rounded-xl bg-white text-slate-800 font-bold text-xs hover:bg-[#FFF4DE] transition-colors shadow-xs flex items-center gap-1.5"
            >
              <FileCheck2 className="w-4 h-4 text-[#b84b64]" />
              Manage Evidence
            </Link>
            <Link
              to="/resume"
              className="px-4 py-2 rounded-xl bg-[#b84b64] hover:bg-[#a63d55] text-white font-bold text-xs border border-[#FFCED8]/40 transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              Tailored Resume
            </Link>
          </div>
        </div>

        {/* Quick Social & Repos Link strip */}
        <div className="mt-6 pt-4 border-t border-[#FFCED8]/20 flex flex-wrap items-center gap-4 text-xs text-[#FFDDDD]/80">
          <a
            href={`https://github.com/${studentProfile.githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4 text-[#FFCED8]" />
            github.com/{studentProfile.githubUsername}
            <ExternalLink className="w-3 h-3 text-[#FFCED8]" />
          </a>
          <span>•</span>
          <a
            href={studentProfile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4 text-[#FFCED8]" />
            LinkedIn Profile
          </a>
          <span>•</span>
          <span className="text-[#FFE8C4]">{studentProfile.email}</span>
        </div>
      </div>

      {/* Profile Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#FFCED8] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Verified Skills</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFDDDD] text-[#b84b64] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {verifiedSkills.length} <span className="text-xs font-normal text-slate-400">/ {studentProfile.skills.length}</span>
          </div>
          <div className="text-[11px] text-[#b84b64] font-bold mt-1">
            Linked with GitHub repositories
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#FFE8C4] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Flagged / Unbacked Claims</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF4DE] text-[#b86e24] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{flaggedSkills.length}</div>
          <div className="text-[11px] text-[#b86e24] font-bold mt-1">
            {flaggedSkills.length > 0 ? "Requires verifiable proof link" : "All claims validated"}
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#FFCED8] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Active Applications</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFDDDD] text-[#b84b64] flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#b84b64]" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{applications.length}</div>
          <div className="text-[11px] text-[#b84b64] font-bold mt-1">
            {applications.filter(a => a.status === 'Interview').length} In Interview stage
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#FFE8C4] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Top ATS Match</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFE8C4] text-[#b86e24] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#b86e24]" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">95%</div>
          <div className="text-[11px] text-[#b86e24] font-bold mt-1">
            Zomato UI Systems opening
          </div>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Bio & Skills Evidence Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio Box */}
          <div className="bg-white rounded-3xl border border-[#FFCED8] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-slate-900">Candidate Summary & Objective</h2>
              {!isEditingBio ? (
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="text-xs text-[#b84b64] hover:text-[#913247] font-bold flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditingBio(false)}
                    className="text-xs text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBioSave}
                    className="text-xs font-bold text-[#b84b64] hover:text-[#913247]"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            {isEditingBio ? (
              <textarea
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
                rows={3}
                className="w-full p-3 text-xs sm:text-sm border border-[#FFCED8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
              />
            ) : (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{studentProfile.bio}</p>
            )}
          </div>

          {/* Evidence-Backed Skills Card */}
          <div className="bg-white rounded-3xl border border-[#FFE8C4] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Verified Skills Portfolio</h2>
                <p className="text-xs text-slate-500">Every technical claim verified by repository inspections</p>
              </div>
              <Link
                to="/skills"
                className="text-xs font-bold text-[#b84b64] hover:text-[#913247] flex items-center gap-1"
              >
                Full Evidence Matrix <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {studentProfile.skills.map((skill) => (
                <div
                  key={skill.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    skill.verified
                      ? 'bg-[#FFF4DE]/40 border-[#FFE8C4] hover:border-[#FFCED8]'
                      : 'bg-[#FFDDDD]/50 border-[#FFCED8]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-800">{skill.name}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-slate-700 border border-[#FFE8C4]">
                        {skill.category}
                      </span>
                      <span className="text-xs text-slate-400">• {skill.level}</span>
                    </div>

                    <div>
                      {skill.verified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified ({skill.evidenceType})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#b84b64] bg-[#FFCED8] px-2.5 py-0.5 rounded-lg">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Unverified Claim
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 font-medium">{skill.evidenceSummary}</p>

                  <div className="mt-2.5 pt-2 border-t border-[#FFE8C4]/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">
                      Assessment: <span className="font-bold text-slate-800">{skill.assessmentScore}</span>
                    </span>
                    {skill.evidenceUrl ? (
                      <a
                        href={skill.evidenceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#b84b64] hover:text-[#913247] font-bold inline-flex items-center gap-1"
                      >
                        <Github className="w-3 h-3 text-[#b84b64]" /> Inspect Code Proof
                      </a>
                    ) : (
                      <Link
                        to="/skills"
                        className="text-[#b84b64] hover:text-[#913247] font-bold"
                      >
                        + Add GitHub Link
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Projects with Proof */}
          <div className="bg-white rounded-3xl border border-[#FFCED8] p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-3">Verified Capstone & Open-Source Projects</h2>
            <div className="space-y-4">
              {studentProfile.projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-2xl border border-[#FFE8C4] bg-[#FFF4DE]/40">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{proj.title}</h4>
                      <p className="text-xs text-slate-500">{proj.role} • {proj.timeline}</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-[#FFDDDD] text-[#b84b64]">
                      Verified Repo
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-white border border-[#FFE8C4] text-[10px] text-slate-700 font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Applications Tracker Snapshot & Recommended Drives */}
        <div className="space-y-6">
          {/* Quick Application Tracker Card */}
          <div className="bg-white rounded-3xl border border-[#FFCED8] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm">Application Tracker</h3>
              <Link to="/tracker" className="text-xs font-bold text-[#b84b64] hover:text-[#913247]">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {applications.map((app) => (
                <div key={app.id} className="p-3 rounded-2xl border border-[#FFE8C4] bg-[#FFF4DE]/50 hover:bg-[#FFE8C4]/60 transition-colors">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <p className="font-bold text-xs text-slate-800">{app.company}</p>
                      <p className="text-[11px] text-slate-500 truncate max-w-[150px]">{app.title}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-lg ${
                        app.status === 'Offer'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'Interview'
                          ? 'bg-[#FFDDDD] text-[#b84b64]'
                          : 'bg-[#FFE8C4] text-[#b86e24]'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between font-medium">
                    <span>Applied: {app.appliedDate}</span>
                    <span className="font-bold text-[#b84b64]">Match: {app.matchScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="bg-white rounded-3xl border border-[#FFE8C4] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm">High-Match Openings</h3>
              <Link to="/jobs" className="text-xs font-bold text-[#b84b64] hover:text-[#913247]">
                Explore
              </Link>
            </div>

            <div className="space-y-3">
              {jobs.slice(0, 3).map((job) => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="block p-3 rounded-2xl border border-[#FFE8C4] hover:border-[#FFCED8] hover:bg-[#FFF4DE] transition-all"
                >
                  <p className="font-bold text-xs text-slate-800">{job.title}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 font-medium">
                    <span>{job.company}</span>
                    <span className="font-bold text-[#b86e24]">{job.packageLPA}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Truth Guarantee Banner */}
          <div className="bg-[#FFDDDD]/70 border border-[#FFCED8] rounded-3xl p-4 text-xs text-[#b84b64]">
            <p className="font-black mb-1">ATS Truth Guarantee Active</p>
            <p className="text-slate-700 leading-relaxed font-medium">
              When applying or generating resumes, Placement Hub will never invent certifications or skills you haven't verified with proof.
            </p>
          </div>
        </div>
      </div>

      <GitHubVerificationModal
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
      />
    </div>
  );
};
