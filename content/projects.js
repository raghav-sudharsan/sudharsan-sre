if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.projects = [
  {
    id: "ent-monitoring",
    name: "Enterprise Monitoring & Observability Platform",
    category: "observability",
    description: "Centralized monitoring and observability platform collecting server metrics via Windows Exporter and Prometheus, visualized using Grafana.",
    businessProblem: "Limited operational visibility across IIS-hosted banking applications, leading to delayed incident detection, higher MTTR, and client impact.",
    solution: "Implemented Prometheus with Windows Exporter agents on IIS servers. Configured Grafana dashboards for system metrics and integrated Slack alerting notifications.",
    tools: ["Prometheus", "Grafana", "Windows Exporter", "IIS"],
    challenges: "Customizing exporter scrapers to aggregate metrics from multiple IIS worker pools without increasing application resource overhead.",
    results: "Improved operational visibility, enabling support teams to proactively detect and remediate incidents before customer escalation.",
    lessons: "Simple, concise metrics dashboards allow engineers to quickly find bottlenecks during incident troubleshooting.",
    github: "https://github.com/sudharsan-sre/enterprise-monitoring",
    liveDemo: "#",
    diagramId: "monitoring-architecture"
  },
  {
    id: "iis-automation",
    name: "IIS Automation & Service Reliability Framework",
    category: "automation",
    description: "Developed a PowerShell and Batch scripting framework for automated IIS administration, health checks, and service validation.",
    businessProblem: "Manual server health checks and manual release validations consumed significant support hours and introduced human error risks.",
    solution: "Designed and rolled out scripts to automate IIS pool recycling, app configurations audit, and health checks with warning alert triggers.",
    tools: ["PowerShell", "Batch", "IIS"],
    challenges: "Ensuring secure execution of administration scripts across isolated networks without storing credentials in source files.",
    results: "Reduced repetitive manual support overhead and increased validation consistency across staging and production environments.",
    lessons: "Thorough script error-handling and detailed execution logging prevent silent automation failures in production.",
    github: "https://github.com/sudharsan-sre/iis-automation-framework",
    liveDemo: "#",
    diagramId: "deployment-flow"
  },
  {
    id: "dr-validation",
    name: "Disaster Recovery Validation Program",
    category: "iac",
    description: "Executed structured disaster recovery failover validation across AWS and GCP environments to verify business continuity.",
    businessProblem: "Ensuring business continuity and compliance mandates across client environments required regular, verified DR test procedures.",
    solution: "Authored failover playbooks and automated verification scripts to validate database replication status, DNS switchover, and server availability.",
    tools: ["AWS", "GCP", "Windows", "Linux"],
    challenges: "Ensuring data integrity and sync status during failover verification tests under minimal disruption parameters.",
    results: "Successfully completed DR validation for 7+ client environments with zero execution failures and verified SLA targets.",
    lessons: "Disaster recovery readiness can only be guaranteed through frequent, structured drills and automated sanity checks.",
    github: "https://github.com/sudharsan-sre/dr-validation-framework",
    liveDemo: "#",
    diagramId: "dr-architecture"
  }
];

portfolioData.architectures = [
  {
    id: "iis-architecture",
    title: "Production IIS Architecture",
    description: "IIS hosting infrastructure showing web clients routed through a Load Balancer to IIS web servers, .NET Applications, and backend Databases.",
    type: "iis"
  },
  {
    id: "monitoring-architecture",
    title: "Monitoring Architecture",
    description: "Centralized monitoring system collecting metrics via Windows Exporter to Prometheus, visualised on Grafana dashboard and integrated with Alerting.",
    type: "monitoring"
  },
  {
    id: "dr-architecture",
    title: "Disaster Recovery Architecture",
    description: "Active-passive business continuity blueprint showcasing data replication from Primary to DR Environment with Recovery Validation procedures.",
    type: "dr"
  },
  {
    id: "deployment-flow",
    title: "Production Deployment Flow",
    description: "Staged application release lifecycle moving code from Development through QA and UAT into Production environments, backed by continuous Monitoring.",
    type: "deployment"
  }
];
