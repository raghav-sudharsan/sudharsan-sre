document.addEventListener("DOMContentLoaded", () => {
  // Initialize state
  initApp();
});

// Global state holding configuration overrides
let appState = {
  theme: "dark",
  messages: []
};

// Main initialization controller
function initApp() {
  loadLocalStorage();
  setupTerminalPreloader();
  applyTheme();
  setupThemeToggle();
  setupNavigation();

  // Set static SRE profile elements from portfolioData
  const nameEl = document.getElementById("hero-name-val");
  if (nameEl) {
    nameEl.innerText = portfolioData.personalInfo.name;
  }
  const designationEl = document.getElementById("hero-designation-label");
  if (designationEl) {
    designationEl.innerText = "DevOps Engineer | Cloud Operations | Platform Reliability";
  }
  const avatarEl = document.getElementById("avatar-preview-img");
  if (avatarEl && portfolioData.personalInfo.avatarUrl) {
    avatarEl.src = portfolioData.personalInfo.avatarUrl;
    avatarEl.style.display = "block";
  }

  // Render Dynamic Content Components
  renderRecruiterHub();
  renderAboutSection();
  renderMetrics();
  renderSkills();
  renderOperationalHighlights();
  renderProjects("all");
  renderArchitectureTabs();
  renderTimeline();
  renderAchievements();
  renderCertifications();
  renderBlogs();
  renderCoreFocus();
  renderContactCards();

  // Setup Interactivity Listeners
  setupProjectFilters();
  setupContactForm();
  setupModals();
  setupScrollObserver();
  setupBlueprintZoom();

  // Initialize SRE Observability Dashboard animations
  initTelemetryParticles();
  initLiveUptimeTicker();
  initRecruiterHubConsole();
  initHeroRotator();
  initArchitectureAutoRotation();

  // Run Lucide icon creation
  lucide.createIcons();
}

// Telemetry-style preloader simulator
function setupTerminalPreloader() {
  const loadingScreen = document.getElementById("loading-screen");
  const terminalBody = document.getElementById("terminal-body");

  const bootstrapCommands = [
    "&gt; aws configure --profile production ... [OK]",
    "&gt; powershell -ExecutionPolicy Bypass -File iis_health_check.ps1 ... [OK]",
    "&gt; prometheus --config.file=prometheus.yml ... [OK]",
    "&gt; sysctl net.ipv4.ip_forward=1 ... [OK]",
    "&gt; Systems initialized. Launching operational control panel..."
  ];

  let delay = 100;
  bootstrapCommands.forEach((cmd, idx) => {
    setTimeout(() => {
      const p = document.createElement("p");
      p.innerHTML = cmd;
      if (idx === bootstrapCommands.length - 1) {
        p.classList.add("terminal-cursor");
        p.style.color = "var(--status-ok)";
        p.style.fontWeight = "bold";
      }
      terminalBody.appendChild(p);
    }, delay);
    delay += 250;
  });

  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.visibility = "hidden";
      document.body.classList.add("app-loaded");
      animateOnLoad();
      initScrollReveal();
    }, 500);
  }, delay + 500);
}

// Animate specific panels on page launch
function animateOnLoad() {
  // Animate skill bars in visible viewport
  triggerSkillAnimations();
}

// Save & load state using browser storage
function loadLocalStorage() {
  try {
    if (localStorage.getItem("sre_portfolio_theme")) {
      appState.theme = localStorage.getItem("sre_portfolio_theme");
    }
    if (localStorage.getItem("sre_portfolio_messages")) {
      appState.messages = JSON.parse(localStorage.getItem("sre_portfolio_messages"));
    }
  } catch (e) {
    console.warn("Unable to load state from localStorage:", e);
  }
}

function saveState(key, val) {
  appState[key] = val;
  try {
    if (typeof val === "object") {
      localStorage.setItem(`sre_portfolio_${key}`, JSON.stringify(val));
    } else {
      localStorage.setItem(`sre_portfolio_${key}`, val);
    }
  } catch (e) {
    console.warn("Unable to save state to localStorage:", e);
  }
}

// Theme system triggers
function applyTheme() {
  if (appState.theme === "light") {
    document.body.classList.add("light-mode");
    document.getElementById("theme-sun-icon").style.display = "none";
    document.getElementById("theme-moon-icon").style.display = "block";
  } else {
    document.body.classList.remove("light-mode");
    document.getElementById("theme-sun-icon").style.display = "block";
    document.getElementById("theme-moon-icon").style.display = "none";
  }
}

function setupThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const newTheme = appState.theme === "dark" ? "light" : "dark";
      saveState("theme", newTheme);
      applyTheme();
    });
  }
}

// Smooth scrolling and header active sync
function setupNavigation() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSec = document.querySelector(targetId);
      if (targetSec) {
        window.scrollTo({
          top: targetSec.offsetTop - 85,
          behavior: "smooth"
        });
      }
    });
  });
}

// Render Components
function renderRecruiterHub() {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  };
  setVal("recruiter-avail-status", portfolioData.recruiterInfo.availabilityStatus);
  setVal("ops-experience", portfolioData.recruiterInfo.experience);
  setVal("ops-dr-drills", portfolioData.recruiterInfo.drDrills);
  setVal("ops-cloud-platforms", portfolioData.recruiterInfo.cloudPlatforms);
  setVal("ops-apps-supported", portfolioData.recruiterInfo.appsSupported);
  setVal("ops-architectures", portfolioData.recruiterInfo.architectures);
  setVal("ops-core-platforms", portfolioData.recruiterInfo.corePlatforms);
  setVal("ops-availability-focus", portfolioData.recruiterInfo.availabilityFocus);

  const links = portfolioData.personalInfo.socialLinks;
  const linkedinEl = document.getElementById("social-link-linkedin");
  if (linkedinEl) linkedinEl.href = links.linkedin;
  const githubEl = document.getElementById("social-link-github");
  if (githubEl) githubEl.href = links.github;
  const emailEl = document.getElementById("social-link-email");
  if (emailEl) emailEl.href = `mailto:${links.email}`;
  const whatsappEl = document.getElementById("social-link-whatsapp");
  if (whatsappEl) whatsappEl.href = links.whatsapp;
}

