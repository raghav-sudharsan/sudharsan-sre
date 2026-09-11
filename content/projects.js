if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.projects = [
  {
    id: "connect-i",
    name: "Connect-i — Integration Platform",
    category: "containerization",
    description: "Engineered deployment and runtime operations for a containerized integration platform consisting of a React frontend and Golang services running on Linux.",
    businessProblem: "Deploying multi-service integration components across varying environments caused runtime inconsistencies, port conflicts, and routing configuration errors.",
    engineeringSolution: "Implemented Docker Compose for multi-service application orchestration and configured Nginx reverse proxy with HTTPS routing and SSL/TLS termination.",
    implementation: "Managed container networking, environment variables, and service lifecycle. Troubleshot service, database, SSL/TLS, CORS, HTTP 4xx/5xx, and container issues using application and container logs.",
    operationalOutcome: "Standardized container runtime deployments on Linux, establishing clean service isolation, reliable API routing, and efficient operational troubleshooting.",
    technologiesUsed: ["Docker", "Docker Compose", "Linux", "Nginx", "Golang", "React", "HTTPS"],
    lessonsLearned: "Defining clear container network bridges and consolidating routing through an Nginx reverse proxy significantly simplifies operational troubleshooting and SSL certificate management.",
    github: "https://github.com/raghav-sudharsan",
    liveDemo: "#",
    diagramId: "docker-architecture"
  },
  {
    id: "msme-app",
    name: "MSME — Fintech Application Deployment",
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
    title: "Enterprise Application Hosting (IIS & Nginx)",
    type: "iis",
    purpose: "Provides high-availability application hosting with Nginx reverse proxying and IIS application pool lifecycle management.",
    description: "Production IIS architecture utilizing Nginx as a reverse proxy for request routing, SSL/TLS termination, and application traffic management to monolithic ASP.NET applications.",
    technologies: ["Nginx", "IIS 10", "ASP.NET", "Windows Server", "SQL Server", "Prometheus"],
    responsibilities: "Configure Nginx reverse proxy routes, manage IIS application pools and worker limits, and troubleshoot HTTP/TLS, WAF, and database connectivity.",
    operationalNotes: "Proactive recycling limit tuning and Prometheus monitoring prevent worker process thread exhaustion during transactional spikes."
  },
  {
    id: "golang-integration",
    title: "Containerized Integration Platform (Connect-i)",
    type: "docker",
    purpose: "Standardizes multi-service deployment boundaries, service lifecycle management, and ingress routing.",
    description: "Multi-service containerized architecture orchestrated via Docker Compose, running React frontend and Golang backend services behind an Nginx reverse proxy.",
    technologies: ["Docker", "Docker Compose", "Nginx", "Linux", "Golang", "HTTPS"],
    responsibilities: "Manage Docker Compose configurations, bridge container networks, configure Nginx reverse proxy with HTTPS, and triage container and service logs.",
    operationalNotes: "Container restart policies and structured logging allow fast diagnosis of 4xx/5xx responses and connection bottlenecks."
  },
  {
    id: "monitoring-observability",
    title: "Heterogeneous Observability Pipeline",
    type: "monitoring",
    purpose: "Provides real-time visibility into Windows and Linux server health, resource utilization, and threshold alerting.",
    description: "Prometheus and Grafana monitoring platform scraping Windows and Linux metrics via dedicated exporters, analyzed with custom PromQL queries.",
    technologies: ["Prometheus", "Grafana", "node_exporter", "windows_exporter", "PromQL", "Alertmanager"],
    responsibilities: "Deploy and configure node_exporter and windows_exporter, write PromQL queries, create Grafana dashboards, and tune alerting rules.",
    operationalNotes: "Alert thresholds are tuned to host baseline parameters to prevent notification fatigue while catching resource leaks early."
  },
  {
    id: "cicd-pipeline",
    title: "Azure DevOps CI/CD & Deployment Flow",
    type: "pipeline",
    purpose: "Coordinates application build artifacts, release pipelines, and automated environment promotion.",
    description: "End-to-end deployment workflow promoting application builds from source repositories through Azure DevOps/TFS pipelines to IIS and Linux production nodes.",
    technologies: ["Azure DevOps", "TFS", "Git", "PowerShell", "Bash", "CI/CD"],
    responsibilities: "Manage build artifacts, configure pipeline release stages, author validation scripts in PowerShell/Bash, and execute deployment validation.",
    operationalNotes: "Automated pre-flight and post-deployment validation scripts verify endpoint status and database connectivity before traffic switchover."
  }
];
