/**
 * Frontend-Only Local Storage Service
 * Replaces backend REST APIs and MongoDB with browser localStorage.
 * Persists prototype registrations, referral codes, observed visits, and campaign settings.
 * 
 * NOTE: This is a local demonstration prototype. Data stored in localStorage
 * is scoped only to this browser instance and is not shared across devices.
 */

const STORAGE_KEYS = {
  REGISTRATIONS: 'nxtwave_workshop_registrations_v2',
  VISITS: 'nxtwave_workshop_visits_v2',
  SETTINGS: 'nxtwave_workshop_settings_v2',
  AUTH: 'nxtwave_workshop_demo_admin_auth'
};

// 5 Marketing Channels
export const VALID_SOURCES = ['whatsapp', 'referral', 'college_club', 'linkedin', 'faculty'];

export const SOURCE_LABELS = {
  whatsapp: 'WhatsApp Groups',
  referral: "Friends' Referral",
  college_club: 'College Clubs',
  linkedin: 'LinkedIn Organic',
  faculty: 'Faculty Recommendation',
  direct: 'Direct / Other'
};

// Proposed 7-Day Staged Budget Plan
export const DEFAULT_BUDGET_PLAN = [
  {
    phase: 'Days 1–2',
    stageName: 'Free Channel Testing',
    plannedAllocation: 0,
    strategy: 'Test WhatsApp peer groups, organic LinkedIn posts, student tech communities, and faculty reach at ₹0 cost.',
    status: 'Active Testing'
  },
  {
    phase: 'Days 3–4',
    stageName: 'Small Pilot Phase',
    plannedAllocation: 500,
    strategy: 'Up to ₹500 reserved for a small pilot (e.g. targeted college club sponsorship) if initial organic metrics justify it.',
    status: 'Proposed Pilot'
  },
  {
    phase: 'Days 5–6',
    stageName: 'Channel Scale',
    plannedAllocation: 1000,
    strategy: 'Up to ₹1,000 allocated to double-down and scale the single highest-converting channel identified in Days 1–4.',
    status: 'Contingent on Pilot'
  },
  {
    phase: 'Day 7',
    stageName: 'Final Push / Reserve',
    plannedAllocation: 500,
    strategy: 'Up to ₹500 reserved for final 24h push across the best-performing tactic, or preserved unspent to minimize CAC.',
    status: 'Reserve / Optional'
  }
];

export const DEFAULT_SETTINGS = {
  goal: 500,
  maxBudget: 2000,
  durationDays: 7,
  budgetPlan: DEFAULT_BUDGET_PLAN
};

// Sample Demo Data (Explicitly tagged with isDemo: true)
export const INITIAL_DEMO_RECORDS = [
  {
    id: 'demo-sample-1',
    fullName: 'Aarav Sharma (Sample)',
    email: 'aarav.sample@example.com',
    college: 'IIT Madras',
    marketingSource: 'whatsapp',
    referralCodeUsed: null,
    myReferralCode: 'AARA-92D1',
    isDemo: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-sample-2',
    fullName: 'Priya Patel (Sample)',
    email: 'priya.sample@example.com',
    college: 'BITS Pilani',
    marketingSource: 'referral',
    referralCodeUsed: 'AARA-92D1',
    myReferralCode: 'PRIY-44E2',
    isDemo: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-sample-3',
    fullName: 'Rohan Verma (Sample)',
    email: 'rohan.sample@example.com',
    college: 'NIT Trichy',
    marketingSource: 'college_club',
    referralCodeUsed: null,
    myReferralCode: 'ROHA-71B3',
    isDemo: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-sample-4',
    fullName: 'Ananya Reddy (Sample)',
    email: 'ananya.sample@example.com',
    college: 'Osmania University',
    marketingSource: 'linkedin',
    referralCodeUsed: null,
    myReferralCode: 'ANAN-19C4',
    isDemo: true,
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-sample-5',
    fullName: 'Karthik Nair (Sample)',
    email: 'karthik.sample@example.com',
    college: 'Anna University',
    marketingSource: 'faculty',
    referralCodeUsed: null,
    myReferralCode: 'KART-88A5',
    isDemo: true,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  }
];

