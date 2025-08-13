import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Calendar,
  ExternalLink,
} from "lucide-react";

export default function ModernCV() {
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="p-8 text-white bg-gradient-to-r from-slate-900 to-slate-700">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold">Sheikh Sukur Ali</h1>
              <p className="mb-4 text-xl text-slate-200">Software Developer</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>01967519057</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a
                    href="mailto:mr7aali@gmail.com"
                    className="transition-colors hover:text-slate-300"
                  >
                    mr7aali@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://linkedin.com/in/mr7aali"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:text-slate-300"
              >
                <Linkedin className="w-4 h-4" />
                <span>linkedin.com/in/mr7aali</span>
              </a>
              <a
                href="https://github.com/mr7aali"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:text-slate-300"
              >
                <Github className="w-4 h-4" />
                <span>github.com/mr7aali</span>
              </a>
              <a
                href="https://ali-portfolio-2-0.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:text-slate-300"
              >
                <Globe className="w-4 h-4" />
                <span>ali-portfolio-2-0.vercel.app</span>
              </a>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Education Section */}
          <section className="mb-8">
            <h2 className="pb-2 mb-4 text-2xl font-bold border-b-2 text-slate-800 border-slate-200">
              Education
            </h2>
            <div className="p-6 rounded-lg bg-slate-50">
              <div className="flex flex-col gap-2 mb-3 md:flex-row md:justify-between md:items-start">
                <h3 className="text-lg font-semibold text-slate-800">
                  Bachelor of Science in Computer Science and Engineering
                </h3>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>2021 - Present</span>
                </div>
              </div>
              <p className="mb-3 italic text-slate-600">
                Bangladesh University of Business & Technology (BUBT), Dhaka,
                Bangladesh
              </p>
              <ul className="space-y-1 text-slate-700">
                <li>
                  • Relevant Coursework: Data Structures, Algorithms, Web
                  Development, Database Systems
                </li>
                <li>
                  • Project: Stroke Prediction Model using Machine Learning
                </li>
              </ul>
            </div>
          </section>

          {/* Work Experience Section */}
          <section className="mb-8">
            <h2 className="pb-2 mb-4 text-2xl font-bold border-b-2 text-slate-800 border-slate-200">
              Work Experience
            </h2>
            <div className="p-6 rounded-lg bg-slate-50">
              <div className="flex flex-col gap-2 mb-3 md:flex-row md:justify-between md:items-start">
                <h3 className="text-lg font-semibold text-slate-800">
                  Frontend Developer
                </h3>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>Dec 2023 - Feb 2025</span>
                </div>
              </div>
              <p className="mb-3 italic text-slate-600">
                Rokomari, Dhaka, Bangladesh
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>
                  • Developed a responsive web app using Next.js, TypeScript,
                  Tailwind CSS, and SCSS
                </li>
                <li>
                  • Converted Figma designs to pixel-perfect layouts, ensuring
                  cross-device compatibility
                </li>
                <li>
                  • Collaborated with backend teams to integrate APIs, improving
                  user experience and performance
                </li>
              </ul>
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-8">
            <h2 className="pb-2 mb-4 text-2xl font-bold border-b-2 text-slate-800 border-slate-200">
              Technical Skills
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-lg bg-slate-50">
                <h3 className="mb-3 font-semibold text-slate-800">
                  Programming Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["JavaScript", "TypeScript", "Python", "C", "C++"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="p-6 rounded-lg bg-slate-50">
                <h3 className="mb-3 font-semibold text-slate-800">
                  Frameworks & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "React Native",
                    "Flutter",
                    "Node.js",
                    "Express.js",
                    "Tailwind CSS",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 rounded-lg bg-slate-50">
                <h3 className="mb-3 font-semibold text-slate-800">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  {["MongoDB", "MySQL", "PostgreSQL", "Prisma", "Mongoose"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm font-medium text-purple-800 bg-purple-100 rounded-full"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="p-6 rounded-lg bg-slate-50">
                <h3 className="mb-3 font-semibold text-slate-800">
                  Other Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Responsive Design",
                    "Figma-to-Code",
                    "REST API",
                    "Git",
                    "Agile",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm font-medium text-orange-800 bg-orange-100 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section>
            <h2 className="pb-2 mb-4 text-2xl font-bold border-b-2 text-slate-800 border-slate-200">
              Featured Projects
            </h2>
            <div className="space-y-6">
              {/* Project 1 */}
              <div className="p-6 transition-shadow rounded-lg bg-slate-50 hover:shadow-md">
                <div className="flex flex-col gap-2 mb-3 md:flex-row md:justify-between md:items-start">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Kasra Design Clone – Creative Video Showcase Website
                  </h3>
                  <span className="text-sm text-slate-600">2024</span>
                </div>
                <ul className="mb-4 space-y-1 text-slate-700">
                  <li>
                    • Developed a responsive frontend clone using Next.js,
                    Tailwind CSS, and Framer Motion
                  </li>
                  <li>
                    • Integrated YouTube Data API v3 for dynamic video loading
                    and playback
                  </li>
                </ul>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/mr7aali/ek_portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://ek-portfolio-te2r.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>

              {/* Project 2 */}
              <div className="p-6 transition-shadow rounded-lg bg-slate-50 hover:shadow-md">
                <div className="flex flex-col gap-2 mb-3 md:flex-row md:justify-between md:items-start">
                  <h3 className="text-lg font-semibold text-slate-800">
                    CourierTrack - Multi-Language Courier Management System
                  </h3>
                  <span className="text-sm text-slate-600">2025</span>
                </div>
                <ul className="mb-4 space-y-1 text-slate-700">
                  <li>
                    • Built a responsive web app with Next.js, TypeScript, and
                    next-intl, supporting English and Bengali
                  </li>
                  <li>
                    • Implemented language detection, URL-based routing, and
                    full UI translation with RTL support
                  </li>
                </ul>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/mr7aali/CourierTrack-Froentend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://courier-track-froentend.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>

              {/* Project 3 */}
              <div className="p-6 transition-shadow rounded-lg bg-slate-50 hover:shadow-md">
                <div className="flex flex-col gap-2 mb-3 md:flex-row md:justify-between md:items-start">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Food Ordering System
                  </h3>
                  <span className="text-sm text-slate-600">2024</span>
                </div>
                <ul className="mb-4 space-y-1 text-slate-700">
                  <li>
                    • Built a web application using Next.js, Node.js,
                    Express.js, and Mongoose to streamline food ordering
                  </li>
                </ul>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/mr7aali/chatbot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://chatbot-zeta-six-82.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>

              {/* Project 4 */}
              <div className="p-6 transition-shadow rounded-lg bg-slate-50 hover:shadow-md">
                <div className="flex flex-col gap-2 mb-3 md:flex-row md:justify-between md:items-start">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Ready Auth
                  </h3>
                  <span className="text-sm text-slate-600">2023</span>
                </div>
                <ul className="mb-4 space-y-1 text-slate-700">
                  <li>
                    • Developed a secure authentication system using Express.js,
                    MongoDB, and Mongoose
                  </li>
                  <li>
                    • Provided a scalable solution for companies to implement
                    user authentication
                  </li>
                </ul>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/mr7aali/userAthentication"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Project 5 */}
              <div className="p-6 transition-shadow rounded-lg bg-slate-50 hover:shadow-md">
                <div className="flex flex-col gap-2 mb-3 md:flex-row md:justify-between md:items-start">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Personal Portfolio Website
                  </h3>
                  <span className="text-sm text-slate-600">2023</span>
                </div>
                <ul className="mb-4 space-y-1 text-slate-700">
                  <li>
                    • Created a responsive portfolio using Next.js, TypeScript,
                    and Tailwind CSS
                  </li>
                </ul>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/mr7aali/Aali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://ali-portfolio-2-0.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
