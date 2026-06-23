if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.achievements = [
  {
    title: "99.999% Infrastructure Uptime",
    description: "Successfully designed and maintained a multi-region active-active cluster topology that achieved the gold standard 'five nines' availability SLA over a 12-month period.",
    icon: "check-circle",
    metric: "99.999% SLA"
  },
  {
    title: "Deployment Time Cut by 90%",
    description: "Re-engineered standard Jenkins deployment builds into GitOps-driven pipelines, accelerating average production release cycles from 45 minutes to just 4 minutes.",
    icon: "zap",
    metric: "90% Fast-track"
  },
  {
    title: "Automated Karpenter Scaling",
    description: "Configured node scaling using AWS Karpenter to allocate resources dynamically based on container requests, cutting overall compute overprovisioning waste.",
    icon: "trending-down",
    metric: "45% Cost Saved"
  },
  {
    title: "MTTR Reduction of 72%",
    description: "Built automated alerts linked to self-healing shell commands, successfully handling memory leak recycling actions without pager escalations.",
    icon: "shield",
    metric: "1.2h MTTR"
  },
  {
    title: "Zero Downtime Cloud Migration",
    description: "Orchestrated a massive live cloud data migration of 200+ million financial database records from legacy Azure SQL pools to AWS EKS with zero operations impact.",
    icon: "refresh-cw",
    metric: "Zero Impact"
  }
];

portfolioData.metrics = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Projects Delivered", value: 42, suffix: "" },
  { label: "Production Incidents Resolved", value: 480, suffix: "+" },
  { label: "Servers Managed", value: 100, suffix: "+" },
  { label: "Deployments Automated", value: 50, suffix: "+" },
  { label: "Infrastructure Availability", value: 99.999, suffix: "%" }
];
