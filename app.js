document.addEventListener("DOMContentLoaded", () => {
  // Initialize state
  initApp();
});

// Global state holding configuration overrides
let appState = {
  theme: "dark",
  name: portfolioData.personalInfo.name,
  avatar: "",
  customArchitectures: {},
  customCerts: {},
  messages: []
};

// Main initialization controller
function initApp() {
  loadLocalStorage();
  setupTerminalPreloader();
  applyTheme();
  setupThemeToggle();
  setupEditableName();
  setupAvatarUpload();
  setupNavigation();

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
  setupCustomUploads();

  // Run Lucide icon creation
  lucide.createIcons();
}

// Telemetry-style preloader simulator
function setupTerminalPreloader() {
  const loadingScreen = document.getElementById("loading-screen");
  const terminalBody = document.getElementById("terminal-body");

  const bootstrapCommands = [
    "&gt; terraform init -upgrade ... [OK]",
    "&gt; kubectl get nodes --watch ... 3 Nodes Ready [OK]",
    "&gt; helm upgrade --install telemetry-agent prometheus-community/kube-prometheus-stack [OK]",
    "&gt; sysctl net.core.somaxconn=1024 [OK]",
    "&gt; Systems initialized. Launching executive control portal..."
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
      animateOnLoad();
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
  if (localStorage.getItem("sre_portfolio_theme")) {
    appState.theme = localStorage.getItem("sre_portfolio_theme");
  }
  if (localStorage.getItem("sre_portfolio_name")) {
    appState.name = localStorage.getItem("sre_portfolio_name");
  }
  if (localStorage.getItem("sre_portfolio_avatar")) {
    appState.avatar = localStorage.getItem("sre_portfolio_avatar");
  }
  if (localStorage.getItem("sre_portfolio_custom_arch")) {
    appState.customArchitectures = JSON.parse(localStorage.getItem("sre_portfolio_custom_arch"));
  }
  if (localStorage.getItem("sre_portfolio_custom_certs")) {
    appState.customCerts = JSON.parse(localStorage.getItem("sre_portfolio_custom_certs"));
  }
  if (localStorage.getItem("sre_portfolio_messages")) {
    appState.messages = JSON.parse(localStorage.getItem("sre_portfolio_messages"));
  }
}

function saveState(key, val) {
  appState[key] = val;
  if (typeof val === "object") {
    localStorage.setItem(`sre_portfolio_${key}`, JSON.stringify(val));
  } else {
    localStorage.setItem(`sre_portfolio_${key}`, val);
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
  toggleBtn.addEventListener("click", () => {
    const newTheme = appState.theme === "dark" ? "light" : "dark";
    saveState("theme", newTheme);
    applyTheme();
  });
}

// Editable Name triggers
function setupEditableName() {
  const nameInput = document.getElementById("hero-name-val");
  const editBtn = document.getElementById("hero-edit-name-btn");

  nameInput.value = appState.name;

  editBtn.addEventListener("click", () => {
    const isReadonly = nameInput.hasAttribute("readonly");
    if (isReadonly) {
      nameInput.removeAttribute("readonly");
      nameInput.focus();
      editBtn.innerHTML = `<i data-lucide="check" style="width: 16px; height: 16px;"></i>`;
      lucide.createIcons();
      nameInput.select();
    } else {
      nameInput.setAttribute("readonly", true);
      editBtn.innerHTML = `<i data-lucide="edit-3" style="width: 16px; height: 16px;"></i>`;
      lucide.createIcons();
      saveState("name", nameInput.value.trim() || portfolioData.personalInfo.name);
      renderResume(document.getElementById("resume-view-gui-btn").classList.contains("active") ? "gui" : "ats");
    }
  });

  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      editBtn.click();
    }
  });
}

