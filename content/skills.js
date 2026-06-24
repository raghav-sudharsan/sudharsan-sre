if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.skills = [
  {
    category: "Cloud Platforms",
    items: [
      { name: "AWS", level: 90, icon: "cloud" },
      { name: "Google Cloud Platform", level: 85, icon: "cloud" }
    ]
  },
  {
    category: "Monitoring & Observability",
    items: [
      { name: "Prometheus", level: 90, icon: "activity" },
      { name: "Grafana", level: 92, icon: "layout" },
      { name: "Windows Exporter", level: 90, icon: "cpu" },
      { name: "Infrastructure Monitoring", level: 92, icon: "activity" },
      { name: "Alerting", level: 92, icon: "bell" },
      { name: "Dashboard Development", level: 88, icon: "layout" }
    ]
  },
  {
    category: "Application Operations",
    items: [
      { name: "IIS", level: 95, icon: "server" },
      { name: ".NET Hosting", level: 90, icon: "server" },
      { name: "Application Reliability", level: 92, icon: "shield" },
      { name: "Performance Monitoring", level: 90, icon: "activity" }
    ]
  },
  {
    category: "Automation",
    items: [
      { name: "PowerShell", level: 95, icon: "terminal" },
      { name: "Batch Scripting", level: 90, icon: "terminal" },
      { name: "Python", level: 80, icon: "code" }
    ]
  },
  {
    category: "Reliability Engineering",
    items: [
      { name: "Incident Management", level: 92, icon: "shield" },
      { name: "Problem Management", level: 90, icon: "shield" },
      { name: "RCA", level: 92, icon: "search" },
      { name: "SLA Management", level: 95, icon: "check-circle" },
      { name: "SLO Monitoring", level: 90, icon: "activity" },
      { name: "DR Validation", level: 95, icon: "refresh-cw" }
    ]
  },
  {
    category: "Operating Systems",
    items: [
      { name: "Windows Server", level: 95, icon: "server" },
      { name: "Linux", level: 85, icon: "terminal" }
    ]
  }
];
