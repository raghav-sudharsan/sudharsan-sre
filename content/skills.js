if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.skills = [
  {
    title: "DevOps & CI/CD",
    domainLens: "What I Deploy",
    description: "Build artifact coordination, release promotion, and CI/CD deployment validation across environments.",
    icon: "git-pull-request",
    technologies: ["Azure DevOps", "TFS", "Git", "GitHub", "GitLab", "Jenkins", "GitHub Actions", "CI/CD", "Build Artifacts", "Application Deployment"]
  },
  {
    title: "Cloud Infrastructure",
    domainLens: "What Infrastructure I Work With",
    description: "Management, connectivity, and operations of regional client infrastructure across cloud providers.",
    icon: "cloud",
    technologies: ["AWS", "GCP", "EC2", "AWS CLI"]
  },
  {
    title: "Containers",
    domainLens: "What I Deploy",
    description: "Multi-service container lifecycle management, image builds, and service networking with Docker Compose.",
    icon: "box",
    technologies: ["Docker", "Docker Compose"]
  },
  {
    title: "Observability",
    domainLens: "What I Monitor",
    description: "Exporter-based metric collection, PromQL analysis, alerting rules, and real-time dashboard visibility.",
    icon: "activity",
    technologies: ["Prometheus", "Grafana", "node_exporter", "windows_exporter", "PromQL", "Infrastructure Monitoring"]
  },
  {
    title: "Linux Administration",
    domainLens: "What I Operate",
    description: "Operating system administration, shell scripting, service management, user permissions, and log analysis.",
    icon: "terminal",
    technologies: ["Ubuntu/Linux", "Bash", "Shell Scripting", "Cron", "Service Management", "Log Analysis"]
  },
  {
    title: "Windows & Application Infrastructure",
    domainLens: "What I Operate",
    description: "IIS 10 web server management, application pool recycling, worker process limits, and administrative PowerShell.",
    icon: "server",
    technologies: ["Windows Server", "IIS", "PowerShell", "ASP.NET", ".NET Framework"]
  },
  {
    title: "Web & Networking",
    domainLens: "What I Operate",
    description: "Reverse proxy routing, web-tier security, ingress traffic management, DNS, and SSL/TLS certificate handling.",
    icon: "shield",
    technologies: ["Nginx", "Reverse Proxy", "Load Balancing", "WAF/ModSecurity", "DNS", "HTTP/HTTPS", "TLS", "CORS"]
  },
  {
    title: "Applications & Database",
    domainLens: "What I Operate",
    description: "Deployment validation, runtime configuration, and operational troubleshooting for application tiers.",
    icon: "code",
    technologies: [".NET", "ASP.NET", "Java", "Golang", "React", "Vite", "SQL Server"]
  },
  {
    title: "Operations & Reliability",
    domainLens: "What I Automate",
    description: "Production support, active incident response, root cause analysis, disaster recovery drills, and VAPT remediation.",
    icon: "refresh-cw",
    technologies: ["Production Support", "Incident Management", "Troubleshooting", "Root Cause Analysis", "Release Management", "Environment Management", "VAPT Remediation"]
  }
];
