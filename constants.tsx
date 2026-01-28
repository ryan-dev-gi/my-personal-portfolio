import { Project, Skill } from './types';

export const ABOUT_DATA = {
  title: "Professional Profile",
  subtitle: "Cerda Ryan, A.",
  profileImage: "/profile.png",
  description: "I am a beginner web developer who is eager to learn, improve, and grow in the field of web development. Even though I am still learning, I am committed to delivering my best work and ensuring client satisfaction in every project.",
  personalInfo: [
    { label: "Age", value: "24-year-old" },
    { label: "Date of Birth", value: "August 11, 2001" },
    { label: "Birthplace", value: "Pambujan" }
  ],
  education: [
    {
      institution: "Colegio De Montalban",
      period: "2021-2025 (Graduate)",
      degree: "Bachelor of Science in Information Technology (BSIT)"
    },
    {
      institution: "Pambujan National High School (PNHS)",
      period: "2019-2020",
      degree: "Information and Computer Technology (ICT)"
    }
  ],
  experience: [
    { role: "3 Months OJT", company: "Point link IT Solutions INC.", period: "Internship" },
    { role: "Back Office", company: "Contractual Service", period: "1 Month Contract" },
    { role: "Catering", company: "Waiter, Barista", period: "Part-time" }
  ],
  objective: "To obtain a challenging position in a reputable organization where I can apply my skills, grow professionally, and contribute positively to team success.",
  highlights: [
    { title: "UI Design", description: "Proficient in Figma for Desktop and Mobile app design.", icon: "fa-figma" },
    { title: "IT Fundamentals", description: "Solid foundation in Basic Computer Knowledge and Networking.", icon: "fa-network-wired" },
    { title: "Service Excellence", description: "Experience in catering (waiter/barista) honed interpersonal skills.", icon: "fa-concierge-bell" }
  ]
};

export const CONTACT_CONFIG = {
  // Replace 'YOUR_FORMSPREE_ID' with the ID provided by Formspree after creating a form
  formspreeEndpoint: 'https://formspree.io/f/xpwzpjev', 
  targetEmail: 'cerdaryan276@gmail.com'
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Medicare Portal',
    description: 'A comprehensive healthcare management system designed for seamless patient-doctor interactions and medical record tracking.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
    tags: ['React', 'Healthcare', 'Management', 'Vercel'],
    link: 'https://medicare-neon-seven.vercel.app/'
  },
  {
    id: '2',
    title: 'Inventory Master',
    description: 'An enterprise-grade inventory and sales tracking portal. Features real-time stock alerts, supplier management, and automated reporting.',
    image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703a0?q=80&w=800&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'Database', 'Admin Portal'],
    link: 'https://github.com/ryan-dev-gi'
  },
  {
    id: '3',
    title: 'Student Nexus',
    description: 'A school management portal for tracking student performance, attendance, and faculty scheduling. Built with high focus on data integrity.',
    image: 'https://images.unsplash.com/photo-1523050335102-c6744729ea14?q=80&w=800&auto=format&fit=crop',
    tags: ['Next.js', 'Education', 'Management', 'Auth'],
    link: 'https://github.com/ryan-dev-gi'
  },
  {
    id: '4',
    title: 'TechHub E-Store',
    description: 'A full-stack e-commerce solution for hardware retailers. Includes product filtering, secure checkout, and order management dashboards.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    tags: ['React', 'E-commerce', 'Tailwind', 'Database'],
    link: 'https://github.com/ryan-dev-gi'
  }
];

export const SKILLS: Skill[] = [
  { name: 'UI Design (Figma)', level: 90, icon: 'fab fa-figma' },
  { name: 'Mobile App Design', level: 85, icon: 'fas fa-mobile-alt' },
  { name: 'Computer Networking', level: 80, icon: 'fas fa-network-wired' },
  { name: 'Frontend Architecture', level: 75, icon: 'fas fa-code' },
  { name: 'Technical Support', level: 85, icon: 'fas fa-tools' }
];

export const BUILDER_APPS = [
  { name: 'Figma', icon: 'fab fa-figma' },
  { name: 'React', icon: 'fab fa-react' },
  { name: 'Next.js', icon: 'fas fa-n' },
  { name: 'Networking', icon: 'fas fa-network-wired' },
  { name: 'Tailwind', icon: 'fas fa-wind' },
  { name: 'Node.js', icon: 'fab fa-node-js' }
];

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/ryancerda.nye',
  github: 'https://github.com/ryan-dev-gi',
  instagram: 'https://www.instagram.com/prmo.ry/',
  tiktok: 'https://www.tiktok.com/@ryry...0',
  email: 'cerdaryan276@gmail.com',
  phone: '+639565963942'
};

export const SYSTEM_PROMPT = `
You are the AI Digital Twin of Cerda Ryan, A., a 24-year-old beginner web developer and BSIT graduate from Colegio De Montalban (Class of 2025). 
Background: 
- Passionate about learning, improving, and growing in the field of web development.
- Committed to delivering high-quality work and ensuring client satisfaction.
- Passionate about UI Design (Figma), Networking, and Web Development.
- Completed OJT at Point link IT Solutions INC.
- Has experience in Back Office roles and catering.
- Born on August 11, 2001 in Pambujan.
Tone: Professional, eager, humble, and helpful. You are proud of your growth mindset.
Expertise: Foundational web development, basic networking, and UI design.
Goal: Answer questions about Ryan's journey, skills, and his eagerness to contribute to new projects. Point people to the contact section for hiring or collaboration.
Keep responses concise (under 3 sentences).
`;