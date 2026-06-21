if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.experience = [
  {
    company: "Craftsilicon",
    role: "Site Reliability Engineer (SRE)",
    duration: "2025 - Present",
    responsibilities: [
      "Design and operate cloud-native SRE infrastructure ensuring high availability and fault tolerance.",
      "Implement and manage CI/CD pipelines to accelerate software delivery with automated quality gates.",
      "Build observability stacks (Prometheus, Grafana, ELK) to monitor production services in real time.",
      "Drive incident response processes — triage, remediation, post-mortem analysis, and prevention.",
      "Automate infrastructure provisioning and configuration management using Terraform and Ansible."
    ],
    achievements: [
      "Established a centralized monitoring platform reducing alert response time by 60%.",
      "Containerized legacy application workloads onto Kubernetes, improving deployment velocity.",
      "Implemented GitOps workflows that cut manual release interventions by 80%."
    ],
    tools: ["Kubernetes", "Docker", "Terraform", "Ansible", "Prometheus", "Grafana", "GitHub Actions", "Linux"],
    businessImpact: "Elevated platform reliability posture enabling Craftsilicon to maintain consistent uptime SLAs for client-facing products while rapidly scaling engineering delivery capacity."
  },
  {
    company: "Wikiprospects",
    role: "System Administrator",
    duration: "2023 - 2025",
    responsibilities: [
      "Administered Linux and Windows Server infrastructure supporting internal and client-facing services.",
      "Managed network configurations, firewall rules, VPN gateways, and user access controls.",
      "Deployed and maintained virtualization environments using VMware and Hyper-V.",
      "Automated routine server provisioning, patch management, and backup verification via Bash and PowerShell scripts.",
      "Monitored system health and resolved hardware and OS-level incidents to maintain uptime."
    ],
    achievements: [
      "Automated daily server health checks, saving 8+ hours of manual work per week.",
      "Migrated on-premises services to cloud-based infrastructure with zero business disruption.",
      "Reduced system downtime incidents by 45% through proactive patching and monitoring implementation."
    ],
    tools: ["Linux (RHEL/Ubuntu)", "Windows Server", "VMware", "Bash", "PowerShell", "Zabbix", "Active Directory", "AWS EC2"],
    businessImpact: "Strengthened IT infrastructure reliability and security posture at Wikiprospects, enabling stable operations and laying a strong foundation for cloud migration initiatives."
  }
];
