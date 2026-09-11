if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.projects = [
  {
    id: "integration-platform",
    name: "Integration Platform",
    subtitle: "Containerized Application Deployment & Runtime Operations",
    category: "containerization",
    description: "Engineered deployment and runtime operations for a containerized integration platform consisting of a React frontend and Golang services running on Linux.",
    businessProblem: "Deploying multi-service integration components across varying environments caused runtime inconsistencies, port conflicts, and routing configuration errors.",
    engineeringSolution: "Implemented Docker Compose for multi-service application orchestration and configured Nginx reverse proxy with HTTPS routing and SSL/TLS termination.",
    implementation: "Managed container networking, environment configuration, and service lifecycle. Configured Nginx reverse proxy and HTTPS for frontend/API routing. Troubleshot service, database, SSL/TLS, CORS, HTTP 4xx/5xx, and container issues using application and container logs.",
    operationalOutcome: "Standardized multi-service container deployments across Linux hosts, ensuring reliable service communication, secure external access, and streamlined operational troubleshooting.",
    technologiesUsed: ["Docker", "Docker Compose", "Linux", "Nginx", "Golang", "React", "HTTPS"],
    lessonsLearned: "Defining clear container network bridges and consolidating ingress through an Nginx reverse proxy simplifies service lifecycle management and cross-service debugging.",
    github: "https://github.com/raghav-sudharsan",
    liveDemo: "#",
    diagramId: "docker-architecture"
  },
  {
    id: "msme-app",
    name: "MSME — Fintech Application Deployment",
    subtitle: "Java Application Deployment & Operations",
    category: "application",
    description: "Engineered application deployment workflows for a Java-based fintech application running on Linux, covering build artifacts, deployment, service management, and validation.",
    businessProblem: "Manual artifact handling and unstandardized release procedures led to deployment delays and runtime inconsistencies across staging and production hosts.",
    engineeringSolution: "Leveraged Azure DevOps and TFS CI/CD workflows to manage build artifacts, automate Linux application rollouts, and streamline release verification.",
    implementation: "Automated application-management activities using Linux scripting, managed deployment packages, conducted post-deployment health validation, and analyzed system and runtime logs.",
    operationalOutcome: "Standardized Linux application deployment cycles, eliminating configuration drift and accelerating issue resolution during environment promotion.",
    technologiesUsed: ["Java", "Linux", "Azure DevOps", "TFS", "Bash", "CI/CD"],
    lessonsLearned: "Pairing CI/CD build artifact promotion with automated Linux sanity-check scripts prevents deployment errors and ensures rapid detection of runtime failures.",
    github: "https://github.com/raghav-sudharsan",
    liveDemo: "#",
    diagramId: "devops-architecture"
  },
  {
    id: "prometheus-grafana",
    name: "Prometheus & Grafana Monitoring",
    subtitle: "Infrastructure Observability",
    category: "observability",
    description: "Built a monitoring environment using Prometheus and Grafana for Linux and Windows infrastructure metrics.",
    businessProblem: "Heterogeneous server environments lacked centralized visibility, making it difficult to detect CPU spikes, memory leaks, and disk space exhaustion before service disruption.",
    engineeringSolution: "Configured exporter-based metric collection using node_exporter and windows_exporter, engineered PromQL queries, and built centralized Grafana dashboards.",
    implementation: "Validated Prometheus scrape targets, confirmed metric availability, created PromQL queries for resource thresholds, and troubleshot exporter scraping and connectivity issues.",
    operationalOutcome: "Delivered comprehensive infrastructure observability across Windows and Linux, enabling proactive resource bottleneck detection and reducing incident triage time.",
    technologiesUsed: ["Prometheus", "Grafana", "Linux", "Windows", "node_exporter", "windows_exporter", "PromQL"],
    lessonsLearned: "Creating tailored PromQL queries aligned with operating system metrics prevents alert noise while maintaining high visibility into critical infrastructure constraints.",
    github: "https://github.com/raghav-sudharsan",
    liveDemo: "#",
    diagramId: "monitoring-architecture"
  },
  {
    id: "aws-resource-tracker",
    name: "AWS Resource Tracker",
    subtitle: "Cloud Operations Automation",
    category: "automation",
    description: "Developed a Bash-based utility using AWS CLI to collect AWS resource information and generate operational reports.",
    businessProblem: "Manual inventory tracking of regional cloud compute, storage, and networking resources across active AWS accounts was tedious and error-prone.",
    engineeringSolution: "Created a lightweight shell automation utility utilizing the AWS CLI to query active resources and format structured operational summary reports.",
    implementation: "Scripted AWS CLI commands to discover EC2, S3, IAM, and networking resources, and scheduled automated recurring execution via Linux Cron.",
    operationalOutcome: "Automated routine cloud resource discovery and reporting, reducing manual audit effort and providing dependable periodic operational visibility.",
    technologiesUsed: ["AWS CLI", "Bash", "Linux", "Cron", "AWS"],
    lessonsLearned: "Lightweight CLI-driven automation combined with native Linux Cron provides a reliable, low-overhead solution for recurring operational reporting without heavy external tooling.",
    github: "https://github.com/raghav-sudharsan",
    liveDemo: "#",
    diagramId: "devops-architecture"
  },
  {
    id: "dr-validation",
    name: "Disaster Recovery & Failover Validation",
    subtitle: "Enterprise Disaster Recovery & Business Continuity",
    category: "reliability",
    description: "Executed and validated Disaster Recovery drills across SaaS and enterprise applications, confirming infrastructure recovery, application availability, and failover procedures.",
    businessProblem: "Validating business continuity across enterprise client setups required structured failover execution, network verification, and zero transaction data loss.",
    engineeringSolution: "Coordinated mock failover scenarios, validated replication synchronization, verified DNS routing, and executed service restoration procedures.",
    implementation: "Conducted 10+ DR drills across regional client infrastructure on AWS, GCP, and on-premises environments, testing connectivity and executing post-switchover validation scripts.",
    operationalOutcome: "Successfully achieved 10+ Disaster Recovery drills with zero critical deviations during recovery validation, certifying business continuity compliance.",
    technologiesUsed: ["AWS", "GCP", "Windows Server", "Linux", "DNS", "PowerShell"],
    lessonsLearned: "Regular, structured DR validation is the only way to verify runbook accuracy and ensure recovery time objectives (RTO) are reliably met during unexpected outages.",
    github: "https://github.com/raghav-sudharsan",
    liveDemo: "#",
    diagramId: "devops-architecture"
  }
];

