# 🌐 SRE.PORTFOLIO // Platform Engineering & Infrastructure Dashboard

[![Uptime SLA](https://img.shields.io/badge/Uptime_SLA-99.999%25-06b6d4?style=flat-square&logo=statuspage)](https://raghav-sudharsan.github.io/sudharsan-sre/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Technology Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS%20(ES6)-blueviolet?style=flat-square)](https://raghav-sudharsan.github.io/sudharsan-sre/)
[![DevOps Hardened](https://img.shields.io/badge/Security-tfsec%20%7C%20SonarQube-orange?style=flat-square)](#technology-stack)
[![Maintainer](https://img.shields.io/badge/Maintainer-raghav--sudharsan-blue?style=flat-square&logo=github)](https://github.com/raghav-sudharsan)

Welcome to the **SRE Portfolio Dashboard**, a high-fidelity, interactive single-page portfolio engineered specifically to reflect the professional journey, core competencies, certifications, and architectural blueprints of **Sudharsan S**, a seasoned Site Reliability Engineer and DevOps Professional.

Designed to mirror a real-time cloud operations dashboard, this project moves away from generic, template-driven designs and showcases true engineering professionalism. It incorporates live telemetry visualizations, terminal bootstrap preloaders, interactive SVG blueprints, and structured case studies directly relevant to modern enterprise infrastructure roles.

---

## 🚀 Live Demo

The production dashboard is automatically deployed via GitHub Pages and is fully operational:

👉 **Live System Control Panel:** [https://raghav-sudharsan.github.io/sudharsan-sre/](https://raghav-sudharsan.github.io/sudharsan-sre/)

---

## 🛡️ Key Features

The portfolio behaves like a real-time monitoring dashboard, delivering a unique experience for recruiters and engineering managers:

*   **Terminal Preloader Bootstrap Simulator:** Displays simulated initialization routines on startup (`terraform init`, `kubectl get nodes`, `sysctl` kernel variable adjustments) to set a technical theme.
*   **Heartbeat SLA Uptime Ticker:** Header-integrated decimal status widget that dynamically fluctuates at micro-decimals (e.g., `99.99923% SLA`) in real-time, simulating live systems operational data.
*   **Recruiter Telemetry Console Log Widget:** An active sidebar logs feed that auto-appends pseudo-live system logs (`[SYS_OK]`, `Route53 latency checks`, `Karpenter scaled down node pool`) with current local timestamps every 4 seconds.
*   **Interactive SVG Architecture Blueprint Viewer:** Renders beautiful vector architecture blueprints (System Topology, Cloud Network VPCs, CI/CD Pipelines, Prometheus/Thanos Observability Stack, K8s Networking) with full desktop magnifier mouse zoom and mobile/tablet touch-drag/panning support.
*   **Dynamic Case Studies Filters:** Filter project modules in real time across Observability, CI/CD, Kubernetes, Automation, and Infrastructure as Code (IaC).
*   **Responsive Testimonials Track:** Endorsement carousel featuring hardware-accelerated animations and drag-and-swipe touch event tracking.
*   **Dual-Theme Mode (Dark / Light):** Native theme toggling using CSS custom properties with localized storage persistence.

---

## 📸 Screenshots

### Desktop Dashboard Layout
*Sleek, multi-column glassmorphism layout optimizing information density for engineering recruiters.*
![Desktop Dashboard](Sudharsan_SRE.jpeg) *(Replace this with a repository screenshot or find references in `walkthrough.md`)*

### Mobile Responsive Console
*Single column stacking layout ensuring zero horizontal overflow and high readability on the go.*
![Mobile Console View](Sudharsan_SRE.jpeg) *(Replace with Mobile layout screenshot)*

---

## 🛠️ Technology Stack

This application is built with **zero external framework dependencies** (no React, Angular, Vue, or Tailwind CSS). This constraint was chosen deliberately to maximize performance, customize aesthetic details at a low level, and guarantee zero layout thrashing.

| Technology / Pattern | Role | Selection Rationale |
| :--- | :--- | :--- |
| **HTML5 (Semantic)** | Page Core Structure | Maximizes SEO indexing, facilitates accessibility (ARIA standards), and guarantees lightweight, structural hierarchy without wrapper bloat. |
| **CSS3 (Vanilla)** | Layout & Theme Engine | Built using a standardized Design System powered by CSS Custom Properties (Variables). Allows instant dark/light mode switches, responsive media rules, and precise container constraints. |
| **JavaScript (ES6+)** | Dynamic DOM & Telemetry | Handles modular content injections, triggers SVG blueprints, runs the background canvas particle engine, coordinates modals, and binds gesture event listeners. |
| **Glassmorphism** | UI Aesthetic System | Implemented via `backdrop-filter: blur()`, translucent borders, and subtle radial gradients to project a high-tech "operational instrument panel" styling. |
| **Gradient Design System** | Visual Palette | Combines deep navy (`#050811`), midnight blue (`#0a1122`), cyan (`#06b6d4`), and indigo-purple gradients to emulate modern observability portals like Grafana. |
| **IntersectionObserver API** | Scroll Reveal System | Triggers premium staggered fade-ins and scale animations asynchronously on the browser's background thread, preventing UI lag. |
| **HTML5 Canvas API** | Background Telemetry | Drives the node-network background particle system. Recalculates coordinates efficiently using `requestAnimationFrame`. |

---

## 🏗️ Project Architecture

The codebase follows a decoupled architectural pattern, separating raw data definitions from DOM rendering and animation engines.

```mermaid
graph TD
    A[index.html - Core DOM Shell] --> B(styles.css - Design System & Variables)
    A --> C(app.js - Initialization Controller)
    
    subgraph Data Layer (decoupled in content/)
        D[profile.js]
        E[experience.js]
        F[skills.js]
        G[certifications.js]
        H[projects.js]
        I[achievements.js]
        J[contact.js]
    end

    Data Layer -->|Injected dynamically via script tags| A
    C -->|Reads data| Data Layer
    C -->|Injects templates into| A
    C -->|Initializes| K[Background Canvas Particle Engine]
    C -->|Initializes| L[Live Uptime SLA Ticker]
    C -->|Initializes| M[Telemetry Logs Console Feed]
```

### 1. Content Organization
Content is isolated into modular JavaScript files under the `/content` folder. This acts as a flat-file database. Adding a project or certification simply requires modifying an array in a dedicated JavaScript file, which the core rendering loop (`app.js`) automatically parses and appends to the DOM.

### 2. Layout Structure
A responsive, two-column layout:
*   **Recruiter Sidebar (`<aside>`)**: Fixed-width telemetry summary containing status checks, metrics, CV downloads, social hooks, and log streams.
*   **Main Content Area (`<main>`)**: Scrollable feature layout compiling achievements, skills, project cards, and blueprints.

### 3. Styling Management
Managed purely in `styles.css`. Custom variables are declared under `:root` (default Dark Mode) and overridden in `body.light-mode` to ensure instantaneous theme switching without flashing unstyled content (FOUC). 

### 4. Animation System
Staggered animations are managed by applying `.reveal-on-scroll` classes in HTML and tracking viewport entry via `IntersectionObserver`. Elements are hardware-accelerated using `transform: translateZ(0)` and `backface-visibility: hidden` to prevent layout rendering dropouts under Safari/iOS WebKit.

### 5. Responsiveness Handling
Handled using CSS Grid and Flexbox with responsive columns using `minmax(0, 1fr)` to prevent expanding content from breaking viewport boundaries. Touch gesture event handlers (`touchstart`, `touchmove`, `touchend`) are bound in `app.js` to enable swipe actions for carousels and drag-to-pan functions for zoomed blueprints.

---

## 📂 Folder Structure

```directory
.
├── .git/                      # Version control history
├── CNAME                      # Custom domain configuration for GitHub Pages
├── Sudharsan_SRE.jpeg         # Profile image asset
├── app.js                     # Core frontend controller (DOM builder, event listeners, canvas engine)
├── index.html                 # Main HTML layout skeleton
├── server.js                  # Native Node.js local development web server
├── styles.css                 # Master Design System and UI CSS definitions
├── content/                   # Decoupled content modules (Database Layer)
│   ├── achievements.js        # SLA stats and achievements config
│   ├── certifications.js      # Accreditations and awards database
│   ├── contact.js             # Testimonials, blogs metadata, and recruiter info
│   ├── experience.js          # SRE & System Admin job timeline
│   ├── profile.js             # Core biography and social links configuration
│   ├── projects.js            # Case studies, blueprints type mapping, and tools tags
│   └── skills.js              # Technical skills clusters and level statistics
└── walkthrough.md             # Verification records and responsive layout fixes documentation
```

---

## ⚙️ Installation Guide

Follow these commands to clone the repository and set up a local development environment.

### 1. Prerequisites
Ensure you have either **Node.js** (v14+) or **Python** installed on your workstation. No `npm install` packages are required due to the zero-dependency nature of the codebase.

### 2. Clone the Repository
Open a terminal shell and execute:
```bash
# Clone the repository
git clone https://github.com/raghav-sudharsan/sudharsan-sre.git

# Navigate into the workspace directory
cd sudharsan-sre
```

---

## 💻 Running Locally

### Option A: Native Node.js Server (Recommended)
This repository includes a lightweight `server.js` file utilizing Node's native `http` and `fs` modules to host the site locally without dependency bloat:

```bash
# Launch the native development server
node server.js
```
The server will initialize instantly and listen on:  
👉 **`http://localhost:8000/`**

### Option B: Python SimpleHTTPServer
If Node.js is not present on your system, execute:
```bash
# For Python 3.x
python -m http.server 8000

# For Python 2.x (Legacy)
python -m SimpleHTTPServer 8000
```
Open your browser and navigate to:  
👉 **`http://localhost:8000/`**

### Option C: Node.js `serve` Package (npx)
If you prefer standard npm global static hosts:
```bash
# Run serve via npx (zero local configuration)
npx serve .
```
This utility automatically spins up a local web server (usually on port 3000 or 5000).

### Development Workflow
Since the client parses files dynamically on load, you do not need to compile scripts. 
1. Make changes to CSS in `styles.css` or content configs in `/content/*.js`.
2. Hard reload your browser (`Ctrl + F5` or `Cmd + Shift + R`) to bypass cached data and view updates immediately.

---

## 📝 Content Management Guide

Future updates to the portfolio's text, projects, or credentials **do not require modifying the main layout (`index.html`) or core scripts (`app.js`)**. This structure ensures that updates can be performed safely without risk of breaking styles.

### 1. Updating Profile Biography
Open `content/profile.js` and modify properties under `portfolioData.personalInfo`:
```javascript
portfolioData.personalInfo = {
  name: "Sudharsan S",
  designation: "Site Reliability Engineer | DevOps Engineer | Cloud Engineer",
  summary: "Highly skilled Site Reliability Engineer...",
  bio: "With extensive experience managing high-throughput...",
  yearsOfExperience: 3,
  // Add core strengths:
  coreStrengths: [
    "Reliability & Chaos Engineering",
    "Multi-Cloud Architecture (AWS, Azure, GCP)",
    ...
  ]
};
```

### 2. Adding a New Case Study (Project)
Open `content/projects.js` and append a new object to the `portfolioData.projects` array:
```javascript
{
  id: "my-new-project",
  name: "Automated Canary Deployments",
  category: "cicd", // 'observability', 'cicd', 'kubernetes', 'automation', 'iac'
  description: "Designed a canary deployment strategy...",
  businessProblem: "Releases were manual and caused intermittent downtime...",
  solution: "Deployed Argo Rollouts integrated with Prometheus alert metrics...",
  tools: ["Argo Rollouts", "Prometheus", "Kubernetes", "Linkerd"],
  challenges: "Configuring metric queries to analyze error rates dynamically...",
  results: "Achieved zero release downtime and reduced rollback times by 95%.",
  lessons: "Always set low analysis thresholds for initial test limits.",
  github: "https://github.com/raghav-sudharsan/canary-deployments",
  liveDemo: "#",
  diagramId: "cicd-architecture" // Link to a diagram ID defined in appState/projects
}
```

### 3. Updating Certifications
Open `content/certifications.js` and append a certification record:
```javascript
{
  id: "cert-cka",
  name: "CKA: Certified Kubernetes Administrator",
  issuer: "The Linux Foundation",
  date: "2023",
  icon: "layers", // 'cloud', 'layers', 'code', 'activity', 'terminal'
  imageUrl: ""    // Optional path (e.g. "assets/cka-cert.png") - shows badge placeholder if empty
}
```

### 4. Replacing Dashboard Avatar Image
1. Prepare your portrait image, crop it to a square format (ideally `400x400` pixels), and save it as a JPEG.
2. Copy it into the root directory of the repository (e.g., as `Sudharsan_SRE.jpeg`).
3. If using a different filename, open `content/profile.js` and update `avatarUrl`:
   ```javascript
   avatarUrl: "my-new-filename.jpeg"
   ```

### 5. Updating Contact, Socials, & Testimonials
Open `content/contact.js` to modify active interview status flags, CV links, testimonials, or blogs content:
```javascript
portfolioData.recruiterInfo = {
  currentRole: "Site Reliability Engineer @ Craftsilicon",
  noticePeriod: "30 Days (Negotiable)",
  availabilityStatus: "Actively interviewing for SRE & DevOps roles",
  resumeDownloadUrl: "assets/Sudharsan_SRE_Resume.pdf" // Update with your actual resume path
};
```

---

## 🎨 Customization Guide

### Altering Color Schemes & Themes
All visual styling parameters are managed by CSS custom variables in `styles.css`. To change the primary theme colors, modify the custom variables under `:root` (Dark Theme) or `body.light-mode` (Light Theme):

```css
/* Customize default Dark Mode Theme (styles.css: L4) */
:root {
  --bg-base: #050811;          /* Deepest background navy */
  --text-primary: #f8fafc;     /* Primary text color */
  --accent-gradient: linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #6366f1 100%); /* Highlights gradient */
}
```

### Modifying Telemetry Logs Stream
To adjust the frequency or configuration of the pseudo-live logs inside the recruiter hub sidebar, open `app.js` and edit the console logs config:
```javascript
// Change log interval frequency (app.js: L1270-1300 approx)
setInterval(() => {
  appendTelemetryLogLine();
}, 4000); // 4000ms interval
```

---

## 📈 Performance & Accessibility Optimizations

Designed from the ground up to follow performance budgets matching enterprise SLA requirements:

*   **Hardware Accelerated CSS Compositing:** Critical animations (testimonials sliding, modals, and hover scales) use `will-change: transform` and `transform: translate3d(0, 0, 0)` triggers to offload rendering to the device GPU, resulting in fluid 60FPS transitions.
*   **Minimized Rendering Layout Thrashing:** Bypasses framework virtual DOM diffing calculations. Viewport checks run asynchronously via the native `IntersectionObserver` API.
*   **Reduced Motion Support:** Respects user accessibility preferences. Declares standard `@media (prefers-reduced-motion: reduce)` rules that automatically disable background particles canvas renderings and transition animations if configured in client operating system settings.
*   **Dynamic SVG Compression:** Interactive blueprint diagrams are coded as dynamic inline SVGs, keeping page resource load times low and visuals crisp at any display magnification.

---

## 📱 Browser Compatibility

| Browser | Supported Version | Notes |
| :--- | :--- | :--- |
| **Google Chrome** | 85+ | Full Support. |
| **Mozilla Firefox** | 80+ | Full Support. (Enable `layout.css.backdrop-filter.enabled` in older setups if blur drops). |
| **Apple Safari / iOS** | 14+ | Full Support. Includes forced GPU rendering optimizations to prevent flex clipping. |
| **Microsoft Edge** | 85+ | Full Support. |

---

## 📐 Responsive Design Support

Layout supports flexible fluid widths across:
*   **Widescreen Desktops / TV:** >1400px viewports center-constrain content to prevent scanning exhaustion.
*   **Standard Desktops / Laptops:** 1024px to 1400px columns resize dynamically using standard fraction spacing.
*   **Tablets (iPad/Android):** 768px to 1023px grid sections convert sidebar panel positioning to top blocks, preserving case study grids side-by-side.
*   **Mobile Screens:** <767px viewports stack layouts into a singular column, stretch buttons for easy thumb-tapping, and load touchscreen swipe gestures for interactive carousels.

---

## 🗺️ Future Enhancements Roadmap

*   [ ] **Live GitHub Integrations:** Incorporate octokit API calls to fetch active repository stargazers, commit records, and contributions.
*   [ ] **Real-time Incident Remediator simulator:** Build a miniature game inside the terminal preloader where recruiters can run "incident commands" to recover a failing cluster.
*   [ ] **Dockerized Deployment:** Provide a `Dockerfile` and docker-compose script to deploy the server seamlessly in an NGINX container.
*   [ ] **IaC Deployment Scripting:** Provide a Terraform stack template to host the static portfolio on AWS (S3, Route53, and CloudFront CDN) automatically.

---

## 👤 Author Information

*   **Name:** Sudharsan S
*   **Title:** Site Reliability Engineer | DevOps Engineer | Cloud Engineer
*   **Location:** Bangalore, Karnataka, India
*   **Email:** [raghavsudhar07@gmail.com](mailto:raghavsudhar07@gmail.com)
*   **LinkedIn:** [https://linkedin.com/in/sudharsan-sre/](https://linkedin.com/in/sudharsan-sre/)
*   **GitHub:** [https://github.com/raghav-sudharsan](https://github.com/raghav-sudharsan)
*   **GitLab:** [https://gitlab.com/sudharsan-s](https://gitlab.com/sudharsan-s)

---

## 📄 License

This repository is distributed under the **MIT License**. For complete terms, see the [LICENSE](#license) section or inspect licensing details in the source.

```text
Copyright (c) 2026 Sudharsan S

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```
