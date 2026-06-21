if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.recruiterInfo = {
  currentRole: "Site Reliability Engineer @ Craftsilicon",
  experience: "3+ Years (SRE & Systems Administration)",
  primarySkills: "Kubernetes, AWS, Terraform, Ansible, Prometheus/Grafana, GitHub Actions, Linux, Python",
  noticePeriod: "30 Days (Negotiable)",
  location: "Bangalore, Karnataka, India (Open to Hybrid / Remote)",
  availabilityStatus: "Actively interviewing for SRE & DevOps roles",
  expectedRole: "Site Reliability Engineer | DevOps Engineer | Cloud Engineer",
  resumeDownloadUrl: "#"
};

portfolioData.testimonials = [
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
];

portfolioData.blogs = [
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
];
