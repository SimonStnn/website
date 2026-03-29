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
    company: "Cerm",
    companyUrl: "https://www.cerm.be/",
    logo: "/images/logos/cerm.webp",
    description:
      "Implemented an automated workflow that extracts key data from customer correspondence and instantly syncs it with the internal ERP/CRM system.",
    projectLink: "/projects/cerm-mcp-poc",
  },
  {
    year: "Aug. 2025 - Dec. 2025",
    title: "Student AI Researcher",
    company: "Cerm",
    companyUrl: "https://www.cerm.be/",
    logo: "/images/logos/cerm.webp",
    description:
      "Using LLMs to convert technical developer updates from Jira into clear end-user documentation. Linking developer notes with existing docs and automatically generating user-friendly explanations to reduce time spent writing and reviewing feedback.",
    projectLink: "https://github.com/SimonStnn/CERM-Jira-LLM-Automation",
  },
  {
    year: "Apr. 2024",
    title: "Student Job Test Engineer",
    company: "Advionics NV",
    companyUrl: "https://www.advionics.be/",
    logo: "/images/logos/advionics-nv.webp",
    description:
      "Developed a sensor monitoring system using real-time data analysis and MLX90640 heat sensors. Integrated the solution into an existing application, enabling continuous thermal monitoring for anomaly detection in a production environment.",
    projectLink: "/projects/mlx90640",
  },
  {
    year: "Aug. 2023 - Feb. 2024",
    title: "Software Engineer",
    company: "Stijnen Solutions",
    companyUrl: "https://stijnen.homecenter.be/",
    logo: "/images/logos/logo-stijnen.webp",
    description:
      "Designed and built a REST API in Python that translates the internal protocol of a Homecenter module into structured JSON data. Implemented an integration with Home Assistant.",
  },
  {
    year: "Dec. 2021 - Sep. 2022",
    title: "Software Developer",
    company: "Stijnen Solutions",
    companyUrl: "https://stijnen.homecenter.be/",
    logo: "/images/logos/logo-stijnen.webp",
    description:
      "Developed and tested a Python program that exposes the data from a Homecenter module to a Prometheus server. Connecting them to graphs in Grafana, allowing for real-time monitoring of home energy consumption.",
  },
  {
    year: "Apr. 2022",
    title: "Intern Test Engineer",
    company: "Advionics NV",
    companyUrl: "https://www.advionics.be/",
    logo: "/images/logos/advionics-nv.webp",
    description:
      "During my internship in my final year of secondary school, I developed an automated camera system for quality control in the shipping process. The system captures photos of products before packaging and automatically generates PDF reports as proof of undamaged shipments.",
  },
];

export const education: ExperienceItem[] = [
  {
    year: "2023 - 2026",
    title: "Computer Science \u2013 Specialization in Software Engineering & AI",
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
