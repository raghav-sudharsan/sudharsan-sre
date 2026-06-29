if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.achievements = [
  {
    title: "Production Engineering",
    description: "Supported high-availability platforms, managing release engineering rollouts and deployment validations.",
    icon: "git-pull-request",
    metric: "Deployments"
  },
  {
    title: "Application Reliability",
    description: "Ensured service availability for banking workloads through automated checks and IIS recycle setups.",
    icon: "shield",
    metric: "Availability"
  },
  {
    title: "Monitoring & Observability",
    description: "Established comprehensive alerts and Prometheus dashboard layers across enterprise nodes.",
    icon: "activity",
    metric: "Monitoring"
  },
  {
    title: "Incident Management",
    description: "Led incident response operations, performing root cause investigations to reduce MTTR.",
    icon: "alert-triangle",
    metric: "Incident Triage"
  }
];

portfolioData.metrics = [
  { label: "Production Deployments", value: 80, suffix: "+" },
  { label: "Incident Resolution", value: 50, suffix: "+" },
  { label: "Applications Supported", value: 5, suffix: "+" },
  { label: "Cloud Environments Managed", value: 4, suffix: "+" },
  { label: "Monitoring Coverage", value: 100, suffix: "%" },
  { label: "Automation Tasks", value: 15, suffix: "+" },
  { label: "Disaster Recovery drills", value: 7, suffix: "+" },
  { label: "Operational Improvements", value: 10, suffix: "+" }
];
