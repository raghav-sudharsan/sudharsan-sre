if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.achievements = [
  {
    title: "AWS & GCP Operations",
    description: "Supported and maintained secure, high-availability application resources, firewalls, and network endpoints across AWS and GCP environments.",
    icon: "cloud",
    metric: "Multi-Cloud"
  },
  {
    title: "Production Incident Management",
    description: "Managed high-priority application incidents, driving triage, service restoration, and root cause analysis (RCA) to protect banking SLAs.",
    icon: "shield",
    metric: "SLA / SLO"
  },
  {
    title: "Enterprise Application Support",
    description: "Orchestrated operations for business-critical banking workloads hosted on IIS and .NET servers, maintaining system integrity.",
    icon: "server",
    metric: "IIS / .NET"
  },
  {
    title: "Monitoring Platform Implementation",
    description: "Built centralized, proactive observability stacks using Windows Exporter agents, Prometheus, and Grafana monitoring dashboards.",
    icon: "activity",
    metric: "Observability"
  }
];

portfolioData.metrics = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "DR Drills Completed", value: 7, suffix: "+" },
  { label: "Production Incidents Resolved", value: 50, suffix: "+" },
  { label: "Proactive Prevention", value: 50, suffix: "+" },
  { label: "Servers Managed", value: 80, suffix: "+" },
  { label: "DR Execution Success", value: 100, suffix: "%" },

];
