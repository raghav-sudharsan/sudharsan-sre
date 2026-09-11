if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.skills = [
  {
    title: "DevOps & CI/CD",
    description: "Build artifact coordination, deployment pipelines, and continuous environment delivery.",
    icon: "git-pull-request",
    technologies: ["Azure DevOps", "TFS", "Git", "GitHub", "GitLab", "Jenkins", "GitHub Actions", "CI/CD", "Build Artifacts", "Application Deployment"]
  },
  {
    title: "Cloud Infrastructure",
    description: "Management and operations of regional client infrastructure across cloud platforms.",
    icon: "cloud",
    technologies: ["AWS", "GCP", "EC2", "AWS CLI"]
  },
  {
    title: "Containers",
    description: "Containerization and multi-service lifecycle orchestration across environments.",
    icon: "box",
    technologies: ["Docker", "Docker Compose"]
  },
  {
    title: "Monitoring & Observability",
    description: "Exporter-based metric collection, PromQL analysis, and centralized dashboard visualization.",
    icon: "activity",
    technologies: ["Prometheus", "Grafana", "node_exporter", "windows_exporter", "PromQL", "Infrastructure Monitoring", "Observability"]
  },
  {
    title: "Linux Administration",
    description: "Operating system administration, shell scripting, service management, and log triage.",
    icon: "terminal",
    technologies: ["Ubuntu/Linux", "Bash", "Shell Scripting", "Cron", "Service Management", "Log Analysis"]
  },
  {
    title: "Windows Administration",
    description: "IIS web hosting, runtime configuration, application pools, and administrative scripting.",
    icon: "server",
    technologies: ["Windows Server", "IIS", "PowerShell", "ASP.NET/.NET Framework"]
  },
  {
    title: "Web & Networking",
    description: "Reverse proxy routing, web-tier security, ingress traffic management, and connectivity.",
    icon: "shield",
    technologies: ["Nginx", "Reverse Proxy", "Load Balancing", "WAF/ModSecurity", "DNS", "HTTP/HTTPS", "TLS", "CORS"]
  },
  {
    title: "Applications & Database",
    description: "Deployment, operational support, and troubleshooting for enterprise application tiers.",
    icon: "code",
    technologies: [".NET", "ASP.NET", "Java", "Golang", "React", "Vite", "SQL Server"]
  },
  {
    title: "Operations & Reliability",
    description: "Production support, incident response, root cause analysis, and disaster recovery validation.",
    icon: "refresh-cw",
    technologies: ["Production Support", "Incident Management", "Root Cause Analysis", "Release Management", "Environment Management", "Disaster Recovery", "VAPT Remediation"]
  }
];

portfolioData.engineeringContributions = [
  {
    title: "Production Application Hosting",
    description: "Manage IIS 10 and Windows Server application environments, worker process recycling, and runtime configurations for monolithic ASP.NET applications.",
    outcome: "Ensured high service availability and rapid HTTP/application troubleshooting.",
    icon: "server"
  },
  {
    title: "Disaster Recovery Validation",
    description: "Execute structured Disaster Recovery drills across SaaS and enterprise applications, validating infrastructure recovery, failover procedures, and service restoration.",
    outcome: "Completed 10+ DR drills with zero critical deviations during recovery validation.",
    icon: "refresh-cw"
  },
  {
    title: "Infrastructure Observability",
    description: "Design and maintain Prometheus and Grafana monitoring for Windows and Linux infrastructure using dedicated exporters and PromQL queries.",
    outcome: "Enabled proactive system resource visibility across CPU, memory, and disk constraints.",
    icon: "activity"
  },
  {
    title: "Regional Cloud Operations",
    description: "Manage regional client infrastructure across AWS and GCP, covering compute, networking, connectivity, and environment-specific configurations.",
    outcome: "Maintained stable multi-cloud client environments and secure remote access.",
    icon: "cloud"
  },
  {
    title: "Web-Tier Routing & Security",
    description: "Implement and maintain Nginx reverse proxy architecture for request routing, web-tier security, WAF/ModSecurity, and HTTPS/TLS traffic management.",
    outcome: "Strengthened web security boundaries and streamlined traffic distribution.",
    icon: "shield"
  },
  {
    title: "Operational Automation",
    description: "Develop administrative scripting playbooks using PowerShell and Bash for application configuration audits, health checks, and process management.",
    outcome: "Eliminated repetitive manual toil and streamlined recurring operational routines.",
    icon: "terminal"
  }
];
