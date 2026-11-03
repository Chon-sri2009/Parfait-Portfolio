export const capabilitiesData = [
  {
    id: "01",
    title: "Business analysis",
    description: "Turning real operational needs into clear software requirements and useful workflows.",
  },
  {
    id: "02",
    title: "Solution design",
    description: "Planning reliable systems, intuitive interfaces, and data structures that support the business.",
  },
  {
    id: "03",
    title: "Full-stack delivery",
    description: "Building complete web applications from the interface through application logic and data.",
  },
];

export const projectsData = [
  {
    id: "01",
    kind: "project",
    category: "Developer tooling",
    title: "DevPulse — Developer Dashboard",
    description:
      "A .NET 9 Blazor Server dashboard that brings host diagnostics, network and DNS tools, website audits, API testing, alerts, and a focus lounge with Spotify control into one workspace.",
    technologies: [".NET 9", "Blazor Server", "C#", "JavaScript", "Docker"],
    modules: ["Overview", "Operations", "Telemetry"],
    accent: "lime",
    liveHref: "https://devpulse-project-sng7.onrender.com/",
    href: "https://github.com/Chon-sri2009/Devpulse_Project_1",
  },
  {
    id: "02",
    kind: "concept",
    category: "Enterprise operations",
    title: "Nexus Core — Cloud ERP",
    description:
      "A comprehensive resource-planning system designed to bring operations, finance, and business reporting into one clear workspace.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    modules: ["Operations", "Finance", "Reporting"],
    accent: "indigo",
  },
  {
    id: "03",
    kind: "concept",
    category: "Financial intelligence",
    title: "FinSecure Dashboard",
    description:
      "A focused analytics workspace for monitoring financial activity, surfacing key signals, and supporting faster decisions.",
    technologies: ["React", "tRPC", "Prisma", "Data visualization"],
    modules: ["Analytics", "Security", "Insights"],
    accent: "cyan",
  },
  {
    id: "04",
    kind: "concept",
    category: "Workflow automation",
    title: "OpsFlow Automator",
    description:
      "A workflow system that organizes repetitive operational tasks and helps teams move work forward with less friction.",
    technologies: ["Vue.js", "Python", "FastAPI", "MongoDB"],
    modules: ["Automation", "Approvals", "Tracking"],
    accent: "amber",
  },
];

export const achievement = {
  place: "3rd Place",
  competition: "WorldSkills Thailand Regional Competition",
  year: "2026",
  category: "IT Software Solutions for Business",
  description:
    "A regional podium finish in the skill category focused on designing and delivering software for real business needs.",
};

export const profile = {
  name: "Mr. Chonlapol Srichayech",
  role: "Business software developer",
  portraitSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/chonlapol-worldskills-2026.jpeg`,
};
