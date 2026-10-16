import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Building2,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

export const ApplicationTrackerPage = () => {
  const { applications, updateApplicationStatus } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredApps = applications.filter(app => {
    if (statusFilter === 'all') return true;
    return app.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FFCED8] shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFDDDD] text-[#b84b64] border border-[#FFCED8] mb-2">
          <Clock className="w-3.5 h-3.5" />
          Campus Hiring Tracking
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Application Tracker</h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl font-medium">
          Track end-to-end recruitment milestones from initial submission to technical review, recruiter shortlist, and final Letter of Intent (LOI).
        </p>

        {/* Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-[#FFF4DE] text-slate-700 hover:bg-[#FFE8C4]'
            }`}
          >
            All Applications ({applications.length})
          </button>
          <button
            onClick={() => setStatusFilter('Applied')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'Applied'
                ? 'bg-[#b86e24] text-white'
                : 'bg-[#FFE8C4] text-[#b86e24] hover:bg-[#feddad]'
            }`}
          >
            Applied ({applications.filter(a => a.status === 'Applied').length})
          </button>
          <button
            onClick={() => setStatusFilter('Interview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'Interview'
                ? 'bg-[#b84b64] text-white'
                : 'bg-[#FFDDDD] text-[#b84b64] hover:bg-[#FFCED8]'
            }`}
          >
            Interview Scheduled ({applications.filter(a => a.status === 'Interview').length})
          </button>
          <button
            onClick={() => setStatusFilter('Offer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'Offer'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
          >
            Offers Received ({applications.filter(a => a.status === 'Offer').length})
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-3xl border border-[#FFE8C4] p-6 shadow-xs hover:border-[#FFCED8] transition-all space-y-6"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#b84b64] to-[#e06d85] text-white font-black text-base flex items-center justify-center shrink-0 shadow-xs">
                  {app.company.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{app.title}</h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
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
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5 font-medium">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{app.company}</span>
                    <span>•</span>
                    <span>Package: <strong className="text-slate-700">{app.packageLPA}</strong></span>
                    <span>•</span>
                    <span>Submitted on: {app.appliedDate}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Verified ATS Match</div>
                  <div className="text-xl font-black text-[#b84b64]">{app.matchScore}%</div>
                </div>

                <Link
                  to={`/jobs/${app.jobId}`}
                  className="px-3.5 py-2 rounded-xl border border-[#FFE8C4] bg-[#FFF4DE]/60 text-xs font-bold text-slate-700 hover:bg-[#FFE8C4]"
                >
                  View Job
                </Link>
              </div>
            </div>

            {/* Stage Notes banner */}
            <div className="p-3.5 bg-[#FFF4DE] border border-[#FFE8C4] rounded-2xl text-xs text-slate-700 flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-[#b84b64] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Stage Status / Recruiter Note: </span>
                <span className="font-medium">{app.stageNotes}</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Pipeline Milestones
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {app.timeline.map((step, idx) => {
                  const isDone = step.status === 'completed';
                  const isCurrent = step.status === 'current';

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border text-xs relative ${
                        isDone
                          ? 'bg-[#FFDDDD]/60 border-[#FFCED8]'
                          : isCurrent
                          ? 'bg-[#FFE8C4]/60 border-[#b86e24] ring-2 ring-[#FFE8C4]'
                          : 'bg-[#FFF4DE]/40 border-[#FFE8C4] text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold ${isDone ? 'text-[#b84b64]' : isCurrent ? 'text-[#b86e24]' : 'text-slate-500'}`}>
                          {step.step}
                        </span>
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#b84b64]" />
                        ) : isCurrent ? (
                          <span className="w-2 h-2 rounded-full bg-[#b86e24] animate-ping"></span>
                        ) : null}
                      </div>
                      <p className={`text-[11px] font-medium ${isDone ? 'text-slate-700' : isCurrent ? 'text-slate-800' : 'text-slate-400'}`}>
                        {step.note}
                      </p>
                      <span className="block text-[10px] text-slate-400 mt-1">{step.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Status Simulation Control */}
            <div className="pt-3 border-t border-[#FFE8C4]/70 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 font-bold">Simulate Recruitment State:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => updateApplicationStatus(app.id, 'Applied', 'Candidate in screening pool')}
                  className="px-3 py-1.5 rounded-xl bg-[#FFF4DE] hover:bg-[#FFE8C4] text-[#b86e24] font-bold border border-[#FFE8C4]"
                >
                  Set Applied
                </button>
                <button
                  onClick={() => updateApplicationStatus(app.id, 'Interview', 'Technical Round 1 scheduled')}
                  className="px-3 py-1.5 rounded-xl bg-[#FFDDDD] hover:bg-[#FFCED8] text-[#b84b64] font-bold border border-[#FFCED8]"
                >
                  Set Interview
                </button>
                <button
                  onClick={() => updateApplicationStatus(app.id, 'Offer', 'Offer Letter Issued (20 LPA)')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold border border-emerald-200"
                >
                  Set Offer
                </button>
                <button
                  onClick={() => updateApplicationStatus(app.id, 'Rejected', 'Position closed for cycle')}
                  className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold border border-rose-200"
                >
                  Set Rejected
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredApps.length === 0 && (
          <div className="bg-white rounded-3xl border border-[#FFE8C4] p-12 text-center">
            <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 text-base">No Applications Found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4 font-medium">
              You haven't submitted applications with this status filter.
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#b84b64] text-white font-bold text-xs"
            >
              Browse Job Openings
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
