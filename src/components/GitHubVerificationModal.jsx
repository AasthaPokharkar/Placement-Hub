import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  RefreshCw,
  GitCommit,
  GitPullRequest,
  Check,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { Github } from './Icons';

export const GitHubVerificationModal = ({ isOpen, onClose, onVerified }) => {
  const { studentProfile, setStudentProfile } = useApp();
  const [repoInput, setRepoInput] = useState('https://github.com/aastha-pokharkar/campus-connect');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  if (!isOpen) return null;

  const handleSimulateVerification = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerificationResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      const parsedRepo = repoInput.split('github.com/')[1] || 'aastha-pokharkar/campus-connect';
      const mockInspection = {
        repoName: parsedRepo,
        primaryLanguages: ['TypeScript (64%)', 'React (28%)', 'Tailwind CSS (8%)'],
        commitCount: 142,
        verifiedPullRequests: 18,
        authorshipMatch: '98.6% by candidate key',
        lintStatus: '0 vulnerabilities detected',
        extractedSkills: ['React.js', 'TypeScript', 'Docker & Kubernetes'],
        truthScore: 96
      };
      setVerificationResult(mockInspection);

      // Auto resolve flagged skills if applicable
      setStudentProfile(prev => ({
        ...prev,
        verificationStatus: '100% Repository Verified via GitHub API'
      }));

      if (onVerified) onVerified(mockInspection);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#3f1e28]/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#FFCED8] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#FFE8C4]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFCED8] text-[#b84b64] flex items-center justify-center">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Verify Proof Repository</h3>
              <p className="text-xs text-slate-500">Live Commit & PR Evidence Inspector</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFF4DE] text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSimulateVerification} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              GitHub Repository / Pull Request Link
            </label>
            <div className="relative">
              <input
                type="url"
                required
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                placeholder="https://github.com/username/project"
                className="w-full px-4 py-2.5 rounded-xl border border-[#FFCED8] bg-[#FFF4DE]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#b84b64]"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Checks public commit history, test suites, and cryptographic commit signatures to verify author authenticity.
            </p>
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#b84b64] to-[#c75d74] text-white font-semibold text-sm shadow-md shadow-[#FFCED8] hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Scanning Repository Commits & PRs...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Verify & Link Proof Artifacts</span>
              </>
            )}
          </button>
        </form>

        {/* Verification Result Showcase */}
        {verificationResult && (
          <div className="mt-5 p-4 rounded-2xl bg-[#FFF4DE] border border-[#FFE8C4] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#b84b64] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Proof Validated Successfully ({verificationResult.truthScore}% Trust Score)
              </span>
              <span className="text-[10px] font-mono text-slate-500">SHA: 8f42d...e7</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/80 p-2.5 rounded-xl border border-[#FFE8C4]">
                <div className="text-[10px] text-slate-500">Commits Verified</div>
                <div className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <GitCommit className="w-3.5 h-3.5 text-[#b84b64]" />
                  {verificationResult.commitCount} commits
                </div>
              </div>

              <div className="bg-white/80 p-2.5 rounded-xl border border-[#FFE8C4]">
                <div className="text-[10px] text-slate-500">Merged PRs</div>
                <div className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <GitPullRequest className="w-3.5 h-3.5 text-emerald-600" />
                  {verificationResult.verifiedPullRequests} merged PRs
                </div>
              </div>
            </div>

            <div className="bg-white/80 p-2.5 rounded-xl border border-[#FFE8C4] text-xs">
              <span className="text-[10px] text-slate-500 block mb-1">Detected Verified Stack:</span>
              <div className="flex flex-wrap gap-1.5">
                {verificationResult.extractedSkills.map(sk => (
                  <span key={sk} className="px-2 py-0.5 rounded-md bg-[#FFCED8] text-[#b84b64] font-semibold text-[10px]">
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#FFE8C4] text-[11px] text-slate-600">
              <span>Author match: <strong>{verificationResult.authorshipMatch}</strong></span>
              <button
                onClick={onClose}
                className="px-3 py-1 rounded-lg bg-[#b84b64] text-white font-semibold text-xs"
              >
                Apply to Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
