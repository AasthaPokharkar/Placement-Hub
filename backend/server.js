const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
require("dotenv").config();

const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve frontend static files from workspace root
const staticPath = path.resolve(__dirname, "../../");
app.use(express.static(staticPath));

// Enable CORS for local Vite dev server and standard frontend ports
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or file://)
    if (!origin) return callback(null, true);
    const allowed = [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "http://localhost:3000",
      "http://127.0.0.1:3000"
    ];
    if (allowed.includes(origin) || origin.startsWith("http://localhost:")) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive for hackathon testing
  },
  credentials: true
}));

app.use(express.json());

// ============================================================================
// SKILL NORMALIZATION ENGINE (ReactJS == React.js == React)
// ============================================================================
const SKILL_ALIASES = {
  // Frontend
  'react': { name: 'React', key: 'react' },
  'reactjs': { name: 'React', key: 'react' },
  'react.js': { name: 'React', key: 'react' },
  'react-js': { name: 'React', key: 'react' },
  'vue': { name: 'Vue.js', key: 'vue' },
  'vuejs': { name: 'Vue.js', key: 'vue' },
  'vue.js': { name: 'Vue.js', key: 'vue' },
  'angular': { name: 'Angular', key: 'angular' },
  'javascript': { name: 'JavaScript', key: 'javascript' },
  'js': { name: 'JavaScript', key: 'javascript' },
  'typescript': { name: 'TypeScript', key: 'typescript' },
  'ts': { name: 'TypeScript', key: 'typescript' },
  'html': { name: 'HTML5', key: 'html5' },
  'html5': { name: 'HTML5', key: 'html5' },
  'css': { name: 'CSS3', key: 'css3' },
  'css3': { name: 'CSS3', key: 'css3' },
  'tailwind': { name: 'Tailwind CSS', key: 'tailwind' },
  'tailwindcss': { name: 'Tailwind CSS', key: 'tailwind' },

  // Backend
  'node': { name: 'Node.js', key: 'nodejs' },
  'nodejs': { name: 'Node.js', key: 'nodejs' },
  'node.js': { name: 'Node.js', key: 'nodejs' },
  'express': { name: 'Express.js', key: 'express' },
  'expressjs': { name: 'Express.js', key: 'express' },
  'python': { name: 'Python', key: 'python' },
  'python3': { name: 'Python', key: 'python' },
  'py': { name: 'Python', key: 'python' },
  'java': { name: 'Java', key: 'java' },
  'spring': { name: 'Spring Boot', key: 'spring-boot' },
  'springboot': { name: 'Spring Boot', key: 'spring-boot' },
  'spring boot': { name: 'Spring Boot', key: 'spring-boot' },
  'c++': { name: 'C++', key: 'cpp' },
  'cpp': { name: 'C++', key: 'cpp' },
  'c#': { name: 'C#', key: 'csharp' },
  'csharp': { name: 'C#', key: 'csharp' },

  // Databases & Cloud
  'sql': { name: 'SQL', key: 'sql' },
  'postgres': { name: 'PostgreSQL', key: 'postgresql' },
  'postgresql': { name: 'PostgreSQL', key: 'postgresql' },
  'psql': { name: 'PostgreSQL', key: 'postgresql' },
  'mongo': { name: 'MongoDB', key: 'mongodb' },
  'mongodb': { name: 'MongoDB', key: 'mongodb' },
  'docker': { name: 'Docker', key: 'docker' },
  'containers': { name: 'Docker', key: 'docker' },
  'aws': { name: 'AWS', key: 'aws' },
  'amazon web services': { name: 'AWS', key: 'aws' },
  'git': { name: 'Git', key: 'git' },
  'github': { name: 'Git', key: 'git' },
  'dsa': { name: 'Data Structures & Algorithms', key: 'dsa' },
  'data structures': { name: 'Data Structures & Algorithms', key: 'dsa' },
  'machine learning': { name: 'Machine Learning', key: 'machine-learning' },
  'ml': { name: 'Machine Learning', key: 'machine-learning' }
};