// Helper to generate unique student referral code (e.g. "RAHU-8F2Q")
export const generateReferralCode = (fullName) => {
  const cleanName = (fullName || 'STUDENT')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .slice(0, 4)
    .padEnd(4, 'X');
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${cleanName}-${randomSuffix}`;
};

// Safe LocalStorage wrapper
const safeStorage = {
  getItem(key, fallback = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (err) {
      console.warn(`[localStorage Error Reading ${key}]:`, err);
      return fallback;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn(`[localStorage Error Writing ${key}]:`, err);
      return false;
    }
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      return false;
    }
  }
};

// Storage Service Engine
export const storageService = {
  // Initialize storage with sample data if empty
  init() {
    const existing = safeStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    if (!existing || !Array.isArray(existing)) {
      safeStorage.setItem(STORAGE_KEYS.REGISTRATIONS, INITIAL_DEMO_RECORDS);
    }

    const settings = safeStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!settings) {
      safeStorage.setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    }

    const visits = safeStorage.getItem(STORAGE_KEYS.VISITS);
    if (!visits || !Array.isArray(visits)) {
      // Seed initial baseline browser-observed visits for sample channels
      safeStorage.setItem(STORAGE_KEYS.VISITS, [
        { source: 'whatsapp', count: 14 },
        { source: 'referral', count: 9 },
        { source: 'college_club', count: 11 },
        { source: 'linkedin', count: 16 },
        { source: 'faculty', count: 7 },
        { source: 'direct', count: 5 }
      ]);
    }
  },

  // Get all registrations safely
  getRegistrations() {
    this.init();
    const data = safeStorage.getItem(STORAGE_KEYS.REGISTRATIONS, []);
    return Array.isArray(data) ? data : [];
  },

  // Get observed visits
  getVisits() {
    this.init();
    const data = safeStorage.getItem(STORAGE_KEYS.VISITS, []);
    return Array.isArray(data) ? data : [];
  },

  // Record an observed visit in this browser
  recordVisit(source = 'direct', referralCode = null) {
    this.init();
    const validSource = VALID_SOURCES.includes(source) ? source : 'direct';
    const visits = this.getVisits();

    const existingIndex = visits.findIndex((v) => v.source === validSource);
    if (existingIndex >= 0) {
      visits[existingIndex].count = (visits[existingIndex].count || 0) + 1;
    } else {
      visits.push({ source: validSource, count: 1 });
    }

    safeStorage.setItem(STORAGE_KEYS.VISITS, visits);
    return visits;
  },

  // Register a new student (Local Prototype)
  register({ fullName, email, college, marketingSource, referralCode }) {
    this.init();

    // 1. Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      const err = new Error('Full Name is required (minimum 2 characters)');
      err.field = 'fullName';
      throw err;
    }

    const normalizedEmail = (email || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!normalizedEmail || !emailRegex.test(normalizedEmail)) {
      const err = new Error('Please enter a valid email address (e.g. name@college.edu)');
      err.field = 'email';
      throw err;
    }

    if (!college || typeof college !== 'string' || college.trim().length < 2) {
      const err = new Error('College / University name is required');
      err.field = 'college';
      throw err;
    }

    const cleanSource = VALID_SOURCES.includes(marketingSource) ? marketingSource : 'whatsapp';
    const normalizedRefUsed = referralCode ? referralCode.trim().toUpperCase() : null;

    // 2. Duplicate Email Check (case-insensitive)
    const registrations = this.getRegistrations();
    const existing = registrations.find(
      (r) => r.email && r.email.toLowerCase() === normalizedEmail
    );

    if (existing) {
      const err = new Error(`A registration with email "${normalizedEmail}" already exists.`);
      err.isDuplicate = true;
      err.existingRecord = existing;
      throw err;
    }

    // 3. Generate unique referral code for this student
    const myReferralCode = generateReferralCode(fullName);

    // 4. Construct record
    const newRecord = {
      id: 'reg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      fullName: fullName.trim(),
      email: normalizedEmail,
      college: college.trim(),
      marketingSource: cleanSource,
      referralCodeUsed: normalizedRefUsed,
      myReferralCode,
      isDemo: false, // Manually submitted prototype registrations are marked as prototype genuine
      createdAt: new Date().toISOString()
    };

    // 5. Save to localStorage
    registrations.unshift(newRecord);
    safeStorage.setItem(STORAGE_KEYS.REGISTRATIONS, registrations);

    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    const shareUrl = `${origin}?source=referral&ref=${myReferralCode}`;

    return {
      registration: newRecord,
      shareUrl,
      message: 'Registration confirmed in local prototype storage!'
    };
  },

  // Calculate campaign statistics derived from localStorage
  getCampaignStats() {
    this.init();
    const registrations = this.getRegistrations();
    const visits = this.getVisits();
    const settings = safeStorage.getItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);

    const goal = settings.goal || 500;
    const maxBudget = settings.maxBudget || 2000;

    // Separate genuine prototype submissions from sample demo data
    const genuineRegistrations = registrations.filter((r) => !r.isDemo);
    const demoRegistrations = registrations.filter((r) => r.isDemo);

    const genuineCount = genuineRegistrations.length;
    const demoCount = demoRegistrations.length;
    const totalCount = registrations.length;

    const progressPercent = Math.min(100, Number(((genuineCount / goal) * 100).toFixed(1)));
    const remainingToTarget = Math.max(0, goal - genuineCount);

    // Staged budget calculations
    const plannedAllocationsSum = (settings.budgetPlan || DEFAULT_BUDGET_PLAN).reduce(
      (acc, s) => acc + (s.plannedAllocation || 0),
      0
    );
    const costPerLeadTarget = (maxBudget / goal).toFixed(2); // ₹4.00 / student
    const costPerLeadObserved = genuineCount > 0 ? (maxBudget / genuineCount).toFixed(2) : 0;

    // 5 Channels metrics
    const sourceBreakdown = {};
    const visitMap = {};

    visits.forEach((v) => {
      visitMap[v.source] = v.count || 0;
    });

    VALID_SOURCES.forEach((src) => {
      sourceBreakdown[src] = {
        key: src,
        label: SOURCE_LABELS[src],
        genuineCount: 0,
        demoCount: 0,
        totalCount: 0,
        percentageOfGenuine: 0,
        observedVisits: visitMap[src] || 0,
        conversionRate: 0
      };
    });

    registrations.forEach((r) => {
      if (sourceBreakdown[r.marketingSource]) {
        if (r.isDemo) {
          sourceBreakdown[r.marketingSource].demoCount++;
        } else {
          sourceBreakdown[r.marketingSource].genuineCount++;
        }
        sourceBreakdown[r.marketingSource].totalCount++;
      }
    });

    Object.keys(sourceBreakdown).forEach((k) => {
      const item = sourceBreakdown[k];
      item.percentageOfGenuine =
        genuineCount > 0 ? Number(((item.genuineCount / genuineCount) * 100).toFixed(1)) : 0;
      item.conversionRate =
        item.observedVisits > 0
          ? Number(((item.genuineCount / item.observedVisits) * 100).toFixed(1))
          : item.genuineCount > 0
          ? 100
          : 0;
    });

    // Referral code leaderboard
    const refMap = {};
    registrations.forEach((r) => {
      if (r.referralCodeUsed) {
        const code = r.referralCodeUsed;
        if (!refMap[code]) {
          refMap[code] = { code, genuineReferrals: 0, demoReferrals: 0, totalReferrals: 0 };
        }
        if (r.isDemo) {
          refMap[code].demoReferrals++;
        } else {
          refMap[code].genuineReferrals++;
        }
        refMap[code].totalReferrals++;
      }
    });

    const topReferralCodes = Object.values(refMap)
      .sort((a, b) => b.genuineReferrals - a.genuineReferrals || b.totalReferrals - a.totalReferrals)
      .slice(0, 10);

    const totalObservedVisits = Object.values(visitMap).reduce((a, b) => a + b, 0);

    return {
      campaign: {
        goal,
        maxBudget,
        durationDays: settings.durationDays || 7,
        costPerLeadTarget: Number(costPerLeadTarget),
        costPerLeadObserved: Number(costPerLeadObserved),
        budgetPlan: settings.budgetPlan || DEFAULT_BUDGET_PLAN,
        plannedAllocationsSum
      },
      summary: {
        genuineCount,
        demoCount,
        totalCount,
        progressPercent,
        remainingToTarget,
        totalObservedVisits,
        overallConversionRate:
          totalObservedVisits > 0 ? Number(((genuineCount / totalObservedVisits) * 100).toFixed(1)) : 0
      },
      sources: Object.values(sourceBreakdown),
      topReferralCodes
    };
  },

  // Seed sample demo registrations
  seedDemoData(count = 5) {
    this.init();
    const demoColleges = [
      'IIT Bombay',
      'NIT Warangal',
      'Delhi Technological University',
      'Vellore Institute of Technology',
      'SRM University',
      'RV College of Engineering',
      'PES University'
    ];
    const demoNames = [
      'Vikram Malhotra',
      'Sneha Kulkarni',
      'Arjun Singhania',
      'Meera Iyer',
      'Siddharth Joshi',
      'Tanvi Deshmukh'
    ];

    const registrations = this.getRegistrations();
    const newlyAdded = [];

    for (let i = 0; i < count; i++) {
      const name = demoNames[i % demoNames.length] + ' (Sample ' + (i + 1) + ')';
      const email = `sample.student.${Date.now()}.${i}@example.edu`;
      const college = demoColleges[i % demoColleges.length];
      const source = VALID_SOURCES[i % VALID_SOURCES.length];

      const record = {
        id: 'demo-sample-' + Date.now() + '-' + i,
        fullName: name,
        email,
        college,
        marketingSource: source,
        referralCodeUsed: i % 2 === 0 ? 'AARA-92D1' : null,
        myReferralCode: generateReferralCode(name),
        isDemo: true,
        createdAt: new Date().toISOString()
      };
      registrations.unshift(record);
      newlyAdded.push(record);
    }

    safeStorage.setItem(STORAGE_KEYS.REGISTRATIONS, registrations);
    return newlyAdded;
  },

  // Clear ONLY sample demo data (keeps manually submitted registrations intact)
  clearDemoData() {
    this.init();
    const registrations = this.getRegistrations();
    const filtered = registrations.filter((r) => !r.isDemo);
    const removedCount = registrations.length - filtered.length;
    safeStorage.setItem(STORAGE_KEYS.REGISTRATIONS, filtered);
    return { removedCount };
  },

  // Clear manually submitted registrations (keeps sample demo data)
  clearUserRegistrations() {
    this.init();
    const registrations = this.getRegistrations();
    const filtered = registrations.filter((r) => r.isDemo);
    const removedCount = registrations.length - filtered.length;
    safeStorage.setItem(STORAGE_KEYS.REGISTRATIONS, filtered);
    return { removedCount };
  },

  // Reset entire prototype to factory initial state
  resetAll() {
    safeStorage.setItem(STORAGE_KEYS.REGISTRATIONS, INITIAL_DEMO_RECORDS);
    safeStorage.setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    safeStorage.setItem(STORAGE_KEYS.VISITS, [
      { source: 'whatsapp', count: 14 },
      { source: 'referral', count: 9 },
      { source: 'college_club', count: 11 },
      { source: 'linkedin', count: 16 },
      { source: 'faculty', count: 7 },
      { source: 'direct', count: 5 }
    ]);
    return true;
  },

  // Demo Admin Auth (Local prototype only - transparent that it is not server security)
  adminLogin(username, password) {
    const validUser = 'admin';
    const validPass = 'nxtwave2026';

    if (username.trim() === validUser && password === validPass) {
      const token = 'demo_admin_token_' + Date.now();
      safeStorage.setItem(STORAGE_KEYS.AUTH, token);
      return { success: true, token };
    }
    const err = new Error('Invalid demo credentials. Use admin / nxtwave2026');
    throw err;
  },

  getAdminToken() {
    return safeStorage.getItem(STORAGE_KEYS.AUTH, null);
  },

  adminLogout() {
    safeStorage.removeItem(STORAGE_KEYS.AUTH);
  }
};

export default storageService;
