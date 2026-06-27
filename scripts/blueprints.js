// Architecture Tab Control & Blueprint Schema Renderer
let activeArchTab = "iis-architecture"; // Corrected default tab load

window.renderArchitectureTabs = function() {
  const nav = document.getElementById("arch-tabs-nav");
  if (!nav) return;
  nav.innerHTML = "";

  if (!window.portfolioData || !window.portfolioData.architectures) return;

  window.portfolioData.architectures.forEach(arch => {
    const btn = document.createElement("button");
    btn.className = `arch-tab-btn ${arch.id === activeArchTab ? "active" : ""}`;
    btn.innerHTML = `<span>${arch.title}</span> <i data-lucide="chevron-right" style="width:14px; height:14px;"></i>`;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".arch-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeArchTab = arch.id;
      window.loadArchitectureView(arch);
    });
    nav.appendChild(btn);
  });

  // Load default tab
  const activeArch = window.portfolioData.architectures.find(a => a.id === activeArchTab);
  if (activeArch) window.loadArchitectureView(activeArch);

  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
};

window.loadArchitectureView = function(arch) {
  const descEl = document.getElementById("arch-description-text");
  const canvas = document.getElementById("arch-drawing-canvas");

  if (descEl) descEl.innerText = arch.description;
  if (canvas) {
    canvas.innerHTML = "";
    // Generate beautiful custom animated vector inline SVG
    const svgStr = window.generateSVGDiagram(arch.type);
    canvas.innerHTML = svgStr;
  }
};

// Generate animated SVGs in JS to avoid asset loading dependency
window.generateSVGDiagram = function(type) {
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
};

// Setup Blueprint Zoom triggers
window.setupBlueprintZoom = function() {
  const archZoomBtn = document.getElementById("arch-zoom-btn");
  const zoomOverlay = document.getElementById("zoom-modal");
  const zoomTitle = document.getElementById("zoom-modal-title");
  const zoomDesc = document.getElementById("zoom-modal-description");
  const zoomContainer = document.getElementById("zoom-canvas-container");
  const zoomBody = document.querySelector(".zoom-modal-body"); // Queried here defensively

  if (!archZoomBtn || !zoomOverlay || !zoomContainer) return;

  let currentZoomScale = 1;

  archZoomBtn.addEventListener("click", () => {
    if (!window.portfolioData || !window.portfolioData.architectures) return;
    const activeArch = window.portfolioData.architectures.find(a => a.id === activeArchTab);
    if (!activeArch) return;

    if (zoomTitle) zoomTitle.innerHTML = `<i data-lucide="zoom-in"></i> Blueprint Magnifier: ${activeArch.title}`;
    if (zoomDesc) zoomDesc.innerText = activeArch.description;
    
    zoomContainer.innerHTML = "";
    const svgStr = window.generateSVGDiagram(activeArch.type);
    zoomContainer.innerHTML = svgStr;

    currentZoomScale = 1;
    zoomContainer.style.transform = `scale(${currentZoomScale})`;

    zoomOverlay.classList.add("open");
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  });

  // Blueprint scale buttons
  const zoomInBtn = document.getElementById("zoom-in-btn");
  const zoomOutBtn = document.getElementById("zoom-out-btn");
  const zoomResetBtn = document.getElementById("zoom-reset-btn");

  if (zoomInBtn) {
    zoomInBtn.addEventListener("click", () => {
      if (currentZoomScale < 3) {
        currentZoomScale += 0.25;
        zoomContainer.style.transform = `scale(${currentZoomScale})`;
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener("click", () => {
      if (currentZoomScale > 0.5) {
        currentZoomScale -= 0.25;
        zoomContainer.style.transform = `scale(${currentZoomScale})`;
      }
    });
  }

  if (zoomResetBtn) {
    zoomResetBtn.addEventListener("click", () => {
      currentZoomScale = 1;
      zoomContainer.style.transform = `scale(${currentZoomScale})`;
    });
  }

  if (!zoomBody) return;

  // Make zoom container draggable & touch-pannable
  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;

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
};