function renderAboutSection() {
  document.getElementById("about-biography-text").innerText = portfolioData.personalInfo.bio;
  const philEl = document.getElementById("about-philosophy-text");
  if (philEl) {
    philEl.innerText = portfolioData.personalInfo.aboutMe;
  }
  const strengthsContainer = document.getElementById("about-strengths-list");
  strengthsContainer.innerHTML = "";
  portfolioData.personalInfo.coreStrengths.forEach(str => {
    const li = document.createElement("li");
    li.className = "about-list-item";
    li.innerHTML = `<i data-lucide="check-circle" class="priority-check-icon"></i><span>${str}</span>`;
    strengthsContainer.appendChild(li);
  });
}

function renderMetrics() {
  const container = document.getElementById("metrics-counter-container");
  container.innerHTML = "";

  portfolioData.metrics.forEach((metric, idx) => {
    const card = document.createElement("div");
    const staggerClass = `reveal-stagger-${(idx % 4) + 1}`;
    card.className = `metric-card glass-panel reveal-on-scroll ${staggerClass}`;
    card.innerHTML = `
      <span class="metric-counter" id="counter-${idx}" data-target="${metric.value}" data-suffix="${metric.suffix}">0</span>
      <span class="metric-label">${metric.label}</span>
    `;
    container.appendChild(card);
  });
}

// Trigger metric counters and progress bars when visible
function setupScrollObserver() {
  const counters = document.querySelectorAll(".metric-counter");
  const options = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counterEl = entry.target;
        const target = parseFloat(counterEl.getAttribute("data-target"));
        const suffix = counterEl.getAttribute("data-suffix");
        animateCounter(counterEl, target, suffix);
        observer.unobserve(counterEl);
      }
    });
  }, options);

  counters.forEach(counter => observer.observe(counter));

  // Connect active section state highlighting on scroll
  const sections = document.querySelectorAll(".content-section");
  const navLinks = document.querySelectorAll(".nav-link");

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: "-80px 0px -40px 0px" });

  sections.forEach(section => sectionObserver.observe(section));

  // Observe Skill bars container to slide load ranges
  const skillsWrap = document.getElementById("skills-clusters-container");
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggerSkillAnimations();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  if (skillsWrap) skillsObserver.observe(skillsWrap);
}

function animateCounter(element, target, suffix) {
  let count = 0;
  const duration = 1200; // ms
  const frameRate = 1000 / 60; // 60 FPS
  const totalFrames = Math.round(duration / frameRate);
  let frame = 0;

  const increment = target / totalFrames;

  const timer = setInterval(() => {
    frame++;
    count += increment;

    if (frame >= totalFrames) {
      clearInterval(timer);
      element.innerText = formatCounterValue(target, suffix);
    } else {
      element.innerText = formatCounterValue(count, suffix);
    }
  }, frameRate);
}

function formatCounterValue(val, suffix) {
  if (suffix === "%") {
    return val.toFixed(3) + suffix;
  }
  if (val >= 1000) {
    return Math.floor(val / 1000) + "k" + suffix;
  }
  return Math.floor(val) + suffix;
}

function renderSkills() {
  const container = document.getElementById("skills-clusters-container");
  container.innerHTML = "";

  portfolioData.skills.forEach((cat, idx) => {
    const card = document.createElement("div");
    const staggerClass = `reveal-stagger-${(idx % 4) + 1}`;
    card.className = `skills-category-card glass-panel reveal-on-scroll ${staggerClass}`;
    card.innerHTML = `
      <h3 class="about-subtitle"><i data-lucide="tag" style="width:14px; height:14px; vertical-align:-1px; margin-right:4px;"></i> ${cat.category}</h3>
      <div class="skills-list">
        ${cat.items.map(item => `
          <div class="skill-row">
            <div class="skill-info">
              <span class="skill-name-label"><i data-lucide="${item.icon}"></i> ${item.name}</span>
              <span class="skill-percentage">${item.level}%</span>
            </div>
            <div class="skill-progress-bar-bg">
              <div class="skill-progress-bar-fill" data-level="${item.level}"></div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    container.appendChild(card);
  });
}

function triggerSkillAnimations() {
  const fills = document.querySelectorAll(".skill-progress-bar-fill");
  fills.forEach(fill => {
    const lvl = fill.getAttribute("data-level");
    fill.style.width = `${lvl}%`;
  });
}

function renderProjects(filterValue) {
  const container = document.getElementById("projects-list-container");
  container.innerHTML = "";

  const filtered = filterValue === "all"
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filterValue);

  filtered.forEach((p, idx) => {
    const card = document.createElement("div");
    const staggerClass = `reveal-stagger-${(idx % 4) + 1}`;
    card.className = `project-card glass-panel reveal-on-scroll ${staggerClass}`;
    card.innerHTML = `
      <span class="project-category-tag">${p.category}</span>
      <h3 class="project-title">${p.name}</h3>
      <p class="project-desc">${p.description}</p>
      <div class="project-tools-wrap">
        ${p.tools.slice(0, 5).map(t => `<span class="project-tool-tag">${t}</span>`).join("")}
        ${p.tools.length > 5 ? `<span class="project-tool-tag">+${p.tools.length - 5}</span>` : ""}
      </div>
      <div class="project-card-footer">
        <span class="project-card-link" onclick="openProjectModal('${p.id}')">Explore Details <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i></span>
      </div>
    `;
    container.appendChild(card);
  });

  lucide.createIcons();
  if (typeof initScrollReveal === "function") {
    initScrollReveal();
  }
}

function setupProjectFilters() {
  const btns = document.querySelectorAll("#project-filters-wrap .filter-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderProjects(filter);
    });
  });
}

// Architecture Tab Control System
let activeArchTab = "iis-hosting";
function renderArchitectureTabs() {
  const nav = document.getElementById("arch-tabs-nav");
  if (!nav) return;
  nav.innerHTML = "";

  portfolioData.architectures.forEach(arch => {
    const btn = document.createElement("button");
    btn.className = `arch-tab-btn ${arch.id === activeArchTab ? "active" : ""}`;
    btn.innerHTML = `<span>${arch.title}</span> <i data-lucide="chevron-right" style="width:14px; height:14px;"></i>`;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".arch-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeArchTab = arch.id;
      loadArchitectureView(arch);
      resetArchitectureAutoRotation();
    });
    nav.appendChild(btn);
  });

  // Load default tab
  const activeArch = portfolioData.architectures.find(a => a.id === activeArchTab);
  if (activeArch) loadArchitectureView(activeArch);

  lucide.createIcons();
}

