# 🌐 SRE.PORTFOLIO // Production Reliability & Cloud Operations Dashboard

[![Uptime SLA](https://img.shields.io/badge/Uptime_SLA-99.999%25-06b6d4?style=flat-square&logo=statuspage)](https://raghav-sudharsan.github.io/sudharsan-sre/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Technology Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS%20(ES6)-blueviolet?style=flat-square)](https://raghav-sudharsan.github.io/sudharsan-sre/)
[![Maintainer](https://img.shields.io/badge/Maintainer-raghav--sudharsan-blue?style=flat-square&logo=github)](https://github.com/raghav-sudharsan)

An interactive, production-grade engineering dashboard built to showcase the professional capabilities, systems administration, and operational validation workflows of **Sudharsan S**, a Site Reliability Engineer with 3+ years of experience in enterprise production support.

---

## 1. Project Overview

The objective of this project is to construct a portfolio that moves away from standard, template-driven resume templates, replacing them with a functional dashboard that mimics a real-time cloud operations console. 

Rather than listing abstract summaries, this portfolio structures an SRE's capabilities as operational metrics, dynamic architecture flowcharts, and system telemetry feeds. It is engineered to demonstrate the author's technical background in cloud operations (AWS & GCP), IIS/.NET hosting operations, automation scripting (PowerShell & Batch), incident management, and disaster recovery validation drills.

---

## 2. Key Features

The interface is structured as an interactive operations center featuring the following visual indicators and utilities:

*   **Terminal Bootstrap Simulator:** A simulated terminal sequence on application boot that runs diagnostic logs (`aws configure`, `powershell iis_health_check.ps1`, `prometheus config validation`, `sysctl` kernel variable configurations) to set an operational tone.
*   **SLA Uptime Ticker:** A header-integrated decimal clock that dynamically fluctuates at micro-decimals (e.g., `99.99923% SLA`) in real time, simulating live service availability monitoring.
*   **Operations Telemetry Feed:** An active log stream in the sidebar that continuously appends realistic SRE logs (IIS Pool health check passes, Prometheus scraps, Grafana syncs, memory warning alerts) with current local timestamps.
*   **Interactive Architecture Diagrams:** An inline SVG blueprint viewer displaying:
    *   *Production IIS Architecture* (Clients → LB → IIS → .NET App → DB)
    *   *Monitoring Architecture* (Windows Exporter → Prometheus → Grafana → Alerting)
    *   *Disaster Recovery Architecture* (Primary → Active Replication → DR Standby)
    *   *Production Deployment Flow* (Staged Release Lifecycle & Feedback Loop)
    Includes complete desktop mouse-drag zoom and mobile touch-drag panning capabilities.
*   **Responsive Dashboard UI:** A fluid two-column panel layout optimized to present data structures clearly under varying device footprints.
*   **Uptime Theme Engine:** Persistent dark/light mode toggles with customized CSS custom properties and client storage synchronization.
*   **Operations Board Sidebar:** A recruiter-focused summary card displaying total experience, DR drills completed, cloud platforms, architecture support types, and core hosting platforms at a glance.

---

## 3. Design Philosophy

The architecture of the dashboard is driven by clear engineering constraints:

### Dashboard-Style UI
An SRE's daily workflow is centered around observability platforms, Grafana dashboards, and command centers. The interface is deliberately styled after an operational console to provide an immediate visual association with system monitoring, incident response, and reliability operations.

### Glassmorphism Grid
Using frosted glass panels (`backdrop-filter: blur()`), subtle translucent borders, and deep midnight-gradient backing layers creates high depth and contrast. This emulates modern NOC (Network Operations Center) instruments and maintains strict readability.

### Zero Frontend Frameworks
The project is built with **zero external framework dependencies** (no React, Angular, Vue, or Tailwind CSS). This constraints guarantees:
*   Zero dependencies vulnerability footprint
*   Zero build-step compilation overhead
*   Instant page loads and maximum browser compatibility
*   Bypassing framework virtual-DOM overhead, preventing UI lag

### Decoupled Content Architecture
All data (experiences, certifications, projects, bios) is entirely isolated from the main layout markup and core application logic. It behaves like a decoupled flat-file database schema, making it extremely maintainable.

---

## 4. Technical Architecture

The portfolio follows a simple, unidirectional data-injection flow:

```mermaid
graph TD
    A[index.html - Structural Shell] --> B(styles.css - Design Tokens & Styles)
    A --> C(app.js - Rendering Engine & Event Loop)
    
    subgraph Data Modules (content/*)
        D[profile.js - Bio & Social Data]
        E[experience.js - Job Timelines]
        F[skills.js - Skills Matrix]
        G[certifications.js - Roadmap]
        H[projects.js - Case Studies & Diagrams]
        I[achievements.js - SLA & Metrics]
        J[contact.js - Testimonials & Recruiter info]
    end

    Data Modules -->|Injected dynamically via script tags| A
    C -->|Parses portfolioData object| Data Modules
    C -->|Injects elements into| A
    C -->|Initializes| K[Background Particles Canvas]
    C -->|Initializes| L[Dynamic SLA Ticker]
    C -->|Initializes| M[Telemetry Logs Console]
```

### Components & Data Flow:
*   **`index.html`**: The structural shell containing container nodes, modal portals, and structural grids. It loads external CSS, dynamic scripts, and third-party utility icons (Lucide Icons and Marked library).
*   **`styles.css`**: The master design system. Declares CSS variables under `:root` and overrides them in `body.light-mode` to implement instantaneous theme shifting.
*   **`app.js`**: The central controller. Responsible for DOM construction, binding event listeners, initializing the background HTML5 canvas particle engine, driving the telemetry log feed, rendering dynamically zoomed SVGs, and handling the ATS-mode plain-text switch.
*   **Content Modules (`content/*.js`)**: Modular JavaScript data files that extend a global `portfolioData` object. This separation ensures that content is completely independent of presentation logic.

---

## 5. Folder Structure

The project repository is organized as follows:

```directory
.
├── CNAME                      # Custom domain configuration for GitHub Pages
├── Sudharsan_SRE.jpeg         # Profile image asset
├── app.js                     # Core frontend controller (DOM builder, event loops, canvas engine)
├── index.html                 # Main HTML layout skeleton
├── server.js                  # Native Node.js local development web server
├── styles.css                 # Master CSS Design System & styles
└── content/                   # Decoupled database layer
    ├── achievements.js        # SLA statistics and achievements array
    ├── certifications.js      # Accreditations and future targets
    ├── contact.js             # Testimonials, blogs metadata, and recruiter info
    ├── experience.js          # SRE & System Admin job timeline
    ├── profile.js             # Personal bio, location, and social links
    ├── projects.js            # Case studies and blueprints mapping
    └── skills.js              # Technical skills clusters and level statistics
```

---

## 6. Performance Optimizations

The application is engineered to load and render with minimal latency:

*   **Asynchronous Viewport Intersection API:** Instead of tracking global scroll event handlers (which block the main execution thread), the page uses the browser's native `IntersectionObserver` to trigger fade-in animations and start the metrics counter counts only when blocks are visible in the viewport.
*   **GPU Hardware Acceleration:** Animations such as slider transitions and zoom translations use 3D hardware-accelerated transforms (`transform: translate3d(0,0,0)`) and `will-change` properties. This tells the browser to isolate rendering layers on the device GPU, eliminating UI layout thrashing.
*   **Canvas Particles Throttle:** The node particle network utilizes `requestAnimationFrame` to run coordinate recalculations, ensuring operations run smoothly in sync with the display refresh rate.
*   **Asset-Free Blueprints:** The architecture blueprint viewer renders diagrams using inline SVG vectors, removing external HTTP requests for heavy image assets.

---

## 7. Accessibility Considerations

Accessibility (a11y) guidelines are embedded directly into the code:

*   **Semantic HTML5 markup**: Layout blocks utilize explicit `<header>`, `<main>`, `<aside>`, `<section>`, and `<footer>` elements to ensure screen-reader compatibility.
*   **Reduced Motion Support**: Media queries automatically detect if users have configured reduced-motion options in their operating systems. If active, all sliding transitions, fade-ins, and the background canvas particle engine are disabled.
*   **Interactive Modals Focus**: Modal overlays include semantic `aria-label` tags, and close buttons are keyboard navigable.
*   **Color Contrast**: Hex values for text elements are checked against WCAG guidelines to guarantee reading contrast in both dark and light modes.

---

## 8. Responsive Design Strategy

The layout is built using fluid CSS grid calculations to handle screen reflows gracefully:

*   **Desktop Layout (>1024px):** A modern two-column dashboard design. The operations panel is pinned to the left sidebar, and the scrollable main content is aligned to the right.
*   **Tablet Layout (768px - 1023px):** Grid columns reflow. The operations panel is moved to the top of the viewport as a header summary cards layout, saving space for projects side-by-side.
*   **Mobile Layout (<767px):** Content stacks into a singular column. Metric grids collapse, interactive slider controls track touch gestures (`touchstart`/`touchend`), and CTA buttons span the full viewport width for easy thumb-tapping.

---

## 9. Content Management

The portfolio's content can be updated seamlessly without modifying the main HTML structure or JavaScript logic:

### Updating Profile Data
To update personal stats, modify properties in [profile.js](file:///c:/Users/ragha/OneDrive/Documents/GitHub/WEB-4/sudharsan-sre/content/profile.js):
```javascript
portfolioData.personalInfo = {
  name: "Sudharsan S",
  designation: "Keeping Production Systems Reliable, Observable and Resilient",
  summary: "Site Reliability Engineer specializing...",
  // Add bio paragraphs and core strengths:
  coreStrengths: [ ... ]
};
```

### Adding Experience Timeline Events
Append a new experience object to the array in [experience.js](file:///c:/Users/ragha/OneDrive/Documents/GitHub/WEB-4/sudharsan-sre/content/experience.js):
```javascript
{
  company: "Company Name",
  role: "Engineering Position",
  duration: "Feb 2025 – Present",
  responsibilities: [ ... ],
  achievements: [ ... ],
  tools: [ ... ],
  businessImpact: "Impact description..."
}
```

### Modifying the Skill Matrix
Categorized skill matrices can be modified in [skills.js](file:///c:/Users/ragha/OneDrive/Documents/GitHub/WEB-4/sudharsan-sre/content/skills.js). Icon values correspond to Lucide icons:
```javascript
{
  category: "Monitoring & Observability",
  items: [
    { name: "Prometheus", level: 90, icon: "activity" },
    { name: "Grafana", level: 92, icon: "layout" }
  ]
}
```

### Customizing Projects & Case Studies
Projects and their related diagrams can be updated in [projects.js](file:///c:/Users/ragha/OneDrive/Documents/GitHub/WEB-4/sudharsan-sre/content/projects.js):
```javascript
{
  id: "ent-monitoring",
  name: "Enterprise Monitoring & Observability Platform",
  category: "observability",
  description: "Short summary...",
  businessProblem: "Details...",
  solution: "Details...",
  tools: ["Prometheus", "Grafana", "Windows Exporter"],
  challenges: "Details...",
  results: "Details...",
  lessons: "Details...",
  github: "https://github.com/...",
  liveDemo: "#",
  diagramId: "monitoring-architecture" // Links to SVG blueprint
}
```

---

## 10. Local Development

To run the project locally, clone the repository and use any static web hosting server. Because it has zero dependencies, no package installation step is required.

### Method 1: Node.js (Recommended)
Launch the lightweight, native development server provided:
```bash
node server.js
```
The server will boot instantly and listen on: `http://localhost:8000/`

### Method 2: Python Simple Server
If Node is not available:
```bash
# Python 3.x
python -m http.server 8000
```
Open your browser and navigate to: `http://localhost:8000/`

---

## 11. Deployment Strategy

The application is optimized for static hosting platforms. 

### GitHub Pages CI/CD Workflow
Every git commit pushed to the `main` branch is validated and deployed automatically using standard GitHub Actions:
1. Pushing commits triggers the deploy pipeline.
2. The pipeline checks code structure, packages the static directory assets, and uploads them to GitHub's deployment runner.
3. The live static endpoint is updated instantly with zero downtime.

The custom domain configuration is preserved by the `CNAME` file located in the root directory.

---

## 12. Future Roadmap

Planned enhancements to extend the dashboard functionality:

*   **Live GitHub Integration:** Integrate the GitHub API to dynamically retrieve repository commits, contributions, and stargazers.
*   **Operational Sandbox Widget:** Integrate a CLI parser sandbox inside the preloader modal where recruiters can execute simulated commands (like `recycle-pool -Force` or `get-service`) to repair simulated server outages.
*   **Continuous Deployment Templates:** Provide Terraform configuration code modules to automatically launch the static portfolio inside AWS S3, Route53, and CloudFront.
*   **Docker Containerization:** Dockerize the static server setup with an NGINX base image configuration for container environments.

---

## 13. Security & Privacy Statement

This project is built strictly to demonstrate SRE patterns and systems experience:
*   **No client data is published:** No production customer details or financial records are stored.
*   **No internal infrastructures details are exposed:** Hostnames, security policies, VPN paths, and private configurations are excluded.
*   **No production hostnames or IPs are disclosed:** Internal IP maps, subnet configurations, and system domains are simulated.

All architecture diagrams, server code samples, and operational console logs are intentionally generalized to represent standard systems administration architectures for demonstration purposes.

---

## 14. Engineering Principles

The design of the portfolio dashboard aligns with core SRE engineering principles:

*   **Reliability:** The zero-dependency architecture guarantees that the site loads consistently across all modern browser configurations with 100% uptime.
*   **Simplicity:** Keeping scripting code modular and layout stylesheets clean ensures that other developers or technical recruiters can inspect the structure easily.
*   **Maintainability:** Decoupling content schemas from application logic ensures that modifying job experiences or skills takes only minutes.
*   **Performance:** Constraining resource footprints, using inline vectors, and offloading animations to the GPU ensures rapid page loads and fluid interactions.

---

## 15. Author

*   **Name:** Sudharsan S
*   **Role:** Site Reliability Engineer | DevOps Engineer | Cloud Operations Engineer
*   **Location:** Bangalore, Karnataka, India
*   **Email:** [raghavsudhar07@gmail.com](mailto:raghavsudhar07@gmail.com)
*   **LinkedIn:** [https://linkedin.com/in/sudharsan-sre/](https://linkedin.com/in/sudharsan-sre/)
*   **GitHub:** [https://github.com/raghav-sudharsan](https://github.com/raghav-sudharsan)
*   **Portfolio:** [https://raghav-sudharsan.github.io/sudharsan-sre/](https://raghav-sudharsan.github.io/sudharsan-sre/)
