// Realistic mock data and state management for Placement Hub
// Note: Clearly documented demo dataset for prototype showcasing.

export const initialStudentProfile = {
  id: "std-001",
  name: "Aastha Pokharkar",
  email: "aastha.pokharkar@college.edu",
  phone: "+91 98765 43210",
  college: "National Institute of Technology",
  degree: "B.Tech in Computer Science & Engineering",
  graduationYear: 2026,
  cgpa: "8.92 / 10.0",
  bio: "Full-stack developer focused on distributed backend architectures, React micro-frontends, and automated cloud CI/CD. Active open-source contributor.",
  githubUsername: "aastha-pokharkar",
  linkedin: "https://linkedin.com/in/aastha-pokharkar-demo",
  portfolio: "https://aastha-pokharkar-portfolio.dev",
  verificationStatus: "Verified via College & GitHub",
  skills: [
    {
      id: "sk-1",
      name: "React.js",
      category: "Frontend",
      level: "Advanced",
      verified: true,
      evidenceType: "GitHub Repository",
      evidenceUrl: "https://github.com/aastha-pokharkar/campus-connect",
      evidenceSummary: "Maintained production React app with 12k lines of code, hooks, Context API, and Jest tests.",
      assessmentScore: "94/100 (CodeSignal Certified)",
      claimsFlagged: false
    },
    {
      id: "sk-2",
      name: "Node.js & Express",
      category: "Backend",
      level: "Advanced",
      verified: true,
      evidenceType: "Production API",
      evidenceUrl: "https://github.com/aastha-pokharkar/distributed-rate-limiter",
      evidenceSummary: "Implemented Redis token-bucket rate limiter benchmarked at 15,000 req/sec.",
      assessmentScore: "90/100 (HackerRank Gold)",
      claimsFlagged: false
    },
    {
      id: "sk-3",
      name: "TypeScript",
      category: "Languages",
      level: "Intermediate",
      verified: true,
      evidenceType: "GitHub Pull Request",
      evidenceUrl: "https://github.com/example/open-source-ts/pull/142",
      evidenceSummary: "Refactored legacy JS codebase to strict TypeScript with zero runtime regression.",
      assessmentScore: "86/100",
      claimsFlagged: false
    },
    {
      id: "sk-4",
      name: "PostgreSQL & Prisma",
      category: "Databases",
      level: "Advanced",
      verified: true,
      evidenceType: "Project Schema",
      evidenceUrl: "https://github.com/aastha-pokharkar/campus-connect/blob/main/prisma/schema.prisma",
      evidenceSummary: "Designed 14-table relational database with foreign key constraints, indexes, and migrations.",
      assessmentScore: "92/100",
      claimsFlagged: false
    },
    {
      id: "sk-5",
      name: "Docker & Kubernetes",
      category: "DevOps",
      level: "Intermediate",
      verified: true,
      evidenceType: "Dockerfile & CI",
      evidenceUrl: "https://github.com/aastha-pokharkar/campus-connect/blob/main/Dockerfile",
      evidenceSummary: "Multi-stage Docker builds reducing image sizes from 1.2GB to 85MB.",
      assessmentScore: "82/100",
      claimsFlagged: false
    },
    {
      id: "sk-6",
      name: "AWS (S3, ECS, Lambda)",
      category: "Cloud",
      level: "Beginner",
      verified: false,
      evidenceType: "Pending Evidence",
      evidenceUrl: "",
      evidenceSummary: "Claimed self-study; no verifiable GitHub deployment or certification uploaded yet.",
      assessmentScore: "Unverified Claim",
      claimsFlagged: true
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Placement Hub Verification Engine",
      role: "Lead Architect",
      timeline: "Jan 2026 - Present",
      description: "Automated candidate assessment pipeline linking verified GitHub PR commits, HackerRank badges, and college registrar marks directly into recruitment ATS feeds.",
      technologies: ["React 19", "Tailwind CSS", "Node.js", "PostgreSQL"],
      evidenceRepo: "https://github.com/aastha-pokharkar/placement-hub",
      verified: true
    },
    {
      id: "proj-2",
      title: "Distributed Edge Cache & Rate Limiter",
      role: "Backend Contributor",
      timeline: "Aug 2025 - Dec 2025",
      description: "Engineered high-throughput sliding window rate limiter using Redis and Go, tested to sustain 20,000 requests/sec with sub-millisecond p99 latency.",
      technologies: ["Go", "Redis", "Docker", "Prometheus"],
      evidenceRepo: "https://github.com/aastha-pokharkar/distributed-rate-limiter",
      verified: true
    }
  ],
  education: [
    {
      institution: "National Institute of Technology",
      degree: "Bachelor of Technology, Computer Science & Engineering",
      years: "2022 - 2026",
      cgpa: "8.92 / 10.0",
      verifiedByRegistrar: true
    }
  ]
};

