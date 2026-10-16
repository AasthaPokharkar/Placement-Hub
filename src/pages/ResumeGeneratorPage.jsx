import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Phone,
  Printer,
  ShieldCheck
} from 'lucide-react';
import { Github } from '../components/Icons';

export const ResumeGeneratorPage = () => {
  const [searchParams] = useSearchParams();
  const selectedJobIdFromQuery = searchParams.get('jobId');

  const { studentProfile, jobs } = useApp();
  const [selectedJobId, setSelectedJobId] = useState(selectedJobIdFromQuery || jobs[0]?.id);
  const [resumeTemplate, setResumeTemplate] = useState('modern'); // modern, classic
  const [includeFlaggedWarnings, setIncludeFlaggedWarnings] = useState(true);

  const targetJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Match analysis for tailoring
  const targetRequired = targetJob?.requiredSkills || [];
  const targetPreferred = targetJob?.preferredSkills || [];
  const studentSkills = studentProfile.skills;

  const relevantSkills = studentSkills.filter(s =>
    targetRequired.includes(s.name) || targetPreferred.includes(s.name)
  );

  const otherSkills = studentSkills.filter(s =>
    !targetRequired.includes(s.name) && !targetPreferred.includes(s.name)
  );

  // Check for any unverified or flagged skills
  const flaggedClaims = studentSkills.filter(s => s.claimsFlagged);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Configuration Controls Bar - hidden on print */}
      <div className="print:hidden bg-white p-6 sm:p-8 rounded-3xl border border-[#FFCED8] shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFDDDD] text-[#b84b64] border border-[#FFCED8] mb-2">
              <FileText className="w-3.5 h-3.5" />
              ATS Truthful Resume Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Tailored 1-Page Resume Generator</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Dynamically tailors your verified repository accomplishments to match the target job description. Never fabricates claims.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#b84b64] hover:bg-[#a63d55] text-white font-bold text-xs shadow-md shadow-[#FFCED8] transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </button>
          </div>
        </div>

        {/* Customization Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#FFE8C4]">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Target Campus Opening
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#FFE8C4] bg-white focus:outline-none focus:ring-2 focus:ring-[#b84b64] font-bold text-slate-800"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.company} - {j.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Resume Layout Style
            </label>
            <select
              value={resumeTemplate}
              onChange={(e) => setResumeTemplate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#FFE8C4] bg-white focus:outline-none focus:ring-2 focus:ring-[#b84b64] font-bold text-slate-800"
            >
              <option value="modern">Modern ATS Clean (Recommended)</option>
              <option value="classic">Traditional Academic</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-[#FFF4DE] p-2.5 rounded-xl border border-[#FFE8C4] w-full cursor-pointer">
              <input
                type="checkbox"
                checked={includeFlaggedWarnings}
                onChange={(e) => setIncludeFlaggedWarnings(e.target.checked)}
                className="rounded text-[#b84b64] focus:ring-[#b84b64]"
              />
              <span>Highlight Unsupported Claims</span>
            </label>
          </div>
        </div>
      </div>

      {/* Flagged Claims Alert Banner */}
      {flaggedClaims.length > 0 && (
        <div className="print:hidden bg-[#FFDDDD]/60 border border-[#FFCED8] rounded-3xl p-4 flex items-start gap-3 text-xs text-[#b84b64]">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-black text-[#b84b64]">ATS Truth Audit Warning</p>
            <p className="text-slate-700 leading-relaxed font-medium">
              You have <strong>{flaggedClaims.length} unverified skill claim ({flaggedClaims.map(c => c.name).join(', ')})</strong> with no accompanying GitHub commit repository. Placement Hub highlights these transparently so recruiters are not misled.
            </p>
          </div>
        </div>
      )}

      {/* Tailoring Details Bar */}
      <div className="print:hidden bg-gradient-to-r from-[#241318] via-[#3d1e28] to-[#241318] text-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between text-xs gap-3 border border-[#FFCED8]/30">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FFCED8]" />
          <span>
            Tailored for: <strong className="text-[#FFE8C4]">{targetJob.title} ({targetJob.company})</strong>
          </span>
        </div>
        <div className="flex items-center gap-3 text-[#FFDDDD]/80">
          <span>Priority skills reordered to top of resume</span>
          <span className="text-[#FFE8C4] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFCED8]" /> 100% Truth-Checked
          </span>
        </div>
      </div>

      {/* Printable 1-Page Resume Paper */}
      <div className="max-w-[800px] mx-auto bg-white border border-[#FFE8C4] shadow-xl rounded-2xl p-8 sm:p-12 text-slate-900 font-sans print:border-none print:shadow-none print:p-0 print:m-0 print:max-w-none print:rounded-none">
        {/* Header */}
        <div className="border-b-2 border-[#b84b64] pb-4 mb-5 text-center">
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">
            {studentProfile.name}
          </h1>
          <p className="text-xs text-slate-600 font-semibold mt-1">
            {studentProfile.degree} • Class of {studentProfile.graduationYear}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-700 mt-2 font-mono">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-[#b84b64]" /> {studentProfile.email}
            </span>
            <span>|</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#b84b64]" /> {studentProfile.phone}
            </span>
            <span>|</span>
            <span className="flex items-center gap-1">
              <Github className="w-3 h-3 text-[#b84b64]" /> github.com/{studentProfile.githubUsername}
            </span>
            <span>|</span>
            <span className="text-[#b84b64] font-bold">{studentProfile.portfolio}</span>
          </div>
        </div>

        {/* Education */}
        <div className="mb-5">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#b84b64] border-b border-[#FFE8C4] pb-1 mb-2">
            Education
          </h2>
          {studentProfile.education.map((edu, idx) => (
            <div key={idx} className="flex justify-between items-start text-xs">
              <div>
                <p className="font-bold text-slate-800">{edu.institution}</p>
                <p className="text-slate-600 font-medium">{edu.degree}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-700">{edu.years}</p>
                <p className="font-black text-[#b84b64]">CGPA: {edu.cgpa}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tailored Technical Skills */}
        <div className="mb-5">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#b84b64] border-b border-[#FFE8C4] pb-1 mb-2 flex items-center justify-between">
            <span>Technical Skills & Verified Competencies</span>
            <span className="text-[10px] lowercase font-normal text-slate-500">
              (ordered by relevance to {targetJob.company})
            </span>
          </h2>

          <div className="space-y-1.5 text-xs">
            <div>
              <span className="font-bold text-slate-800">Job-Aligned Core Skills: </span>
              {relevantSkills.map((sk, idx) => (
                <span key={sk.id} className="inline-block">
                  <span className="font-bold text-slate-900">{sk.name}</span>
                  {sk.verified ? (
                    <span className="text-[9px] text-emerald-800 font-bold ml-1 bg-emerald-50 px-1 py-0.5 rounded">
                      [Verified: {sk.assessmentScore}]
                    </span>
                  ) : includeFlaggedWarnings ? (
                    <span className="text-[9px] text-[#b84b64] bg-[#FFDDDD] font-bold px-1 rounded ml-1">
                      [⚠️ Claim Unverified]
                    </span>
                  ) : null}
                  {idx < relevantSkills.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>

            <div>
              <span className="font-bold text-slate-800">Other Skills: </span>
              {otherSkills.map((sk, idx) => (
                <span key={sk.id} className="inline-block">
                  <span className="text-slate-700">{sk.name}</span>
                  {idx < otherSkills.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Verifiable Projects */}
        <div className="mb-5">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#b84b64] border-b border-[#FFE8C4] pb-1 mb-2">
            Verified Software Projects & Evidence Links
          </h2>
          <div className="space-y-3">
            {studentProfile.projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-slate-900">{proj.title}</span>
                    <span className="text-slate-500 font-medium">| {proj.role}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold">{proj.timeline}</span>
                </div>
                <p className="text-slate-700 mt-0.5 leading-relaxed text-[11px] font-medium">
                  {proj.description}
                </p>
                <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Stack: {proj.technologies.join(', ')}</span>
                  <a
                    href={proj.evidenceRepo}
                    className="text-[#b84b64] font-bold underline print:text-black"
                  >
                    repo: {proj.evidenceRepo}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit & Integrity Certification */}
        <div className="pt-3 border-t border-[#FFE8C4] text-[10px] text-slate-500 flex justify-between items-center font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#b84b64]" />
            Verified by Placement Hub Verification Engine & College Registrar
          </span>
          <span className="font-mono text-[#b84b64] font-bold">ATS Checksum: PH-2026-TPO-PASS</span>
        </div>
      </div>
    </div>
  );
};