function loadArchitectureView(arch) {
  document.getElementById("arch-description-text").innerText = arch.description;

  // Render Tech Stack
  const stackContainer = document.getElementById("arch-tech-stack");
  if (stackContainer) {
    stackContainer.innerHTML = "";
    if (arch.technologies) {
      arch.technologies.forEach(tech => {
        const tag = document.createElement("span");
        tag.className = "project-tool-tag";
        tag.innerText = tech;
        stackContainer.appendChild(tag);
      });
    }
  }

  // Render Responsibilities
  const respEl = document.getElementById("arch-responsibilities");
  if (respEl) respEl.innerText = arch.responsibilities || "";

  // Render Business Purpose
  const purpEl = document.getElementById("arch-purpose");
  if (purpEl) purpEl.innerText = arch.purpose || "";

  // Render Operational Notes
  const notesEl = document.getElementById("arch-notes");
  if (notesEl) notesEl.innerText = arch.operationalNotes || "";

  const canvas = document.getElementById("arch-drawing-canvas");
  canvas.innerHTML = "";

  // Generate beautiful custom animated vector inline SVG
  const svgStr = generateSVGDiagram(arch.type);
  canvas.innerHTML = svgStr;
  
  lucide.createIcons();
}

// Generate animated SVGs in JS to avoid asset loading dependency
function generateSVGDiagram(type) {
  let svg = "";
  
  // Official SVG Tech Logo Assets
  const logos = {
    nginx: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2L2 12l10 10 10-10L12 2zm-1.8 14.5H8.6V9.4h1.6v7.1zm5.2 0h-1.6l-3.2-4.9v4.9H9V9.4h1.6l3.2 4.9V9.4h1.6v7.1z" fill="#009639"/></svg>`,
    docker: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M13.983 11.078h2.119v-2.006h-2.119v2.006zm-2.817 0h2.119v-2.006h-2.119v2.006zm-2.787 0h2.119v-2.006h-2.119v2.006zm-2.817 0h2.119v-2.006h-2.119v2.006zm-2.817 0h2.12v-2.006h-2.12v2.006zm11.238-2.684h2.119V6.388h-2.119v2.006zm-2.817 0h2.119V6.388h-2.119v2.006zm-2.787 0h2.119V6.388h-2.119v2.006zm-2.817 0h2.119V6.388h-2.119v2.006zm14.025.678c-.287.054-.537.156-.75.309a4.83 4.83 0 0 0-.256-.474 4.545 4.545 0 0 0-.585-.77c-.506-.525-1.127-.852-1.85-.975v-.868H2.186v6.02h18.232c.594-.21 1.053-.559 1.378-1.045.326-.486.488-1.07.488-1.75 0-.295-.084-.664-.251-1.106-.168-.442-.429-.691-.784-.747z" fill="#2496ED"/></svg>`,
    iis: `<svg viewBox="0 0 24 24" width="22" height="22"><rect x="2" y="2" width="20" height="20" rx="4" fill="#0078d4" opacity="0.85"/><rect x="5" y="6" width="14" height="3" fill="#ffffff"/><rect x="5" y="11" width="14" height="3" fill="#ffffff"/><rect x="5" y="16" width="14" height="3" fill="#ffffff"/></svg>`,
    dotnet: `<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="10" fill="#512bd4"/><path d="M7 12h10" stroke="#ffffff" stroke-width="2"/></svg>`,
    prometheus: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2C8 6 6 9 6 12s3 6 6 6 6-3 6-6-2-6-6-10z" fill="#e6522c"/></svg>`,
    grafana: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2L2 22h20L12 2z" fill="#f47a20"/><circle cx="12" cy="14" r="4" fill="#ffffff"/></svg>`,
    git: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M19 13.5a2.5 2.5 0 0 0-2.06 1.09l-4.53-2.27a2.5 2.5 0 0 0 0-1.64l4.53-2.27a2.5 2.5 0 1 0-.9-.79l-4.52 2.26a2.5 2.5 0 1 0 0 3.32l4.52 2.26c.21-.49.59-.88 1.06-1.12a2.5 2.5 0 1 0 1.43-.87z" fill="#F05032"/></svg>`,
    github: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" fill="#f0f6fc"/></svg>`,
    azure: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M0 8.5l6.5-6.5h7.5l-5.5 5.5 5.5 5.5h-7.5z" fill="#0078D4"/></svg>`,
    ubuntu: `<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="10" fill="#e95420"/><circle cx="12" cy="12" r="5" fill="#ffffff"/><circle cx="12" cy="6" r="2" fill="#e95420"/><circle cx="6" cy="15" r="2" fill="#e95420"/><circle cx="18" cy="15" r="2" fill="#e95420"/></svg>`,
    golang: `<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="10" fill="#00ADD8"/><text x="12" y="16" font-family="sans-serif" font-weight="bold" font-size="11" fill="#ffffff" text-anchor="middle">Go</text></svg>`,
    db: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2C6.5 2 2 4 2 6.5s4.5 4.5 10 4.5 10-2 10-4.5S17.5 2 12 2zm0 6c-5 0-8-1.5-8-2.5s3-2.5 8-2.5 8 1.5 8 2.5-3 2.5-8 2.5z" fill="#00a2ed"/><path d="M2 6.5v5c0 2.5 4.5 4.5 10 4.5s10-2 10-4.5v-5" fill="none" stroke="#00a2ed" stroke-width="1.5"/><path d="M2 11.5v5c0 2.5 4.5 4.5 10 4.5s10-2 10-4.5v-5" fill="none" stroke="#00a2ed" stroke-width="1.5"/></svg>`,
    client: `<svg viewBox="0 0 24 24" width="22" height="22"><rect x="2" y="3" width="20" height="13" rx="2" fill="none" stroke="#06b6d4" stroke-width="2"/><path d="M12 16v4M8 20h8" stroke="#06b6d4" stroke-width="2"/></svg>`
  };

  if (type === "iis") {
    svg = `
    <svg viewBox="0 0 720 220" width="100%" height="100%">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
        </marker>
      </defs>
      
      <!-- Connectors with flows -->
      <path d="M 85 110 L 105 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 190 110 L 210 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 295 110 L 315 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 400 110 L 420 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 505 110 L 525 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 610 110 L 630 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      
      <!-- Nodes -->
      <g class="node-group">
        <rect x="5" y="80" width="80" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="34" y="86" width="22" height="22">${logos.client}</foreignObject>
        <text x="45" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Users</text>
        <text x="45" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Ingress Source</text>
      </g>
      
      <g class="node-group">
        <rect x="105" y="80" width="85" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="136" y="86" width="22" height="22">${logos.nginx}</foreignObject>
        <text x="147" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">NGINX</text>
        <text x="147" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Load Balancer</text>
      </g>
      
      <g class="node-group">
        <rect x="210" y="80" width="85" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="241" y="86" width="22" height="22">${logos.nginx}</foreignObject>
        <text x="252" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Rev Proxy</text>
        <text x="252" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Routing Edge</text>
      </g>
      
      <g class="node-group">
        <rect x="315" y="80" width="85" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="346" y="86" width="22" height="22">${logos.iis}</foreignObject>
        <text x="357" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">IIS Server</text>
        <text x="357" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Web Host</text>
      </g>
      
      <g class="node-group">
        <rect x="420" y="80" width="85" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="451" y="86" width="22" height="22">${logos.dotnet}</foreignObject>
        <text x="462" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">ASP.NET</text>
        <text x="462" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Application</text>
      </g>
      
      <g class="node-group">
        <rect x="525" y="80" width="85" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="556" y="86" width="22" height="22">${logos.db}</foreignObject>
        <text x="567" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">SQL DB</text>
        <text x="567" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Database</text>
      </g>

      <g class="node-group">
        <rect x="630" y="80" width="85" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="661" y="86" width="22" height="22">${logos.prometheus}</foreignObject>
        <text x="672" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Prometheus</text>
        <text x="672" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Metrics Collector</text>
      </g>
    </svg>
    `;
  } else if (type === "docker") {
    svg = `
    <svg viewBox="0 0 620 220" width="100%" height="100%">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
        </marker>
      </defs>
      
      <!-- Connectors -->
      <path d="M 85 110 L 105 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 190 110 L 210 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 295 110 L 315 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 400 110 L 420 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 505 110 L 525 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      
      <!-- Nodes -->
      <g class="node-group">
        <rect x="5" y="80" width="80" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="33" y="86" width="22" height="22">${logos.client}</foreignObject>
        <text x="45" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Client</text>
        <text x="45" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Request Source</text>
      </g>
      
      <g class="node-group">
        <rect x="105" y="80" width="85" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="136" y="86" width="22" height="22">${logos.nginx}</foreignObject>
        <text x="147" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">NGINX</text>
        <text x="147" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Ingress Proxy</text>
      </g>
      
      <g class="node-group">
        <rect x="210" y="80" width="85" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="241" y="86" width="22" height="22">${logos.docker}</foreignObject>
        <text x="252" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Docker</text>
        <text x="252" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">API Container</text>
      </g>
      
      <g class="node-group">
        <rect x="315" y="80" width="85" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="346" y="86" width="22" height="22">${logos.ubuntu}</foreignObject>
        <text x="357" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Ubuntu</text>
        <text x="357" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Host Platform</text>
      </g>
      
      <g class="node-group">
        <rect x="420" y="80" width="85" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="451" y="86" width="22" height="22">${logos.golang}</foreignObject>
        <text x="462" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Go Service</text>
        <text x="462" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Integration Hub</text>
      </g>
      
      <g class="node-group">
        <rect x="525" y="80" width="90" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="559" y="86" width="22" height="22">${logos.client}</foreignObject>
        <text x="570" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">External APIs</text>
        <text x="570" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Endpoints</text>
      </g>
    </svg>
    `;
  } else if (type === "monitoring") {
    svg = `
    <svg viewBox="0 0 520 220" width="100%" height="100%">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
        </marker>
      </defs>
      
      <!-- Connectors -->
      <path d="M 85 110 L 105 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 190 110 L 210 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 295 110 L 315 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 400 110 L 420 110" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      
      <!-- Nodes -->
      <g class="node-group">
        <rect x="5" y="80" width="80" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="34" y="86" width="22" height="22">${logos.iis}</foreignObject>
        <text x="45" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Win Exporter</text>
        <text x="45" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Host Metrics</text>
      </g>
      
      <g class="node-group">
        <rect x="105" y="80" width="85" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="136" y="86" width="22" height="22">${logos.prometheus}</foreignObject>
        <text x="147" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Prometheus</text>
        <text x="147" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Database</text>
      </g>
      
      <g class="node-group">
        <rect x="210" y="80" width="85" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="241" y="86" width="22" height="22">${logos.grafana}</foreignObject>
        <text x="252" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Grafana</text>
        <text x="252" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Observability Panel</text>
      </g>
      
      <g class="node-group">
        <rect x="315" y="80" width="85" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="346" y="86" width="22" height="22">${logos.prometheus}</foreignObject>
        <text x="357" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Alert Manager</text>
        <text x="357" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Incident Dispatch</text>
      </g>
      
      <g class="node-group">
        <rect x="420" y="80" width="95" height="60" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="456" y="86" width="22" height="22">${logos.client}</foreignObject>
        <text x="467" y="125" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Ops Team</text>
        <text x="467" y="133" text-anchor="middle" font-size="5.5" fill="#94a3b8">Active Responders</text>
      </g>
    </svg>
    `;
  } else if (type === "pipeline") {
    svg = `
    <svg viewBox="0 0 650 300" width="100%" height="100%">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
        </marker>
      </defs>
      
      <!-- Connectors Row 1 -->
      <path d="M 125 55 L 165 55" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 265 55 L 305 55" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 405 55 L 445 55" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      
      <!-- Serpentine connector down to Row 2 -->
      <path d="M 500 80 L 500 115" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      
      <!-- Connectors Row 2 -->
      <path d="M 445 140 L 405 140" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 305 140 L 265 140" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 165 140 L 125 140" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      
      <!-- Serpentine connector down to Row 3 -->
      <path d="M 75 165 L 75 200" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      
      <!-- Connectors Row 3 -->
      <path d="M 125 225 L 165 225" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 265 225 L 305 225" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 405 225 L 445 225" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      
      <!-- Layer Labels -->
      <text x="25" y="20" font-size="7" fill="#38bdf8" font-weight="bold" font-family="monospace">DEVELOPMENT STAGE</text>
      <text x="530" y="110" font-size="7" fill="#38bdf8" font-weight="bold" font-family="monospace">CI/CD BUILD</text>
      <text x="25" y="195" font-size="7" fill="#38bdf8" font-weight="bold" font-family="monospace">PROD ROLLOUT</text>

      <!-- Row 1 Nodes -->
      <g class="node-group">
        <rect x="25" y="30" width="100" height="50" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="64" y="36" width="22" height="22">${logos.client}</foreignObject>
        <text x="75" y="71" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Developer</text>
      </g>
      
      <g class="node-group">
        <rect x="165" y="30" width="100" height="50" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="204" y="36" width="22" height="22">${logos.git}</foreignObject>
        <text x="215" y="71" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Git Commit</text>
      </g>
      
      <g class="node-group">
        <rect x="305" y="30" width="100" height="50" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="344" y="36" width="22" height="22">${logos.github}</foreignObject>
        <text x="355" y="71" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">GitHub Repo</text>
      </g>
      
      <g class="node-group">
        <rect x="445" y="30" width="110" height="50" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="489" y="36" width="22" height="22">${logos.azure}</foreignObject>
        <text x="500" y="71" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Azure Pipelines</text>
      </g>

      <!-- Row 2 Nodes -->
      <g class="node-group">
        <rect x="445" y="115" width="110" height="50" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="489" y="121" width="22" height="22">${logos.dotnet}</foreignObject>
        <text x="500" y="156" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Dotnet Build</text>
      </g>
      
      <g class="node-group">
        <rect x="305" y="115" width="100" height="50" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="344" y="121" width="22" height="22">${logos.dotnet}</foreignObject>
        <text x="355" y="156" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Code Validation</text>
      </g>
      
      <g class="node-group">
        <rect x="165" y="115" width="100" height="50" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="204" y="121" width="22" height="22">${logos.db}</foreignObject>
        <text x="215" y="156" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Build Artifact</text>
      </g>
      
      <g class="node-group">
        <rect x="25" y="115" width="100" height="50" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="64" y="121" width="22" height="22">${logos.azure}</foreignObject>
        <text x="75" y="156" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Deployment</text>
      </g>

      <!-- Row 3 Nodes -->
      <g class="node-group">
        <rect x="25" y="200" width="100" height="50" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="64" y="206" width="22" height="22">${logos.iis}</foreignObject>
        <text x="75" y="241" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">IIS Server</text>
      </g>
      
      <g class="node-group">
        <rect x="165" y="200" width="100" height="50" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="204" y="206" width="22" height="22">${logos.iis}</foreignObject>
        <text x="215" y="241" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Production Web</text>
      </g>
      
      <g class="node-group">
        <rect x="305" y="200" width="100" height="50" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="344" y="206" width="22" height="22">${logos.prometheus}</foreignObject>
        <text x="355" y="241" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Prom Metrics</text>
      </g>
      
      <g class="node-group">
        <rect x="445" y="200" width="110" height="50" rx="6" fill="rgba(30, 41, 59, 0.6)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <foreignObject x="489" y="206" width="22" height="22">${logos.grafana}</foreignObject>
        <text x="500" y="241" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="bold">Grafana Monitor</text>
      </g>
    </svg>
    `;
  }
  return svg;
}