export const initialJobs = [
  {
    id: "job-101",
    title: "Full-Stack Software Engineer (Fresher / 2026)",
    company: "Razorpay",
    logoText: "RZP",
    location: "Bengaluru, Karnataka (Hybrid)",
    workplaceType: "Hybrid",
    packageLPA: "18 - 24 LPA",
    experienceLevel: "Entry-Level (2026 Batch)",
    openings: 5,
    isDuplicateGroup: "SWE-FINTECH-01",
    duplicateNote: "Consolidated 2 similar postings from Razorpay Core Payments & Razorpay Banking teams to prevent redundant applications.",
    deadline: "2026-11-15",
    department: "Core Engineering",
    description: "Join Razorpay's Core Engineering division building mission-critical real-time transaction rails. We value demonstrable code quality, verifiable project implementations, and clean system design over rote memorization.",
    requiredSkills: ["React.js", "Node.js & Express", "TypeScript", "PostgreSQL & Prisma"],
    preferredSkills: ["Docker & Kubernetes", "AWS (S3, ECS, Lambda)", "Redis"],
    eligibility: {
      minimumCgpa: 7.5,
      allowedBranches: ["CSE", "IT", "ECE"],
      batch: "2026"
    },
    atsWeightage: {
      requiredWeight: 70,
      evidenceWeight: 20,
      cgpaWeight: 10
    }
  },
  {
    id: "job-102",
    title: "Backend Platform Engineer",
    company: "PhonePe",
    logoText: "PP",
    location: "Bengaluru / Pune (On-site)",
    workplaceType: "On-site",
    packageLPA: "16 - 22 LPA",
    experienceLevel: "Entry-Level (2026 Batch)",
    openings: 8,
    isDuplicateGroup: null,
    duplicateNote: null,
    deadline: "2026-11-20",
    department: "Distributed Platforms",
    description: "Develop reliable microservices handling billions of transactions monthly. Candidates must present verifiable GitHub code or competitive programming achievements.",
    requiredSkills: ["Node.js & Express", "PostgreSQL & Prisma", "Docker & Kubernetes"],
    preferredSkills: ["Go", "Kafka", "AWS (S3, ECS, Lambda)"],
    eligibility: {
      minimumCgpa: 8.0,
      allowedBranches: ["CSE", "IT"],
      batch: "2026"
    },
    atsWeightage: {
      requiredWeight: 65,
      evidenceWeight: 25,
      cgpaWeight: 10
    }
  },
  {
    id: "job-103",
    title: "Frontend Engineer - UI/UX Systems",
    company: "Zomato",
    logoText: "ZM",
    location: "Gurugram, Haryana (On-site)",
    workplaceType: "On-site",
    packageLPA: "15 - 20 LPA",
    experienceLevel: "Entry-Level",
    openings: 3,
    isDuplicateGroup: "ZOM-FE-2026",
    duplicateNote: "Merged duplicate listings from Zomato App Platform & Blinkit Web Engineering.",
    deadline: "2026-11-10",
    department: "Customer Experience",
    description: "Craft pixel-perfect, accessible, and ultra-fast web frontends. Strong mastery of modern React component architectures, accessibility standards, and state synchronization is essential.",
    requiredSkills: ["React.js", "TypeScript"],
    preferredSkills: ["Tailwind CSS", "Next.js", "Docker & Kubernetes"],
    eligibility: {
      minimumCgpa: 7.0,
      allowedBranches: ["All Engineering Branches"],
      batch: "2026"
    },
    atsWeightage: {
      requiredWeight: 75,
      evidenceWeight: 15,
      cgpaWeight: 10
    }
  },
  {
    id: "job-104",
    title: "Cloud Infrastructure & SRE Intern",
    company: "Atlassian",
    logoText: "ATL",
    location: "Bengaluru (Remote)",
    workplaceType: "Remote",
    packageLPA: "22 - 28 LPA",
    experienceLevel: "Entry-Level",
    openings: 4,
    isDuplicateGroup: null,
    duplicateNote: null,
    deadline: "2026-11-25",
    department: "Cloud Engineering",
    description: "Automate scalable cloud environments, observe telemetry metrics, and build reliability tooling for Atlassian Cloud suite.",
    requiredSkills: ["Docker & Kubernetes", "AWS (S3, ECS, Lambda)"],
    preferredSkills: ["TypeScript", "Terraform", "Python"],
    eligibility: {
      minimumCgpa: 8.0,
      allowedBranches: ["CSE", "IT", "ECE", "EE"],
      batch: "2026"
    },
    atsWeightage: {
      requiredWeight: 60,
      evidenceWeight: 30,
      cgpaWeight: 10
    }
  }
];