portfolioData.architectures = [
  {
    id: "iis-hosting",
    title: "IIS / .NET Production Application",
    type: "iis",
    tag: "Enterprise Web Tier",
    flowSummary: "Client → Nginx (WAF & TLS) → IIS Web Tier → ASP.NET / .NET Framework → SQL Server",
    purpose: "Delivers resilient, secure web application hosting using Nginx reverse proxying, WAF inspection, and IIS application pool lifecycle management.",
    description: "Production IIS architecture utilizing Nginx as a reverse proxy for request routing, SSL/TLS termination, and application traffic management to monolithic ASP.NET applications on Windows Server.",
    technologies: ["Nginx", "WAF/ModSecurity", "IIS 10", "ASP.NET", ".NET Framework", "Windows Server", "SQL Server", "Prometheus"],
    responsibilities: "Configure Nginx reverse proxy routes, manage IIS application pools and worker limits, and troubleshoot HTTP/TLS, WAF, and database connectivity.",
    operationalNotes: "Proactive recycling limit tuning and Prometheus monitoring prevent worker process thread exhaustion during transactional spikes.",
    nodes: [
      { id: "client", label: "Client Ingress", role: "External Request Source", details: "Public clients initiating HTTPS requests over TLS 1.3." },
      { id: "nginx", label: "Nginx & WAF", role: "Reverse Proxy & Load Balancer", details: "Terminates TLS, filters malicious payloads via ModSecurity/WAF, and balances traffic across web tiers." },
      { id: "iis", label: "IIS 10 Web Tier", role: "Application Server Host", details: "Manages dedicated application pools, worker process recycling rules, and HTTP request pipelines." },
      { id: "dotnet", label: "ASP.NET Framework", role: "Application Runtime", details: "Executes core fintech business logic, session handling, and backend service communication." },
      { id: "db", label: "SQL Server", role: "Database Persistence", details: "Transactional database tier with replication and automated backup verification." },
      { id: "prom", label: "Prometheus & Exporter", role: "Observability Layer", details: "windows_exporter captures CPU, memory, thread pool, and IIS request rates for PromQL alerting." }
    ]
  },
  {
    id: "docker-platform",
    title: "Containerized Integration Platform",
    type: "docker",
    tag: "Multi-Service Container Runtime",
    flowSummary: "Client → HTTPS → Nginx Ingress → React Frontend → Golang Services → Database / APIs",
    purpose: "Standardizes multi-service deployment boundaries, service lifecycle management, and ingress routing.",
    description: "Multi-service containerized architecture orchestrated via Docker Compose, running React frontend and Golang backend services behind an Nginx reverse proxy on Linux.",
    technologies: ["Docker", "Docker Compose", "Linux", "Nginx", "Golang", "React", "HTTPS"],
    responsibilities: "Manage Docker Compose configurations, bridge container networks, configure Nginx reverse proxy with HTTPS, and triage container and service logs.",
    operationalNotes: "Container restart policies and structured logging allow fast diagnosis of 4xx/5xx responses and connection bottlenecks.",
    nodes: [
      { id: "client", label: "Client Ingress", role: "Request Source", details: "Client browsers accessing web interface and external systems invoking integration endpoints." },
      { id: "nginx", label: "Nginx Ingress", role: "Reverse Proxy & Router", details: "Directs web requests to React container and API requests to Golang backend with SSL/TLS termination." },
      { id: "react", label: "React Frontend", role: "UI Container", details: "Containerized Single Page Application served with static caching and health check endpoints." },
      { id: "golang", label: "Golang Services", role: "Integration Engine", details: "Lightweight compiled service container handling data translation and external endpoint orchestration." },
      { id: "linux", label: "Linux Host & Docker", role: "Container Runtime Platform", details: "Docker Compose manages bridge networking, volume mounts, environment variables, and restart policies." },
      { id: "endpoints", label: "Database / APIs", role: "Upstream Dependencies", details: "Target database storage and third-party fintech API endpoints." }
    ]
  },
  {
    id: "java-devops",
    title: "Java / Linux CI/CD & Deployment Flow",
    type: "pipeline",
    tag: "Automated Deployment Pipeline",
    flowSummary: "Azure DevOps / TFS → Build Artifact → Linux Server (systemd) → Java App → Validation → Monitoring",
    purpose: "Coordinates application build artifacts, release pipelines, and automated environment promotion.",
    description: "End-to-end deployment workflow promoting application builds from source repositories through Azure DevOps/TFS pipelines to Linux production nodes with automated health validation.",
    technologies: ["Azure DevOps", "TFS", "Git", "Bash", "Java", "Linux", "Prometheus"],
    responsibilities: "Manage build artifacts, configure pipeline release stages, author validation scripts in Bash, and execute post-deployment validation.",
    operationalNotes: "Automated pre-flight and post-deployment validation scripts verify endpoint status and database connectivity before traffic switchover.",
    nodes: [
      { id: "git", label: "Git Repository", role: "Source Control", details: "Version controlled source repository tracking changes and release tags." },
      { id: "cicd", label: "Azure DevOps / TFS", role: "Build & Release Pipeline", details: "Automated build execution, compilation verification, and package generation." },
      { id: "artifact", label: "Build Artifact", role: "Versioned Package", details: "Immutable JAR/WAR deployment package published to artifact repository." },
      { id: "linux", label: "Linux Deployment", role: "Target Environment", details: "Automated deployment via shell scripts, systemd service lifecycle control, and configuration injection." },
      { id: "java", label: "Java Application", role: "Fintech Service Tier", details: "Running application instance with JVM monitoring, thread configuration, and structured logging." },
      { id: "verify", label: "Health & Telemetry", role: "Validation & Observability", details: "Automated health checks probe endpoints; node_exporter reports host metrics to Prometheus." }
    ]
  }
];
