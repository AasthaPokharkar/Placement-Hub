import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Building2,
  MapPin,
  Search,
  CheckCircle2,
  Layers,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

export const JobOpeningsPage = () => {
  const { jobs, studentProfile, applications } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [workplaceFilter, setWorkplaceFilter] = useState('all'); // all, Hybrid, Remote, On-site
  const [consolidateDuplicates, setConsolidateDuplicates] = useState(true);

  // Student skill names for quick matching calculation
  const studentSkillNames = studentProfile.skills.map(s => s.name);

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesWorkplace = workplaceFilter === 'all' || job.workplaceType === workplaceFilter;

    return matchesSearch && matchesWorkplace;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FFCED8] shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFDDDD] text-[#b84b64] border border-[#FFCED8] mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          Campus Hiring Drives (2026 Batch)
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Verified Job Openings</h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl font-medium">
          Browse verified company requisitions. Duplicate company listings are automatically grouped to prevent candidate fatigue and redundant applications.
        </p>

        {/* Search & Filter Controls */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by job title, company, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-[#FFE8C4] bg-[#FFF4DE]/40 focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Workplace filter */}
            <select
              value={workplaceFilter}
              onChange={(e) => setWorkplaceFilter(e.target.value)}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-[#FFE8C4] bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
            >
              <option value="all">All Workplace Types</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>

            {/* Deduplication Toggle UI */}
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-[#FFF4DE] px-3.5 py-2 rounded-xl border border-[#FFE8C4] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consolidateDuplicates}
                onChange={(e) => setConsolidateDuplicates(e.target.checked)}
                className="rounded text-[#b84b64] focus:ring-[#b84b64]"
              />
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#b86e24]" />
                Merge Duplicate Openings
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Duplicate Openings Explained Notification */}
      {consolidateDuplicates && (
        <div className="bg-[#FFF4DE] border border-[#FFE8C4] rounded-2xl p-3.5 flex items-center justify-between text-xs text-[#b86e24]">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#b86e24] shrink-0" />
            <span>
              <strong>Deduplication Enabled:</strong> 2 duplicate roles from Razorpay & Zomato merged into consolidated hiring tracks.
            </span>
          </div>
          <span className="text-[11px] text-slate-600 font-bold hidden sm:inline">Prevents dual candidate blacklists</span>
        </div>
      )}

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => {
          // Calculate match score
          const required = job.requiredSkills || [];
          const matchedSkills = required.filter(r => studentSkillNames.includes(r));
          const matchPercent = Math.min(98, Math.max(50, Math.round((matchedSkills.length / (required.length || 1)) * 100)));
          const hasApplied = applications.some(a => a.jobId === job.id);

          return (
            <div
              key={job.id}
              className="bg-white rounded-3xl border border-[#FFE8C4] p-6 shadow-xs hover:border-[#FFCED8] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#b84b64] to-[#e06d85] text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {job.logoText}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="font-bold text-slate-700">{job.company}</span>
                        <span>•</span>
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 text-xs font-bold rounded-xl bg-[#FFF4DE] text-[#b86e24] border border-[#FFE8C4] whitespace-nowrap">
                    {job.packageLPA}
                  </span>
                </div>

                {/* Duplicate Merged Notice if active */}
                {job.duplicateNote && consolidateDuplicates && (
                  <div className="my-3 p-3 bg-[#FFF4DE]/60 border border-[#FFE8C4] rounded-2xl text-[11px] text-[#b86e24] flex items-start gap-2 font-medium">
                    <Layers className="w-4 h-4 text-[#b86e24] shrink-0 mt-0.5" />
                    <span>{job.duplicateNote}</span>
                  </div>
                )}

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 my-3 font-medium">
                  {job.description}
                </p>

                {/* Match Score Meter */}
                <div className="my-4 p-3.5 bg-[#FFDDDD]/30 rounded-2xl border border-[#FFCED8]/70">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#b84b64]" />
                      Candidate Evidence Match:
                    </span>
                    <span className="font-black text-[#b84b64]">{matchPercent}%</span>
                  </div>
                  <div className="w-full bg-[#FFE8C4]/60 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#b84b64] to-[#c75d74]"
                      style={{ width: `${matchPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5 font-medium">
                    <span>Matches {matchedSkills.length} of {required.length} required skills</span>
                    <span className="text-[#b84b64] font-bold">Verified GitHub Proofs</span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Required Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.requiredSkills.map((sk) => {
                      const isMatched = studentSkillNames.includes(sk);
                      return (
                        <span
                          key={sk}
                          className={`px-2.5 py-1 text-xs rounded-xl font-bold flex items-center gap-1 ${
                            isMatched
                              ? 'bg-[#FFDDDD] text-[#b84b64] border border-[#FFCED8]'
                              : 'bg-white text-slate-600 border border-[#FFE8C4]'
                          }`}
                        >
                          {isMatched && <CheckCircle2 className="w-3 h-3 text-[#b84b64]" />}
                          {sk}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="pt-4 border-t border-[#FFE8C4]/70 flex items-center justify-between">
                <span className="text-xs text-slate-400">Apply by: {job.deadline}</span>
                <div className="flex items-center gap-2">
                  {hasApplied ? (
                    <span className="px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-100 text-emerald-800">
                      Applied
                    </span>
                  ) : null}
                  <Link
                    to={`/jobs/${job.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#b84b64] hover:bg-[#a63d55] text-white transition-colors"
                  >
                    View Details & Score <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