function normalizeSkill(rawInput) {
  if (!rawInput || typeof rawInput !== 'string') {
    return { raw: '', name: 'Unknown', key: 'unknown' };
  }
  const clean = rawInput.trim().toLowerCase().replace(/[^\w\s\+\#\.\-]/g, '').replace(/\s+/g, ' ');
  if (SKILL_ALIASES[clean]) {
    return { raw: rawInput, name: SKILL_ALIASES[clean].name, key: SKILL_ALIASES[clean].key };
  }
  const withoutJs = clean.replace(/(\.js|-js|js)$/, '').trim();
  if (withoutJs && SKILL_ALIASES[withoutJs]) {
    return { raw: rawInput, name: SKILL_ALIASES[withoutJs].name, key: SKILL_ALIASES[withoutJs].key };
  }
  const fallbackName = rawInput.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const fallbackKey = clean.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  return { raw: rawInput, name: fallbackName, key: fallbackKey || clean };
}

// Educational explanations for missing skills
const SKILL_EXPLANATIONS = {
  'react': 'Core UI library used for component architecture and stateful single-page web applications.',
  'nodejs': 'Standard asynchronous backend runtime for scalable microservices and APIs.',
  'python': 'Essential for scripting, automation, analytical data processing, and backend development.',
  'docker': 'Industry standard for containerization, local development reproducibility, and cloud deployments.',
  'postgresql': 'Standard relational database for ACID transactions, indexing, and complex queries.',
  'sql': 'Core skill for querying relational databases, filtering, aggregations, and joins.',
  'git': 'Standard distributed version control system for collaborative software development.',
  'java': 'Enterprise-grade programming language used extensively in high-volume transactional services.',
  'dsa': 'Required for optimal time and space complexity in algorithmic problem solving.'
};

// ============================================================================
// DATABASE INITIALIZATION
// ============================================================================
const db = new Database("placement.db");
db.pragma("foreign_keys = ON");

// Database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    degree TEXT DEFAULT '',
    skills TEXT NOT NULL DEFAULT '[]',
    projects TEXT NOT NULL DEFAULT '[]',
    assessments TEXT NOT NULL DEFAULT '{"dsa":75,"systemDesign":70,"webDev":80,"aptitude":85}'
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT DEFAULT '',
    department TEXT DEFAULT 'Engineering',
    package TEXT DEFAULT '10 - 14 LPA',
    skills TEXT NOT NULL DEFAULT '[]',
    preferred_skills TEXT NOT NULL DEFAULT '[]',
    description TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    job_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Applied',
    notes TEXT DEFAULT '',
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, job_id),
    FOREIGN KEY(student_id) REFERENCES students(id),
    FOREIGN KEY(job_id) REFERENCES jobs(id)
  );
`);

// Add sample jobs only when the database is empty
const jobCount = db.prepare("SELECT COUNT(*) AS total FROM jobs").get();

if (jobCount.total === 0) {
  const addJob = db.prepare(`
    INSERT INTO jobs (title, company, location, department, package, skills, preferred_skills, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const sampleJobs = [
    [
      "Frontend Developer Intern",
      "TechNova Labs",
      "Bangalore / Hybrid",
      "Engineering",
      "12 - 15 LPA",
      ["ReactJS", "TypeScript", "CSS3", "Git"],
      ["Tailwind CSS", "REST APIs"],
      "Build responsive, accessible user interfaces with modern React and TypeScript."
    ],
    [
      "Java Developer Intern",
      "Enterprise Systems",
      "Pune / On-site",
      "Enterprise Core",
      "9 - 12 LPA",
      ["Java", "SQL", "Git", "DSA"],
      ["Spring Boot", "Docker"],
      "Develop secure, enterprise-grade Java backends and database schemas."
    ],
    [
      "Backend Platform Developer",
      "CloudScale Systems",
      "Hyderabad / Hybrid",
      "Infrastructure",
      "14 - 18 LPA",
      ["Node.js", "PostgreSQL", "Docker", "REST APIs"],
      ["Redis", "AWS"],
      "Architect event-driven microservices and containerized cloud APIs."
    ],
    [
      "Data Analyst Intern",
      "Nexus Analytics",
      "Mumbai / Remote",
      "AI Research",
      "11 - 14 LPA",
      ["Python", "SQL", "Machine Learning"],
      ["Docker", "FastAPI"],
      "Analyze large data pipelines, train predictive models, and produce business insights."
    ]
  ];

  for (const job of sampleJobs) {
    addJob.run(
      job[0],
      job[1],
      job[2],
      job[3],
      job[4],
      JSON.stringify(job[5]),
      JSON.stringify(job[6]),
      job[7]
    );
  }
}

