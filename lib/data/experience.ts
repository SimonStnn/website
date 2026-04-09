export interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  description: string;
  logo?: string;
  projectLink?: string;
  companyUrl?: string;
}

export const workExperience: ExperienceItem[] = [
  {
    year: "Jan. 2026 - Jun. 2026",
    title: "Intern AI Researcher & Developer",
    company: "CERM nv",
    companyUrl: "https://www.cerm.net/",
    logo: "/images/logos/cerm.webp",
    description:
      "Built an automated pipeline that extracts structured data from customer correspondence and syncs it with the ERP/CRM system, reducing manual data entry.",
    projectLink: "/projects/cerm-mcp-poc",
  },
  {
    year: "Aug. 2025 - Dec. 2025",
    title: "Student AI Researcher",
    company: "CERM nv",
    companyUrl: "https://www.cerm.net/",
    logo: "/images/logos/cerm.webp",
    description:
      "Leveraged LLMs to automatically transform technical Jira updates into polished end-user documentation, cutting manual writing and review time.",
    projectLink: "https://github.com/SimonStnn/CERM-Jira-LLM-Automation",
  },
  {
    year: "Apr. 2024",
    title: "Student Job Test Engineer",
    company: "Advionics nv",
    companyUrl: "https://www.advionics.be/",
    logo: "/images/logos/advionics-nv.webp",
    description:
      "Developed a real-time thermal monitoring system with MLX90640 heat sensors, integrated into a production application for automated anomaly detection.",
    projectLink: "/projects/mlx90640",
  },
  {
    year: "Aug. 2023 - Feb. 2024",
    title: "Software Engineer",
    company: "Stijnen Solutions",
    companyUrl: "https://stijnen.homecenter.be/",
    logo: "/images/logos/logo-stijnen.webp",
    description:
      "Designed a Python REST API that translates proprietary Homecenter protocols into structured JSON, with a Home Assistant integration for smart-home control.",
  },
  {
    year: "Dec. 2021 - Sep. 2022",
    title: "Software Developer",
    company: "Stijnen Solutions",
    companyUrl: "https://stijnen.homecenter.be/",
    logo: "/images/logos/logo-stijnen.webp",
    description:
      "Built a Python service exposing Homecenter data to Prometheus and Grafana, enabling real-time home energy consumption dashboards.",
  },
  {
    year: "Apr. 2022",
    title: "Intern Test Engineer",
    company: "Advionics nv",
    companyUrl: "https://www.advionics.be/",
    logo: "/images/logos/advionics-nv.webp",
    description:
      "Created an automated camera-based QC system for shipping that captures product photos pre-packaging and generates PDF proof-of-condition reports.",
  },
];

export const education: ExperienceItem[] = [
  {
    year: "2023 - 2026",
    title: "Electronics and ICT \u2013 Specialization in Software Engineering & AI",
    company: "Vives University of Applied Sciences \u2013 Bruges, Belgium",
    companyUrl: "https://www.vives.be/en",
    logo: "/images/logos/vives.webp",
    description: "Specialized in Software Engineering & AI.",
  },
  {
    year: "Sep. 2023 - Dec. 2023",
    title: "Graduate Programming",
    company: "HOWEST \u2013 Bruges, Belgium",
    companyUrl: "https://www.howest.be/en",
    logo: "/images/logos/howest.webp",
    description: "Evening school program focused on programming and software development & Git.",
  },
  {
    year: "2021 - 2023",
    title: "Internet of Things",
    company: "KTA Brugge \u2013 Bruges, Belgium",
    companyUrl: "https://www.ktabrugge.be/home/",
    logo: "/images/logos/kta-brugge.webp",
    description: "Secondary education with a focus on Internet of Things (IoT) technologies.",
  },
];
