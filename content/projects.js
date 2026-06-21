if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.projects = [
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
];

portfolioData.architectures = [
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
];
