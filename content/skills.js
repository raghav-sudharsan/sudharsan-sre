if (typeof portfolioData === 'undefined') {
  var portfolioData = {};
}

portfolioData.skills = [
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
];
