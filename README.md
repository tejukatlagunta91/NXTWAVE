# NxtWave Growth Challenge – AI Workshop Registration & Referral Tracker (Frontend-Only Prototype)

🌐 **Live Deployed Application:** [https://nxtwavegrowthintern.vercel.app/](https://nxtwavegrowthintern.vercel.app/)

A frontend-only, Vercel-deployable React application built for the **NxtWave Growth Intern Challenge**. 

This application promotes the free live workshop **“Build Your First AI Project in 60 Minutes”**, tailored specifically for final-year engineering students preparing for placements. It demonstrates complete client-side student registration, referral tracking, 5-channel marketing attribution, a **7-Day Staged Budget Plan (₹2,000 maximum budget)**, and a real-time campaign monitoring dashboard working towards the **7-day goal of 500 genuine student registrations**.

> **⚠️ Transparency Disclosure (Local Prototype Scope):**  
> This project is built as a **frontend-only demonstration prototype**. All data (student registrations, referral codes, observed visits, and campaign settings) is persisted in the browser's `localStorage`. Registrations are accessible only within this browser instance and are not shared across devices or centrally stored in a production database.

---

## 🎯 Campaign & Project Objectives

| Parameter | Specification |
| :--- | :--- |
| **Workshop Headline** | **Build Your First AI Project in 60 Minutes** |
| **Workshop Subheading** | *“Preparing for placements? Want to add practical AI projects to your resume but don't know where to start? Join our free 60-minute AI workshop and take your first step towards building your own AI project!”* |
| **Target Audience** | Final-year engineering students preparing for placements |
| **Campaign Target** | **500 Student Registrations** within 7 days |
| **Campaign Budget** | **₹2,000 Maximum Budget** (Target cost efficiency: ₹4.00 per student) |
| **5 Marketing Channels** | 1. WhatsApp Groups (`whatsapp`) <br> 2. Friends' Referral Links (`referral`) <br> 3. College Clubs (`college_club`) <br> 4. LinkedIn Organic Posts (`linkedin`) <br> 5. Faculty Recommendations (`faculty`) |

---

## 💰 7-Day Staged Budget Plan (₹2,000 Max Budget)

The campaign implements a disciplined, staged allocation strategy to achieve 500 registrations with zero wasted spend:

| Phase | Stage Name | Planned Limit | Strategic Rationale |
| :--- | :--- | :--- | :--- |
| **Days 1–2** | **Free Channel Testing** | **₹0** | Aggressively test organic distribution across WhatsApp batch groups, organic LinkedIn posts, student ambassadors, and faculty word-of-mouth at zero cost. |
| **Days 3–4** | **Small Pilot Phase** | **Up to ₹500** | If initial organic momentum demonstrates strong conversion, deploy a micro-pilot (e.g. college club collaboration or pinned community promotion). |
| **Days 5–6** | **Channel Scale** | **Up to ₹1,000** | Allocate up to ₹1,000 exclusively to double-down on the single highest-converting channel identified in Days 1–4. |
| **Day 7** | **Final Push / Reserve** | **Up to ₹500** | Reserved for final 24-hour urgency push on top-performing tactics, or preserved unspent to minimize Customer Acquisition Cost (CAC). |

*Note: These figures represent planned budget allocation limits, not actual financial expenditures.*

---

## 🛠️ Technology Stack & Architecture

- **Framework:** React 19 with Vite
- **Storage & State:** Browser `localStorage` with reactive React state (No server, No database, No API keys required)
- **Deployment:** Vercel-ready with `vercel.json` SPA rewrite rules
- **Icons & Effects:** `lucide-react`, `canvas-confetti`
- **Styling:** Custom Vanilla CSS Design System with responsive grid, glassmorphic cards, and micro-interactions

---

## 📂 Project Structure

```
Growth Intern/
├── public/                     # Static assets & icons
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                   # Sticky navigation with live goal progress & LocalStorage badge
│   │   ├── Hero.jsx                     # Headline, subheading, CTA, and target progress bar
│   │   ├── TargetAudience.jsx           # Placement-focused attendee criteria cards
│   │   ├── Benefits.jsx                 # Hands-on takeaways & curriculum value
│   │   ├── RegistrationForm.jsx         # Client-validated signup form with URL parameter auto-fill
│   │   ├── RegistrationSuccessModal.jsx # Unique referral code reveal, copy link & 1-click WhatsApp share
│   │   ├── AdminDashboard.jsx           # 500-goal progress, staged budget plan, source chart & audit log
│   │   ├── AdminLoginModal.jsx          # Demo admin interface with pre-filled credentials
│   │   ├── DemoModeBanner.jsx          # Transparent Local Prototype disclosure banner
│   │   └── Footer.jsx                   # Placement links & disclosures
│   ├── services/
│   │   ├── storage.js                   # Frontend-only localStorage engine (validation, duplicates, referral attribution)
│   │   └── api.js                       # Client adapter interface mapped to storageService
│   ├── App.jsx                          # Main application layout & URL query parameter listener
│   ├── index.css                        # Design tokens, typography, responsive utilities
│   └── main.jsx
├── vercel.json                          # Vercel SPA routing rewrites
├── index.html                           # HTML template with Google Fonts (Inter & Outfit)
├── package.json                         # Project dependencies and Vite build scripts
└── README.md
```

---

## ⚡ Quick Start & Run Instructions

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v22)
- **npm**: v9+

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally in Development Mode
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates a static production bundle in `dist/` in ~250ms.
---

## 🧪 Feature Walkthrough & Testing

### 1. Registration & Duplicate Email Prevention
- Fill out the form at `#register` with Full Name, Email, College, and Source.
- Click **"Confirm Free Registration"**.
- A celebratory confetti effect triggers, and a **Registration Confirmed** modal reveals your unique referral code (e.g. `DEVE-4F0A`) and copyable share URL.
- Re-submitting the same email address triggers a duplicate rejection banner: *"A registration with this email already exists."*

### 2. Admin Dashboard & Demo Controls
- Click **"Admin Dashboard"** in the top navigation bar.
- Credentials are pre-filled (`admin` / `nxtwave2026`). Click **"Access Dashboard"**.
- **Metrics Observed:**
  - **Milestone Tracker:** Dynamic progress bar towards the 500 student target.
  - **7-Day Staged Budget Plan:** Visual roadmap of Days 1–7 spend allocations.
  - **5-Channel Breakdown & Chart:** Real-time breakdown of WhatsApp, Referral, College Club, LinkedIn, and Faculty signups.
  - **Student Audit Log:** Complete table showing **PROTOTYPE** entries vs **SAMPLE DATA** entries.
  - **Interactive Controls:**
    - **Seed +5 Sample:** Adds 5 simulated student records for visual testing.
    - **Clear Sample:** Removes simulated data while keeping your prototype registrations intact.
    - **Clear Mine:** Clears manually submitted registrations.
    - **Reset All:** Factory resets the prototype to initial defaults.

---

## 📄 License & Notes

Developed as an application prototype for the **NxtWave Growth Intern Challenge**.  
All workshop dates, mentors, and venue details use customizable placeholders.
