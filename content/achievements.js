if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.workflowStages = [
  {
    step: "01",
    title: "Production Operations",
    subtitle: "Application & Infrastructure Operations",
    flow: "IIS 10 • Windows Server • .NET • Runtime Health",
    description: "Manage high-availability application pools, runtime limits, and worker process health for monolithic ASP.NET platforms.",
    icon: "server",
    tags: ["IIS 10", "Windows Server", "ASP.NET", "Health Probes"]
  },
  {
    step: "02",
    title: "Deployments",
    subtitle: "Artifacts → Deployment → Validation",
    flow: "Azure DevOps • TFS • Build Artifacts • CI/CD",
    description: "Orchestrate release promotion, manage versioned build artifacts, and execute automated deployment validation scripts.",
    icon: "git-pull-request",
    tags: ["Azure DevOps", "TFS", "CI/CD", "Release Validation"]
  },
  {
    step: "03",
    title: "Monitoring",
    subtitle: "Prometheus → PromQL → Grafana",
    flow: "node_exporter • windows_exporter • Telemetry",
    description: "Collect host and application metrics across Linux and Windows, creating PromQL queries and real-time Grafana dashboards.",
    icon: "activity",
    tags: ["Prometheus", "Grafana", "PromQL", "Exporters"]
  },
  {
    step: "04",
    title: "Reliability",
    subtitle: "Health Checks → DR → Recovery",
    flow: "Failover Validation • Service Restoration • DR",
    description: "Execute structured Disaster Recovery drills across multi-cloud infrastructure, validating replication and recovery objectives.",
    icon: "refresh-cw",
    tags: ["Disaster Recovery", "Failover", "DNS Routing", "SLA/SLO"]
  },
  {
    step: "05",
    title: "Automation",
    subtitle: "PowerShell → Bash → AWS CLI → Cron",
    flow: "Playbooks • Health Audits • Resource Discovery",
    description: "Develop administrative scripting tools to automate routine configuration audits, log retention, and cloud discovery.",
    icon: "terminal",
    tags: ["PowerShell", "Bash", "AWS CLI", "Cron Automation"]
  },
  {
    step: "06",
    title: "Troubleshooting",
    subtitle: "Logs → RCA → Corrective Action",
    flow: "Incident Triage • Sub-status Analysis • Remediation",
    description: "Diagnose application exceptions, memory exhaustion, WAF blocks, and connectivity failures to prevent recurrence.",
    icon: "alert-triangle",
    tags: ["Root Cause Analysis", "Log Analysis", "Incident Response", "VAPT"]
  }
];

portfolioData.metrics = [
  { label: "Years of IT Experience", value: 3, suffix: "+" },
  { label: "Disaster Recovery Drills", value: 10, suffix: "+" },
  { label: "Critical Deviations During DR Validation", value: 0, suffix: "" }
];
