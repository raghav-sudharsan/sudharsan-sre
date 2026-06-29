if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.projects = [
  {
    id: "ent-banking",
    name: "Enterprise ASP.NET Banking Platform",
    category: "application",
    description: "Production support, web configuration, and deployment orchestration for a high-availability ASP.NET banking application.",
    businessProblem: "Unstable releases, manual deployment checks, and application pool slowdowns causing frequent transaction delays.",
    solution: "Designed automated staging checks, optimized IIS application pool recycling rules, and established a structured incident response triage plan.",
    tools: ["ASP.NET", "IIS", "Windows Server", "Release Engineering"],
    challenges: "Analyzing legacy trace files and event logs to pin down thread locks and pool crashes during high transaction cycles.",
    results: "Ensured 99.99% application availability, eliminated manual rollout errors, and reduced ticket resolution times.",
    lessons: "Validating environment configuration values and setting proactive recycling schedules is key for legacy runtime stability.",
    github: "#",
    liveDemo: "#",
    diagramId: "nginx-architecture"
  },
  {
    id: "ent-monitoring",
    name: "Enterprise Monitoring Platform",
    category: "observability",
    description: "Centralized Prometheus and Grafana telemetry collection system covering critical host and application metrics.",
    businessProblem: "Reactive infrastructure support due to a lack of real-time insights into disk, memory, CPU, and web service parameters.",
    solution: "Deployed Windows Exporter agents across all hosting instances and built custom Grafana alert notification channels.",
    tools: ["Prometheus", "Grafana", "Windows Exporter", "Alerting"],
    challenges: "Filtering metrics traffic and configuring scrape intervals to avoid performance overhead on production servers.",
    results: "Enabled early detection of memory leaks and storage exhaustion events, cutting system outage rates significantly.",
    lessons: "Custom alerts are only useful when thresholds are tuned to actual workloads, preventing developer alert fatigue.",
    github: "#",
    liveDemo: "#",
    diagramId: "monitoring-architecture"
  },
  {
    id: "dr-validation",
    name: "Disaster Recovery Validation",
    category: "reliability",
    description: "Automated verification routines and failover procedures to validate business continuity across multi-cloud configurations.",
    businessProblem: "Validating database state replication and DNS switchover targets manually for compliance reports was slow and error-prone.",
    solution: "Developed script-driven testing rules that confirm active-passive database connectivity and route resolution speeds.",
    tools: ["AWS", "GCP", "DNS Routing", "Business Continuity"],
    challenges: "Conducting mock failovers and data sync integrity validation within strict non-disruptive testing windows.",
    results: "Successfully certified DR readiness across 7+ core client sites, verifying low recovery recovery time objectives (RTO).",
    lessons: "Frequent mock drill validation checks are the only way to guarantee runbooks integrity during a real outage.",
    github: "#",
    liveDemo: "#",
    diagramId: "devops-architecture"
  },
  {
    id: "iis-automation",
    name: "IIS Automation Framework",
    category: "automation",
    description: "PowerShell scripting framework automating application server diagnostics, security audits, and lifecycle management.",
    businessProblem: "Manual tasks like config backups, certificate updates, and pool diagnostics consumed valuable engineering hours.",
    solution: "Created modular PowerShell checkup playbooks and scheduler scripts with unified logging output.",
    tools: ["PowerShell", "Batch Scripting", "IIS", "Automation"],
    challenges: "Achieving secure administrative script execution across isolated environments without embedding user credentials.",
    results: "Eliminated repetitive host audit tasks and reduced support overhead by hours per week.",
    lessons: "Structured script logging and parameter validations prevent automation scripts from producing silent failures.",
    github: "#",
    liveDemo: "#",
    diagramId: "nginx-architecture"
  },
  {
    id: "golang-integration",
    name: "Golang Integration Service",
    category: "containerization",
    description: "Containerized data validation and integration backend written in Golang and run via Docker on Linux environments.",
    businessProblem: "Legacy parsing scripts failed to scale and behaved inconsistently across local development and staging environments.",
    solution: "Re-coded parsing services in Golang, wrapped them into lightweight Docker images, and set up Docker containers on Linux.",
    tools: ["Docker", "Golang", "Ubuntu Linux", "API Integration"],
    challenges: "Handling persistent volume attachments and debugging network routes between host layers and container processes.",
    results: "Standardized microservices run environments, cutting down local setup discrepancies to zero.",
    lessons: "Stateless container builds allow rapid, repeatable deployments and simplify container scaling actions.",
    github: "#",
    liveDemo: "#",
    diagramId: "docker-architecture"
  },
  {
    id: "log-lifecycle",
    name: "Linux Log Lifecycle Automation",
    category: "automation",
    description: "Automated scripting framework built to clean, archive, and manage log rotation parameters based on compliance rules.",
    businessProblem: "Unrestricted directory size growth from active application logs frequently exhausted disk storage space, crashing servers.",
    solution: "Developed Bash automation scripts to identify, filter, archive and securely remove application logs older than six days.",
    tools: ["Bash", "Linux", "Log Rotation", "Storage Optimization"],
    challenges: "Preserving lock handles on current writing log processes and protecting compliance files from accidental removal.",
    results: "Maintained complete compliance with log retention limits while recovering gigabytes of system storage space.",
    lessons: "Dry-run parameters and safety boundary checks are mandatory when writing automatic deletion playbooks.",
    github: "#",
    liveDemo: "#",
    diagramId: "devops-architecture"
  }
];