// Add sample students only when the database is empty
const studentCount = db.prepare("SELECT COUNT(*) AS total FROM students").get();
if (studentCount.total === 0) {
  const addStudent = db.prepare(`
    INSERT INTO students (name, email, degree, skills, projects, assessments)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const sampleStudents = [
    {
      name: "Aarav Sharma",
      email: "aarav.sharma@campus.edu",
      degree: "B.Tech Computer Science (CGPA: 8.92)",
      skills: [
        { name: "NodeJS", level: "Advanced", evidenceUrl: "https://github.com/aarav-dev-sample/scalable-chat", evidenceDesc: "WebSocket microservice" },
        { name: "React.js", level: "Advanced", evidenceUrl: "https://github.com/aarav-dev-sample/campus-portal", evidenceDesc: "Campus web app" },
        { name: "PostgreSQL", level: "Intermediate", evidenceUrl: "https://github.com/aarav-dev-sample/db-tuning", evidenceDesc: "Query optimization benchmarks" },
        { name: "Docker", level: "Intermediate", evidenceUrl: "https://github.com/aarav-dev-sample/docker-env", evidenceDesc: "Multi-stage Docker compose" },
        { name: "AWS", level: "Beginner", evidenceUrl: "", evidenceDesc: "No public link (workshop)" }
      ],
      projects: [
        { title: "Distributed Log Aggregator", description: "Event-driven logging pipeline in Node.js and PostgreSQL", repoUrl: "https://github.com/aarav-dev-sample/logs", liveDemoUrl: "https://logs.aarav.dev", hasEvidence: true },
        { title: "High-Frequency Trading Prototype", description: "Order matching engine prototype", repoUrl: "", liveDemoUrl: "", hasEvidence: false }
      ],
      assessments: { dsa: 92, systemDesign: 78, webDev: 88, aptitude: 90 }
    },
    {
      name: "Priya Patel",
      email: "priya.patel@campus.edu",
      degree: "B.Tech Information Technology (CGPA: 9.35)",
      skills: [
        { name: "ReactJS", level: "Advanced", evidenceUrl: "https://github.com/priyapatel-ui/ui-kit", evidenceDesc: "Component library on npm" },
        { name: "TypeScript", level: "Advanced", evidenceUrl: "https://github.com/priyapatel-ui/kanban-ts", evidenceDesc: "Type-safe Kanban board" },
        { name: "CSS3", level: "Advanced", evidenceUrl: "https://github.com/priyapatel-ui/css-designs", evidenceDesc: "Accessible design system" },
        { name: "Git", level: "Intermediate", evidenceUrl: "https://github.com/priyapatel-ui", evidenceDesc: "400+ public contributions" }
      ],
      projects: [
        { title: "Accessible UI Primitives", description: "WCAG 2.1 AA compliant UI component library in React", repoUrl: "https://github.com/priyapatel-ui/ui-kit", liveDemoUrl: "https://ui.priyapatel.dev", hasEvidence: true }
      ],
      assessments: { dsa: 76, systemDesign: 70, webDev: 96, aptitude: 94 }
    },
    {
      name: "Rohan Gupta",
      email: "rohan.gupta@campus.edu",
      degree: "B.Tech Computer Science (CGPA: 7.64)",
      skills: [
        { name: "React", level: "Intermediate", evidenceUrl: "https://github.com/rohan-g-code/cart", evidenceDesc: "Shopping cart demo" },
        { name: "JavaScript", level: "Intermediate", evidenceUrl: "https://github.com/rohan-g-code/js-basics", evidenceDesc: "DOM exercises" },
        { name: "Python", level: "Beginner", evidenceUrl: "", evidenceDesc: "No repo link" },
        { name: "Docker", level: "Beginner", evidenceUrl: "", evidenceDesc: "Self study" }
      ],
      projects: [
        { title: "Online Shopping Prototype", description: "Prototype e-commerce cart", repoUrl: "https://github.com/rohan-g-code/cart", liveDemoUrl: "", hasEvidence: true },
        { title: "Cloud Attendance App", description: "Proposed serverless attendance concept", repoUrl: "", liveDemoUrl: "", hasEvidence: false }
      ],
      assessments: { dsa: 68, systemDesign: 52, webDev: 74, aptitude: 70 }
    }
  ];

  for (const s of sampleStudents) {
    addStudent.run(
      s.name,
      s.email,
      s.degree,
      JSON.stringify(s.skills),
      JSON.stringify(s.projects),
      JSON.stringify(s.assessments)
    );
  }
}

// Add sample applications if empty
const appCount = db.prepare("SELECT COUNT(*) AS total FROM applications").get();
if (appCount.total === 0) {
  const addApp = db.prepare(`
    INSERT INTO applications (student_id, job_id, status, notes)
    VALUES (?, ?, ?, ?)
  `);
  addApp.run(1, 3, "Interview", "Cleared initial screening; round 2 scheduled");
  addApp.run(2, 1, "Offer", "All rounds completed; offer letter sent (14 LPA)");
  addApp.run(3, 1, "Applied", "Resume submitted for screening");
}

function safeParse(jsonStr, fallback = []) {
  try {
    return JSON.parse(jsonStr || "[]");
  } catch (e) {
    return fallback;
  }
}

function formatJob(job) {
  return {
    ...job,
    skills: safeParse(job.skills, []),
    preferred_skills: safeParse(job.preferred_skills, [])
  };
}

function formatStudent(student) {
  return {
    ...student,
    skills: safeParse(student.skills, []),
    projects: safeParse(student.projects, []),
    assessments: safeParse(student.assessments, { dsa: 70, systemDesign: 70, webDev: 70, aptitude: 70 })
  };
}

// ============================================================================
// API ROUTES
// ============================================================================

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Placement Hub backend is running with SQLite and Skill Normalization",
    timestamp: new Date().toISOString()
  });
});

// 2. Skill Normalizer Helper (Bonus Endpoint)
app.get("/api/skills/normalize", (req, res) => {
  const query = req.query.skill || "";
  const norm = normalizeSkill(query);
  res.json({
    raw: query,
    canonicalName: norm.name,
    key: norm.key
  });
});

// 3. Get all jobs
app.get("/api/jobs", (req, res) => {
  const jobs = db.prepare("SELECT * FROM jobs ORDER BY id DESC").all();
  res.json(jobs.map(formatJob));
});

// 4. Duplicate Job Detection & Job Creation
app.post("/api/jobs", (req, res) => {
  const {
    title,
    company,
    location = "",
    department = "Engineering",
    package: salaryPackage = "10 - 14 LPA",
    skills = [],
    preferred_skills = [],
    description = ""
  } = req.body;

  if (!title || !company || !Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Title, company, and at least one required skill are required"
    });
  }

  // Duplicate Check: Check for existing jobs with same company and similar title / skills
  const existingJobs = db.prepare("SELECT * FROM jobs").all().map(formatJob);
  const normNewSkills = skills.map(normalizeSkill).map(s => s.key);

  const duplicate = existingJobs.find(job => {
    const sameCompany = job.company.trim().toLowerCase() === company.trim().toLowerCase();
    const sameTitle = job.title.trim().toLowerCase() === title.trim().toLowerCase();
    const jobSkillKeys = job.skills.map(normalizeSkill).map(s => s.key);
    
    // Check skill overlap
    const overlap = normNewSkills.filter(k => jobSkillKeys.includes(k)).length;
    const isSkillsSimilar = overlap >= Math.min(normNewSkills.length, jobSkillKeys.length) * 0.75;

    return sameCompany && (sameTitle || isSkillsSimilar);
  });

  if (duplicate && !req.query.force) {
    return res.status(409).json({
      success: false,
      isDuplicate: true,
      message: `Potential duplicate job detected (#${duplicate.id} - ${duplicate.title} at ${duplicate.company}). Pass ?force=true to override.`,
      duplicateJob: duplicate
    });
  }

  try {
    const result = db.prepare(`
      INSERT INTO jobs (title, company, location, department, package, skills, preferred_skills, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title.trim(),
      company.trim(),
      location.trim(),
      department.trim(),
      salaryPackage.trim(),
      JSON.stringify(skills),
      JSON.stringify(preferred_skills),
      description.trim()
    );

    const created = db.prepare("SELECT * FROM jobs WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json({
      success: true,
      job: formatJob(created)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Database error creating job" });
  }
});

// 5. Add a student profile
app.post("/api/students", (req, res) => {
  const { name, email, degree = "", skills = [], projects = [], assessments = {} } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof degree !== "string" ||
    !Array.isArray(skills)
  ) {
    return res.status(400).json({
      success: false,
      message: "Provide a valid name, email, degree, and skills array"
    });
  }

  try {
    const result = db.prepare(`
      INSERT INTO students (name, email, degree, skills, projects, assessments)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      name.trim(),
      email.trim().toLowerCase(),
      degree.trim(),
      JSON.stringify(skills),
      JSON.stringify(projects),
      JSON.stringify(assessments)
    );

    const student = db.prepare("SELECT * FROM students WHERE id = ?").get(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      student: formatStudent(student)
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        success: false,
        message: "This email is already registered"
      });
    }
    res.status(500).json({ success: false, message: "Database error" });
  }
});

