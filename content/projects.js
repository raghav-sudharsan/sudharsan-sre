if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.projects = [
  {
    id: "ent-banking",
    name: "Enterprise Application Hosting",
    category: "application",
    description: "Production support, web configuration, and deployment orchestration for high-availability applications.",
    businessProblem: "Application pool crashes and manual configuration errors during transactional spikes.",
    engineeringSolution: "Designed automated staging checks and optimized application pool recycling rules.",
    implementation: "Configured target checks to monitor thread queue thresholds and event log exception files.",
    operationalOutcome: "Achieved 99.99% application availability and eliminated manual deployment validation steps.",
    technologiesUsed: ["ASP.NET", "IIS", "Windows Server"],
    lessonsLearned: "Proactive recycling limit tuning is required to prevent thread locking in high-load systems.",
    github: "#",
    liveDemo: "#",
    diagramId: "nginx-architecture"
  },
  {
    id: "ent-monitoring",
    name: "Enterprise Monitoring Platform",
    category: "observability",
    description: "Centralized telemetry collection system covering critical host and application metrics.",
    businessProblem: "Reactive infrastructure support due to a lack of real-time insights into host parameters.",
    engineeringSolution: "Deployed host metric agents across hosting instances and built status alert channels.",
    implementation: "Configured scraping intervals and database storage limits to ensure performance reliability.",
    operationalOutcome: "Enabled early detection of memory leaks, cutting system outage rates significantly.",
    technologiesUsed: ["Prometheus", "Grafana", "Windows Exporter"],
    lessonsLearned: "Tuning alerts to actual workload thresholds is necessary to prevent alert fatigue.",
    github: "#",
    liveDemo: "#",
    diagramId: "monitoring-architecture"
  },
  {
    id: "dr-validation",
    name: "Disaster Recovery Validation",
    category: "reliability",
    description: "Automated verification routines to validate business continuity across multi-cloud setups.",
    businessProblem: "Manual database replication and route switchover checks were slow and prone to human error.",
    engineeringSolution: "Developed script-driven testing rules confirming passive host target connectivity.",
    implementation: "Executed mock failover scenarios and validated replication sync speeds.",
    operationalOutcome: "Certified disaster recovery readiness across client sites, validating recovery time objectives.",
    technologiesUsed: ["AWS", "Google Cloud Platform", "DNS Routing"],
    lessonsLearned: "Frequent mock drill validation is the only way to guarantee runbook integrity.",
    github: "#",
    liveDemo: "#",
    diagramId: "devops-architecture"
  },
  {
    id: "iis-automation",
    name: "IIS Automation Framework",
    category: "automation",
    description: "Scripting framework automating server diagnostics and lifecycle management tasks.",
    businessProblem: "Manual configuration backups and certificate updates consumed engineering hours.",
    engineeringSolution: "Created modular scripting checkup playbooks and execution schedules.",
    implementation: "Designed secure administrative script validation boundaries across isolated host systems.",
    operationalOutcome: "Eliminated repetitive server auditing tasks, reducing operational support overhead.",
    technologiesUsed: ["PowerShell", "Batch Scripting", "IIS"],
    lessonsLearned: "Structured script parameters and logging rules prevent undetected automation failures.",
    github: "#",
    liveDemo: "#",
    diagramId: "nginx-architecture"
  },
  {
    id: "golang-integration",
    name: "Golang Integration Service",
    category: "containerization",
    description: "Containerized data validation and integration backend deployed on Linux systems.",
    businessProblem: "Legacy parsing scripts behaved inconsistently across staging and production environments.",
    engineeringSolution: "Re-coded services into compiled binaries and packaged them into container images.",
    implementation: "Configured container networking and bridged host storage volumes to secure container paths.",
    operationalOutcome: "Standardized service runtime environments, reducing local setup discrepancy errors.",
    technologiesUsed: ["Docker", "Golang", "Linux"],
    lessonsLearned: "Stateless container builds allow rapid, repeatable rollouts and simple scaling actions.",
    github: "#",
    liveDemo: "#",
    diagramId: "docker-architecture"
  },
  {
    id: "log-lifecycle",
    name: "Linux Log Lifecycle Automation",
    category: "automation",
    description: "Automated scripting framework to clean and manage log retention parameters.",
    businessProblem: "Unrestricted application log growth exhausted host storage, causing service outages.",
    engineeringSolution: "Developed cleanup automation scripts to filter and archive logs based on age.",
    implementation: "Programmed directory size checks and compression tasks without locking active files.",
    operationalOutcome: "Maintained retention compliance while recovering host storage space.",
    technologiesUsed: ["Bash", "Linux", "Storage Optimization"],
    lessonsLearned: "Boundary validation checks are critical when creating automated deletion tools.",
    github: "#",
    liveDemo: "#",
    diagramId: "devops-architecture"
  }
];

portfolioData.architectures = [
  {
    id: "iis-hosting",
    title: "Enterprise Application Hosting",
    type: "iis",
    purpose: "Provides high-availability application hosting with load balancing and reverse proxy routing.",
    description: "Web server hosting layout utilizing ingress load balancing, reverse proxy routing, and app server hosts.",
    technologies: ["NGINX", "IIS", "ASP.NET", "Windows Server"],
    responsibilities: "Configure ingress route maps, optimize application pool recycling parameters, and monitor backend database connections.",
    operationalNotes: "Automated health checks trigger pool recycles if thread limits are exceeded."
  },
  {
    id: "golang-integration",
    title: "Containerized Golang Integration",
    type: "docker",
    purpose: "Isolates and standardizes data translation runtimes across environments.",
    description: "Containerized integration service hosted on Linux platforms using edge routing proxies.",
    technologies: ["Docker", "Golang", "Linux"],
    responsibilities: "Maintain multi-stage container build configurations, manage network bridges, and monitor host system resources.",
    operationalNotes: "Logs are rotated locally to preserve disk storage capacity."
  },
  {
    id: "monitoring-observability",
    title: "Monitoring & Observability",
    type: "monitoring",
    purpose: "Enables proactive fault detection and provides real-time system metrics.",
    description: "Centralized metrics collection platform displaying telemetry gauges and dispatching alert routes.",
    technologies: ["Prometheus", "Grafana", "Windows Exporter"],
    responsibilities: "Install host metric agents, define collection intervals, construct status dashboards, and configure alerting targets.",
    operationalNotes: "Dashboard alerts connect directly to incident management queues."
  },
  {
    id: "cicd-pipeline",
    title: "Azure DevOps CI/CD Pipeline",
    type: "pipeline",
    purpose: "Standardizes build generation and automates delivery stages to prevent deployment failures.",
    description: "Release pipeline showing code commits, build validations, staging checkouts, and environment rollouts.",
    technologies: ["Azure DevOps", "Git", "PowerShell"],
    responsibilities: "Author continuous integration pipeline specifications, configure environment approval checkpoints, and develop check scripts.",
    operationalNotes: "Validations run automated tests against endpoints post-deployment."
  }
];
