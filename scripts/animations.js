// Preloader command sequence terminal simulator
window.setupTerminalPreloader = function() {
  const loadingScreen = document.getElementById("loading-screen");
  const terminalBody = document.getElementById("terminal-body");

  if (!loadingScreen || !terminalBody) return;

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
      window.animateOnLoad();
      window.initScrollReveal();
    }, 500);
  }, delay + 500);
};

window.animateOnLoad = function() {
  window.triggerSkillAnimations();
};

// Simulated Telemetry Connected Nodes Canvas Background
window.initTelemetryParticles = function() {
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
};

// Global Scroll Reveal system trigger
window.initScrollReveal = function() {
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
};
