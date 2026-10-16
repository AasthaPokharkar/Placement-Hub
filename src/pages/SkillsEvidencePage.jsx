import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { Github } from '../components/Icons';
import { GitHubVerificationModal } from '../components/GitHubVerificationModal';

export const SkillsEvidencePage = () => {
  const { studentProfile, addSkillWithEvidence, removeSkill, updateSkillEvidence } = useApp();
  const [filter, setFilter] = useState('all'); // 'all' | 'verified' | 'flagged'
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  // Modal / Form state for adding skill
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newCategory, setNewCategory] = useState('Frontend');
  const [newLevel, setNewLevel] = useState('Intermediate');
  const [newEvidenceType, setNewEvidenceType] = useState('GitHub Repository');
  const [newEvidenceUrl, setNewEvidenceUrl] = useState('');
  const [newEvidenceSummary, setNewEvidenceSummary] = useState('');
  const [newAssessmentScore, setNewAssessmentScore] = useState('');

  // Edit Evidence Modal state
  const [editingSkill, setEditingSkill] = useState(null);
  const [editUrl, setEditUrl] = useState('');
  const [editSummary, setEditSummary] = useState('');
  const [editScore, setEditScore] = useState('');

  const skills = studentProfile.skills;

  const filteredSkills = skills.filter(s => {
    if (filter === 'verified') return s.verified;
    if (filter === 'flagged') return s.claimsFlagged;
    return true;
  });

  const handleCreateSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    addSkillWithEvidence({
      name: newSkillName.trim(),
      category: newCategory,
      level: newLevel,
      evidenceType: newEvidenceType,
      evidenceUrl: newEvidenceUrl.trim(),
      evidenceSummary: newEvidenceSummary.trim() || "Candidate specified skill without detailed commit log.",
      assessmentScore: newAssessmentScore.trim() || "Self Assessed"
    });

    // Reset
    setNewSkillName('');
    setNewEvidenceUrl('');
    setNewEvidenceSummary('');
    setNewAssessmentScore('');
    setShowAddModal(false);
  };

  const handleUpdateEvidence = (e) => {
    e.preventDefault();
    if (!editingSkill) return;

    updateSkillEvidence(editingSkill.id, {
      evidenceUrl: editUrl.trim(),
      evidenceSummary: editSummary.trim(),
      assessmentScore: editScore.trim()
    });

    setEditingSkill(null);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);
    setEditUrl(skill.evidenceUrl || '');
    setEditSummary(skill.evidenceSummary || '');
    setEditScore(skill.assessmentScore || '');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FFCED8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFDDDD] text-[#b84b64] border border-[#FFCED8] mb-2">
            <FileCheck2 className="w-3.5 h-3.5" />
            Verification Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Skills & Evidence Portfolio</h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl font-medium">
            Every technical claim must be backed by verifiable proof (GitHub repositories, PRs, or proctored test certifications). Unbacked claims are flagged to protect placement integrity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowVerifyModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFE8C4] hover:bg-[#feddad] text-[#b86e24] font-bold text-xs border border-[#FFE8C4] shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Scan GitHub Commits
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#b84b64] hover:bg-[#a63d55] text-white font-bold text-xs shadow-sm transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Skill with Proof
          </button>
        </div>
      </div>

      {/* Info Alert regarding ATS Anti-Inflation */}
      <div className="bg-[#FFF4DE] border border-[#FFE8C4] rounded-3xl p-4 flex items-start gap-3 text-xs text-[#b86e24]">
        <ShieldAlert className="w-5 h-5 text-[#b86e24] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-black text-[#b86e24]">ATS Anti-Inflation Protocol Active</p>
          <p className="text-slate-700 leading-relaxed font-medium">
            Skills with missing evidence URLs display an <strong className="text-[#b84b64]">"Unverified Claim"</strong> flag and will not receive ATS proof points during corporate resume screening. Provide public GitHub links or test badges to unlock maximum score weighting.
          </p>
        </div>
      </div>

      {/* Filters and Counters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-[#FFE8C4] hover:bg-[#FFF4DE]'
            }`}
          >
            All Skills ({skills.length})
          </button>
          <button
            onClick={() => setFilter('verified')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'verified'
                ? 'bg-[#b84b64] text-white'
                : 'bg-white text-[#b84b64] border border-[#FFCED8] hover:bg-[#FFDDDD]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Verified Proofs ({skills.filter(s => s.verified).length})
          </button>
          <button
            onClick={() => setFilter('flagged')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'flagged'
                ? 'bg-[#b86e24] text-white'
                : 'bg-white text-[#b86e24] border border-[#FFE8C4] hover:bg-[#FFF4DE]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Flagged Claims ({skills.filter(s => s.claimsFlagged).length})
          </button>
        </div>

        <div className="text-xs text-slate-500 font-bold">
          Showing {filteredSkills.length} entries
        </div>
      </div>

      {/* Skills Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className={`rounded-3xl border p-6 flex flex-col justify-between transition-all bg-white shadow-xs ${
              skill.verified
                ? 'border-[#FFE8C4] hover:border-[#FFCED8] hover:shadow-sm'
                : 'border-[#FFCED8] bg-[#FFDDDD]/30'
            }`}
          >
            <div>
              {/* Card top */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900">{skill.name}</h3>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FFF4DE] text-slate-700 border border-[#FFE8C4]">
                      {skill.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">Proficiency: <span className="font-bold text-slate-700">{skill.level}</span></p>
                </div>

                {skill.verified ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-100/70 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Proof
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold bg-[#FFCED8] text-[#b84b64]">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Proof Missing
                  </span>
                )}
              </div>

              {/* Evidence Box */}
              <div className={`p-4 rounded-2xl text-xs space-y-2 mb-4 ${skill.verified ? 'bg-[#FFF4DE]/60 border border-[#FFE8C4]' : 'bg-[#FFDDDD]/60 border border-[#FFCED8] text-[#b84b64]'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 flex items-center gap-1">
                    <Github className="w-3.5 h-3.5 text-[#b84b64]" />
                    {skill.evidenceType}
                  </span>
                  {skill.evidenceUrl ? (
                    <a
                      href={skill.evidenceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#b84b64] hover:text-[#913247] font-bold inline-flex items-center gap-1"
                    >
                      Inspect Source <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[#b84b64] font-bold">No URL Attached</span>
                  )}
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px] font-medium">{skill.evidenceSummary}</p>
                <div className="pt-2 border-t border-[#FFE8C4]/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Standard Test Score:</span>
                  <span className="font-bold text-slate-800">{skill.assessmentScore}</span>
                </div>
              </div>
            </div>

            {/* Actions footer */}
            <div className="pt-3 border-t border-[#FFE8C4]/50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => openEditModal(skill)}
                className="text-xs font-bold text-[#b84b64] hover:text-[#913247]"
              >
                {skill.verified ? 'Update Evidence Details' : '+ Link GitHub Proof'}
              </button>
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                title="Remove skill"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#3f1e28]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#FFCED8] animate-in fade-in duration-200">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Add Skill with Verifiable Evidence</h2>
            <p className="text-xs text-slate-500 mb-4 font-medium">
              All claims added to your Placement Hub portfolio require backing links to prevent resume inflation.
            </p>

            <form onSubmit={handleCreateSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js, Redis, Apache Kafka"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#FFCED8] bg-[#FFF4DE]/30 focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#FFE8C4] bg-white focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
                  >
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Databases</option>
                    <option>DevOps / Cloud</option>
                    <option>Languages</option>
                    <option>Machine Learning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Proficiency Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#FFE8C4] bg-white focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Evidence Type</label>
                <select
                  value={newEvidenceType}
                  onChange={(e) => setNewEvidenceType(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#FFE8C4] bg-white focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
                >
                  <option>GitHub Repository</option>
                  <option>GitHub Pull Request</option>
                  <option>Proctored Assessment Badge</option>
                  <option>Live Production URL</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Evidence Proof URL (GitHub / Demo)</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={newEvidenceUrl}
                  onChange={(e) => setNewEvidenceUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#FFCED8] bg-[#FFF4DE]/30 focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
                />
                <p className="text-[11px] text-slate-400 mt-1 font-medium">Leave empty only if claim is unverified (will be flagged).</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Evidence Summary & Contributions</label>
                <textarea
                  rows={2}
                  placeholder="Describe your concrete contribution (e.g. built redis sliding window cache, wrote unit tests)..."
                  value={newEvidenceSummary}
                  onChange={(e) => setNewEvidenceSummary(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#FFCED8] bg-[#FFF4DE]/30 focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assessment Score / Badge (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 92/100 (CodeSignal), HackerRank 5-Star"
                  value={newAssessmentScore}
                  onChange={(e) => setNewAssessmentScore(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#FFE8C4] bg-[#FFF4DE]/30 focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#FFE8C4]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-[#FFF4DE] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#b84b64] hover:bg-[#a63d55] text-white rounded-xl shadow-xs"
                >
                  Save to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Evidence Modal */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 bg-[#3f1e28]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#FFCED8] animate-in fade-in duration-200">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Update Evidence for: <span className="text-[#b84b64]">{editingSkill.name}</span>
            </h2>
            <p className="text-xs text-slate-500 mb-4 font-medium">
              Adding a valid repository proof link will immediately lift the unverified flag.
            </p>

            <form onSubmit={handleUpdateEvidence} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">GitHub / Evidence URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/..."
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#FFCED8] bg-[#FFF4DE]/30 focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Evidence Summary</label>
                <textarea
                  rows={3}
                  value={editSummary}
                  onChange={(e) => setEditSummary(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#FFCED8] bg-[#FFF4DE]/30 focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assessment / Score Badge</label>
                <input
                  type="text"
                  value={editScore}
                  onChange={(e) => setEditScore(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#FFE8C4] bg-[#FFF4DE]/30 focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#FFE8C4]">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-[#FFF4DE] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#b84b64] hover:bg-[#a63d55] text-white rounded-xl shadow-xs"
                >
                  Update Proof
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <GitHubVerificationModal
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
      />
    </div>
  );
};
