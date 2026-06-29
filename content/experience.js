if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.experience = [
  {
    company: "Craft Silicon",
    role: "Application Support Engineer",
    duration: "Feb 2025 – Present",
    responsibilities: [
      "Manage Application Engineering and Production Operations for critical .NET banking platforms",
      "Configure and tune web hosting environments running under IIS and Windows Server",
      "Coordinate Cloud Operations and provisioning across AWS and Google Cloud platforms",
      "Deploy Monitoring & Observability dashboards utilizing Prometheus, Grafana, and Windows Exporter",
      "Validate production deployments and execute release engineering validation workflows",
      "Coordinate active Incident Response and lead Root Cause Analysis (RCA) investigations",
      "Develop PowerShell and Batch scripts to automate system health checks and recycle parameters"
    ],
    achievements: [
      "Minimized MTTR by deploying Prometheus metrics collection and alerting triggers",
      "Reduced post-deployment verification times through custom PowerShell automation",
      "Successfully executed Disaster Recovery (DR) drills and failovers across 7+ client environments"
    ],
    tools: ["AWS", "GCP", "IIS", "Prometheus", "Grafana", "PowerShell", "Windows Server", "Linux"],
    businessImpact: "Secured high availability and regulatory compliance for business-critical banking clients by establishing proactive monitoring and rapid deployment validation checks."
  },
  {
    company: "Wikiprospects",
    role: "IT Administrator",
    duration: "May 2023 – Jan 2025",
    responsibilities: [
      "Designed and administered core enterprise IT infrastructure supporting 150+ users",
      "Managed System Engineering workflows including Active Directory, DNS, and DHCP servers",
      "Administered networking, secure VPN access, and office firewall configurations",
      "Automated system backup routines, database archival procedures, and disk maintenance tasks"
    ],
    achievements: [
      "Maintained 99.9% uptime for core authentication services and office network operations",
      "Streamlined Active Directory management to accelerate employee onboarding workflows",
      "Reduced manual operational overhead through batch scheduling and automation"
    ],
    tools: ["Windows Server", "Active Directory", "DNS", "DHCP", "VPN", "Linux", "Batch Scripting"],
    businessImpact: "Built a highly performant and secure network topology, ensuring operational continuity and reducing helpdesk ticket volume."
  }
];
