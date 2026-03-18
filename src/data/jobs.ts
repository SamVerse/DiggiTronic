export interface Job {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  whatYoullWorkOn: string;
  benefits: string[];
}

export const JOBS: Job[] = [
  {
    slug: "frontend-engineer",
    title: "Frontend Engineer",
    department: "Product",
    location: "Remote",
    type: "Full Time",
    experience: "2–4 Years",
    overview:
      "We're looking for a Frontend Engineer who obsesses over user experience and pixel-perfect execution. You'll build stunning digital interfaces that power our client projects — from landing pages to full web applications.",
    responsibilities: [
      "Build responsive, high-performance web interfaces using React and Next.js",
      "Collaborate closely with designers to bring Figma concepts to life",
      "Integrate animations using Framer Motion and GSAP",
      "Maintain code quality through structured reviews and testing",
      "Contribute to internal design systems and component libraries",
    ],
    requirements: [
      "2+ years of experience with React and TypeScript",
      "Proficiency with Tailwind CSS or similar utility-first frameworks",
      "Familiarity with animation libraries (Framer Motion, GSAP)",
      "Strong understanding of web performance optimisation",
      "Experience with Next.js App Router is a plus",
    ],
    whatYoullWorkOn:
      "Client websites, interactive landing pages, and web apps — always with design quality at the forefront.",
    benefits: [
      "Remote-first culture",
      "Learning & development budget",
      "Flexible hours",
      "Work on impactful projects",
    ],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full Time",
    experience: "2–5 Years",
    overview:
      "We're seeking a UI/UX Designer who blends visual craft with strategic thinking. You'll design interfaces that are not just beautiful — but intuitive, purposeful, and brand-aligned for our clients.",
    responsibilities: [
      "Design user flows, wireframes, and high-fidelity Figma prototypes",
      "Conduct user research and translate insights into design decisions",
      "Maintain and evolve design systems across client projects",
      "Collaborate with frontend engineers during handoff and implementation",
      "Present and defend design decisions to clients and stakeholders",
    ],
    requirements: [
      "3+ years of UI/UX design experience with a strong portfolio",
      "Expert-level Figma skills including components and auto-layout",
      "Understanding of web accessibility standards (WCAG)",
      "Experience in branding or visual identity is a strong plus",
      "Excellent communication and presentation skills",
    ],
    whatYoullWorkOn:
      "Brand identity systems, product interfaces, website designs, and design language documentation.",
    benefits: [
      "Remote-first culture",
      "Creative freedom",
      "Collaborative team",
      "Learning & development budget",
    ],
  },
  {
    slug: "seo-strategist",
    title: "SEO Strategist",
    department: "Marketing",
    location: "Remote",
    type: "Full Time",
    experience: "1–3 Years",
    overview:
      "We need an SEO Strategist who treats search as an art form. You'll develop and execute strategies that drive organic growth for ambitious brands — combining technical precision with content intelligence.",
    responsibilities: [
      "Perform technical SEO audits and implement on-page optimisations",
      "Develop and execute keyword strategies aligned with client goals",
      "Produce data-driven content briefs for the content team",
      "Monitor rankings, traffic, and conversions using Search Console, Semrush, and Ahrefs",
      "Deliver monthly performance reports with clear, actionable insights",
    ],
    requirements: [
      "1+ years of hands-on SEO experience (agency experience preferred)",
      "Proficiency with Ahrefs, Semrush, and Screaming Frog",
      "Strong understanding of Core Web Vitals and technical SEO principles",
      "Ability to write and optimise SEO-driven content effectively",
      "Google Analytics 4 certification is a plus",
    ],
    whatYoullWorkOn:
      "SEO campaigns for B2B and B2C clients across various industries — from initial audit through to ongoing execution.",
    benefits: [
      "Remote-first culture",
      "Performance bonuses",
      "Learning & development budget",
      "Flexible hours",
    ],
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return JOBS.find((j) => j.slug === slug);
}