function renderTimeline() {
  const container = document.getElementById("experience-timeline-container");
  container.innerHTML = "";

  portfolioData.experience.forEach((exp, idx) => {
    const item = document.createElement("div");
    const staggerClass = `reveal-stagger-${(idx % 2) + 1}`;
    item.className = `timeline-item reveal-on-scroll ${staggerClass}`;
    item.innerHTML = `
      <div class="timeline-bullet"></div>
      <div class="timeline-card glass-panel">
        <div class="timeline-header-row">
          <div class="timeline-role-info">
            <span class="timeline-company">${exp.company}</span>
            <h3 class="timeline-role">${exp.role}</h3>
          </div>
          <span class="timeline-duration">${exp.duration}</span>
        </div>
        
        <h4 class="timeline-section-title">Core Operations</h4>
        <ul class="timeline-bullets">
          ${exp.responsibilities.map(r => `<li>${r}</li>`).join("")}
        </ul>

        <h4 class="timeline-section-title">Operational Impact</h4>
        <ul class="timeline-bullets">
          ${exp.achievements.map(a => `<li>${a}</li>`).join("")}
        </ul>

        <div class="timeline-impact-card">
          <span>Enterprise Impact:</span> ${exp.businessImpact}
        </div>
        
        <div class="project-tools-wrap" style="margin-top:6px;">
          ${exp.tools.map(t => `<span class="project-tool-tag">${t}</span>`).join("")}
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderAchievements() {
  const container = document.getElementById("achievements-card-scroller");
  container.innerHTML = "";

  portfolioData.achievements.forEach((ach, idx) => {
    const card = document.createElement("div");
    const staggerClass = `reveal-stagger-${(idx % 4) + 1}`;
    card.className = `achievement-glass-card glass-panel reveal-on-scroll ${staggerClass}`;
    card.innerHTML = `
      <div class="achievement-icon-row">
        <div class="achievement-icon-circle"><i data-lucide="${ach.icon}"></i></div>
        <span class="achievement-metric-pill">${ach.metric}</span>
      </div>
      <h3 class="achievement-card-title">${ach.title}</h3>
      <p class="achievement-card-desc">${ach.description}</p>
    `;
    container.appendChild(card);
  });
}

function renderCertifications() {
  const container = document.getElementById("certifications-list-container");
  if (!container) return;
  container.innerHTML = "";

  portfolioData.certifications.forEach((cert, idx) => {
    const card = document.createElement("div");
    const staggerClass = `reveal-stagger-${(idx % 4) + 1}`;
    card.className = `certification-card glass-panel reveal-on-scroll ${staggerClass}`;

    card.innerHTML = `
      <div class="cert-icon-container"><i data-lucide="${cert.icon}"></i></div>
      <div class="cert-details">
        <h3 class="cert-name">${cert.name}</h3>
        <span class="cert-meta">${cert.issuer}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderBlogs() {
  const container = document.getElementById("blogs-list-container");
  container.innerHTML = "";

  portfolioData.blogs.forEach((blog, idx) => {
    const card = document.createElement("div");
    const staggerClass = `reveal-stagger-${(idx % 4) + 1}`;
    card.className = `blog-card glass-panel reveal-on-scroll ${staggerClass}`;
    card.addEventListener("click", () => openBlogModal(blog.id));
    card.innerHTML = `
      <div class="blog-meta-row">
        <span class="blog-category-label">${blog.category}</span>
        <span>${blog.date} &bull; ${blog.readTime}</span>
      </div>
      <h3 class="blog-title">${blog.title}</h3>
      <p class="blog-summary">${blog.summary}</p>
      <span class="blog-read-more">Deploy Markdown <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i></span>
    `;
    container.appendChild(card);
  });

  lucide.createIcons();
}

/* Resume sections removed completely */

// Hero, Highlights, Core Focus, and Contact Cards rotators and builders
function initHeroRotator() {
  const summaryEl = document.getElementById("hero-summary-label");
  if (!summaryEl) return;
  const terms = [
    "Production Engineering",
    "DevOps",
    "Site Reliability",
    "Cloud Operations",
    "Monitoring",
    "Observability",
    "Automation",
    "CI/CD",
    "Containerization",
    "Application Engineering"
  ];
  let termIndex = 0;
  summaryEl.style.transition = "opacity 0.4s ease-in-out";
  setInterval(() => {
    summaryEl.style.opacity = 0;
    setTimeout(() => {
      summaryEl.innerText = terms[termIndex];
      summaryEl.style.opacity = 1;
      termIndex = (termIndex + 1) % terms.length;
    }, 400);
  }, 3000);
  summaryEl.innerText = terms[0];
}

let archRotationTimer = null;
let isArchHovered = false;
function initArchitectureAutoRotation() {
  if (archRotationTimer) clearInterval(archRotationTimer);
  
  // Attach hover listeners to pause/resume auto rotation
  const containerEl = document.querySelector(".architecture-tabs-container");
  if (containerEl && !containerEl.dataset.hoverBound) {
    containerEl.dataset.hoverBound = "true";
    containerEl.addEventListener("mouseenter", () => {
      isArchHovered = true;
    });
    containerEl.addEventListener("mouseleave", () => {
      isArchHovered = false;
    });
  }

  archRotationTimer = setInterval(() => {
    if (isArchHovered) return; // Pause while hovered
    const architectures = portfolioData.architectures;
    if (!architectures || architectures.length === 0) return;
    const currentIndex = architectures.findIndex(a => a.id === activeArchTab);
    const nextIndex = (currentIndex + 1) % architectures.length;
    const nextArch = architectures[nextIndex];
    activeArchTab = nextArch.id;
    
    const buttons = document.querySelectorAll(".arch-tab-btn");
    buttons.forEach((btn, idx) => {
      if (idx === nextIndex) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    loadArchitectureView(nextArch);
  }, 7000); // Rotate every 7 seconds
}

function resetArchitectureAutoRotation() {
  initArchitectureAutoRotation();
}

function renderOperationalHighlights() {
  const container = document.getElementById("operational-highlights-container");
  if (!container) return;
  container.innerHTML = "";
  if (portfolioData.operationalHighlights) {
    portfolioData.operationalHighlights.forEach((highlight, idx) => {
      const card = document.createElement("div");
      const staggerClass = `reveal-stagger-${(idx % 4) + 1}`;
      card.className = `highlight-card glass-panel reveal-on-scroll ${staggerClass}`;
      card.innerHTML = `
        <div class="highlight-icon-box">
          <i data-lucide="check-circle-2" style="color: var(--status-ok);"></i>
        </div>
        <div class="highlight-content">
          <h4 class="highlight-title">${highlight.title}</h4>
          <p class="highlight-desc">${highlight.description}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }
}

function renderCoreFocus() {
  const container = document.getElementById("core-focus-container");
  if (!container) return;
  container.innerHTML = "";

  const focusData = portfolioData.coreFocus;
  if (!focusData) return;

  const appCard = document.createElement("div");
  appCard.className = "core-focus-card glass-panel reveal-on-scroll reveal-stagger-1";
  appCard.innerHTML = `
    <h3 class="about-subtitle"><i data-lucide="server" style="color: #06b6d4; vertical-align:middle; margin-right:6px;"></i> Application Engineering</h3>
    <ul class="focus-list" style="list-style:none; padding:0; margin-top:15px; display:flex; flex-direction:column; gap:10px;">
      ${focusData.applicationEngineering.map(item => `
        <li style="display:flex; align-items:center; gap:8px; font-size:0.9rem; color:var(--text-secondary);">
          <i data-lucide="check" style="width:16px; height:16px; color:#10b981;"></i> <span>${item}</span>
        </li>
      `).join("")}
    </ul>
  `;
  container.appendChild(appCard);

  const sysCard = document.createElement("div");
  sysCard.className = "core-focus-card glass-panel reveal-on-scroll reveal-stagger-2";
  sysCard.innerHTML = `
    <h3 class="about-subtitle"><i data-lucide="cpu" style="color: #6366f1; vertical-align:middle; margin-right:6px;"></i> System Engineering</h3>
    <ul class="focus-list" style="list-style:none; padding:0; margin-top:15px; display:flex; flex-direction:column; gap:10px;">
      ${focusData.systemEngineering.map(item => `
        <li style="display:flex; align-items:center; gap:8px; font-size:0.9rem; color:var(--text-secondary);">
          <i data-lucide="check" style="width:16px; height:16px; color:#10b981;"></i> <span>${item}</span>
        </li>
      `).join("")}
    </ul>
  `;
  container.appendChild(sysCard);
}

function renderContactCards() {
  const container = document.getElementById("contact-cards-container");
  if (!container) return;
  container.innerHTML = "";

  const links = portfolioData.personalInfo.socialLinks;
  const contacts = [
    {
      name: "LinkedIn",
      desc: "Professional Network",
      sub: "Connect professionally",
      url: links.linkedin,
      icon: `<svg viewBox="0 0 24 24" class="contact-svg-icon" fill="currentColor" style="width:28px; height:28px;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
    },
    {
      name: "GitHub",
      desc: "Code Repositories",
      sub: "Explore technical contributions",
      url: links.github,
      icon: `<svg viewBox="0 0 24 24" class="contact-svg-icon" fill="currentColor" style="width:28px; height:28px;"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
    },
    {
      name: "Email",
      desc: "Direct Communication",
      sub: "Send an email inquiry",
      url: `mailto:${links.email}`,
      icon: `<svg viewBox="0 0 24 24" class="contact-svg-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:28px; height:28px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
    },
    {
      name: "WhatsApp",
      desc: "Instant Messaging",
      sub: "Chat directly in real-time",
      url: links.whatsapp,
      icon: `<svg viewBox="0 0 24 24" class="contact-svg-icon" fill="currentColor" style="width:28px; height:28px;"><path d="M12.004 0c-6.627 0-12 5.373-12 12 0 2.115.549 4.102 1.511 5.838l-1.603 5.854 5.998-1.573c1.7.925 3.633 1.45 5.681 1.45 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm6.757 16.915c-.256.721-1.5 1.411-2.072 1.503-.497.08-1.149.141-3.23-.718-2.663-1.098-4.341-3.803-4.475-3.982-.132-.178-1.077-1.431-1.077-2.729 0-1.298.675-1.936.916-2.195.242-.259.525-.325.7-.325.176 0 .351.001.504.009.162.008.38-.06.593.456.219.531.751 1.834.815 1.967.065.132.108.286.02.46-.088.176-.132.285-.263.438-.131.152-.276.34-.393.456-.132.128-.27.268-.117.531.152.263.676 1.114 1.45 1.804.996.889 1.835 1.164 2.098 1.296.263.132.416.11.57-.066.154-.176.658-.767.834-1.029.176-.263.351-.219.593-.131.242.088 1.534.723 1.798.855.263.132.438.197.504.307.066.11.066.635-.19 1.356z"/></svg>`
    }
  ];

  contacts.forEach((c, idx) => {
    const card = document.createElement("a");
    card.href = c.url;
    card.target = "_blank";
    const staggerClass = `reveal-stagger-${(idx % 4) + 1}`;
    card.className = `contact-glass-card glass-panel reveal-on-scroll ${staggerClass}`;
    card.innerHTML = `
      <div>
        <div class="contact-card-icon" style="color: #38bdf8; margin-bottom: 16px; display: inline-block;">${c.icon}</div>
        <h3 class="contact-card-name" style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">${c.name}</h3>
        <p class="contact-card-desc" style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">${c.desc}</p>
        <span class="contact-card-value" style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 16px;">${c.sub}</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: flex-end; color: #38bdf8; font-weight: 600; font-size: 1.1rem;">
        <span>→</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// Contact form validators
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("form-name");
    const emailInput = document.getElementById("form-email");
    const companyInput = document.getElementById("form-company");
    const phoneInput = document.getElementById("form-phone");
    const messageInput = document.getElementById("form-message");

    let isValid = true;

    // Reset validations
    resetFormErrors();

    if (!nameInput.value.trim()) {
      showInputError(nameInput, "name-error");
      isValid = false;
    }

    if (!validateEmail(emailInput.value.trim())) {
      showInputError(emailInput, "email-error");
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      showInputError(messageInput, "message-error");
      isValid = false;
    }

    if (isValid) {
      const msgObj = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        company: companyInput.value.trim(),
        phone: phoneInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      const updatedMessages = [...appState.messages, msgObj];
      saveState("messages", updatedMessages);

      showToast("Telemetry dispatched to core coordinator.");
      form.reset();
    }
  });
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

function showInputError(inputEl, errorId) {
  inputEl.classList.add("invalid");
  document.getElementById(errorId).style.display = "block";
}

function resetFormErrors() {
  document.querySelectorAll(".form-input").forEach(i => i.classList.remove("invalid"));
  document.querySelectorAll(".form-error-msg").forEach(m => m.style.display = "none");
}

function showToast(text) {
  const toast = document.getElementById("toast-msg-container");
  const msgEl = document.getElementById("toast-msg-text");
  msgEl.innerText = text;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Modal handling logic
function setupModals() {
  const closeProject = document.getElementById("project-modal-close");
  const projectOverlay = document.getElementById("project-modal");

  closeProject.addEventListener("click", () => {
    projectOverlay.classList.remove("open");
  });

  const closeBlog = document.getElementById("blog-modal-close");
  const blogOverlay = document.getElementById("blog-modal");

  closeBlog.addEventListener("click", () => {
    blogOverlay.classList.remove("open");
  });

  const closeZoom = document.getElementById("zoom-modal-close");
  const zoomOverlay = document.getElementById("zoom-modal");
  closeZoom.addEventListener("click", () => {
    zoomOverlay.classList.remove("open");
  });

  // Close overlays on clicking background
  window.addEventListener("click", (e) => {
    if (e.target === projectOverlay) projectOverlay.classList.remove("open");
    if (e.target === blogOverlay) blogOverlay.classList.remove("open");
    if (e.target === zoomOverlay) zoomOverlay.classList.remove("open");
  });
}

// Open and load Project Case study Details
window.openProjectModal = function (projectId) {
  const p = portfolioData.projects.find(proj => proj.id === projectId);
  if (!p) return;

  document.getElementById("modal-project-category").innerText = p.category;
  document.getElementById("modal-project-title").innerText = p.name;
  document.getElementById("modal-project-description").innerText = p.description;
  document.getElementById("modal-project-problem").innerText = p.businessProblem;
  document.getElementById("modal-project-solution").innerText = p.solution;
  document.getElementById("modal-project-challenges").innerText = p.challenges;
  document.getElementById("modal-project-results").innerText = p.results;
  document.getElementById("modal-project-lessons").innerText = p.lessons;

  const toolsWrap = document.getElementById("modal-project-tools");
  toolsWrap.innerHTML = p.tools.map(t => `<span class="project-tool-tag">${t}</span>`).join("");

  document.getElementById("modal-project-github-btn").href = p.github;
  document.getElementById("modal-project-live-btn").href = p.liveDemo;

  document.getElementById("project-modal").classList.add("open");
  lucide.createIcons();
};

// Open and parse Markdown Blogs
window.openBlogModal = function (blogId) {
  const b = portfolioData.blogs.find(blog => blog.id === blogId);
  if (!b) return;

  document.getElementById("modal-blog-category").innerText = b.category;
  document.getElementById("modal-blog-date").innerText = `${b.date} &bull; ${b.readTime}`;
  document.getElementById("modal-blog-title").innerText = b.title;

  // Render Markdown contents using Marked library if available, else simple fallback
  const contentEl = document.getElementById("modal-blog-content");
  if (window.marked && window.marked.parse) {
    contentEl.innerHTML = marked.parse(b.content);
  } else {
    contentEl.innerText = b.content;
  }

  document.getElementById("blog-modal").classList.add("open");
};

/* openCertModal removed */;

// Setup Blueprint Zoom triggers
function setupBlueprintZoom() {
  const archZoomBtn = document.getElementById("arch-zoom-btn");
  const zoomOverlay = document.getElementById("zoom-modal");
  const zoomTitle = document.getElementById("zoom-modal-title");
  const zoomDesc = document.getElementById("zoom-modal-description");
  const zoomContainer = document.getElementById("zoom-canvas-container");

  if (!archZoomBtn) return;

  archZoomBtn.addEventListener("click", () => {
    const activeArch = portfolioData.architectures.find(a => a.id === activeArchTab);
    if (!activeArch) return;

    zoomTitle.innerHTML = `<i data-lucide="zoom-in"></i> Blueprint Magnifier: ${activeArch.title}`;
    zoomDesc.innerText = activeArch.description;
    zoomContainer.innerHTML = "";

    const svgStr = generateSVGDiagram(activeArch.type);
    zoomContainer.innerHTML = svgStr;

    currentZoomScale = 1;
    zoomContainer.style.transform = `scale(${currentZoomScale})`;

    zoomOverlay.classList.add("open");
    lucide.createIcons();
  });

  // Blueprint scale buttons
  let currentZoomScale = 1;
  document.getElementById("zoom-in-btn").addEventListener("click", () => {
    if (currentZoomScale < 3) {
      currentZoomScale += 0.25;
      zoomContainer.style.transform = `scale(${currentZoomScale})`;
    }
  });
  document.getElementById("zoom-out-btn").addEventListener("click", () => {
    if (currentZoomScale > 0.5) {
      currentZoomScale -= 0.25;
      zoomContainer.style.transform = `scale(${currentZoomScale})`;
    }
  });
  document.getElementById("zoom-reset-btn").addEventListener("click", () => {
    currentZoomScale = 1;
    zoomContainer.style.transform = `scale(${currentZoomScale})`;
  });

  // Make zoom container draggable & touch-pannable
  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;
  const zoomBody = document.querySelector(".zoom-modal-body");

  const dragStart = (x, y) => {
    isDragging = true;
    startX = x - zoomBody.offsetLeft;
    startY = y - zoomBody.offsetTop;
    scrollLeft = zoomBody.scrollLeft;
    scrollTop = zoomBody.scrollTop;
  };

  const dragEnd = () => {
    isDragging = false;
  };

  const dragMove = (x, y, event) => {
    if (!isDragging) return;
    if (event.cancelable) event.preventDefault();
    const currentX = x - zoomBody.offsetLeft;
    const currentY = y - zoomBody.offsetTop;
    const walkX = (currentX - startX) * 1.5;
    const walkY = (currentY - startY) * 1.5;
    zoomBody.scrollLeft = scrollLeft - walkX;
    zoomBody.scrollTop = scrollTop - walkY;
  };

  // Mouse events
  zoomBody.addEventListener("mousedown", (e) => dragStart(e.pageX, e.pageY));
  zoomBody.addEventListener("mouseleave", dragEnd);
  zoomBody.addEventListener("mouseup", dragEnd);
  zoomBody.addEventListener("mousemove", (e) => dragMove(e.pageX, e.pageY, e));

  // Touch events for mobile zooming/panning
  zoomBody.addEventListener("touchstart", (e) => {
    dragStart(e.touches[0].pageX, e.touches[0].pageY);
  }, { passive: true });
  zoomBody.addEventListener("touchend", dragEnd, { passive: true });
  zoomBody.addEventListener("touchmove", (e) => {
    dragMove(e.touches[0].pageX, e.touches[0].pageY, e);
  }, { passive: false });
}

// Global Scroll Reveal system trigger
function initScrollReveal() {
  document.querySelectorAll(".content-section").forEach(sec => {
    if (!sec.classList.contains("reveal-on-scroll")) {
      sec.classList.add("reveal-on-scroll");
    }
  });

  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  const options = {
    threshold: 0.08,
    rootMargin: "0px 0px -30px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  revealElements.forEach(el => observer.observe(el));
}

// Simulated Telemetry Connected Nodes Canvas Background
function initTelemetryParticles() {
  const canvas = document.getElementById("telemetry-particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  const maxParticles = 40;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 1;
      this.speedX = (Math.random() * 0.3 - 0.15);
      this.speedY = (Math.random() * 0.3 - 0.15);
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist/110) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// Heartbeat uptime decimal ticker
function initLiveUptimeTicker() {
  const ticker = document.getElementById("uptime-percentage-ticker");
  if (!ticker) return;

  let baseUptime = 99.99923;
  setInterval(() => {
    const fluctuation = (Math.random() * 0.00018 - 0.00009);
    const newUptime = Math.min(100.0, Math.max(99.99901, baseUptime + fluctuation));
    ticker.innerText = `${newUptime.toFixed(5)}% SLA`;
  }, 3500);
}

// Live telemetry log feed
function initRecruiterHubConsole() {
  const consoleEl = document.getElementById("sidebar-telemetry-console");
  if (!consoleEl) return;

  const mockLogs = [
    { type: "success", text: "IIS Application Pool Health Check Passed" },
    { type: "success", text: "Prometheus Metrics Collection Successful" },
    { type: "info", text: "Grafana Dashboard Sync Completed" },
    { type: "success", text: "Production Deployment Validation Successful" },
    { type: "success", text: "DR Environment Validation Completed" },
    { type: "warning", text: "High Memory Utilization Detected" },
    { type: "info", text: "Windows Exporter Metrics Updated" },
    { type: "success", text: "AWS Infrastructure Health Normal" },
    { type: "info", text: "GCP Service Monitoring Active" }
  ];

  let logIndex = 0;
  setInterval(() => {
    const log = mockLogs[Math.floor(Math.random() * mockLogs.length)];
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });

    const lineEl = document.createElement("span");
    lineEl.className = `log-line log-${log.type}`;
    lineEl.innerText = `[${time}] ${log.text}`;

    consoleEl.appendChild(lineEl);

    // maintain max 4 lines in logs terminal window
    while (consoleEl.children.length > 5) {
      consoleEl.removeChild(consoleEl.firstChild);
    }
  }, 4000);
}