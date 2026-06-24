# 🌐 SRE.PORTFOLIO // Production Reliability & Cloud Operations Dashboard

[![Uptime SLA](https://img.shields.io/badge/Uptime_SLA-99.999%25-06b6d4?style=flat-square&logo=statuspage)](https://raghav-sudharsan.github.io/sudharsan-sre/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Technology Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS%20(ES6)-blueviolet?style=flat-square)](https://raghav-sudharsan.github.io/sudharsan-sre/)
[![Maintainer](https://img.shields.io/badge/Maintainer-raghav--sudharsan-blue?style=flat-square&logo=github)](https://github.com/raghav-sudharsan)

Welcome to the **SRE Portfolio Dashboard**, an interactive operational console engineered specifically to reflect the professional journey, core competencies, and disaster recovery validation frameworks of **Sudharsan S**, a Site Reliability Engineer and DevOps Professional with 3+ years of experience.

Designed to mirror an enterprise operations command center, this project showcases real production engineering credentials, monitoring dashboards, PowerShell automation scripts, and structured case studies directly relevant to high-availability application hosting.

---

## 🚀 Live Demo

The production dashboard is automatically deployed via GitHub Pages:

👉 **Live Operations Console:** [https://raghav-sudharsan.github.io/sudharsan-sre/](https://raghav-sudharsan.github.io/sudharsan-sre/)

---

## 🛡️ Key Features

The portfolio behaves like a real-time monitoring console, delivering a premium technical experience:

*   **Terminal Preloader Bootstrap Simulator:** Displays simulated startup routines on initialization (`aws configure`, `powershell iis_health_check.ps1`, `prometheus config validation`, `sysctl` variables) to establish a technical, operational theme.
*   **Heartbeat SLA Uptime Ticker:** Header-integrated status widget that dynamically fluctuates at micro-decimals (e.g., `99.99923% SLA`) in real-time, mimicking active service level agreement monitoring.
*   **Recruiter Telemetry Console Log Widget:** An active sidebar log feed that auto-appends realistic system operations logs (IIS Pool health check passes, Prometheus scrapes, Grafana syncs, memory utilization alerts) with current local timestamps.
*   **Interactive SVG Blueprint Viewer:** Renders vector architectural blueprints (Production IIS Architecture, Monitoring Architecture, Disaster Recovery Architecture, Production Deployment Flow) with full desktop magnifier mouse zoom and mobile/tablet touch-drag/panning support.
*   **Dynamic Case Studies Filters:** Filter critical projects in real time across Observability, Automation, and Infrastructure (DR/IaC).
*   **Dual-Theme Mode (Dark / Light):** Native theme toggling using CSS custom properties with localized storage persistence.

---

## 🛠️ Technology Stack

This application is built with **zero external framework dependencies** (no React, Angular, Vue, or Tailwind CSS). This constraint was chosen deliberately to maximize performance and guarantee zero layout thrashing.

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
*   **Operations Sidebar (`<aside>`)**: Fixed-width telemetry summary containing status checks, SRE metrics, CV downloads, social hooks, and log streams.
*   **Main Content Area (`<main>`)**: Scrollable feature layout compiling achievements, skills, case study cards, blueprints, and the resume portal.

### 3. Styling Management
Managed purely in `styles.css`. Custom variables are declared under `:root` (default Dark Mode) and overridden in `body.light-mode` to ensure instantaneous theme switching without flashing unstyled content (FOUC). 

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
├── content/                   # Decoupled content modules (Database Layer)
│   ├── achievements.js        # SLA stats and achievements config
│   ├── certifications.js      # Accreditations and awards database
│   ├── contact.js             # Testimonials, blogs metadata, and recruiter info
│   ├── experience.js          # SRE & System Admin job timeline
│   ├── profile.js             # Core biography and social links configuration
│   ├── projects.js            # Case studies and blueprints mapping
│   └── skills.js              # Technical skills clusters and level statistics
└── styles.css                 # Master Design System and UI CSS definitions
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
```
Open your browser and navigate to:  
👉 **`http://localhost:8000/`**

---

## 📝 Content Management Guide

Future updates to the portfolio's text, projects, or credentials **do not require modifying the main layout (`index.html`) or core scripts (`app.js`)**. This structure ensures that updates can be performed safely.

### 1. Updating Profile Biography
Open `content/profile.js` and modify properties under `portfolioData.personalInfo`:
```javascript
portfolioData.personalInfo = {
  name: "Sudharsan S",
  designation: "Keeping Production Systems Reliable, Observable and Resilient",
  summary: "Site Reliability Engineer specializing...",
  bio: "Site Reliability Engineer with 3+ years...",
  yearsOfExperience: 3,
  coreStrengths: [
    "Application Availability Management",
    "Incident & Problem Management",
    ...
  ]
};
```

### 2. Adding a New Case Study (Project)
Open `content/projects.js` and append a new object to the `portfolioData.projects` array:
```javascript
{
  id: "my-new-project",
  name: "IIS Automation Suite",
  category: "automation", // 'observability', 'automation', 'iac'
  description: "Automated configuration audits...",
  businessProblem: "Manual checks were error-prone...",
  solution: "Developed PowerShell module for IIS pool verification...",
  tools: ["PowerShell", "IIS", "Windows"],
  challenges: "Managing access privileges...",
  results: "Cut manual audits to under 2 minutes.",
  lessons: "Robust error logs are critical.",
  github: "https://github.com/sudharsan-sre/my-project",
  liveDemo: "#",
  diagramId: "deployment-flow"
}
```

### 3. Updating Certifications
Open `content/certifications.js` and append a certification record:
```javascript
{
  id: "cert-aws",
  name: "AWS Certified Solutions Architect",
  issuer: "Amazon Web Services",
  date: "Roadmap Target",
  icon: "cloud", // 'cloud', 'layers', 'code', 'activity', 'server'
  imageUrl: ""    // Path to certificate image (optional)
}
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
To adjust the frequency or configuration of the pseudo-live logs inside the operations board sidebar, open `app.js` and edit the console logs config:
```javascript
// Change log interval frequency (app.js)
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
| **Mozilla Firefox** | 80+ | Full Support. |
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

## 👤 Author Information

*   **Name:** Sudharsan S
*   **Title:** Site Reliability Engineer | DevOps Engineer | Cloud Operations Engineer
*   **Location:** Bangalore, Karnataka, India
*   **Email:** [raghavsudhar07@gmail.com](mailto:raghavsudhar07@gmail.com)
*   **LinkedIn:** [https://linkedin.com/in/sudharsan-sre/](https://linkedin.com/in/sudharsan-sre/)
*   **GitHub:** [https://github.com/raghav-sudharsan](https://github.com/raghav-sudharsan)

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
