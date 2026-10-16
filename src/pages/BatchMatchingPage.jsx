import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const BatchMatchingPage = () => {
  const { jobs, batchStudents } = useApp();
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id);
  const [customJobDesc, setCustomJobDesc] = useState('');
  const [useCustomJD, setUseCustomJD] = useState(false);
  const [minimumCgpaFilter, setMinimumCgpaFilter] = useState(7.0);
  const [evidenceWeight, setEvidenceWeight] = useState(25); // Percentage weight for evidence

  const activeJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Required skills based on selected job or custom JD
  const targetRequiredSkills = useCustomJD && customJobDesc.trim()
    ? customJobDesc.split(',').map(s => s.trim()).filter(Boolean)
    : activeJob.requiredSkills;

  // Algorithmic ranking logic
  const rankedStudents = batchStudents
    .filter(std => std.cgpa >= minimumCgpaFilter)
    .map(std => {
      // Check skill overlap
      const matchingSkills = targetRequiredSkills.filter(req =>
        std.skills.some(st => st.toLowerCase() === req.toLowerCase())
      );
      const missingSkills = targetRequiredSkills.filter(req =>
        !std.skills.some(st => st.toLowerCase() === req.toLowerCase())
      );

      // Raw skill match percent
      const skillScore = (matchingSkills.length / (targetRequiredSkills.length || 1)) * 100;

      // Evidence confidence bonus
      const evidenceConfidenceBonus = std.flaggedClaimsCount === 0 ? 10 : (std.verifiedSkillsCount >= 5 ? 5 : -5);
      const cgpaFactor = (std.cgpa / 10) * 10;

      // Final composite score (0 - 100)
      const compositeMatchScore = Math.min(
        99,
        Math.max(35, Math.round((skillScore * 0.7) + (evidenceConfidenceBonus) + (cgpaFactor)))
      );

      return {
        ...std,
        matchingSkills,
        missingSkills,
        compositeMatchScore
      };
    })
    .sort((a, b) => b.compositeMatchScore - a.compositeMatchScore);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FFCED8] shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFDDDD] text-[#b84b64] border border-[#FFCED8] mb-2">
          <Layers className="w-3.5 h-3.5" />
          Evidence-Backed Matching Engine
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Batch Candidate Matching & Ranking</h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl font-medium">
          Compare and rank college candidates against any specific job description using evidence-backed matching algorithms. Weights skill overlap, repository proof count, and academic records.
        </p>

        {/* Configuration controls */}
        <div className="mt-6 pt-6 border-t border-[#FFE8C4] grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Preset Job Requisition
            </label>
            <select
              disabled={useCustomJD}
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#FFE8C4] bg-white focus:outline-none focus:ring-2 focus:ring-[#b84b64] font-bold text-slate-800 disabled:opacity-50"
            >
              {jobs.map(j => (
                <option key={j.id} value={j.id}>
                  {j.company} - {j.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Minimum CGPA Cutoff ({minimumCgpaFilter})
            </label>
            <input
              type="range"
              min="6.0"
              max="9.5"
              step="0.1"
              value={minimumCgpaFilter}
              onChange={(e) => setMinimumCgpaFilter(parseFloat(e.target.value))}
              className="w-full accent-[#b84b64] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5 font-bold">
              <span>6.0</span>
              <span>7.5 (Standard)</span>
              <span>9.5</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Evidence Weight Bias ({evidenceWeight}%)
            </label>
            <input
              type="range"
              min="10"
              max="40"
              step="5"
              value={evidenceWeight}
              onChange={(e) => setEvidenceWeight(parseInt(e.target.value))}
              className="w-full accent-[#b86e24] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5 font-bold">
              <span>Low (10%)</span>
              <span>Balanced (25%)</span>
              <span>High Rigor (40%)</span>
            </div>
          </div>
        </div>

        {/* Toggle Custom JD Box */}
        <div className="mt-4 pt-4 border-t border-[#FFE8C4]">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={useCustomJD}
              onChange={(e) => setUseCustomJD(e.target.checked)}
              className="rounded text-[#b84b64] focus:ring-[#b84b64]"
            />
            <span>Or paste Custom Recruiter Skills / Comma-separated requirements</span>
          </label>

          {useCustomJD && (
            <textarea
              rows={2}
              placeholder="e.g. React.js, TypeScript, Docker & Kubernetes, Redis, GraphQL"
              value={customJobDesc}
              onChange={(e) => setCustomJobDesc(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-[#FFCED8] bg-[#FFF4DE]/30 focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
            />
          )}
        </div>
      </div>

      {/* Target Criteria Summary Box */}
      <div className="bg-gradient-to-r from-[#241318] via-[#3d1e28] to-[#241318] text-white rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs border border-[#FFCED8]/30">
        <div>
          <span className="text-[#FFDDDD]/80 block text-[11px] font-semibold">Active Matching Criteria:</span>
          <span className="font-black text-sm text-[#FFE8C4]">
            {useCustomJD ? 'Custom Skills Profile' : `${activeJob.title} (${activeJob.company})`}
          </span>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {targetRequiredSkills.map(sk => (
              <span key={sk} className="px-2.5 py-0.5 bg-white/10 text-[#FFCED8] rounded-md border border-[#FFCED8]/20 text-[10px] font-mono font-bold">
                {sk}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[#FFDDDD]/70 text-[11px] font-medium">Ranked Candidates</div>
            <div className="text-2xl font-black text-[#FFE8C4]">{rankedStudents.length} / {batchStudents.length}</div>
          </div>
        </div>
      </div>

      {/* Ranked Students Leaderboard */}
      <div className="space-y-4">
        {rankedStudents.map((std, index) => (
          <div
            key={std.id}
            className="bg-white rounded-3xl border border-[#FFE8C4] p-6 shadow-xs hover:border-[#FFCED8] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            {/* Left: Rank & Student Profile */}
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-base shrink-0 shadow-2xs ${
                index === 0
                  ? 'bg-[#FFCED8] text-[#b84b64] border border-[#FFCED8]'
                  : index === 1
                  ? 'bg-[#FFE8C4] text-[#b86e24] border border-[#FFE8C4]'
                  : index === 2
                  ? 'bg-[#FFF4DE] text-slate-800 border border-[#FFE8C4]'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                #{index + 1}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">{std.name}</h3>
                  <span className="text-xs font-mono text-slate-500 font-semibold">({std.rollNo})</span>
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#FFF4DE] text-slate-700 border border-[#FFE8C4]">
                    {std.branch} • CGPA {std.cgpa}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {std.verifiedSkillsCount} Verified Proofs
                  </span>
                  <span>•</span>
                  {std.flaggedClaimsCount > 0 ? (
                    <span className="text-[#b84b64] font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      {std.flaggedClaimsCount} Flagged
                    </span>
                  ) : (
                    <span className="text-slate-400">0 Flags</span>
                  )}
                  <span>•</span>
                  <span className="italic text-slate-600 font-semibold">{std.topEvidence}</span>
                </div>

                {/* Overlap tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {std.matchingSkills.map(sk => (
                    <span key={sk} className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#FFDDDD]/60 text-[#b84b64] border border-[#FFCED8]">
                      ✓ {sk}
                    </span>
                  ))}
                  {std.missingSkills.map(sk => (
                    <span key={sk} className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#FFF4DE]/40 text-slate-400 border border-[#FFE8C4] line-through">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Composite Score Badge */}
            <div className="flex items-center gap-4 self-end md:self-auto">
              <div className="text-right">
                <div className="text-[11px] font-bold text-slate-400">Composite Fit</div>
                <div className="text-2xl font-black text-[#b84b64]">{std.compositeMatchScore}%</div>
                <div className="text-[10px] text-slate-500 font-bold">
                  {std.flaggedClaimsCount === 0 ? 'Verified Safe' : 'Proof Pending'}
                </div>
              </div>

              <button
                onClick={() => alert(`Shortlist dispatched to recruiter pool for ${std.name} (${std.rollNo})`)}
                className="px-4 py-2.5 rounded-xl bg-[#241318] hover:bg-[#b84b64] text-white font-bold text-xs transition-colors whitespace-nowrap shadow-xs"
              >
                Dispatch to Recruiter
              </button>
            </div>
          </div>
        ))}

        {rankedStudents.length === 0 && (
          <div className="bg-white rounded-3xl border border-[#FFE8C4] p-12 text-center text-slate-500 text-xs font-medium">
            No candidates meet the minimum CGPA filter of {minimumCgpaFilter}. Lower the threshold above to expand results.
          </div>
        )}
      </div>
    </div>
  );
};
