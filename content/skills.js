if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.skills = [
  {
    category: "Application Engineering",
    items: [
      { name: "ASP.NET Applications", level: 92, icon: "code" },
      { name: ".NET Integration Services", level: 88, icon: "link" },
      { name: "IIS", level: 95, icon: "server" },
      { name: "Java Deployment", level: 80, icon: "cpu" },
      { name: "Node.js Deployment", level: 85, icon: "code" }
    ]
  },
  {
    category: "Cloud Engineering",
    items: [
      { name: "AWS", level: 90, icon: "cloud" },
      { name: "Google Cloud Platform", level: 85, icon: "cloud" },
      { name: "VM Management", level: 92, icon: "server" },
      { name: "VPC Administration", level: 88, icon: "globe" }
    ]
  },
  {
    category: "Containerization",
    items: [
      { name: "Docker", level: 90, icon: "layers" },
      { name: "Golang Integration", level: 82, icon: "code" },
      { name: "Ubuntu Linux", level: 88, icon: "terminal" }
    ]
  },
  {
    category: "CI/CD",
    items: [
      { name: "Azure DevOps Pipelines", level: 88, icon: "git-pull-request" },
      { name: "Deployment Validation", level: 92, icon: "check-circle" },
      { name: "Release Engineering", level: 90, icon: "settings" }
    ]
  },
  {
    category: "Monitoring & Observability",
    items: [
      { name: "Prometheus", level: 90, icon: "activity" },
      { name: "Grafana", level: 92, icon: "layout" },
      { name: "Windows Exporter", level: 90, icon: "cpu" },
      { name: "Alerting", level: 92, icon: "bell" }
    ]
  },
  {
    category: "Automation",
    items: [
      { name: "PowerShell", level: 95, icon: "terminal" },
      { name: "Python", level: 80, icon: "code" },
      { name: "Bash", level: 88, icon: "terminal" },
      { name: "Batch", level: 90, icon: "terminal" }
    ]
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Windows Server", level: 95, icon: "server" },
      { name: "Linux", level: 85, icon: "terminal" },
      { name: "Active Directory", level: 92, icon: "users" },
      { name: "DNS", level: 90, icon: "globe" },
      { name: "DHCP", level: 90, icon: "link" }
    ]
  },
  {
    category: "Web Servers",
    items: [
      { name: "IIS", level: 95, icon: "server" },
      { name: "NGINX", level: 85, icon: "server" },
      { name: "Apache", level: 80, icon: "server" }
    ]
  },
  {
    category: "AI-Assisted Operations",
    items: [
      { name: "Kiro AI Agent", level: 85, icon: "cpu" },
      { name: "AI-assisted AWS Monitoring", level: 88, icon: "cloud" },
      { name: "Intelligent Operational Workflows", level: 85, icon: "zap" }
    ]
  }
];

portfolioData.operationalHighlights = [
  {
    title: "Golang Integration Deployment",
    description: "Orchestrated runtime deployments of custom Golang validation modules onto isolated Ubuntu Linux server systems."
  },
  {
    title: "Docker Container Deployment",
    description: "Created standardized Dockerfiles and docker-compose tasks to achieve consistent testing and staging deployments."
  },
  {
    title: "Azure DevOps Pipeline Implementation",
    description: "Designed build and deploy tasks within Azure DevOps to automate continuous release pipelines for application validation."
  },
  {
    title: "Production Debugging",
    description: "Analyzed runtime logs and event viewer streams to trace code defects and environment config misalignments."
  },
  {
    title: "Application Troubleshooting",
    description: "Investigated system slowdowns and application worker pool queueing delays to restore degraded services rapidly."
  },
  {
    title: "IIS Administration",
    description: "Managed host configurations, SSL certifications bindings, and private bytes memory recycling parameters for web applications."
  },
  {
    title: "Log Rotation",
    description: "Established daily log rotation script scheduling to manage application logs directories and secure disk storage."
  },
  {
    title: "Audit Log Archival",
    description: "Programmed script tasks to filter, compress, and securely archive compliance audit logs older than six days."
  },
  {
    title: "Exception Log Management",
    description: "Constructed targeted alerts to identify sudden spikes in exception folders, optimizing post-incident investigation speeds."
  },
  {
    title: "Cloud VM Administration",
    description: "Administered virtual machine scaling, security groups, and storage volumes across AWS and GCP hosting environments."
  },
  {
    title: "Infrastructure Maintenance",
    description: "Managed Active Directory user provisioning, DNS lookups validation, and DHCP range updates for local and cloud systems."
  }
];