// Avatar Photo Upload triggers
function setupAvatarUpload() {
  const clickZone = document.getElementById("avatar-click-zone");
  const fileInput = document.getElementById("avatar-file-input");
  const previewImg = document.getElementById("avatar-preview-img");
  const placeholderBox = document.getElementById("avatar-placeholder-box");

  // Set default or loaded photo
  if (appState.avatar) {
    previewImg.src = appState.avatar;
    previewImg.style.display = "block";
    placeholderBox.style.display = "none";
  }

  clickZone.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        saveState("avatar", base64);
        previewImg.src = base64;
        previewImg.style.display = "block";
        placeholderBox.style.display = "none";
        showToast("Profile telemetry avatar synchronized.");
      };
      reader.readAsDataURL(file);
    }
  });
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
  document.getElementById("recruiter-avail-status").innerText = portfolioData.recruiterInfo.availabilityStatus;
  document.getElementById("recruiter-target-role").innerText = portfolioData.recruiterInfo.expectedRole;
  document.getElementById("recruiter-notice-period").innerText = portfolioData.recruiterInfo.noticePeriod;
  document.getElementById("recruiter-current-role").innerText = portfolioData.recruiterInfo.currentRole;
  document.getElementById("recruiter-experience-years").innerText = portfolioData.recruiterInfo.experience;
  document.getElementById("recruiter-location").innerText = portfolioData.recruiterInfo.location;

  document.getElementById("social-link-linkedin").href = portfolioData.personalInfo.socialLinks.linkedin;
  document.getElementById("social-link-github").href = portfolioData.personalInfo.socialLinks.github;
  document.getElementById("social-link-gitlab").href = portfolioData.personalInfo.socialLinks.gitlab;
  document.getElementById("social-link-medium").href = portfolioData.personalInfo.socialLinks.medium;
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
    card.className = "metric-card glass-panel";
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

  portfolioData.skills.forEach(cat => {
    const card = document.createElement("div");
    card.className = "skills-category-card glass-panel";
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

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card glass-panel";
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

  // Check if user uploaded an override image
  if (appState.customArchitectures[arch.id]) {
    const img = document.createElement("img");
    img.src = appState.customArchitectures[arch.id];
    img.alt = arch.title;
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.borderRadius = "var(--radius-sm)";
    canvas.appendChild(img);
  } else {
    // Generate beautiful custom animated vector inline SVG
    const svgStr = generateSVGDiagram(arch.type);
    canvas.innerHTML = svgStr;
  }
}

// Generate animated SVGs in JS to avoid asset loading dependency
function generateSVGDiagram(type) {
  let svg = "";
  if (type === "system") {
    svg = `
    <svg viewBox="0 0 500 250" width="100%" height="100%">
      <!-- Definitions -->
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
        </marker>
        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      
      <!-- Paths -->
      <path d="M 60 125 L 140 125" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 200 125 L 280 125" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 340 100 L 400 65" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
      <path d="M 340 150 L 400 185" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
      
      <!-- Database Sync Link -->
      <path d="M 430 100 L 430 150" fill="none" stroke="#ef4444" stroke-dasharray="4,4" stroke-width="2" marker-end="url(#arrow)"/>
      
      <!-- Nodes -->
      <g class="node-group">
        <circle cx="30" cy="125" r="25" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" stroke-width="2" class="node-circle"/>
        <text x="30" y="128" text-anchor="middle" class="node-label">Client</text>
      </g>
      
      <g class="node-group">
        <rect x="140" y="100" width="60" height="50" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" stroke-width="2" class="node-circle"/>
        <text x="170" y="128" text-anchor="middle" class="node-label">CDN</text>
      </g>

      <g class="node-group">
        <rect x="280" y="100" width="60" height="50" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" stroke-width="2" class="node-circle"/>
        <text x="310" y="128" text-anchor="middle" class="node-label">Gateway</text>
      </g>

      <g class="node-group">
        <circle cx="430" cy="65" r="25" fill="rgba(20, 184, 166, 0.15)" stroke="#14b8a6" stroke-width="2" class="node-circle"/>
        <text x="430" y="68" text-anchor="middle" class="node-label">Active DB</text>
      </g>

      <g class="node-group">
        <circle cx="430" cy="185" r="25" fill="rgba(100, 116, 139, 0.15)" stroke="#64748b" stroke-width="2" class="node-circle"/>
        <text x="430" y="188" text-anchor="middle" class="node-label">Standby</text>
      </g>
    </svg>
    `;
  } else if (type === "cloud") {
    svg = `
    <svg viewBox="0 0 500 250" width="100%" height="100%">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
        </marker>
      </defs>
      <!-- VPC Boundary -->
      <rect x="40" y="30" width="420" height="190" rx="12" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="50" y="48" fill="#3b82f6" font-size="9" font-family="monospace">AWS VPC Config (us-west-2)</text>
      
      <!-- Subnets -->
      <rect x="60" y="60" width="110" height="140" rx="6" fill="rgba(6, 182, 212, 0.05)" stroke="#06b6d4" stroke-width="1"/>
      <text x="65" y="74" fill="#06b6d4" font-size="8" font-family="monospace">Pub Subnet 1A</text>
      
      <rect x="195" y="60" width="110" height="140" rx="6" fill="rgba(139, 92, 246, 0.05)" stroke="#8b5cf6" stroke-width="1"/>
      <text x="200" y="74" fill="#8b5cf6" font-size="8" font-family="monospace">Priv Subnet 1B</text>

      <rect x="330" y="60" width="110" height="140" rx="6" fill="rgba(20, 184, 166, 0.05)" stroke="#14b8a6" stroke-width="1"/>
      <text x="335" y="74" fill="#14b8a6" font-size="8" font-family="monospace">DB Subnet 1C</text>
      
      <!-- Load Balancers, Nodes, DB -->
      <circle cx="115" cy="130" r="18" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" stroke-width="1.5"/>
      <text x="115" y="133" text-anchor="middle" font-size="8" fill="white" font-weight="bold">ALB</text>
      
      <rect x="220" y="110" width="60" height="40" rx="4" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" stroke-width="1.5"/>
      <text x="250" y="133" text-anchor="middle" font-size="8" fill="white" font-weight="bold">EKS Pod</text>

      <circle cx="385" cy="130" r="18" fill="rgba(20, 184, 166, 0.15)" stroke="#14b8a6" stroke-width="1.5"/>
      <text x="385" y="133" text-anchor="middle" font-size="8" fill="white" font-weight="bold">RDS</text>

      <!-- Connections -->
      <path d="M 133 130 L 220 130" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 280 130 L 367 130" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)" class="packet-flow"/>
    </svg>
    `;
  } else if (type === "cicd") {
    svg = `
    <svg viewBox="0 0 500 250" width="100%" height="100%">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
        </marker>
      </defs>
      
      <!-- Flow links -->
      <path d="M 60 125 L 120 125" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 180 125 L 240 125" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 300 125 L 360 125" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 420 125 L 440 125" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"/>
      
      <!-- Steps -->
      <g>
        <rect x="10" y="100" width="50" height="50" rx="6" fill="rgba(255,255,255,0.05)" stroke="#64748b" stroke-width="1.5"/>
        <text x="35" y="128" text-anchor="middle" font-size="8" fill="white">Git Push</text>
      </g>
      
      <g>
        <rect x="120" y="90" width="60" height="70" rx="6" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="150" y="115" text-anchor="middle" font-size="8" fill="white">GitHub</text>
        <text x="150" y="127" text-anchor="middle" font-size="7" fill="white">Actions</text>
        <text x="150" y="142" text-anchor="middle" font-size="7" fill="var(--status-ok)">Test & Build</text>
      </g>

      <g>
        <rect x="240" y="100" width="60" height="50" rx="6" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="270" y="125" text-anchor="middle" font-size="8" fill="white">Docker Registry</text>
        <text x="270" y="137" text-anchor="middle" font-size="7" fill="var(--text-muted)">(ECR)</text>
      </g>

      <g>
        <rect x="360" y="90" width="60" height="70" rx="6" fill="rgba(20,184,166,0.1)" stroke="#14b8a6" stroke-width="1.5"/>
        <text x="390" y="115" text-anchor="middle" font-size="8" fill="white">ArgoCD</text>
        <text x="390" y="127" text-anchor="middle" font-size="7" fill="white">GitOps</text>
        <text x="390" y="142" text-anchor="middle" font-size="7" fill="var(--status-ok)">Auto Sync</text>
      </g>

      <g>
        <circle cx="465" cy="125" r="20" fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="1.5"/>
        <text x="465" y="128" text-anchor="middle" font-size="8" fill="white">Kubernetes</text>
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
      
      <!-- Flows -->
      <path d="M 90 90 L 150 120" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 90 160 L 150 130" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 210 125 L 270 125" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"/>
      <path d="M 330 110 L 390 80" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 330 140 L 390 170" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"/>
      
      <!-- Nodes -->
      <g>
        <rect x="30" y="60" width="60" height="45" rx="4" fill="rgba(255,255,255,0.05)" stroke="#64748b" stroke-width="1.5"/>
        <text x="60" y="85" text-anchor="middle" font-size="7" fill="white">App Pod A</text>
        <text x="60" y="95" text-anchor="middle" font-size="6" fill="var(--text-muted)">(Prom Agent)</text>
      </g>
      
      <g>
        <rect x="30" y="145" width="60" height="45" rx="4" fill="rgba(255,255,255,0.05)" stroke="#64748b" stroke-width="1.5"/>
        <text x="60" y="170" text-anchor="middle" font-size="7" fill="white">App Pod B</text>
        <text x="60" y="180" text-anchor="middle" font-size="6" fill="var(--text-muted)">(Prom Agent)</text>
      </g>

      <g>
        <rect x="150" y="100" width="60" height="50" rx="8" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="2"/>
        <text x="180" y="125" text-anchor="middle" font-size="8" fill="white">Thanos Proxy</text>
        <text x="180" y="137" text-anchor="middle" font-size="7" fill="white">(Querier)</text>
      </g>

      <g>
        <rect x="270" y="100" width="60" height="50" rx="8" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" stroke-width="2"/>
        <text x="300" y="128" text-anchor="middle" font-size="8" fill="white">Prometheus</text>
      </g>

      <g>
        <circle cx="420" cy="75" r="20" fill="rgba(20,184,166,0.1)" stroke="#14b8a6" stroke-width="1.5"/>
        <text x="420" y="78" text-anchor="middle" font-size="8" fill="white">Grafana</text>
      </g>

      <g>
        <circle cx="420" cy="175" r="20" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="420" y="178" text-anchor="middle" font-size="8" fill="white">PagerDuty</text>
      </g>
    </svg>
    `;
  } else if (type === "kubernetes") {
    svg = `
    <svg viewBox="0 0 500 250" width="100%" height="100%">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
        </marker>
      </defs>
      <!-- Kubernetes Cluster box -->
      <rect x="40" y="30" width="420" height="190" rx="10" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="50" y="46" fill="#10b981" font-size="9" font-family="monospace">K8s Cluster Node</text>
      
      <!-- Ingress -->
      <rect x="60" y="100" width="60" height="50" rx="6" fill="rgba(255,255,255,0.05)" stroke="#64748b" stroke-width="1.5"/>
      <text x="90" y="125" text-anchor="middle" font-size="8" fill="white">Ingress-NGINX</text>
      
      <!-- Service Mesh Cilium Boundary -->
      <rect x="150" y="60" width="280" height="140" rx="8" fill="rgba(6,182,212,0.02)" stroke="#06b6d4" stroke-width="1.2" stroke-dasharray="2,2"/>
      <text x="155" y="72" fill="#06b6d4" font-size="7" font-family="monospace">eBPF Cilium Mesh</text>

      <!-- Pods -->
      <g>
        <rect x="180" y="95" width="70" height="60" rx="6" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="215" y="120" text-anchor="middle" font-size="8" fill="white">Pod-A (Client)</text>
        <text x="215" y="132" text-anchor="middle" font-size="7" fill="var(--text-muted)">Namespace X</text>
        <text x="215" y="145" text-anchor="middle" font-size="6" fill="var(--status-ok)">Running</text>
      </g>
      
      <g>
        <rect x="330" y="95" width="70" height="60" rx="6" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="365" y="120" text-anchor="middle" font-size="8" fill="white">Pod-B (DB)</text>
        <text x="365" y="132" text-anchor="middle" font-size="7" fill="var(--text-muted)">Namespace Y</text>
        <text x="365" y="145" text-anchor="middle" font-size="6" fill="var(--status-ok)">Running</text>
      </g>

      <!-- Flows -->
      <path d="M 120 125 L 180 125" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)" class="packet-flow"/>
      <path d="M 250 125 L 330 125" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)" class="packet-flow"/>
    </svg>
    `;
  }
  return svg;
}

function renderTimeline() {
  const container = document.getElementById("experience-timeline-container");
  container.innerHTML = "";

  portfolioData.experience.forEach(exp => {
    const item = document.createElement("div");
    item.className = "timeline-item";
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

  portfolioData.achievements.forEach(ach => {
    const card = document.createElement("div");
    card.className = "achievement-glass-card glass-panel";
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

  portfolioData.certifications.forEach(cert => {
    const card = document.createElement("div");
    card.className = "certification-card glass-panel";

    // Check if custom certificate image has been uploaded
    const fileLabelText = appState.customCerts[cert.id] ? "Override Scan Uploaded" : "Upload Scan Certificate";

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

  portfolioData.blogs.forEach(blog => {
    const card = document.createElement("div");
    card.className = "blog-card glass-panel";
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
AI DevOps & Site Reliability Engineer
Bangalore, Karnataka, India | raghavsudhar07@gmail.com

PROFESSIONAL SUMMARY
Highly skilled AI DevOps & Site Reliability Engineer with 3+ years of experience specializing in cloud infrastructure, AI-powered automation, CI/CD, observability, incident response, reliability engineering, and enterprise-scale platform operations. Focused on maintaining 99.999% availability, reducing MTTR with AI-assisted remediation, and engineering intelligent self-healing systems.

EXPERIENCE
Site Reliability Engineer (SRE) | Craftsilicon | 2025 - Present
- Design and operate cloud-native SRE infrastructure ensuring high availability and fault tolerance.
- Implement and manage CI/CD pipelines to accelerate software delivery with automated quality gates.
- Established a centralized monitoring platform reducing alert response time by 60%.
- Implemented GitOps workflows that cut manual release interventions by 80%.

System Administrator | Wikiprospects | 2023 - 2025
- Administered Linux and Windows Server infrastructure supporting internal and client-facing services.
- Automated daily server health checks, saving 8+ hours of manual work per week.
- Migrated on-premises services to cloud-based infrastructure with zero business disruption.
- Reduced system downtime incidents by 45% through proactive patching and monitoring.

CORE SKILLS
Cloud: AWS, Azure, Google Cloud
DevOps: Jenkins, GitHub Actions, GitLab CI, ArgoCD
Containers: Docker, Kubernetes, OpenShift, Helm
Observability: Prometheus, Grafana, ELK Stack, Datadog
IaC: Terraform, Ansible, CloudFormation
Operating Systems: Linux, Windows Server
Languages: Python, Go, Shell, PowerShell
AI/ML Ops: LLM Integration, AI-driven Alerting, Intelligent Automation

CERTIFICATIONS
- AWS Certified Solutions Architect – Professional
- CKA: Certified Kubernetes Administrator
- HashiCorp Certified: Terraform Associate
- Prometheus Certified Associate (PCA)
`;
    resumeBox.innerHTML = `<pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.85rem; line-height: 1.5; color: inherit;">${plainText}</pre>`;
  } else {
    resumeBox.classList.remove("ats-view-mode");

    // GUI Visual Dashboard Layout
    resumeBox.innerHTML = `
      <div class="resume-header">
        <h1>${appState.name}</h1>
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
let activeUploadingCertId = "";
window.openCertModal = function (certId) {
  const c = portfolioData.certifications.find(cert => cert.id === certId);
  if (!c) return;

  activeUploadingCertId = certId;
  document.getElementById("modal-cert-title").innerText = c.name;
  document.getElementById("modal-cert-issuer").innerText = `Issued by ${c.issuer} \u2022 Verified ${c.date}`;

  const imgElem = document.getElementById("modal-cert-image-elem");
  const placeholderEl = document.getElementById("modal-cert-placeholder-img");

  if (appState.customCerts[certId]) {
    imgElem.src = appState.customCerts[certId];
    imgElem.style.display = "block";
    placeholderEl.style.display = "none";
  } else {
    imgElem.style.display = "none";
    placeholderEl.style.display = "flex";
  }

  document.getElementById("cert-modal").classList.add("open");
};

// Upload overlays files handlers
function setupCustomUploads() {
  const archFileInput = document.getElementById("arch-file-input");
  const certFileInput = document.getElementById("cert-file-input");

  // Custom Architecture uploads
  document.getElementById("arch-upload-trigger").addEventListener("click", (e) => {
    if (e.target !== archFileInput) {
      archFileInput.click();
    }
  });

  archFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        const updatedArch = { ...appState.customArchitectures, [activeArchTab]: base64 };
        saveState("customArchitectures", updatedArch);

        // Reload current view
        const currentArchObj = portfolioData.architectures.find(a => a.id === activeArchTab);
        if (currentArchObj) loadArchitectureView(currentArchObj);
        showToast("Architecture vector overrides synchronized.");
      };
      reader.readAsDataURL(file);
    }
  });

  // Custom Cert uploads
  document.getElementById("cert-upload-trigger-btn").addEventListener("click", (e) => {
    if (e.target !== certFileInput) {
      certFileInput.click();
    }
  });

  certFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && activeUploadingCertId) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        const updatedCerts = { ...appState.customCerts, [activeUploadingCertId]: base64 };
        saveState("customCerts", updatedCerts);

        // Refresh view inside modal
        const imgElem = document.getElementById("modal-cert-image-elem");
        const placeholderEl = document.getElementById("modal-cert-placeholder-img");
        imgElem.src = base64;
        imgElem.style.display = "block";
        placeholderEl.style.display = "none";

        showToast("Accreditation scanned document synchronized.");
      };
      reader.readAsDataURL(file);
    }
  });

  // Setup Blueprint Zoom triggers
  const archZoomBtn = document.getElementById("arch-zoom-btn");
  const zoomOverlay = document.getElementById("zoom-modal");
  const zoomTitle = document.getElementById("zoom-modal-title");
  const zoomDesc = document.getElementById("zoom-modal-description");
  const zoomContainer = document.getElementById("zoom-canvas-container");

  archZoomBtn.addEventListener("click", () => {
    const activeArch = portfolioData.architectures.find(a => a.id === activeArchTab);
    if (!activeArch) return;

    zoomTitle.innerHTML = `<i data-lucide="zoom-in"></i> Blueprint Magnifier: ${activeArch.title}`;
    zoomDesc.innerText = activeArch.description;
    zoomContainer.innerHTML = "";

    if (appState.customArchitectures[activeArch.id]) {
      const img = document.createElement("img");
      img.src = appState.customArchitectures[activeArch.id];
      img.alt = activeArch.title;
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      img.style.objectFit = "contain";
      zoomContainer.appendChild(img);
    } else {
      const svgStr = generateSVGDiagram(activeArch.type);
      zoomContainer.innerHTML = svgStr;
    }

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

  // Make zoom container draggable
  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;
  const zoomBody = document.querySelector(".zoom-modal-body");

  zoomBody.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - zoomBody.offsetLeft;
    startY = e.pageY - zoomBody.offsetTop;
    scrollLeft = zoomBody.scrollLeft;
    scrollTop = zoomBody.scrollTop;
  });

  zoomBody.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  zoomBody.addEventListener("mouseup", () => {
    isDragging = false;
  });

  zoomBody.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - zoomBody.offsetLeft;
    const y = e.pageY - zoomBody.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    zoomBody.scrollLeft = scrollLeft - walkX;
    zoomBody.scrollTop = scrollTop - walkY;
  });
}