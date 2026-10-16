import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Users,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Download,
  Search,
  Layers,
  ArrowRight
} from 'lucide-react';

export const TPODashboardPage = () => {
  const { batchStudents, jobs } = useApp();
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [exportNotice, setExportNotice] = useState(false);

  const filteredStudents = batchStudents.filter(std => {
    const matchesBranch = selectedBranch === 'all' || std.branch === selectedBranch;
    const matchesSearch =
      std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesBranch && matchesSearch;
  });

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Officer Header */}
      <div className="bg-gradient-to-r from-[#241318] via-[#3d1e28] to-[#241318] p-6 sm:p-8 rounded-3xl text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#FFCED8]/30">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFCED8]/20 text-[#FFCED8] border border-[#FFCED8]/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            College Placement Cell (TPO)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Training & Placement Officer Desk</h1>
          <p className="text-sm text-[#FFDDDD]/80 mt-1 max-w-2xl font-medium">
            Monitor batch readiness, audit GitHub verified skills, filter candidates without unbacked claims, and dispatch shortlists to visiting recruiters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/batch-matching"
            className="px-4 py-2.5 rounded-xl bg-[#b84b64] hover:bg-[#a63d55] text-white font-bold text-xs shadow-md shadow-[#FFCED8]/40 transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" />
            Batch Matching Engine
          </Link>
          <button
            onClick={handleExport}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FFE8C4] border border-[#FFE8C4]/30 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Export Audit Report
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3.5 bg-[#FFDDDD]/60 border border-[#FFCED8] rounded-2xl text-xs text-[#b84b64] flex items-center gap-2 font-bold">
          <CheckCircle2 className="w-4 h-4 text-[#b84b64]" />
          <span>Audit Export Generated: Verified student matrix with GitHub evidence links compiled for recruiter review.</span>
        </div>
      )}

      {/* Aggregate Placement Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#FFCED8] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Batch 2026 Strength</span>
            <Users className="w-4 h-4 text-[#b84b64]" />
          </div>
          <div className="text-2xl font-black text-slate-900">420</div>
          <div className="text-[11px] text-[#b84b64] font-bold mt-1">94% Registered with Proofs</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#FFE8C4] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Verified Skills Count</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">1,840+</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">Repo commit checks passed</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#FFCED8] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Flagged Claims Quarantined</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-[#b84b64]">38</div>
          <div className="text-[11px] text-[#b84b64] font-bold mt-1">Excluded from corporate ATS feeds</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#FFE8C4] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Active Campus Drives</span>
            <Building2 className="w-4 h-4 text-[#b86e24]" />
          </div>
          <div className="text-2xl font-black text-slate-900">{jobs.length}</div>
          <div className="text-[11px] text-[#b86e24] font-bold mt-1">Consolidated & deduplicated</div>
        </div>
      </div>

      {/* Student Audit Table */}
      <div className="bg-white rounded-3xl border border-[#FFE8C4] shadow-xs overflow-hidden">
        <div className="p-6 border-b border-[#FFE8C4] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Batch Student Verification Directory</h2>
            <p className="text-xs text-slate-500 font-medium">Compare individual student evidence confidence and claim integrity</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search name, roll no, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3.5 py-2 text-xs rounded-xl border border-[#FFE8C4] bg-[#FFF4DE]/40 focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
              />
            </div>

            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-2 text-xs font-bold rounded-xl border border-[#FFE8C4] bg-white text-slate-700"
            >
              <option value="all">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF4DE]/50 border-b border-[#FFE8C4] text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">Candidate Details</th>
                <th className="px-6 py-4">Branch & CGPA</th>
                <th className="px-6 py-4">Verified Proofs</th>
                <th className="px-6 py-4">Flagged Claims</th>
                <th className="px-6 py-4">Top Evidence Artifact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FFE8C4]/60">
              {filteredStudents.map((std) => (
                <tr key={std.id} className="hover:bg-[#FFF4DE]/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm">{std.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{std.rollNo}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{std.branch}</div>
                    <div className="text-slate-500 font-medium">CGPA: {std.cgpa}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {std.verifiedSkillsCount} skills
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {std.flaggedClaimsCount > 0 ? (
                      <span className="inline-flex items-center gap-1 font-bold text-[#b84b64] bg-[#FFDDDD] px-2.5 py-0.5 rounded-lg">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        {std.flaggedClaimsCount} unbacked
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium">None (0)</span>
                    )}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="font-bold text-slate-800 truncate">{std.topEvidence}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{std.evidenceConfidence}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-xl text-[11px] font-bold bg-[#FFF4DE] text-[#b86e24] border border-[#FFE8C4]">
                      {std.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to="/batch-matching"
                      className="inline-flex items-center gap-1 text-[#b84b64] hover:text-[#913247] font-bold"
                    >
                      Compare <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
