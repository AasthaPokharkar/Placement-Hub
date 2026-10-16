import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { SkillsEvidencePage } from './pages/SkillsEvidencePage';
import { JobOpeningsPage } from './pages/JobOpeningsPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { ResumeGeneratorPage } from './pages/ResumeGeneratorPage';
import { ApplicationTrackerPage } from './pages/ApplicationTrackerPage';
import { TPODashboardPage } from './pages/TPODashboardPage';
import { BatchMatchingPage } from './pages/BatchMatchingPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
            <Routes>
              {/* 1. Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* 2. Login / Register */}
              <Route path="/login" element={<LoginPage />} />

              {/* 3. Student Dashboard / Profile */}
              <Route path="/dashboard" element={<StudentDashboard />} />

              {/* 4. Skills & Evidence */}
              <Route path="/skills" element={<SkillsEvidencePage />} />

              {/* 5. Job Openings */}
              <Route path="/jobs" element={<JobOpeningsPage />} />

              {/* 6. Job Details & Match Score */}
              <Route path="/jobs/:jobId" element={<JobDetailPage />} />

              {/* 7. Resume Generator */}
              <Route path="/resume" element={<ResumeGeneratorPage />} />

              {/* 8. Application Tracker */}
              <Route path="/tracker" element={<ApplicationTrackerPage />} />

              {/* 9. Placement Officer Dashboard */}
              <Route path="/tpo" element={<TPODashboardPage />} />

              {/* 10. Batch Matching */}
              <Route path="/batch-matching" element={<BatchMatchingPage />} />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
