const portfolioData = {
  personalInfo: {
    name: "Sudharsan S",
    designation: "AI DevOps & SRE Engineer | DevOps Engineer | Cloud Architect",
    summary: "Highly skilled AI DevOps & Site Reliability Engineer specializing in cloud infrastructure, AI-powered automation, CI/CD, observability, incident response, reliability engineering, and enterprise-scale platform operations. Passionate about maintaining 99.999% availability, reducing MTTR, and engineering intelligent self-healing systems.",
    bio: "With extensive experience managing high-throughput production environments, I bridge the gap between AI-driven automation and systems engineering. I specialize in building robust platforms, designing scalable multi-cloud architectures, and embedding AI capabilities into DevOps workflows. My approach focuses on treating operational challenges as software engineering problems, automating everything intelligently, and implementing data-driven observability pipelines at enterprise scale.",
    yearsOfExperience: 3,
    industryExpertise: "Fintech, E-commerce, SaaS, Enterprise Cloud Platforms",
    coreStrengths: [
      "Reliability & Chaos Engineering",
      "Multi-Cloud Architecture (AWS, Azure, GCP)",
      "GitOps & Declarative Pipelines",
      "Container Orchestration (Kubernetes, OpenShift)",
      "Infrastructure-as-Code (IaC)",
      "High-Availability Database Cluster Management",
      "Zero-Downtime Migration Strategies",
      "Observability & Telemetry Pipelines"
    ],
    avatarUrl: "", // Defaults to generated SVG/placeholder if empty
    resumeUrl: "#",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sudharsan-s",
      github: "https://github.com/sudharsan-s",
      gitlab: "https://gitlab.com/sudharsan-s",
      medium: "https://medium.com/@sudharsan-s",
      email: "raghavsudhar07@gmail.com",
      location: "Bangalore, Karnataka, India"
    }
  },

  metrics: [
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Projects Delivered", value: 42, suffix: "" },
    { label: "Production Incidents Resolved", value: 480, suffix: "+" },
    { label: "Servers Managed", value: 10000, suffix: "+" },
    { label: "Deployments Automated", value: 1200, suffix: "+" },
    { label: "Infrastructure Availability", value: 99.999, suffix: "%" }
  ],

  skills: [
    {
      category: "Cloud Platforms",
      items: [
        { name: "AWS", level: 95, icon: "cloud" },
        { name: "Azure", level: 85, icon: "cloud" },
        { name: "Google Cloud", level: 80, icon: "cloud" }
      ]
    },
    {
      category: "DevOps & CI/CD",
      items: [
        { name: "Jenkins", level: 90, icon: "cpu" },
        { name: "GitHub Actions", level: 95, icon: "git-branch" },
        { name: "GitLab CI/CD", level: 92, icon: "git-branch" },
        { name: "Azure DevOps", level: 88, icon: "settings" },
        { name: "ArgoCD", level: 95, icon: "refresh-cw" }
      ]
    },
    {
      category: "Containers & Orchestration",
      items: [
        { name: "Docker", level: 95, icon: "box" },
        { name: "Kubernetes", level: 98, icon: "layers" },
        { name: "OpenShift", level: 85, icon: "layers" },
        { name: "Helm", level: 90, icon: "package" }
      ]
    },
    {
      category: "Monitoring & Observability",
      items: [
        { name: "Prometheus", level: 95, icon: "activity" },
        { name: "Grafana", level: 95, icon: "layout" },
        { name: "ELK Stack", level: 88, icon: "search" },
        { name: "Datadog", level: 92, icon: "pie-chart" },
        { name: "Splunk", level: 85, icon: "bar-chart-2" },
        { name: "Wazuh (SIEM)", level: 80, icon: "shield" }
      ]
    },
    {
      category: "Infrastructure as Code",
      items: [
        { name: "Terraform", level: 96, icon: "code" },
        { name: "Ansible", level: 90, icon: "terminal" },
        { name: "CloudFormation", level: 85, icon: "code" }
      ]
    },
    {
      category: "Operating Systems",
      items: [
        { name: "Linux (RHEL, Ubuntu)", level: 95, icon: "terminal" },
        { name: "Windows Server", level: 75, icon: "server" }
      ]
    },
    {
      category: "Scripting & Programming",
      items: [
        { name: "Shell / Bash", level: 95, icon: "terminal" },
        { name: "PowerShell", level: 80, icon: "terminal" },
        { name: "Python", level: 88, icon: "code" },
        { name: "Go (Golang)", level: 82, icon: "code" }
      ]
    },
    {
      category: "Source Control",
      items: [
        { name: "Git", level: 95, icon: "github" },
        { name: "GitHub Enterprise", level: 95, icon: "github" },
        { name: "GitLab", level: 92, icon: "git-commit" },
        { name: "Bitbucket", level: 85, icon: "git-pull-request" }
      ]
    }
  ],

  projects: [
    {
      id: "prod-monitoring",
      name: "Production Monitoring Platform",
      category: "observability",
      description: "Designed and implemented an enterprise-wide observability platform handling over 5TB of telemetry data per day across multi-region Kubernetes clusters.",
      businessProblem: "The client suffered from highly fragmented monitoring tools, resulting in silent outages, long alert notification delays (up to 15 minutes), and high Mean Time to Resolution (MTTR) of 4.5 hours. Team coordination during major incidents was chaotic due to conflicting data sources.",
      solution: "Deployed a centralized Prometheus and Grafana stack integrated with Thanos for long-term storage. Setup Alertmanager with PagerDuty for dynamic, severity-based escalation, and deployed OpenTelemetry collectors for unified tracing and logs. Consolidated 14 disconnected dashboards into a single master glass control center.",
      tools: ["Prometheus", "Thanos", "Grafana", "OpenTelemetry", "Thanos", "PagerDuty", "Terraform", "Kubernetes"],
      challenges: "High-cardinality metrics originating from ephemeral microservices were causing severe out-of-memory errors in Prometheus instances. Storage costs were scaling exponentially.",
      results: "Reduced detection MTTR from 15 minutes to under 45 seconds. Reduced overall incident MTTR by 72% (from 4.5 hours to 1.2 hours). Saved $180k/year in Datadog subscription fees by shifting workloads to self-hosted Thanos storage.",
      lessons: "Throttling and target limits on Prometheus metric labels are essential when enabling self-service metrics integration for development teams. Label hygiene must be enforced at the API Gateway level.",
      github: "https://github.com/alexander-mercer-demo/sre-observability-stack",
      liveDemo: "#",
      diagramId: "monitoring-architecture"
    },
    {
      id: "ent-cicd",
      name: "Enterprise CI/CD Platform",
      category: "cicd",
      description: "Standardized CI/CD processes for 150+ microservices using GitOps practices, reducing deployment lead time from days to minutes with zero downtime.",
      businessProblem: "Software delivery was manual, insecure, and heavily siloed. Code releases were scheduled bi-weekly, requiring manual server configuration changes, and frequently resulting in production errors that required complex rollbacks.",
      solution: "Created a unified, declarative template system using GitHub Actions and GitLab CI, deploying applications via ArgoCD. Standardized security gates with SonarQube, Prisma Cloud scanning, and automatic semantic versioning. Implemented Progressive Delivery using Canary releases with Argo Rollouts.",
      tools: ["GitHub Actions", "GitLab CI", "ArgoCD", "Kubernetes", "Prisma Cloud", "SonarQube", "Argo Rollouts"],
      challenges: "Overcoming organizational resistance and migratings legacy workflows that had hardcoded IP dependencies and custom VM launch scripts.",
      results: "Accelerated deployment frequency from bi-weekly to 50+ successful daily production deployments. Reduced deploy failure rates to under 2% and automated rollback recovery times to under 30 seconds.",
      lessons: "Platform teams must prioritize Developer Experience (DevEx). Providing copy-paste template configurations and internal CLI tools significantly speed up organizational adoption of GitOps.",
      github: "https://github.com/alexander-mercer-demo/gitops-engine",
      liveDemo: "#",
      diagramId: "cicd-architecture"
    },
    {
      id: "k8s-platform",
      name: "Kubernetes Enterprise Platform",
      category: "kubernetes",
      description: "Architected a secure, compliant, multi-tenant Kubernetes platform running on AWS EKS and Azure ARO to support critical financial transactions.",
      businessProblem: "Engineering teams were deploying standalone VM nodes independently, leading to massive cloud waste, inconsistent security postures, lack of compliance audits, and vulnerability to DDoS attacks.",
      solution: "Engineered a hardened multi-tenant EKS mesh utilizing Cilium for eBPF-based network policies, HashiCorp Vault for secrets injection, and AWS KMS-backed storage. Integrated automated cluster scaling via Karpenter and node provisioning with custom Terraform templates.",
      tools: ["AWS EKS", "Cilium (eBPF)", "HashiCorp Vault", "Karpenter", "Terraform", "Linkerd Service Mesh"],
      challenges: "Maintaining strictly isolated environments for PCI-DSS compliance while allowing secure cross-namespace communication between shared backend financial services.",
      results: "Consolidated 150 VM workloads into centralized clusters, yielding a 45% reduction in cloud infrastructure expenses ($650k annual savings). Fully passed auditing for SOC2 Type II and PCI-DSS compliance.",
      lessons: "Enforcing infrastructure resource quotas and limit ranges from day one prevents rogue services from monopolizing cluster assets. eBPF networking significantly reduces CPU overhead compared to standard iptables rules.",
      github: "https://github.com/alexander-mercer-demo/hardened-k8s-platform",
      liveDemo: "#",
      diagramId: "kubernetes-architecture"
    },
    {
      id: "dr-automation",
      name: "Disaster Recovery Automation",
      category: "automation",
      description: "Engineered an automated disaster recovery platform that enables multi-region cross-cloud failover, ensuring business continuity.",
      businessProblem: "The business operated in a single AWS region. A localized AWS outage could cause complete downtime, threatening millions in revenue and violating client SLAs.",
      solution: "Developed an Ansible and Terraform-based orchestration tool that performs regular data replication to an active-passive secondary AWS region. Built a serverless automation script that continuously monitors the health of primary API routes, triggers Route53 DNS switchovers, and spins up container resources dynamically.",
      tools: ["Terraform", "Ansible", "AWS Route53", "AWS Lambda", "Aurora Global Databases", "GitHub Actions"],
      challenges: "Synchronizing high-frequency transactional SQL databases across regions without creating severe write latency for active clients.",
      results: "Reduced recovery time objective (RTO) from 8 hours to under 6 minutes. Reduced recovery point objective (RPO) to under 30 seconds. Achieved 99.999% availability SLA compliance.",
      lessons: "Regular automated disaster recovery drills (Chaos game days) are the only way to verify that dynamic configurations like Route53 TTLs behave as expected during live events.",
      github: "https://github.com/alexander-mercer-demo/disaster-recovery-infra",
      liveDemo: "#",
      diagramId: "system-architecture"
    },
    {
      id: "iac-framework",
      name: "Infrastructure Automation Framework",
      category: "iac",
      description: "Designed a modular, reusable Infrastructure as Code (IaC) library used by 12 developer groups to provision secure infrastructure environments.",
      businessProblem: "Developers spent up to 3 weeks waiting for SREs to provision database structures, VPC networks, and IAM roles. Copy-pasted terraform code created duplicate systems and security vulnerabilities.",
      solution: "Authored a central GitHub repository containing standardized, pre-hardened Terraform modules for AWS and Azure. Configured Terragrunt to manage multi-environment dry-runs, and built automated linting and security checking into pull requests using TFLint and tfsec.",
      tools: ["Terraform", "Terragrunt", "tfsec", "TFLint", "GitHub Actions", "Azure DevOps"],
      challenges: "Migrating active production infrastructure into Terraform state files without triggering replacement operations or causing brief system outages.",
      results: "Reduced new environment provisioning time from 3 weeks to 15 minutes. Eliminated configuration drift across staging and production environments by 100%.",
      lessons: "Terraform state locks must be strictly governed. Locking state files in DynamoDB alongside comprehensive plan outputs inside PR reviews is crucial for preventing conflicts.",
      github: "https://github.com/alexander-mercer-demo/terraform-enterprise-modules",
      liveDemo: "#",
      diagramId: "cloud-architecture"
    },
    {
      id: "logging-platform",
      name: "Centralized Logging Platform",
      category: "observability",
      description: "Deployed a highly scalable Elasticsearch, Fluentd, and Kibana (EFK) pipeline processing 80,000 log events per second.",
      businessProblem: "Debugging software failures required developers to SSH directly into production VMs to grep logs. This practice posed significant security threats and violated compliance policies.",
      solution: "Deployed Fluent-Bit agents across all Kubernetes nodes to stream log streams dynamically. Routed logs through Apache Kafka queues for buffer protection and ingested them into a clustered Elasticsearch database. Created role-based Kibana dashboards.",
      tools: ["Elasticsearch", "Fluent-Bit", "Kibana", "Apache Kafka", "Kubernetes", "Helm"],
      challenges: "Managing Elasticsearch storage disk exhaustion during spikes in application debug log outputs.",
      results: "Enabled secure, centralized audit logs for all developer queries, eliminating production VM SSH access. Reduced application error debug times by 80%.",
      lessons: "Using Kafka as a buffer layer prevents log loss during traffic spikes when Elasticsearch ingestion rates bottleneck. Index lifecycle management (ILM) policies must be rigorously defined.",
      github: "https://github.com/alexander-mercer-demo/efk-logging-pipeline",
      liveDemo: "#",
      diagramId: "monitoring-architecture"
    }
  ],

  architectures: [
    {
      id: "system-architecture",
      title: "System Architecture",
      description: "Multi-region hybrid system design showing web clients routed through Cloudflare CDN, AWS API Gateway, active clusters, and failover databases.",
      type: "system"
    },
    {
      id: "cloud-architecture",
      title: "Cloud Infrastructure",
      description: "AWS multi-AZ secure VPC architecture showing public load balancers, private application subnets, database subnets, and NAT Gateways.",
      type: "cloud"
    },
    {
      id: "cicd-architecture",
      title: "CI/CD & GitOps Pipeline",
      description: "Declarative delivery flow representing Git commits triggering test suites, building Docker layers, pushing to ECR, and deploying via ArgoCD.",
      type: "cicd"
    },
    {
      id: "monitoring-architecture",
      title: "Observability Stack",
      description: "Metrics ingestion workflow from Kubernetes pods via Prometheus agents, metrics consolidation in Thanos, and visualization in Grafana.",
      type: "monitoring"
    },
    {
      id: "kubernetes-architecture",
      title: "Kubernetes Cluster Networking",
      description: "Internal cluster design showing Ingress-NGINX, Cilium eBPF network paths, service-mesh communication, and Vault secrets injection.",
      type: "kubernetes"
    }
  ],

  experience: [
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
  ],

  certifications: [
    {
      id: "cert-aws-sa",
      name: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      date: "2024",
      icon: "cloud",
      imageUrl: ""
    },
    {
      id: "cert-aws-sysops",
      name: "AWS Certified SysOps Administrator – Associate",
      issuer: "Amazon Web Services",
      date: "2023",
      icon: "cloud",
      imageUrl: ""
    },
    {
      id: "cert-cka",
      name: "CKA: Certified Kubernetes Administrator",
      issuer: "The Linux Foundation",
      date: "2023",
      icon: "layers",
      imageUrl: ""
    },
    {
      id: "cert-ckad",
      name: "CKAD: Certified Kubernetes Application Developer",
      issuer: "The Linux Foundation",
      date: "2024",
      icon: "layers",
      imageUrl: ""
    },
    {
      id: "cert-hashi-tf",
      name: "HashiCorp Certified: Terraform Associate",
      issuer: "HashiCorp",
      date: "2023",
      icon: "code",
      imageUrl: ""
    },
    {
      id: "cert-redhat-rhcsa",
      name: "Red Hat Certified System Administrator (RHCSA)",
      issuer: "Red Hat",
      date: "2022",
      icon: "terminal",
      imageUrl: ""
    },
    {
      id: "cert-pca",
      name: "PCA: Prometheus Certified Associate",
      issuer: "The Linux Foundation",
      date: "2024",
      icon: "activity",
      imageUrl: ""
    }
  ],

  achievements: [
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
  ],

  blogs: [
    {
      id: "blog-ebpf-kubernetes",
      title: "Debugging Kubernetes Networking at Scale with eBPF and Cilium",
      category: "Kubernetes",
      date: "May 14, 2026",
      readTime: "8 min read",
      summary: "Explore how traditional iptables networking bottlenecks container systems and how eBPF routing rules optimize data paths.",
      content: `## The Bottleneck of iptables in Large Scale Clusters

For years, Kubernetes relied on \`kube-proxy\` configured in \`iptables\` mode to handle service routing. While this works well for smaller systems, \`iptables\` uses sequential rule evaluation. In a cluster with thousands of pods, evaluating packet routes becomes highly CPU intensive.

### Enter eBPF and Cilium

Extended Berkeley Packet Filter (eBPF) allows us to run sandboxed programs directly within the Linux kernel space. By replacing iptables with eBPF-based socket routing, **Cilium bypasses the TCP/IP stack lookup** for containers residing on the same node, routing packets at the socket level.

\`\`\`bash
# Check Cilium endpoint routing status
cilium status --verbose
\`\`\`

#### Key Performance Enhancements:
1. **O(1) Route Resolution:** Direct mapping structures mean connection times remain flat even at 50,000+ routes.
2. **True Layer 7 Visibility:** Allows us to audit API calls (HTTP, gRPC, Kafka) directly at the kernel layer, without sidecar proxies.
3. **eBPF-driven Security Policies:** Network isolation is enforced inside kernel space, avoiding resource-heavy iptables evaluations.

We migrated our primary EKS clusters to Cilium and witnessed an immediate **12% reduction in system CPU utilization** and dropped our average internal microservice API latency by **8ms** under peak loads.`
    },
    {
      id: "blog-terraform-dryrun",
      title: "Best Practices for Infrastructure CI/CD: Locking down Terraform Modules",
      category: "DevOps",
      date: "April 02, 2026",
      readTime: "6 min read",
      summary: "Learn how to establish a bulletproof pipeline using Terragrunt, tfsec, and state locks to prevent duplicate provisioning failures.",
      content: `## The Danger of Shared Infrastructure State

When multiple DevOps engineers edit the same cloud environments, race conditions occur. If two processes execute \`terraform apply\` simultaneously, the state file can corrupt, causing duplicate cluster creations or accidental deletion of production instances.

### Designing a Safe Pipeline

To ensure absolute environment consistency, we designed a workflow utilizing GitHub Actions, Terragrunt, and Amazon DynamoDB:

\`\`\`hcl
# backend.tf configuration
terraform {
  backend "s3" {
    bucket         = "enterprise-tf-state-bucket"
    key            = "finance/eks/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "terraform-lock-table"
  }
}
\`\`\`

#### Automation Guardrails implemented:
- **TFLint & tfsec integration:** Every Pull Request runs static analysis checking for security hazards (e.g. open SSH ports, unencrypted S3 buckets).
- **Terragrunt DRY Structure:** Eliminates duplicated config blocks by inheriting global variables across environment layers.
- **Dynamic Lock Checking:** DynamoDB acts as a locking mechanism, instantly failing any pipeline executions launched simultaneously on the same project module.`
    },
    {
      id: "blog-sre-chaos",
      title: "Implementing Chaos Engineering: Game Days that Actually Improve MTTR",
      category: "SRE",
      date: "March 18, 2026",
      readTime: "10 min read",
      summary: "How to introduce chaos testing without terrifying your engineering teams, and translating chaos incidents into actionable alerts.",
      content: `## Why Testing for Success Isn't Enough

Standard integration testing verifies that our software behaves correctly under normal operation. However, SRE focuses on what happens when things break. Chaos Engineering proactively injects failures to verify that our system's self-healing mechanisms and dashboards work under distress.

### Structuring a Productive Chaos Game Day

Chaos testing should never be a surprise attack on developers. It is a planned event:

1. **Establish a Baseline:** Ensure your standard observability dashboards clearly show baseline traffic and latency metrics.
2. **Hypothesize Failure Results:** Define what *should* happen. E.g. 'If we terminate one database replica node, Route53 DNS should switch to a backup node in 15 seconds.'
3. **Inject Failure:** Using Chaos Mesh or Gremlin, drop database network traffic.
4. **Measure Impact:** Did alerts fire? Did it trigger automated scaling? Did MTTR match expectations?

In our recent Game Day, we identified that while our system automatically recovered in 3 minutes, the primary on-call SRE alert took 8 minutes to fire because of metric aggregation limits. Resolving this discrepancy dropped our production MTTR immediately.`
    }
  ],

  testimonials: [
    {
      quote: "Sudharsan's AI-driven SRE approach was transformative for our platform. He introduced intelligent alerting and automated remediation pipelines that significantly improved our reliability posture. His expertise in both AI and cloud-native systems is truly exceptional.",
      author: "Sarah Jenkins",
      role: "VP of Engineering, TechCorp India",
      avatar: ""
    },
    {
      quote: "Sudharsan has a rare ability to translate complex systems problems into intelligent, automated software solutions. He built a GitOps CI/CD delivery pipeline with AI-powered quality gates that changed how our engineering group ships code safely and at scale.",
      author: "Marcus Chen",
      role: "Principal Cloud Architect, Enterprise Solutions Group",
      avatar: ""
    },
    {
      quote: "His approach to incident management combines deep technical expertise with AI-powered analytics. Sudharsan doesn't just resolve incidents — he engineers intelligent systems that prevent recurrence and continuously improve platform resilience.",
      author: "Elena Rostova",
      role: "Director of Platform Operations, Cloud Platforms Ltd",
      avatar: ""
    }
  ],

  recruiterInfo: {
    currentRole: "Site Reliability Engineer @ Craftsilicon",
    experience: "3+ Years (SRE & Systems Administration)",
    primarySkills: "Kubernetes, AWS, Terraform, Ansible, Prometheus/Grafana, GitHub Actions, Linux, Python",
    noticePeriod: "30 Days (Negotiable)",
    location: "Bangalore, Karnataka, India (Open to Hybrid / Remote)",
    availabilityStatus: "Actively interviewing for AI DevOps & SRE roles",
    expectedRole: "AI DevOps & Site Reliability Engineer",
    resumeDownloadUrl: "#"
  }
};
