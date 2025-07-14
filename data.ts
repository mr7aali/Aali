import { MobileOutlined } from "@ant-design/icons";
import { title } from "process";
import { FaCss3Alt, FaGithub, FaReact } from "react-icons/fa";
import { SiNodedotjs, SiPostman } from "react-icons/si";

export const HeroSectionData = {
  title: "Hey, I'm",
  name: "Sheikh Aali",
  designation: "Full Stack Developer",
  cv: "https://drive.google.com/file/d/1Tg2BWlptX8xEhaYqdtQ0TQnsBcno_Xkb/view?usp=sharing",
  decription:
    "Based in Dhaka, Bangladesh 📍, Im a passionate developer crafting seamless, dynamic web experiences. From sleek e-commerce platformsto interactive applications, I turn ideas into reality. Dive into my portfolio and let’s create something extraordinary together!",
};
export const skills: string[] = [
  "Html5",
  "Css",
  "Sass",
  "Responsive Design",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "Python",
  "Django",
  "Java",
  "C++",
  "C",
  "React",
  "NextJs",
  "GitHub",
  "NodeJs",
  "Express",
  "Postman",
  "REST APIs",
  "Object-Oriented Programming",
  "Prisma",
  "SQL",
  "PostgreSQL",
  "Firebase",
  "MongoDB",
  "RESTful APIs",
  "React Native",
  "Redux",
  "Web Development",
  "Figma",
  "MySQL",
  "Node.js",
  "express.js",
  "Nest.js",
  "Prisma",
];
export const ExpertiseItemsData = [
  {
    title: "Frontend Development",
    description:
      "I craft responsive and interactive user interfaces using React.js, Next.js, and modern CSS frameworks like Tailwind CSS, Bootstrap, Material-UI, and Ant Design. My focus is on delivering high-performance web applications with exceptional UI/UX.",
    Icon: FaReact,
  },
  {
    title: "Full-Stack Development",
    description:
      "Skilled in building end-to-end web applications with Next.js and React for the front end, and Node.js, Express, PostgreSQL, and MongoDB for the back end. I ensure seamless integration and robust, scalable solutions.",
    Icon: SiPostman,
  },
  {
    title: "Problem Solving & Algorithms",
    description:
      "Proficient in functional and object-oriented programming with languages like C, C++, Python, Java, JavaScript, and TypeScript. I excel at solving complex problems and optimizing algorithms for efficient solutions.",
    Icon: MobileOutlined,
  },
  {
    title: "Backend Development",
    description:
      "Experienced in building server-side applications using Node.js, Express, and Prisma, with expertise in managing databases like PostgreSQL, MongoDB, and Firebase. I create secure and efficient APIs to power dynamic applications.",
    Icon: SiNodedotjs,
  },
  {
    title: "Responsive Web Design",
    description:
      "I specialize in creating responsive and visually appealing designs using HTML5, CSS, Sass, and frameworks like Tailwind CSS and Bootstrap. My designs ensure optimal performance across devices and screen sizes.",
    Icon: FaCss3Alt,
  },
  {
    title: "Version Control",
    description:
      "Adept at using Git and GitHub for version control, enabling efficient collaboration and code management. I streamline workflows and maintain clean, organized repositories for team projects.",
    Icon: FaGithub,
  },
];

export const projects = [
  {
    title: "E-commerce Full-stack Website",
    subtitle: "Start Tech",
    description:
      "A fully functional e-commerce platform with React, Next.js, Node.js, and MongoDB, featuring secure payments and responsive design.",
    imageLink: "https://i.ibb.co/zWF6CvCF/star-tech-optimized.png",
    skills: ["React", "NextJs", "NodeJs", "MongoDB", "TailwindCSS"],
    projectLink: "https://github.com/mr7aali/star-tech",
  },
  {
    title: "Full Stack Project  - Food Ordering website",
    subtitle: "Slice Savvy",
    description:
      "A full-stack food ordering website built with React, Next.js, Node.js, and MongoDB, featuring user authentication and real-time order tracking.",
    imageLink: "https://i.ibb.co/LX1by47Z/chatbot-sss-1-optimized.png",
    skills: ["NextJs", "TypeScript", "TailwindCSS", "React"],
    projectLink: "https://github.com/mr7aali/chatbot",
  },
  {
    title: "Fontend Project - Portfolio Website",
    subtitle: "Freelance Work",
    description:
      "I make this website for my Client.Where is showcase his skills and projects.I used nextjs, typescript and tailwindcss",
    imageLink: "https://i.ibb.co/kV8Ws6LC/Pasted-image-optimized.png",
    skills: ["React", "TypeScript", "GitHub"],
    projectLink: "https://github.com/mr7aali/ek_portfolio",
  },
];
