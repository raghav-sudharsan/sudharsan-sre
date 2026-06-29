if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.skills = [
  {
    category: "Application Engineering",
    items: [
      { name: "ASP.NET Applications", level: 92, icon: "code" },
      { name: ".NET Integration Services", level: 88, icon: "link" },
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
      { name: "Golang Integration", level: 82, icon: "code" }
    ]
  },
  {
    category: "CI/CD & Release Engineering",
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
    category: "Automation Scripting",
    items: [
      { name: "PowerShell", level: 95, icon: "terminal" },
      { name: "Python", level: 80, icon: "code" },
      { name: "Bash & Batch Scripting", level: 90, icon: "terminal" }
    ]
  },
  {
    category: "Infrastructure Services",
    items: [
      { name: "Windows Server Administration", level: 95, icon: "server" },
      { name: "Linux Administration", level: 88, icon: "terminal" },
      { name: "Active Directory", level: 92, icon: "users" },
      { name: "DNS & DHCP", level: 90, icon: "globe" }
    ]
  },
  {
    category: "Web Server Operations",
    items: [
      { name: "IIS Web Server", level: 95, icon: "server" },
      { name: "NGINX Load Balancer", level: 85, icon: "server" },
      { name: "Apache Web Server", level: 80, icon: "server" }
    ]
  }
];

portfolioData.operationalHighlights = [
  {
    title: "Application Deployment",
    description: "Orchestrated runtime deployments of custom backend modules onto isolated system architectures."
  },
  {
    title: "Container Deployment",
    description: "Configured standardized application container images to achieve consistent testing and production environment staging."
  },
  {
    title: "Continuous Release Pipelines",
    description: "Designed build and deploy workflows to automate continuous release verification loops."
  },
  {
    title: "Root Cause Investigation",
    description: "Analyzed runtime systems, tracing code exceptions and configuration mismatches to prevent outage recurrence."
  },
  {
    title: "Service Degradation Recovery",
    description: "Mitigated resource queuing and process delays to restore host operational capacity."
  },
  {
    title: "Web Server Administration",
    description: "Managed host resource limits, SSL certificates, and application pool settings to optimize response speeds."
  },
  {
    title: "Storage Lifecycle Management",
    description: "Structured directory cleanup routine rules to manage log paths and maintain storage availability."
  },
  {
    title: "Audit Log Management",
    description: "Implemented secure archiving routines for compliance-bound operational logs."
  },
  {
    title: "Telemetry & Alerting",
    description: "Established targeted thresholds to identify anomalous behavior and expedite response team engagement."
  },
  {
    title: "Cloud Resource Management",
    description: "Provisioned virtual machines, security settings, and disk scaling parameters across cloud hosting layers."
  },
  {
    title: "Directory & Domain Operations",
    description: "Maintained user access, network lookups validation, and configuration records across directory services."
  }
];

