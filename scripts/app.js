document.addEventListener("DOMContentLoaded", () => {
  // Initialize state
  initApp();
});

// Main initialization controller
function initApp() {
  if (window.loadLocalStorage) window.loadLocalStorage();
  if (window.setupTerminalPreloader) window.setupTerminalPreloader();
  if (window.applyTheme) window.applyTheme();
  if (window.setupThemeToggle) window.setupThemeToggle();
  if (window.setupNavigation) window.setupNavigation();

  if (window.portfolioData) {
    // Set static SRE profile elements from portfolioData
    const nameEl = document.getElementById("hero-name-val");
    if (nameEl && window.portfolioData.personalInfo) {
      nameEl.innerText = window.portfolioData.personalInfo.name;
    }
    const avatarEl = document.getElementById("avatar-preview-img");
    if (avatarEl && window.portfolioData.personalInfo && window.portfolioData.personalInfo.avatarUrl) {
      avatarEl.src = window.portfolioData.personalInfo.avatarUrl;
      avatarEl.style.display = "block";
    }

    // Render Dynamic Content Components
    renderRecruiterHub();
    renderAboutSection();
    renderMetrics();
    renderSkills();
    renderProjects("all");
    if (window.renderArchitectureTabs) window.renderArchitectureTabs();
    renderTimeline();
    renderAchievements();
    renderCertifications();
    renderBlogs();
    renderResume("gui"); // Default to Visual Dashboard
    renderTestimonials();
  }

  // Setup Interactivity Listeners
  setupProjectFilters();
  setupContactForm();
  setupResumeControls();
  setupTestimonialsSlider();
  setupModals();
  if (window.setupScrollObserver) window.setupScrollObserver();
  if (window.setupMetricsScrollObserver) window.setupMetricsScrollObserver();
  if (window.setupBlueprintZoom) window.setupBlueprintZoom();

  // Initialize SRE Observability Dashboard animations
  if (window.initTelemetryParticles) window.initTelemetryParticles();
  if (window.initLiveUptimeTicker) window.initLiveUptimeTicker();
  if (window.initRecruiterHubConsole) window.initRecruiterHubConsole();

  // Run Lucide icon creation
  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
}

// Render Components defensively
function renderRecruiterHub() {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  };

  if (!window.portfolioData || !window.portfolioData.recruiterInfo) return;

  const info = window.portfolioData.recruiterInfo;
  setVal("recruiter-avail-status", info.availabilityStatus);
  setVal("ops-experience", info.experience);
  setVal("ops-dr-drills", info.drDrills);
  setVal("ops-cloud-platforms", info.cloudPlatforms);
  setVal("ops-apps-supported", info.appsSupported);
  setVal("ops-architectures", info.architectures);
  setVal("ops-core-platforms", info.corePlatforms);
  setVal("ops-availability-focus", info.availabilityFocus);

  if (window.portfolioData.personalInfo && window.portfolioData.personalInfo.socialLinks) {
    const social = window.portfolioData.personalInfo.socialLinks;
    const linkedinEl = document.getElementById("social-link-linkedin");
    if (linkedinEl) linkedinEl.href = social.linkedin;
    const githubEl = document.getElementById("social-link-github");
    if (githubEl) githubEl.href = social.github;
    const gitlabEl = document.getElementById("social-link-gitlab");
    if (gitlabEl) gitlabEl.href = social.gitlab;
    const mediumEl = document.getElementById("social-link-medium");
    if (mediumEl) mediumEl.href = social.medium;
  }
}

function renderAboutSection() {
  if (!window.portfolioData || !window.portfolioData.personalInfo) return;
  const personal = window.portfolioData.personalInfo;

  const bioEl = document.getElementById("about-biography-text");
  if (bioEl) bioEl.innerText = personal.bio;

  const strengthsContainer = document.getElementById("about-strengths-list");
  if (strengthsContainer) {
    strengthsContainer.innerHTML = "";
    if (personal.coreStrengths) {
      personal.coreStrengths.forEach(str => {
        const li = document.createElement("li");
        li.className = "about-list-item";
        li.innerHTML = `<i data-lucide="check-circle"></i><span>${str}</span>`;
        strengthsContainer.appendChild(li);
      });
    }
  }
}

