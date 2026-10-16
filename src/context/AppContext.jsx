import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialStudentProfile,
  initialJobs,
  initialApplications,
  initialBatchStudents
} from '../data/mockData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // User authentication role: 'student' | 'tpo' | null
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ph_user');
    return saved ? JSON.parse(saved) : {
      name: "Aastha Pokharkar",
      email: "aastha.pokharkar@college.edu",
      role: "student", // 'student' or 'tpo'
      college: "National Institute of Technology"
    };
  });

  const [studentProfile, setStudentProfile] = useState(() => {
    const saved = localStorage.getItem('ph_profile');
    return saved ? JSON.parse(saved) : initialStudentProfile;
  });

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('ph_jobs');
    return saved ? JSON.parse(saved) : initialJobs;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('ph_apps');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [batchStudents, setBatchStudents] = useState(() => {
    const saved = localStorage.getItem('ph_batch');
    return saved ? JSON.parse(saved) : initialBatchStudents;
  });

  // Keep state sync in localStorage
  useEffect(() => {
    localStorage.setItem('ph_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ph_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    localStorage.setItem('ph_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('ph_apps', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('ph_batch', JSON.stringify(batchStudents));
  }, [batchStudents]);

  // Login handler
  const login = (role = 'student', customUser = null) => {
    const user = customUser || (
      role === 'tpo'
        ? {
            name: "Dr. K. R. Ramanathan",
            email: "tpo@college.edu",
            role: "tpo",
            designation: "Head of Training & Placements",
            college: "National Institute of Technology"
          }
        : {
            name: "Aastha Pokharkar",
            email: "aastha.pokharkar@college.edu",
            role: "student",
            college: "National Institute of Technology"
          }
    );
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Add new skill with evidence
  const addSkillWithEvidence = (newSkill) => {
    const skillObj = {
      id: `sk-${Date.now()}`,
      verified: Boolean(newSkill.evidenceUrl && newSkill.evidenceUrl.trim().length > 5),
      claimsFlagged: !newSkill.evidenceUrl || newSkill.evidenceUrl.trim().length === 0,
      ...newSkill
    };
    setStudentProfile(prev => ({
      ...prev,
      skills: [...prev.skills, skillObj]
    }));
  };

  // Remove skill
  const removeSkill = (id) => {
    setStudentProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // Add evidence to existing skill
  const updateSkillEvidence = (id, evidenceData) => {
    setStudentProfile(prev => ({
      ...prev,
      skills: prev.skills.map(s => {
        if (s.id === id) {
          return {
            ...s,
            evidenceType: evidenceData.evidenceType || s.evidenceType,
            evidenceUrl: evidenceData.evidenceUrl || s.evidenceUrl,
            evidenceSummary: evidenceData.evidenceSummary || s.evidenceSummary,
            assessmentScore: evidenceData.assessmentScore || s.assessmentScore,
            verified: Boolean(evidenceData.evidenceUrl && evidenceData.evidenceUrl.trim().length > 0),
            claimsFlagged: !evidenceData.evidenceUrl || evidenceData.evidenceUrl.trim().length === 0
          };
        }
        return s;
      })
    }));
  };

  // Apply to job
  const applyToJob = (jobId, customNote = "") => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return false;
    const existing = applications.find(a => a.jobId === jobId);
    if (existing) return false;

    // Calculate match score
    const required = job.requiredSkills || [];
    const studentSkillNames = studentProfile.skills.map(s => s.name);
    const matchedCount = required.filter(req => studentSkillNames.includes(req)).length;
    const matchPct = Math.min(98, Math.max(55, Math.round((matchedCount / (required.length || 1)) * 100)));

    const newApp = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      company: job.company,
      title: job.title,
      packageLPA: job.packageLPA,
      appliedDate: new Date().toISOString().split('T')[0],
      status: "Applied",
      matchScore: matchPct,
      stageNotes: customNote || "Application submitted with verified GitHub repository proof & registrar marks.",
      timeline: [
        { step: "Applied", date: new Date().toISOString().split('T')[0], status: "completed", note: "Resume & verified GitHub evidence submitted" },
        { step: "TPO Verification", date: "Pending", status: "current", note: "Academic eligibility check" },
        { step: "Corporate Review", date: "Pending", status: "upcoming", note: "Recruiter reviewing repo proof" },
        { step: "Interview", date: "Pending", status: "upcoming", note: "Technical assessment" },
        { step: "Offer / Decision", date: "Pending", status: "upcoming", note: "Final recruitment outcome" }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    return true;
  };

  // Update application status (For TPO or student tracking)
  const updateApplicationStatus = (appId, newStatus, newNote) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: newStatus,
          stageNotes: newNote || a.stageNotes
        };
      }
      return a;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        studentProfile,
        setStudentProfile,
        skills: studentProfile.skills,
        addSkillWithEvidence,
        removeSkill,
        updateSkillEvidence,
        jobs,
        setJobs,
        applications,
        applyToJob,
        updateApplicationStatus,
        batchStudents,
        setBatchStudents
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