export const initialApplications = [
  {
    id: "app-201",
    jobId: "job-101",
    company: "Razorpay",
    title: "Full-Stack Software Engineer (Fresher / 2026)",
    packageLPA: "18 - 24 LPA",
    appliedDate: "2026-10-12",
    status: "Interview",
    matchScore: 92,
    stageNotes: "Technical Round 1 scheduled for Oct 22, 2026 (Focus: System design & React performance)",
    timeline: [
      { step: "Applied", date: "2026-10-12", status: "completed", note: "Resume & verified GitHub evidence submitted" },
      { step: "Resume Shortlisted (ATS 92%)", date: "2026-10-14", status: "completed", note: "Auto-verified via Placement Hub proof score" },
      { step: "Technical Interview", date: "2026-10-22", status: "current", note: "Live 60-min coding review" },
      { step: "HR & Leadership", date: "Pending", status: "upcoming", note: "Culture fit & compensation discussion" },
      { step: "Offer / Decision", date: "Pending", status: "upcoming", note: "Final letter issue" }
    ]
  },
  {
    id: "app-202",
    jobId: "job-102",
    company: "PhonePe",
    title: "Backend Platform Engineer",
    packageLPA: "16 - 22 LPA",
    appliedDate: "2026-10-10",
    status: "Applied",
    matchScore: 84,
    stageNotes: "Application under Placement Cell batch dispatch to corporate recruiter.",
    timeline: [
      { step: "Applied", date: "2026-10-10", status: "completed", note: "Direct campus pool submission" },
      { step: "TPO Verification", date: "2026-10-11", status: "completed", note: "Eligible branch & CGPA validated" },
      { step: "Company Review", date: "In Progress", status: "current", note: "Recruiter screening student repos" },
      { step: "Interview", date: "Pending", status: "upcoming", note: "Awaiting shortlist call" },
      { step: "Offer / Decision", date: "Pending", status: "upcoming", note: "Final offer release" }
    ]
  },
  {
    id: "app-203",
    jobId: "job-103",
    company: "Zomato",
    title: "Frontend Engineer - UI/UX Systems",
    packageLPA: "15 - 20 LPA",
    appliedDate: "2026-09-28",
    status: "Offer",
    matchScore: 95,
    stageNotes: "Congratulations! Formal Letter of Intent received for 19.5 LPA base package.",
    timeline: [
      { step: "Applied", date: "2026-09-28", status: "completed", note: "Application registered" },
      { step: "Online Assessment", date: "2026-10-02", status: "completed", note: "Scored 100% on React component challenges" },
      { step: "Frontend Deep-Dive", date: "2026-10-06", status: "completed", note: "Reviewed GitHub campus-connect repo" },
      { step: "Offer Extended", date: "2026-10-15", status: "completed", note: "Official LOI received via Placement Cell" }
    ]
  }
];

export const initialBatchStudents = [
  {
    id: "std-001",
    name: "Aastha Pokharkar",
    rollNo: "2022CSB042",
    branch: "CSE",
    cgpa: 8.92,
    verifiedSkillsCount: 5,
    flaggedClaimsCount: 1,
    evidenceConfidence: "High (GitHub + LeetCode verified)",
    skills: ["React.js", "Node.js & Express", "TypeScript", "PostgreSQL & Prisma", "Docker & Kubernetes"],
    topEvidence: "campus-connect (12k LOC, PRs merged, live demo)",
    status: "Active Search",
    matchForJob101: 92,
    matchForJob102: 84
  },
  {
    id: "std-002",
    name: "Rohan Varma",
    rollNo: "2022CSB019",
    branch: "CSE",
    cgpa: 9.35,
    verifiedSkillsCount: 6,
    flaggedClaimsCount: 0,
    evidenceConfidence: "Very High (ACM ICPC Regionalist)",
    skills: ["C++", "Go", "Docker & Kubernetes", "AWS (S3, ECS, Lambda)", "PostgreSQL & Prisma", "Node.js & Express"],
    topEvidence: "k8s-operator-controller (45 stars, CNCF contributor)",
    status: "Shortlisted",
    matchForJob101: 88,
    matchForJob102: 96
  },
  {
    id: "std-003",
    name: "Pooja Hegde",
    rollNo: "2022ITB011",
    branch: "IT",
    cgpa: 8.12,
    verifiedSkillsCount: 4,
    flaggedClaimsCount: 2,
    evidenceConfidence: "Medium (2 claims missing repository commit logs)",
    skills: ["React.js", "TypeScript", "Tailwind CSS", "Figma"],
    topEvidence: "design-system-react (Component library with Storybook)",
    status: "Active Search",
    matchForJob101: 78,
    matchForJob102: 55
  },
  {
    id: "std-004",
    name: "Vikramaditya Nair",
    rollNo: "2022ECE034",
    branch: "ECE",
    cgpa: 7.84,
    verifiedSkillsCount: 3,
    flaggedClaimsCount: 3,
    evidenceConfidence: "Low (Multiple unverified AWS & ML claims)",
    skills: ["Python", "Docker & Kubernetes", "C++"],
    topEvidence: "iot-smart-meter (Embedded firmware + ESP32)",
    status: "Needs Evidence Update",
    matchForJob101: 58,
    matchForJob102: 68
  },
  {
    id: "std-005",
    name: "Sneha Mukherjee",
    rollNo: "2022CSB078",
    branch: "CSE",
    cgpa: 8.65,
    verifiedSkillsCount: 5,
    flaggedClaimsCount: 0,
    evidenceConfidence: "High (Verified Hackathon Winner)",
    skills: ["React.js", "Node.js & Express", "TypeScript", "PostgreSQL & Prisma", "Redis"],
    topEvidence: "smart-health-records (Won Smart India Hackathon 2025)",
    status: "Interviewing",
    matchForJob101: 94,
    matchForJob102: 89
  }
];