// 6. Get all students
app.get("/api/students", (req, res) => {
  const students = db.prepare("SELECT * FROM students ORDER BY id ASC").all();
  res.json(students.map(formatStudent));
});

// 7. Get a single student profile
app.get("/api/students/:id", (req, res) => {
  const student = db.prepare("SELECT * FROM students WHERE id = ?").get(req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(formatStudent(student));
});

// 8. Match jobs to a student with Skill Normalization & Transparent Breakdown
app.get("/api/jobs/matches/:studentId", (req, res) => {
  const studentRaw = db.prepare("SELECT * FROM students WHERE id = ?").get(req.params.studentId);

  if (!studentRaw) {
    return res.status(404).json({ message: "Student not found" });
  }

  const student = formatStudent(studentRaw);
  
  // Normalize student skills to canonical keys
  const studentSkillMap = new Map();
  student.skills.forEach(item => {
    const rawName = typeof item === 'string' ? item : (item.name || item.raw || '');
    const norm = normalizeSkill(rawName);
    const hasEvidence = typeof item === 'object' && Boolean(item.evidenceUrl && item.evidenceUrl.trim().length > 0);
    studentSkillMap.set(norm.key, {
      raw: rawName,
      canonical: norm.name,
      key: norm.key,
      hasEvidence: hasEvidence,
      evidenceUrl: (typeof item === 'object' ? item.evidenceUrl : '') || ''
    });
  });

  const jobs = db.prepare("SELECT * FROM jobs").all().map(formatJob);

  const matches = jobs.map(job => {
    const requiredSkills = job.skills || [];
    const preferredSkills = job.preferred_skills || [];

    // Match required skills using normalized canonical keys
    const matchedRequired = [];
    const missingRequired = [];

    requiredSkills.forEach(reqSkill => {
      const normReq = normalizeSkill(reqSkill);
      if (studentSkillMap.has(normReq.key)) {
        matchedRequired.push({
          raw: reqSkill,
          canonical: normReq.name,
          studentSkill: studentSkillMap.get(normReq.key)
        });
      } else {
        missingRequired.push({
          raw: reqSkill,
          canonical: normReq.name,
          explanation: SKILL_EXPLANATIONS[normReq.key] || 'Core technical competency required for day-to-day role responsibilities.'
        });
      }
    });

    // Match preferred skills
    const matchedPreferred = [];
    preferredSkills.forEach(prefSkill => {
      const normPref = normalizeSkill(prefSkill);
      if (studentSkillMap.has(normPref.key)) {
        matchedPreferred.push({
          raw: prefSkill,
          canonical: normPref.name,
          studentSkill: studentSkillMap.get(normPref.key)
        });
      }
    });

    // Transparent calculation
    const reqRatio = requiredSkills.length ? (matchedRequired.length / requiredSkills.length) : 1;
    const prefRatio = preferredSkills.length ? (matchedPreferred.length / preferredSkills.length) : 1;
    
    // Proctored assessment contribution
    const dsaScore = (student.assessments && student.assessments.dsa) ? student.assessments.dsa : 70;
    const assessmentRatio = dsaScore / 100;

    const score = Math.round((reqRatio * 65) + (prefRatio * 20) + (assessmentRatio * 15));

    // Check application status
    const appRecord = db.prepare("SELECT status FROM applications WHERE student_id = ? AND job_id = ?").get(student.id, job.id);

    return {
      ...job,
      matchPercentage: Math.min(100, score),
      fitCategory: score >= 80 ? "Strong Match" : (score >= 60 ? "Moderate Match" : "Needs Skill Growth"),
      matchedSkills: matchedRequired.map(m => m.canonical),
      missingSkills: missingRequired.map(m => m.canonical),
      missingSkillDetails: missingRequired,
      matchedEvidenceCount: matchedRequired.filter(m => m.studentSkill.hasEvidence).length,
      applicationStatus: appRecord ? appRecord.status : null,
      breakdown: {
        requiredPoints: Math.round(reqRatio * 65),
        preferredPoints: Math.round(prefRatio * 20),
        assessmentPoints: Math.round(assessmentRatio * 15)
      }
    };
  });

  matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
  res.json({
    note: "Transparent score based on normalized skills (ReactJS == React.js == React) and proctored assessment benchmarks",
    studentName: student.name,
    matches
  });
});

// 9. TPO Candidate Rankings for a Specific Job
app.get("/api/jobs/:id/rankings", (req, res) => {
  const jobRaw = db.prepare("SELECT * FROM jobs WHERE id = ?").get(req.params.id);
  if (!jobRaw) {
    return res.status(404).json({ message: "Job not found" });
  }

  const job = formatJob(jobRaw);
  const students = db.prepare("SELECT * FROM students").all().map(formatStudent);
  const requiredNormKeys = job.skills.map(normalizeSkill).map(s => s.key);

  const rankings = students.map(student => {
    const studentKeys = new Set(student.skills.map(s => normalizeSkill(typeof s === 'string' ? s : s.name).key));
    const matchedCount = requiredNormKeys.filter(k => studentKeys.has(k)).length;
    const reqRatio = requiredNormKeys.length ? (matchedCount / requiredNormKeys.length) : 1;
    const dsa = (student.assessments && student.assessments.dsa) || 70;
    const totalScore = Math.round((reqRatio * 75) + ((dsa / 100) * 25));

    const appRecord = db.prepare("SELECT status FROM applications WHERE student_id = ? AND job_id = ?").get(student.id, job.id);

    return {
      studentId: student.id,
      name: student.name,
      email: student.email,
      degree: student.degree,
      fitScore: totalScore,
      matchedRequiredCount: matchedCount,
      totalRequiredCount: requiredNormKeys.length,
      pipelineStatus: appRecord ? appRecord.status : "Not Applied"
    };
  });

  rankings.sort((a, b) => b.fitScore - a.fitScore);
  res.json({
    job: { id: job.id, title: job.title, company: job.company },
    totalCandidates: rankings.length,
    rankings
  });
});

// 10. Apply for a job
app.post("/api/applications", (req, res) => {
  const { studentId, jobId, notes = "" } = req.body;

  if (!Number.isInteger(Number(studentId)) || !Number.isInteger(Number(jobId))) {
    return res.status(400).json({
      message: "studentId and jobId must be integers"
    });
  }

  try {
    const result = db.prepare(`
      INSERT INTO applications (student_id, job_id, status, notes)
      VALUES (?, ?, 'Applied', ?)
    `).run(Number(studentId), Number(jobId), notes || "Applied via Placement Hub portal");

    res.status(201).json({
      success: true,
      applicationId: result.lastInsertRowid,
      status: "Applied"
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        message: "You have already applied for this job"
      });
    }

    if (error.code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
      return res.status(400).json({
        message: "Student or job does not exist"
      });
    }

    res.status(500).json({ message: "Could not create application" });
  }
});

