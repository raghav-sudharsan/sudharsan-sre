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
  renderProjects("all");
  renderArchitectureTabs();
  renderTimeline();
  renderAchievements();
  renderCertifications();
  renderBlogs();
  renderResume("gui"); // Default to Visual
  renderTestimonials();

  // Setup Interactivity Listeners
  setupProjectFilters();
  setupContactForm();
  setupResumeControls();
  setupTestimonialsSlider();
  setupModals();
  setupScrollObserver();
  setupBlueprintZoom();

  // Initialize SRE Observability Dashboard animations
  initTelemetryParticles();
  initLiveUptimeTicker();
  initRecruiterHubConsole();

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

  const linkedinEl = document.getElementById("social-link-linkedin");
  if (linkedinEl) linkedinEl.href = portfolioData.personalInfo.socialLinks.linkedin;
  const githubEl = document.getElementById("social-link-github");
  if (githubEl) githubEl.href = portfolioData.personalInfo.socialLinks.github;
  const gitlabEl = document.getElementById("social-link-gitlab");
  if (gitlabEl) gitlabEl.href = portfolioData.personalInfo.socialLinks.gitlab;
  const mediumEl = document.getElementById("social-link-medium");
  if (mediumEl) mediumEl.href = portfolioData.personalInfo.socialLinks.medium;
}

