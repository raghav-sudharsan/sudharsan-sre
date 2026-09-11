if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.recruiterInfo = {
  role: "DevOps Engineer | Site Reliability Engineer",
  experience: "3+ Years",
  clientExposure: "10+ Client Environments",
  expertise: "Production Operations & Cloud Infrastructure",
  availability: "Active & Open to Opportunities",
  location: "Bangalore, India",
  resumeDownloadUrl: "assets/documents/Sudharsan_S_DevOps_SRE_Resume.pdf"
};

portfolioData.coreFocus = {
  applicationEngineering: [
    "Production Operations",
    "Application Deployment",
    "Release Validation",
    "Incident Management & RCA",
    "IIS & Nginx Reverse Proxy"
  ],
  systemEngineering: [
    "Windows & Linux Administration",
    "AWS & GCP Cloud Operations",
    "Prometheus & Grafana Observability",
    "PowerShell & Bash Automation",
    "Disaster Recovery Drills"
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
    content: `## Managing Application Availability in Production IIS Environments

In enterprise IIS environments, monolithic .NET Framework applications can experience memory growth and thread locking during high transaction intervals. Left unmonitored, this causes high system pagefile usage, request queuing, and eventual HTTP 503 errors.

### Configuring Optimal IIS Recycling Rules

Rather than relying on default intervals which can trigger recycles during peak business activity, we implement structured pool recycling policies paired with PowerShell health diagnostics:

\`\`\`powershell
# Check memory thresholds and validate IIS application pool state
Import-Module WebAdministration
$poolName = "FintechAppPool"
$limitKB = 2097152 # 2GB Limit

$workerProcess = Get-CimInstance Win32_Process -Filter "Name='w3wp.exe'" | 
    Where-Object { $_.CommandLine -like "*$poolName*" }

if ($workerProcess) {
    $privateMem = $workerProcess.WorkingSetSize / 1KB
    if ($privateMem -gt $limitKB) {
        Write-Output "Memory threshold exceeded ($privateMem KB). Recycling application pool..."
        Restart-WebAppPool -Name $poolName
    }
}
\`\`\`

#### Key Takeaways:
1. **Recycle Window Discipline:** Schedule maintenance recycles strictly during low-volume maintenance windows.
2. **Monitor Private Bytes:** Set Prometheus alerts when worker pool memory usage approaches 80% threshold.
3. **Analyze HTTP Sub-status Codes:** Use IIS W3C logs to distinguish between thread starvation (503.2) and pool shutdowns (503.0).`
  },
  {
    id: "blog-windows-observability",
    title: "Centralizing Windows Server Observability with Prometheus & Windows Exporter",
    category: "Observability",
    date: "May 22, 2026",
    readTime: "6 min read",
    summary: "Collecting OS metrics, event logs, and IIS application pool telemetry into a unified Grafana console.",
    content: `## Bridging the Observability Gap on Windows Server

While node_exporter serves as the standard for Linux environments, Windows servers require windows_exporter to capture CPU, memory, network, and IIS web metrics.

### Step-by-Step Configuration

1. **Install windows_exporter Service:** Deploy on target hosts with required collectors enabled:

\`\`\`powershell
# Install Windows Exporter with IIS and OS collectors enabled
msiexec.exe /i windows_exporter-0.22.0-amd64.msi ENABLED_COLLECTORS="cpu,memory,net,os,iis,logical_disk"
\`\`\`

2. **Scrape target in prometheus.yml:**

\`\`\`yaml
scrape_configs:
  - job_name: 'windows-infrastructure'
    scrape_interval: 15s
    static_configs:
      - targets: ['10.10.1.25:9182']
        labels:
          environment: 'production'
          tier: 'web'
\`\`\`

#### Essential PromQL Queries to Alert On:
- \`windows_iis_requests_total\`: Tracks request throughput and volume spikes.
- \`100 - (avg by (instance) (rate(windows_cpu_time_total{mode="idle"}[2m])) * 100)\`: Real-time host CPU utilization.
- \`windows_logical_disk_free_bytes / windows_logical_disk_size_bytes * 100 < 15\`: Storage warning threshold.`
  },
  {
    id: "blog-disaster-recovery",
    title: "Executing Structured Disaster Recovery Drills with Zero Critical Deviations",
    category: "Reliability",
    date: "April 15, 2026",
    readTime: "8 min read",
    summary: "Operational practices for planning, coordinating, and validating DR drills across cloud and hybrid environments.",
    content: `## Operational Discipline in Business Continuity

For business-critical fintech platforms, Disaster Recovery readiness requires regular, structured drills to validate that recovery time objectives (RTO) and recovery point objectives (RPO) hold in practice.

### Key Pillars of Successful DR Drills:

1. **Structured Scenario Planning:** Define active-passive failover sequences across AWS, GCP, and on-premises environments.
2. **Connectivity & DNS Validation:** Verify VPN tunnels, routing policies, and firewall configurations between clients and recovery sites.
3. **Automated Sanity Testing:** Execute automated validation scripts to test database connectivity, application endpoint responses, and service health immediately following switchover.

\`\`\`powershell
# Automated post-failover connectivity check for target database
$dbServer = "dr-db-replica.internal"
$database = "FintechCore"
$connString = "Server=$dbServer;Database=$database;Integrated Security=True;Connection Timeout=10;"
$conn = New-Object System.Data.SqlClient.SqlConnection($connString)

try {
    $conn.Open()
    Write-Output "DR Database connectivity: SUCCESS"
    $conn.Close()
} catch {
    Write-Error "DR Database connectivity FAILED: $($_.Exception.Message)"
}
\`\`\`

By applying standard validation checklists and automated checks, we executed 10+ DR drills across client setups with zero critical deviations.`
  }
];
