if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.achievements = [
  {
    title: "Production Operations",
    description: "Supported high-availability fintech platforms, managing IIS 10, ASP.NET application pools, runtime configurations, and deployment validations.",
    icon: "server",
    metric: "Production Ops"
  },
  {
    title: "Reliability & DR",
    description: "Executed Disaster Recovery drills across SaaS and enterprise applications, validating infrastructure recovery, failovers, and service restoration.",
    icon: "refresh-cw",
    metric: "Disaster Recovery"
  },
  {
    title: "Observability & Alerting",
    description: "Engineered Prometheus and Grafana monitoring layers across Windows and Linux servers using exporters and PromQL queries for resource visibility.",
    icon: "activity",
    metric: "Observability"
  },
  {
    title: "Operational Automation",
    description: "Automated recurring system tasks, configuration audits, and process management routines using PowerShell and Bash scripts.",
    icon: "terminal",
    metric: "Automation"
  }
];

portfolioData.metrics = [
  { label: "Years of IT Experience", value: 3, suffix: "+" },
  { label: "Disaster Recovery Drills", value: 10, suffix: "+" },
  { label: "Critical Deviations During DR Validation", value: 0, suffix: "" }
];