function renderMetrics() {
  const container = document.getElementById("metrics-counter-container");
  if (!container || !window.portfolioData || !window.portfolioData.metrics) return;
  container.innerHTML = "";

  window.portfolioData.metrics.forEach((metric, idx) => {
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

function renderSkills() {
  const container = document.getElementById("skills-clusters-container");
  if (!container || !window.portfolioData || !window.portfolioData.skills) return;
  container.innerHTML = "";

  window.portfolioData.skills.forEach((cat, idx) => {
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

window.triggerSkillAnimations = function() {
  const fills = document.querySelectorAll(".skill-progress-bar-fill");
  fills.forEach(fill => {
    const lvl = fill.getAttribute("data-level");
    if (lvl) fill.style.width = `${lvl}%`;
  });
};

function renderProjects(filterValue) {
  const container = document.getElementById("projects-list-container");
  if (!container || !window.portfolioData || !window.portfolioData.projects) return;
  container.innerHTML = "";

  const filtered = filterValue === "all"
    ? window.portfolioData.projects
    : window.portfolioData.projects.filter(p => p.category === filterValue);

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

  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
  if (typeof window.initScrollReveal === "function") {
    window.initScrollReveal();
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

function renderTimeline() {
  const container = document.getElementById("experience-timeline-container");
  if (!container || !window.portfolioData || !window.portfolioData.experience) return;
  container.innerHTML = "";

  window.portfolioData.experience.forEach((exp, idx) => {
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
  if (!container || !window.portfolioData || !window.portfolioData.achievements) return;
  container.innerHTML = "";

  window.portfolioData.achievements.forEach((ach, idx) => {
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
  if (!container || !window.portfolioData || !window.portfolioData.certifications) return;
  container.innerHTML = "";

  window.portfolioData.certifications.forEach((cert, idx) => {
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

  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
}

function renderBlogs() {
  const container = document.getElementById("blogs-list-container");
  if (!container || !window.portfolioData || !window.portfolioData.blogs) return;
  container.innerHTML = "";

  window.portfolioData.blogs.forEach((blog, idx) => {
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

  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
}

function renderResume(mode) {
  const resumeBox = document.getElementById("resume-view-box");
  if (!resumeBox || !window.portfolioData) return;
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
        <h1>${window.portfolioData.personalInfo.name}</h1>
        <div class="resume-contact-info">
          <span><i data-lucide="map-pin" style="width:12px; height:12px; vertical-align:middle;"></i> ${window.portfolioData.personalInfo.socialLinks.location}</span>
          <span><i data-lucide="mail" style="width:12px; height:12px; vertical-align:middle;"></i> ${window.portfolioData.personalInfo.socialLinks.email}</span>
          <span><i data-lucide="briefcase" style="width:12px; height:12px; vertical-align:middle;"></i> Experience: ${window.portfolioData.personalInfo.yearsOfExperience}+ Years</span>
        </div>
      </div>
      
      <div class="resume-body-grid">
        <div class="resume-col-left">
          <div class="resume-section">
            <h3 class="resume-subsection-title">Professional Profile</h3>
            <p class="about-text-p" style="font-size:0.8rem; line-height:1.5;">${window.portfolioData.personalInfo.bio}</p>
          </div>
          
          <div class="resume-section" style="margin-top: 15px;">
            <h3 class="resume-subsection-title">Career Operations</h3>
            ${window.portfolioData.experience.map(exp => `
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
              ${window.portfolioData.skills.flatMap(cat => cat.items.map(i => i.name)).slice(0, 14).map(s => `
                <span class="project-tool-tag" style="font-size:0.7rem; border-color:#3b82f6;">${s}</span>
              `).join("")}
            </div>
          </div>
          
          <div class="resume-section" style="margin-top: 15px;">
            <h3 class="resume-subsection-title">Accreditations</h3>
            <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:8px;">
              ${window.portfolioData.certifications.slice(0, 4).map(c => `
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

  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
}

function setupResumeControls() {
  const guiBtn = document.getElementById("resume-view-gui-btn");
  const atsBtn = document.getElementById("resume-view-ats-btn");
  const printBtn = document.getElementById("resume-print-btn");
  const dlBtn = document.getElementById("resume-download-btn");
  const heroDlBtn = document.getElementById("hero-download-resume-btn");
  const sidebarDlBtn = document.getElementById("sidebar-download-resume-btn");

  if (guiBtn) {
    guiBtn.addEventListener("click", () => {
      guiBtn.classList.add("active");
      if (atsBtn) atsBtn.classList.remove("active");
      renderResume("gui");
    });
  }

  if (atsBtn) {
    atsBtn.addEventListener("click", () => {
      atsBtn.classList.add("active");
      if (guiBtn) guiBtn.classList.remove("active");
      renderResume("ats");
    });
  }

  const triggerPrint = () => {
    window.print();
  };

  if (printBtn) printBtn.addEventListener("click", triggerPrint);
  if (dlBtn) dlBtn.addEventListener("click", triggerPrint);
  if (heroDlBtn) heroDlBtn.addEventListener("click", triggerPrint);
  if (sidebarDlBtn) sidebarDlBtn.addEventListener("click", triggerPrint);
}

// Testimonials Slideshow
let activeTestimonialIndex = 0;
function renderTestimonials() {
  const track = document.getElementById("testimonials-carousel-track");
  if (!track || !window.portfolioData || !window.portfolioData.testimonials) return;
  track.innerHTML = "";

  window.portfolioData.testimonials.forEach(t => {
    const slide = document.createElement("div");
    slide.className = "testimonial-slide";
    const initials = t.author.trim().split(" ").map(n => n[0]).join("");

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

  // Testimonials auto-rotation with manual reset
  let autoRotateInterval = setInterval(() => {
    nextBtn.click();
  }, 10000);

  const resetAutoRotate = () => {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
      nextBtn.click();
    }, 10000);
  };

  prevBtn.addEventListener("click", () => {
    if (!window.portfolioData || !window.portfolioData.testimonials) return;
    if (activeTestimonialIndex > 0) {
      activeTestimonialIndex--;
    } else {
      activeTestimonialIndex = window.portfolioData.testimonials.length - 1;
    }
    updateSlidePosition();
    resetAutoRotate();
  });

  nextBtn.addEventListener("click", () => {
    if (!window.portfolioData || !window.portfolioData.testimonials) return;
    if (activeTestimonialIndex < window.portfolioData.testimonials.length - 1) {
      activeTestimonialIndex++;
    } else {
      activeTestimonialIndex = 0;
    }
    updateSlidePosition();
    resetAutoRotate();
  });

  // Touch swipe support for testimonials slider
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  container.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      nextBtn.click();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevBtn.click();
    }
  }, { passive: true });
}

// Contact form validations
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

    if (!nameInput || !emailInput || !messageInput) return;

    let isValid = true;

    if (window.resetFormErrors) window.resetFormErrors();

    if (!nameInput.value.trim()) {
      if (window.showInputError) window.showInputError(nameInput, "name-error");
      isValid = false;
    }

    if (!window.validateEmail || !window.validateEmail(emailInput.value.trim())) {
      if (window.showInputError) window.showInputError(emailInput, "email-error");
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      if (window.showInputError) window.showInputError(messageInput, "message-error");
      isValid = false;
    }

    if (isValid) {
      const msgObj = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        company: companyInput ? companyInput.value.trim() : "",
        phone: phoneInput ? phoneInput.value.trim() : "",
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      if (window.appState && window.appState.messages) {
        window.appState.messages.push(msgObj);
        if (window.saveState) window.saveState("messages", window.appState.messages);
      }

      if (window.showToast) window.showToast("Telemetry dispatched to core coordinator.");
      form.reset();
    }
  });
}

// Modal handling logic
function setupModals() {
  const closeProject = document.getElementById("project-modal-close");
  const projectOverlay = document.getElementById("project-modal");

  if (closeProject && projectOverlay) {
    closeProject.addEventListener("click", () => {
      projectOverlay.classList.remove("open");
    });
  }

  const closeBlog = document.getElementById("blog-modal-close");
  const blogOverlay = document.getElementById("blog-modal");

  if (closeBlog && blogOverlay) {
    closeBlog.addEventListener("click", () => {
      blogOverlay.classList.remove("open");
    });
  }

  const closeCert = document.getElementById("cert-modal-close");
  const certOverlay = document.getElementById("cert-modal");

  if (closeCert && certOverlay) {
    closeCert.addEventListener("click", () => {
      certOverlay.classList.remove("open");
    });
  }

  const closeZoom = document.getElementById("zoom-modal-close");
  const zoomOverlay = document.getElementById("zoom-modal");

  if (closeZoom && zoomOverlay) {
    closeZoom.addEventListener("click", () => {
      zoomOverlay.classList.remove("open");
    });
  }

  // Close overlays on clicking background
  window.addEventListener("click", (e) => {
    if (projectOverlay && e.target === projectOverlay) projectOverlay.classList.remove("open");
    if (blogOverlay && e.target === blogOverlay) blogOverlay.classList.remove("open");
    if (certOverlay && e.target === certOverlay) certOverlay.classList.remove("open");
    if (zoomOverlay && e.target === zoomOverlay) zoomOverlay.classList.remove("open");
  });
}

// Open and load Project Case study Details
window.openProjectModal = function(projectId) {
  if (!window.portfolioData || !window.portfolioData.projects) return;
  const p = window.portfolioData.projects.find(proj => proj.id === projectId);
  if (!p) return;

  const setVal = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  setVal("modal-project-category", p.category);
  setVal("modal-project-title", p.name);
  setVal("modal-project-description", p.description);
  setVal("modal-project-problem", p.businessProblem);
  setVal("modal-project-solution", p.solution);
  setVal("modal-project-challenges", p.challenges);
  setVal("modal-project-results", p.results);
  setVal("modal-project-lessons", p.lessons);

  const toolsWrap = document.getElementById("modal-project-tools");
  if (toolsWrap) {
    toolsWrap.innerHTML = p.tools.map(t => `<span class="project-tool-tag">${t}</span>`).join("");
  }

  const githubBtn = document.getElementById("modal-project-github-btn");
  if (githubBtn) githubBtn.href = p.github;
  const liveBtn = document.getElementById("modal-project-live-btn");
  if (liveBtn) liveBtn.href = p.liveDemo;

  const projectModal = document.getElementById("project-modal");
  if (projectModal) projectModal.classList.add("open");

  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
};

// Open and parse Markdown Blogs
window.openBlogModal = function(blogId) {
  if (!window.portfolioData || !window.portfolioData.blogs) return;
  const b = window.portfolioData.blogs.find(blog => blog.id === blogId);
  if (!b) return;

  const catEl = document.getElementById("modal-blog-category");
  if (catEl) catEl.innerText = b.category;
  const dateEl = document.getElementById("modal-blog-date");
  if (dateEl) dateEl.innerHTML = `${b.date} &bull; ${b.readTime}`;
  const titleEl = document.getElementById("modal-blog-title");
  if (titleEl) titleEl.innerText = b.title;

  // Render Markdown contents using Marked library if available, else simple fallback
  const contentEl = document.getElementById("modal-blog-content");
  if (contentEl) {
    if (window.marked && window.marked.parse) {
      contentEl.innerHTML = window.marked.parse(b.content);
    } else {
      contentEl.innerText = b.content;
    }
  }

  const blogModal = document.getElementById("blog-modal");
  if (blogModal) blogModal.classList.add("open");
};

// Open and load Certification Modal Overlay
window.openCertModal = function(certId) {
  if (!window.portfolioData || !window.portfolioData.certifications) return;
  const c = window.portfolioData.certifications.find(cert => cert.id === certId);
  if (!c) return;

  const titleEl = document.getElementById("modal-cert-title");
  if (titleEl) titleEl.innerText = c.name;
  const issuerEl = document.getElementById("modal-cert-issuer");
  if (issuerEl) issuerEl.innerText = `Issued by ${c.issuer} \u2022 Verified ${c.date}`;

  const imgElem = document.getElementById("modal-cert-image-elem");
  const placeholderEl = document.getElementById("modal-cert-placeholder-img");

  if (imgElem && placeholderEl) {
    if (c.imageUrl) {
      imgElem.src = c.imageUrl;
      imgElem.style.display = "block";
      placeholderEl.style.display = "none";
    } else {
      imgElem.style.display = "none";
      placeholderEl.style.display = "flex";
    }
  }

  const certModal = document.getElementById("cert-modal");
  if (certModal) certModal.classList.add("open");
};