portfolioData.architectures = [
  {
    id: "iis-hosting",
    title: "Enterprise IIS Hosting",
    type: "iis",
    purpose: "Provides highly available web and mobile application hosting for enterprise banking workloads with active reverse proxy routing and telemetry monitoring.",
    description: "Production web server hosting architecture utilizing NGINX load balancer, reverse proxy, Microsoft IIS web servers, and database storage with active Prometheus metrics collection.",
    technologies: ["NGINX", "IIS", "ASP.NET", "Windows Server", "SQL Database", "Prometheus", "Grafana"],
    responsibilities: "Configure NGINX ingress route maps, optimize IIS application pool recycling and thread limits, verify backend database connections, and set up exporters for uptime monitoring.",
    operationalNotes: "Active monitoring collects metrics every 15s. Automated alerts trigger when IIS pool queue length exceeds 100 threads."
  },
  {
    id: "golang-integration",
    title: "Containerized Golang Integration",
    type: "docker",
    purpose: "Isolates and standardizes API translation runtimes, ensuring consistent deployment configurations across sandbox and production.",
    description: "Containerized integration service hosted on Ubuntu server environments utilizing NGINX edge routing and Docker containers for secure microservice transactions.",
    technologies: ["Docker", "Ubuntu", "Golang", "NGINX"],
    responsibilities: "Maintain multi-stage Docker build files, manage Docker network bridges, configure NGINX reverse proxy headers, and monitor Ubuntu system load thresholds.",
    operationalNotes: "Uses Docker restart policy 'unless-stopped'. Logs are rotated locally via Ubuntu logrotate rules to conserve space."
  },
  {
    id: "monitoring-observability",
    title: "Monitoring & Observability",
    type: "monitoring",
    purpose: "Ensures proactive fault detection, provides visual system telemetry, and minimizes mean time to resolution (MTTR) for infrastructure outages.",
    description: "Centralized observability platform displaying active performance metrics, custom SRE panels, and routing alert paths to the operations squad.",
    technologies: ["Prometheus", "Grafana", "Windows Exporter"],
    responsibilities: "Install and tune Windows Exporter services, configure scraping frequencies in Prometheus, construct Grafana dashboard grids, and program alerting routes.",
    operationalNotes: "Prometheus database has a 30-day retention lock. Grafana alerts are linked directly to operations messaging queues."
  },
  {
    id: "cicd-pipeline",
    title: "Azure DevOps CI/CD Pipeline",
    type: "pipeline",
    purpose: "Standardizes production artifact generation, ensures automated test execution, and eliminates manual deployment errors across all client environments.",
    description: "Enterprise deployment pipeline illustrating source code triggers, build validations, staging signoffs, automated web server provisioning, and immediate post-release monitoring.",
    technologies: ["Git", "GitHub", "Azure DevOps", ".NET", "ASP.NET", "IIS", "Prometheus", "Grafana"],
    responsibilities: "Author continuous integration yaml pipelines, design staging approvals gates, execute PowerShell automation checkouts, and build Grafana release dashboards.",
    operationalNotes: "Build triggers automatically on Git merge. Post-deployment validations run PowerShell tests against production endpoints."
  }
];
