if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.skills = [
  {
    title: "Cloud & Infrastructure",
    description: "Orchestration and provisioning of secure cloud environments and physical server infrastructure.",
    icon: "cloud",
    technologies: ["AWS", "Google Cloud Platform", "Windows Server", "Linux", "Virtual Machines", "VPC"]
  },
  {
    title: "Application Engineering",
    description: "Deployment, configuration, and optimization of enterprise application hosts and runtime systems.",
    icon: "code",
    technologies: ["ASP.NET", ".NET 9", "Microsoft IIS", "Java", "Node.js", "Golang Integration"]
  },
  {
    title: "Monitoring & Reliability",
    description: "Implementation of comprehensive telemetry dashboards and proactive threshold alerting paths.",
    icon: "activity",
    technologies: ["Prometheus", "Grafana", "Windows Exporter", "Application Monitoring", "Infrastructure Monitoring", "Alerting"]
  },
  {
    title: "Automation & Scripting",
    description: "Development of administrative scripts and automated playbooks to eliminate manual toil.",
    icon: "terminal",
    technologies: ["PowerShell", "Batch", "Python", "Bash", "Operational Automation"]
  },
  {
    title: "DevOps & Deployment",
    description: "Configuration of continuous release pipelines and post-release check verification boundaries.",
    icon: "git-pull-request",
    technologies: ["Azure DevOps", "Git", "GitHub", "CI/CD", "Release Validation", "Deployment Validation"]
  },
  {
    title: "Production Operations",
    description: "Lead priority incident response, root cause investigations, and disaster recovery validation.",
    icon: "shield",
    technologies: ["Incident Response", "Root Cause Analysis", "Disaster Recovery", "Change Management", "Problem Management", "SLA/SLO"]
  }
];

portfolioData.engineeringContributions = [
  {
    title: "Production Engineering",
    description: "Manage high-availability server configurations and runtime limits for business-critical SaaS platforms.",
    outcome: "Maintained 99.9% uptime compliance across multiple live application nodes.",
    icon: "server"
  },
  {
    title: "Monitoring & Observability",
    description: "Deploy target exporters and dashboards to gain real-time system resource insights.",
    outcome: "Identified memory leaks and disk exhaustion events before degradation occurred.",
    icon: "activity"
  },
  {
    title: "Deployment Engineering",
    description: "Orchestrate continuous delivery cycles and construct environment approval gates.",
    outcome: "Eliminated configuration drift and manual verification errors during rollouts.",
    icon: "git-pull-request"
  },
  {
    title: "Infrastructure Automation",
    description: "Write administrative scripting playbooks to optimize routine server auditing chores.",
    outcome: "Recovered gigabytes of disk storage space and cut manual toil.",
    icon: "terminal"
  },
  {
    title: "Disaster Recovery & BC",
    description: "Validate data replication pathways and coordinate passive host switchover routines.",
    outcome: "Certified recovery readiness across business client infrastructure locations.",
    icon: "refresh-cw"
  },
  {
    title: "Incident Response & RCA",
    description: "Lead priority incident triage cycles and perform thorough root-cause investigations.",
    outcome: "Minimized outage durations and established preventive measures to stop recurrence.",
    icon: "alert-triangle"
  }
];