function renderAboutSection() {
  document.getElementById("about-biography-text").innerText = portfolioData.personalInfo.bio;
  const strengthsContainer = document.getElementById("about-strengths-list");
  strengthsContainer.innerHTML = "";
  portfolioData.personalInfo.coreStrengths.forEach(str => {
    const li = document.createElement("li");
    li.className = "about-list-item";
    li.innerHTML = `<i data-lucide="check-circle"></i><span>${str}</span>`;
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
let activeArchTab = "system-architecture";
function renderArchitectureTabs() {
  const nav = document.getElementById("arch-tabs-nav");
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
  const canvas = document.getElementById("arch-drawing-canvas");
  canvas.innerHTML = "";

  // Generate beautiful custom animated vector inline SVG
  const svgStr = generateSVGDiagram(arch.type);
  canvas.innerHTML = svgStr;
}

// Generate animated SVGs in JS to avoid asset loading dependency
function generateSVGDiagram(type) {
  let svg = "";
  if (type === "iis") {
    svg = `
    <svg viewBox="0 0 500 250" width="100%" height="100%">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
        </marker>
      </defs>
      
      <!-- Paths with packet flows -->
      <path d="M 55 125 L 110 125" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 170 125 L 220 125" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 280 125 L 330 125" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 390 125 L 430 125" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
      
      <!-- Nodes -->
      <g class="node-group">
        <circle cx="35" cy="125" r="20" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" stroke-width="2" class="node-circle"/>
        <text x="35" y="128" text-anchor="middle" class="node-label">Users</text>
      </g>
      
      <g class="node-group">
        <rect x="110" y="100" width="60" height="50" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" stroke-width="2" class="node-circle"/>
        <text x="140" y="128" text-anchor="middle" class="node-label">LB</text>
      </g>

      <g class="node-group">
        <rect x="220" y="100" width="60" height="50" rx="6" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" stroke-width="2" class="node-circle"/>
        <text x="250" y="128" text-anchor="middle" class="node-label">IIS Server</text>
      </g>

      <g class="node-group">
        <rect x="330" y="100" width="60" height="50" rx="6" fill="rgba(20, 184, 166, 0.15)" stroke="#14b8a6" stroke-width="2" class="node-circle"/>
        <text x="360" y="128" text-anchor="middle" class="node-label">.NET App</text>
      </g>

      <g class="node-group">
        <circle cx="450" cy="125" r="20" fill="rgba(100, 116, 139, 0.15)" stroke="#64748b" stroke-width="2" class="node-circle"/>
        <text x="450" y="128" text-anchor="middle" class="node-label">Database</text>
      </g>
    </svg>
    `;
  } else if (type === "monitoring") {
    svg = `
    <svg viewBox="0 0 500 250" width="100%" height="100%">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
        </marker>
      </defs>
      
      <!-- Paths -->
      <path d="M 95 125 L 150 125" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 215 125 L 270 125" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 335 125 L 395 125" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 215 110 Q 307 75 400 112" fill="none" stroke="#ef4444" stroke-dasharray="4,4" stroke-width="1.5" marker-end="url(#arrow)"/>

      <!-- Nodes -->
      <g class="node-group">
        <rect x="25" y="100" width="70" height="50" rx="6" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" stroke-width="2" class="node-circle"/>
        <text x="60" y="128" text-anchor="middle" class="node-label">Win Exporter</text>
      </g>
      
      <g class="node-group">
        <rect x="150" y="100" width="65" height="50" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" stroke-width="2" class="node-circle"/>
        <text x="182" y="128" text-anchor="middle" class="node-label">Prometheus</text>
      </g>

      <g class="node-group">
        <rect x="270" y="100" width="65" height="50" rx="6" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" stroke-width="2" class="node-circle"/>
        <text x="302" y="128" text-anchor="middle" class="node-label">Grafana</text>
      </g>

      <g class="node-group">
        <circle cx="420" cy="125" r="20" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="2" class="node-circle"/>
        <text x="420" y="128" text-anchor="middle" class="node-label">Alerting</text>
      </g>
    </svg>
    `;
  } else if (type === "dr") {
    svg = `
    <svg viewBox="0 0 500 250" width="100%" height="100%">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
        </marker>
      </defs>

      <!-- Boundary Boxes for regions -->
      <rect x="20" y="50" width="170" height="150" rx="10" fill="none" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="30" y="66" fill="#06b6d4" font-size="9" font-family="monospace">Primary Env</text>

      <rect x="310" y="50" width="170" height="150" rx="10" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="320" y="66" fill="#f59e0b" font-size="9" font-family="monospace">DR Env</text>

      <!-- Replication path -->
      <path d="M 190 125 L 310 125" fill="none" stroke="#10b981" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arrow)" class="packet-flow"/>
      <text x="250" y="115" fill="#10b981" font-size="8" font-family="monospace" text-anchor="middle">Replication</text>

      <!-- Nodes -->
      <g class="node-group">
        <rect x="50" y="100" width="80" height="50" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" stroke-width="2" class="node-circle"/>
        <text x="90" y="128" text-anchor="middle" class="node-label">Production</text>
      </g>

      <g class="node-group">
        <rect x="340" y="100" width="80" height="50" rx="6" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" stroke-width="2" class="node-circle"/>
        <text x="380" y="128" text-anchor="middle" class="node-label">Recovery Node</text>
      </g>
    </svg>
    `;
  } else if (type === "deployment") {
    svg = `
    <svg viewBox="0 0 500 250" width="100%" height="100%">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
        </marker>
      </defs>

      <!-- Paths -->
      <path d="M 65 125 L 120 125" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 180 125 L 240 125" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 300 125 L 360 125" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 420 125 L 440 125" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
      <!-- Feedback Loop -->
      <path d="M 430 105 C 430 40, 30 40, 30 105" fill="none" stroke="#06b6d4" stroke-dasharray="5,5" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="230" y="55" fill="#06b6d4" font-size="8" font-family="monospace" text-anchor="middle">Continuous Feedback</text>

      <!-- Nodes -->
      <g class="node-group">
        <circle cx="35" cy="125" r="20" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" stroke-width="2" class="node-circle"/>
        <text x="35" y="128" text-anchor="middle" class="node-label">Dev</text>
      </g>

      <g class="node-group">
        <rect x="120" y="100" width="60" height="50" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" stroke-width="2" class="node-circle"/>
        <text x="150" y="128" text-anchor="middle" class="node-label">QA</text>
      </g>

      <g class="node-group">
        <rect x="240" y="100" width="60" height="50" rx="6" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" stroke-width="2" class="node-circle"/>
        <text x="270" y="128" text-anchor="middle" class="node-label">UAT</text>
      </g>

      <g class="node-group">
        <rect x="360" y="100" width="60" height="50" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="2" class="node-circle"/>
        <text x="390" y="128" text-anchor="middle" class="node-label">Prod</text>
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

        <h4 class="timeline-section-title">Telemetry Uptime Outcomes</h4>
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
  container.innerHTML = "";

  portfolioData.certifications.forEach((cert, idx) => {
    const card = document.createElement("div");
    const staggerClass = `reveal-stagger-${(idx % 4) + 1}`;
    card.className = `certification-card glass-panel reveal-on-scroll ${staggerClass}`;

    card.innerHTML = `
      <div class="cert-icon-container"><i data-lucide="${cert.icon}"></i></div>
      <div class="cert-details">
        <h3 class="cert-name">${cert.name}</h3>
        <span class="cert-meta">${cert.issuer} &bull; Verified in ${cert.date}</span>
        <div class="cert-upload-controls">
          <span class="cert-view-btn" onclick="openCertModal('${cert.id}')">View Accreditation <i data-lucide="external-link" style="width:10px; height:10px; vertical-align:middle;"></i></span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  lucide.createIcons();
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

function renderResume(mode) {
  const resumeBox = document.getElementById("resume-view-box");
  resumeBox.innerHTML = "";

  if (mode === "ats") {
    resumeBox.classList.add("ats-view-mode");

    const plainText = `
SUDHARSAN S
Site Reliability Engineer | DevOps Engineer | Cloud Operations Engineer
Bangalore, Karnataka, India | raghavsudhar07@gmail.com

PROFESSIONAL SUMMARY
Site Reliability Engineer with 3+ years of experience supporting enterprise production applications across cloud and on-premises environments. Experienced in application reliability, incident management, root cause analysis, disaster recovery validation, IIS/.NET operations, monitoring & observability, AWS/GCP operations, production deployments, service availability management, and operational automation. Proven track record working with both monolithic and microservices-based architectures.

EXPERIENCE
Application Support Engineer | Craft Silicon | Feb 2025 – Present
- Support business-critical banking applications.
- Oversee IIS and .NET application operations and production deployments.
- Manage incident response, root cause analysis, and AWS & GCP operations.
- Implement Prometheus and Grafana monitoring stacks to improve observability.
- Perform release validation, change implementation, and execute DR drills for 7+ client environments.

IT Administrator | Wikiprospects | May 2023 – Jan 2025
- Managed IT infrastructure supporting 150+ users.
- Handled Active Directory, DNS, and DHCP administration.
- Administered network operations, VPN management, and backup/recovery processes.
- Provided end-user support and automated system validation tasks using PowerShell and Batch scripting.

CORE SKILLS
Cloud Platforms: AWS, Google Cloud Platform (GCP)
Monitoring & Observability: Prometheus, Grafana, Windows Exporter, Infrastructure Monitoring, Alerting, Dashboard Development
Application Operations: IIS, .NET Hosting, Application Reliability, Performance Monitoring
Automation: PowerShell, Batch Scripting, Python
Reliability Engineering: Incident Management, Problem Management, RCA, SLA Management, SLO Monitoring, DR Validation
Operating Systems: Windows Server, Linux

CERTIFICATIONS (Roadmap Targets / In Progress)
- AWS Certified Solutions Architect (Planned / In Progress)
- Google Cloud Certifications (Planned / In Progress)
- Certified Kubernetes Administrator (CKA) (Planned / In Progress)
- HashiCorp Certified: Terraform Associate (Planned / In Progress)
- Microsoft Certifications (Planned / In Progress)
`;
    resumeBox.innerHTML = `<pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.85rem; line-height: 1.5; color: inherit;">${plainText}</pre>`;
  } else {
    resumeBox.classList.remove("ats-view-mode");

    // GUI Visual Dashboard Layout
    resumeBox.innerHTML = `
      <div class="resume-header">
        <h1>${portfolioData.personalInfo.name}</h1>
        <div class="resume-contact-info">
          <span><i data-lucide="map-pin" style="width:12px; height:12px; vertical-align:middle;"></i> ${portfolioData.personalInfo.socialLinks.location}</span>
          <span><i data-lucide="mail" style="width:12px; height:12px; vertical-align:middle;"></i> ${portfolioData.personalInfo.socialLinks.email}</span>
          <span><i data-lucide="briefcase" style="width:12px; height:12px; vertical-align:middle;"></i> Experience: ${portfolioData.personalInfo.yearsOfExperience}+ Years</span>
        </div>
      </div>
      
      <div class="resume-body-grid">
        <div class="resume-col-left">
          <div class="resume-section">
            <h3 class="resume-subsection-title">Professional Profile</h3>
            <p class="about-text-p" style="font-size:0.8rem; line-height:1.5;">${portfolioData.personalInfo.bio}</p>
          </div>
          
          <div class="resume-section" style="margin-top: 15px;">
            <h3 class="resume-subsection-title">Career Operations</h3>
            ${portfolioData.experience.map(exp => `
              <div class="resume-item" style="margin-bottom:12px;">
                <div class="resume-item-title-row">
                  <strong>${exp.role}</strong>
                  <span>${exp.duration}</span>
                </div>
                <div style="font-size:0.75rem; color:#3b82f6; font-weight:600; margin-bottom:4px;">${exp.company}</div>
                <p class="resume-item-details">${exp.responsibilities.slice(0, 2).join(". ")}.</p>
              </div>
            `).join("")}
          </div>
        </div>
        
        <div class="resume-col-right">
          <div class="resume-section">
            <h3 class="resume-subsection-title">Uptime Skills</h3>
            <div style="display:flex; flex-wrap:wrap; gap:6px;">
              ${portfolioData.skills.flatMap(cat => cat.items.map(i => i.name)).slice(0, 14).map(s => `
                <span class="project-tool-tag" style="font-size:0.7rem; border-color:#3b82f6;">${s}</span>
              `).join("")}
            </div>
          </div>
          
          <div class="resume-section" style="margin-top: 15px;">
            <h3 class="resume-subsection-title">Accreditations</h3>
            <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:8px;">
              ${portfolioData.certifications.slice(0, 4).map(c => `
                <li style="font-size:0.75rem; color:var(--text-secondary);">
                  <strong style="color:var(--text-primary); font-size:0.75rem;">${c.name}</strong><br>
                  ${c.issuer} (${c.date})
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  lucide.createIcons();
}

function setupResumeControls() {
  const guiBtn = document.getElementById("resume-view-gui-btn");
  const atsBtn = document.getElementById("resume-view-ats-btn");
  const printBtn = document.getElementById("resume-print-btn");
  const dlBtn = document.getElementById("resume-download-btn");
  const heroDlBtn = document.getElementById("hero-download-resume-btn");
  const sidebarDlBtn = document.getElementById("sidebar-download-resume-btn");

  guiBtn.addEventListener("click", () => {
    guiBtn.classList.add("active");
    atsBtn.classList.remove("active");
    renderResume("gui");
  });

  atsBtn.addEventListener("click", () => {
    atsBtn.classList.add("active");
    guiBtn.classList.remove("active");
    renderResume("ats");
  });

  const triggerPrint = () => {
    window.print();
  };

  printBtn.addEventListener("click", triggerPrint);
  dlBtn.addEventListener("click", triggerPrint);
  heroDlBtn.addEventListener("click", triggerPrint);
  sidebarDlBtn.addEventListener("click", triggerPrint);
}

// Testimonials Slideshow
let activeTestimonialIndex = 0;
function renderTestimonials() {
  const track = document.getElementById("testimonials-carousel-track");
  track.innerHTML = "";

  portfolioData.testimonials.forEach(t => {
    const slide = document.createElement("div");
    slide.className = "testimonial-slide";

    // Default avatar abbreviation
    const initials = t.author.split(" ").map(n => n[0]).join("");

    slide.innerHTML = `
      <div class="testimonial-card glass-panel">
        <p class="testimonial-quote">"${t.quote}"</p>
        <div class="testimonial-author-row">
          <div class="testimonial-author-avatar">${initials}</div>
          <div class="testimonial-author-info">
            <span class="testimonial-author-name">${t.author}</span>
            <span class="testimonial-author-role">${t.role}</span>
          </div>
        </div>
      </div>
    `;
    track.appendChild(slide);
  });
}

function setupTestimonialsSlider() {
  const prevBtn = document.getElementById("testimonials-prev-btn");
  const nextBtn = document.getElementById("testimonials-next-btn");
  const track = document.getElementById("testimonials-carousel-track");
  const container = document.querySelector(".testimonials-slider-container");

  if (!track || !prevBtn || !nextBtn || !container) return;

  const updateSlidePosition = () => {
    track.style.transform = `translateX(-${activeTestimonialIndex * 100}%)`;
  };

  prevBtn.addEventListener("click", () => {
    if (activeTestimonialIndex > 0) {
      activeTestimonialIndex--;
    } else {
      activeTestimonialIndex = portfolioData.testimonials.length - 1;
    }
    updateSlidePosition();
  });

  nextBtn.addEventListener("click", () => {
    if (activeTestimonialIndex < portfolioData.testimonials.length - 1) {
      activeTestimonialIndex++;
    } else {
      activeTestimonialIndex = 0;
    }
    updateSlidePosition();
  });

  // Touch swipe support for testimonials slider
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  container.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const swipeThreshold = 50; // min swipe distance in px
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swiped left -> load next testimonial
      nextBtn.click();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swiped right -> load previous testimonial
      prevBtn.click();
    }
  }, { passive: true });

  // Auto rotate testimonials slider every 10 seconds
  setInterval(() => {
    nextBtn.click();
  }, 10000);
}

// Contact form validators
function setupContactForm() {
  const form = document.getElementById("contact-form");

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

  const closeCert = document.getElementById("cert-modal-close");
  const certOverlay = document.getElementById("cert-modal");
  closeCert.addEventListener("click", () => {
    certOverlay.classList.remove("open");
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
    if (e.target === certOverlay) certOverlay.classList.remove("open");
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

// Open and load Certification Modal Overlay
window.openCertModal = function (certId) {
  const c = portfolioData.certifications.find(cert => cert.id === certId);
  if (!c) return;

  document.getElementById("modal-cert-title").innerText = c.name;
  document.getElementById("modal-cert-issuer").innerText = `Issued by ${c.issuer} \u2022 Verified ${c.date}`;

  const imgElem = document.getElementById("modal-cert-image-elem");
  const placeholderEl = document.getElementById("modal-cert-placeholder-img");

  if (c.imageUrl) {
    imgElem.src = c.imageUrl;
    imgElem.style.display = "block";
    placeholderEl.style.display = "none";
  } else {
    imgElem.style.display = "none";
    placeholderEl.style.display = "flex";
  }

  document.getElementById("cert-modal").classList.add("open");
};

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