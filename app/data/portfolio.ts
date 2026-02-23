// =============================================
// Portfolio Data — Raihan Andi Saungnaga
// =============================================

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "ai" | "tools";
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// ---------- Personal Info ----------

export const personalInfo = {
  name: "Raihan Andi Saungnaga",
  nickname: "Raihan",
  role: "AI Engineer",
  bio: "Aspiring AI Engineer, University of Lampung student majoring in computer science. Passionate about building intelligent systems and creating meaningful digital experiences through code and creativity.",
  email: "raihanasng@gmail.com",
  location: "Bandar Lampung, Lampung, Indonesia",
};

// ---------- Social Links ----------

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/sngraihan",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/raihan-andi-saungnaga",
    icon: "linkedin",
  },
];

// ---------- Skills ----------

export const skills: Skill[] = [
  // AI / ML
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", category: "ai" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg", category: "ai" },
  { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg", category: "ai" },
  { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg", category: "ai" },
  { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg", category: "ai" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg", category: "ai" },

  // Frontend
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", category: "frontend" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", category: "frontend" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", category: "frontend" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", category: "frontend" },
  { name: "HTML/CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", category: "frontend" },

  // Backend
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", category: "backend" },
  //{ name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", category: "backend" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", category: "backend" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", category: "backend" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg", category: "backend" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", category: "backend" },

  // Tools
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", category: "tools" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", category: "tools" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", category: "tools" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", category: "tools" },
  { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg", category: "tools" },
  { name: "Google Collab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecolab/googlecolab-original.svg", category: "tools" },
];

// ---------- Projects (Dummy) ----------

export const projects: Project[] = [
  {
    id: "sentiment-analysis",
    title: "Tokopedia Sentiment Analysis",
    description:
      "Sentiment analysis of Tokopedia product reviews using a machine learning approach with IBM Granite large language model .",
    image: "/",
    tags: ["Python", "NLP", "Scikit-Learn", "Pandas"],
    github: "https://github.com/sngraihan/tokopedia-sentiment-capstone",
  },
  {
    id: "e-dispatch",
    title: "E-Dispatch and Tool Management System",
    description:
      "web-based warehouse management system and waybills for inter-warehouse shipments",
    image: "/",
    tags: ["Laravel", "Tailwind", "PostgreSQL", "Node.js"],
    github: "https://github.com/sngraihan/E-Dispatch_and_Tool_Management_System",
  },
  {
    id: "tba-1",
    title: "TBA",
    description:
      "",
    image: "/",
    tags: [""],
    github: "",
  },
  {
    id: "tba-2",
    title: "TBA",
    description:
      "",
    image: "/",
    tags: [""],
    github: "",
  },
];

// ---------- Navigation ----------

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// ---------- Stats ----------

export const stats = [
  { label: "Projects", value: "10+" },
  { label: "Technologies", value: "9" },
  { label: "Certifications", value: "32" },
  { label: "Year Graduated", value: "2027" },
];