// 11. Get all applications (for Kanban pipeline view)
app.get("/api/applications", (req, res) => {
  const applications = db.prepare(`
    SELECT a.id, a.status, a.notes, a.applied_at,
           s.id AS studentId, s.name AS studentName, s.degree AS studentDegree,
           j.id AS jobId, j.title AS jobTitle, j.company AS jobCompany
    FROM applications a
    JOIN students s ON s.id = a.student_id
    JOIN jobs j ON j.id = a.job_id
    ORDER BY a.id DESC
  `).all();

  res.json(applications);
});

// 12. Get applications for a student
app.get("/api/students/:id/applications", (req, res) => {
  const applications = db.prepare(`
    SELECT a.id, a.status, a.notes, a.applied_at, j.title, j.company, j.location, j.id AS jobId
    FROM applications a
    JOIN jobs j ON j.id = a.job_id
    WHERE a.student_id = ?
    ORDER BY a.id DESC
  `).all(req.params.id);

  res.json(applications);
});

// 13. Update application status (Supports both Offer and Selected)
app.patch("/api/applications/:id/status", (req, res) => {
  const allowed = ["Applied", "Interview", "Offer", "Selected", "Rejected"];
  const { status, notes = "" } = req.body;

  if (!allowed.includes(status)) {
    return res.status(400).json({
      message: "Status must be Applied, Interview, Offer, Selected, or Rejected"
    });
  }

  let result;
  if (notes) {
    result = db.prepare(
      "UPDATE applications SET status = ?, notes = ? WHERE id = ?"
    ).run(status, notes, req.params.id);
  } else {
    result = db.prepare(
      "UPDATE applications SET status = ? WHERE id = ?"
    ).run(status, req.params.id);
  }

  if (!result.changes) {
    return res.status(404).json({ message: "Application not found" });
  }

  res.json({ success: true, status, notes });
});

// 14. Unknown API routes fallback
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

app.listen(PORT, () => {
  console.log(`Placement Hub API: http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Jobs: http://localhost:${PORT}/api/jobs`);
});
