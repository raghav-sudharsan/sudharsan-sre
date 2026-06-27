// Heartbeat SLA uptime ticker
window.initLiveUptimeTicker = function() {
  const ticker = document.getElementById("uptime-percentage-ticker");
  if (!ticker) return;

  let baseUptime = 99.99923;
  setInterval(() => {
    const fluctuation = (Math.random() * 0.00018 - 0.00009);
    const newUptime = Math.min(100.0, Math.max(99.99901, baseUptime + fluctuation));
    ticker.innerText = `${newUptime.toFixed(5)}% SLA`;
  }, 3500);
};

// Live telemetry log feed under Operations Board
window.initRecruiterHubConsole = function() {
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
};

// Trigger metric counters and progress bars when visible
window.setupMetricsScrollObserver = function() {
  const counters = document.querySelectorAll(".metric-counter");
  const options = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counterEl = entry.target;
        const target = parseFloat(counterEl.getAttribute("data-target"));
        const suffix = counterEl.getAttribute("data-suffix");
        window.animateCounter(counterEl, target, suffix);
        observer.unobserve(counterEl);
      }
    });
  }, options);

  counters.forEach(counter => observer.observe(counter));

  // Observe Skill bars container to slide load ranges
  const skillsWrap = document.getElementById("skills-clusters-container");
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.triggerSkillAnimations();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  if (skillsWrap) skillsObserver.observe(skillsWrap);
};

window.animateCounter = function(element, target, suffix) {
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
      element.innerText = window.formatCounterValue(target, suffix);
    } else {
      element.innerText = window.formatCounterValue(count, suffix);
    }
  }, frameRate);
};

window.formatCounterValue = function(val, suffix) {
  if (suffix === "%") {
    return val.toFixed(3) + suffix;
  }
  if (val >= 1000) {
    return Math.floor(val / 1000) + "k" + suffix;
  }
  return Math.floor(val) + suffix;
};
