# Charvi Patnaik — 2026 Developer Portfolio (ATS-Optimized)

A high-performance, accessible, and ATS-friendly personal portfolio for **Charvi Patnaik**, Software Developer and Web Developer Intern. Built entirely with semantic **HTML5, modern CSS3, and Vanilla JavaScript** — zero external dependencies, zero bloat, lightning fast.

---

## 🌟 Highlights & Key Features

### 1. ATS (Applicant Tracking System) Friendly Architecture
- **Semantic HTML5 Outline:** Employs `<header>`, `<main>`, `<section>`, `<article>`, `<time>`, `<address>`, and standard `<h1>`-`<h3>` hierarchy recognized by ATS parsers (Taleo, Greenhouse, Lever, Workday, iCIMS).
- **JSON-LD Schema.org Structured Data:** Includes rich metadata (`Person`, `hasOccupation`, `alumniOf`, `knowsAbout`) directly parseable by modern AI scrapers and search indexing engines.
- **Dedicated 1-Click ATS Plain-Text Modal:** Instant copy-paste modal formatted cleanly without weird characters, multi-column tables, or graphics that break ATS text inputs.
- **Dedicated `@media print` Engine:** Clicking **"Print / Download ATS Resume"** (or pressing `Ctrl+P`) automatically reformats the entire website into a standard, single-column, monochrome, print-perfect resume ready to save as PDF.

### 2. Modern 2026 Developer Experience & Polish
- **Dark & Light Mode:** System-aware theme toggle with persistent state saved in `localStorage`.
- **Interactive Skills Filter:** Recruiter-friendly categories (`Programming Languages`, `Frontend`, `Backend & DB`, `Tools & DevOps`, `Professional Skills`).
- **Interactive Project Cards:** Complete coverage of **TinyWin** and **WalkNTrack**, featuring tech tags, bullet points, role descriptions, and "Copy Summary" shortcuts.
- **Quick-Copy Contact Strip:** 1-click clipboard copy for email (`charvipatnaik23@gmail.com`) and phone (`+91 8639829011`) with animated toast feedback.
- **Functional Contact Form:** Built-in client validation that generates a pre-filled `mailto:` draft directly to your inbox.
- **Mobile Responsive & Accessible:** Fully responsive drawer menu for mobile/tablet screens and WCAG AAA color contrast compliance.

---

## 📁 File Structure

```text
W:\CHARVI\
├── index.html       # Semantic HTML5 markup, Schema.org JSON-LD & ATS layout
├── style.css        # Modern CSS variables, dark/light themes & @media print styles
├── script.js        # Theme toggle, ATS modal, skill filters, copy buttons & contact form
└── README.md        # Documentation and deployment guide
```

---

## 🚀 How to Run & Preview Locally

1. **Directly in Browser:**
   - Double-click `index.html` or open it with any web browser (Chrome, Edge, Firefox, Safari).

2. **Using Python Local Server:**
   ```bash
   python -m http.server 3000
   ```
   Open `http://localhost:3000` in your browser.

3. **Using VS Code Live Server:**
   - Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 🌐 1-Click Free Deployment

### GitHub Pages (Recommended)
1. Initialize git in this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of 2026 ATS-friendly portfolio"
   ```
2. Push to a GitHub repository named `charvi-patnaik.github.io` or `portfolio`.
3. In your GitHub repository: Go to **Settings** > **Pages** > Set source branch to `main` (`/root`) > Click **Save**.
4. Your website is live worldwide at `https://<your-username>.github.io/<repo-name>/`.

### Vercel / Netlify
- Drag and drop this folder onto [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for instant global edge deployment with free HTTPS.

---

## 📄 ATS Export Instructions

- To export your clean, ATS-compliant PDF resume:
  1. Click **"Print / Download ATS Resume"** on the page (or press `Ctrl + P`).
  2. Set Destination to **"Save as PDF"**.
  3. Ensure Margins are set to **"Default"** or **"Minimum"** and Background Graphics are enabled if desired.
  4. Click **Save**.
