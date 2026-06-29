if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.recruiterInfo = {
  role: "Application Support Engineer",
  experience: "3+ Years",
  clientExposure: "10+ Client Environments",
  expertise: "Production Support & Cloud Operations",
  availability: "Active & Open to Opportunities",
  location: "Bangalore, India",
  resumeDownloadUrl: "#"
};

portfolioData.coreFocus = {
  applicationEngineering: [
    "Application Deployment",
    "Production Support",
    "Release Validation",
    "Application Monitoring",
    "Incident Resolution"
  ],
  systemEngineering: [
    "Windows Administration",
    "Linux Administration",
    "Cloud Operations",
    "Infrastructure Monitoring",
    "Automation"
  ]
};

portfolioData.blogs = [
  {
    id: "blog-iis-performance",
    title: "Troubleshooting IIS Worker Pool Recycling and Memory Leaks in Production",
    category: "Application Operations",
    date: "June 10, 2026",
    readTime: "7 min read",
    summary: "A practical guide to configuring IIS recycling limits and validating application pool health during high-traffic banking periods.",
    content: `## The Challenge of Uncontrolled Memory Growth in .NET Applications

In enterprise IIS environments, legacy .NET applications can suffer from memory fragmentation and leaks. Left unmonitored, this causes high system pagefile usage, request queuing, and eventual 503 Service Unavailable errors.

### Configuring Optimal IIS Recycling Rules

Rather than relying on the default 29-hour interval, which can occur during peak business hours, we implemented a scheduled pool recycling strategy combined with PowerShell monitoring scripts:

\`\`\`powershell
# Recycle IIS Application Pool dynamically if private memory limits are exceeded
Import-Module WebAdministration
$poolName = "BankingServicesPool"
$limitKB = 2097152 # 2GB Limit

$privateMem = (Get-Process -Id (Get-WmiObject -Query "SELECT * FROM Win32_Process WHERE Name='w3p.exe' AND CommandLine LIKE '*$poolName*'").ProcessId).PrivateMemorySize64 / 1024

if ($privateMem -gt $limitKB) {
    Write-Output "Memory threshold exceeded ($privateMem KB). Recycling application pool..."
    Restart-WebAppPool -Name $poolName
}
\`\`\`

#### Key Takeaways:
1. **Never recycle during peak hours:** Align scheduled recycles with low-activity intervals.
2. **Monitor Private Bytes:** Set alerts at 80% of host RAM capacity.
3. **Log recycling events:** Ensure IIS log configuration includes recycle reasons for post-incident analysis.`
  },
  {
    id: "blog-windows-observability",
    title: "Centralizing Windows Server Observability with Prometheus & Windows Exporter",
    category: "Observability",
    date: "May 22, 2026",
    readTime: "6 min read",
    summary: "Learn how to collect local OS metrics, event logs, and IIS pool status into a unified Grafana console for SRE teams.",
    content: `## Bridging the Observability Gap on Windows Server

While Prometheus has native collectors for Linux (node_exporter), Windows environments require specialized metrics collection. The Prometheus community's **windows_exporter** extracts OS, CPU, memory, network, and IIS web metrics.

### Step-by-Step Configuration

1. **Install windows_exporter as a Service:** Deployed on hosts using PowerShell with the IIS collector enabled:

\`\`\`powershell
# Install Windows Exporter with IIS enabled
msiexec.exe /i windows_exporter-0.22.0-amd64.msi ENABLED_COLLECTORS="cpu,memory,net,os,iis"
\`\`\`

2. **Scrape target in prometheus.yml:**

\`\`\`yaml
scrape_configs:
  - job_name: 'windows-servers'
    static_configs:
      - targets: ['10.10.1.25:9182']
\`\`\`

#### Essential Metrics to Alert On:
- \`windows_iis_requests_total\`: Monitors active load.
- \`windows_cpu_time_total\`: Tracks overall CPU utilization.
- \`windows_logical_disk_free_bytes\`: Triggers critical alerts when storage falls below 15%.`
  },
  {
    id: "blog-disaster-recovery",
    title: "Designing a Structured Disaster Recovery Validation Playbook",
    category: "Reliability",
    date: "April 15, 2026",
    readTime: "8 min read",
    summary: "Best practices for planning, executing, and documenting DR drills across cloud environments with zero transaction failures.",
    content: `## Business Continuity is Not an Option

For critical applications, a disaster recovery (DR) strategy is only as good as its last successful drill. Many organizations fail to replicate stateful resources, leading to data loss during actual incidents.

### Key Pillars of DR Validation:

1. **Structured Drills:** Set up active-passive replication to a standby region.
2. **Connectivity Validation:** Verify VPN tunnels, DNS latency routing, and firewall rules between clients and the recovery nodes.
3. **Automated Sanity Testing:** Run PowerShell checkbooks to verify service health immediately after database failover.

\`\`\`powershell
# Validate backend DB replication status and database connectivity
$connectionString = "Server=dr-db-server;Database=BankingProd;User Id=sre_monitor;Password=secure_pass;"
$connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)
try {
    $connection.Open()
    Write-Output "DR Database connectivity: SUCCESS"
    $connection.Close()
} catch {
    Write-Error "DR Database connectivity: FAILED. Check replication logs."
}
\`\`\`

By standardizing these validation scripts, we executed successful DR drills across 7+ client setups with zero data loss or service execution errors.`
  }
];
