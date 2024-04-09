import mongoDb from "../../../public/Skills/mongoDb.png";
import nextJs from "../../../public/Skills/nextjs.png";
import expressJs from "../../../public/Skills/express.png";
import reactJs from "../../../public/Skills/reactjs.png";
import nodeJs from "../../../public/Skills/nodejs.png";
import socketIo from "../../../public/Skills/socket.io.png";
import tailwind from "../../../public/Skills/tailwind.png";
import typescript from "../../../public/Skills/typescript.png";

export const SKILLS = [
  { alt: "mongoDb", logo: mongoDb, className: "-ml-24 md:ml-0" },
  { alt: "nextJs", logo: nextJs },
  { alt: "expressJs", logo: expressJs },
  { alt: "reactJs", logo: reactJs, className: "-ml-20 md:ml-0" },
  {
    alt: "nodeJs",
    logo: nodeJs,
    className: "-ml-32 md:-ml-10 md:pr-10",
  },
  { alt: "typescript", logo: typescript, className: "-ml-12 md:-ml-0" },
  { alt: "socketIo", logo: socketIo, className: "-ml-20 md:-ml-0" },
  { alt: "tailwindCSS", logo: tailwind, className: "-ml-28 md:-ml-0" },
];

export const NavItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Projects",
    url: "/projects",
  },
  {
    name: "Blogs",
    url: "/blogs",
  },
  {
    name: "Contact Me",
    url: "/contact",
  },
];

export const words = [
  {
    text: "Full Stack Developer",
    className:
      "bg-gradient-to-r from-blue-400 to-blue-800 bg-clip-text text-transparent dark:text-transparent",
  },
];

export const StaticSkills = [
  {
    name: "Frontend Development",
    image: "/Skills/reactjs.png",
    description:
      "Advanced knowledge of HTML5, CSS3, and JavaScript (ES6+). Proficient in building responsive and interactive web interfaces using modern frontend frameworks like React and Vue.js.",
  },
  {
    name: "Backend Development",
    image: "/Skills/nodejs.png",
    description:
      "Strong skills in backend development using Node.js and Express.js. Experienced in designing and implementing RESTful APIs, handling authentication, and database management with MongoDB and MySQL.",
  },
  {
    name: "Full-Stack Development",
    image: "/Skills/nextjs.png",
    description:
      "Proficient in full-stack development with expertise in the MERN stack (MongoDB, Express.js, React, Node.js). Skilled in building scalable and robust web applications from frontend to backend.",
  },
  {
    name: "UI/UX Design",
    description:
      "Proficient in user interface (UI) and user experience (UX) design principles. Experienced in wireframing, prototyping, and creating visually appealing and intuitive user interfaces. Skilled in tools like Adobe XD, Figma, or Sketch.",
  },
  {
    name: "Testing & Debugging",
    description:
      "Strong skills in testing and debugging web applications for functionality, performance, and compatibility across different browsers and devices. Experienced in writing unit tests, integration tests, and end-to-end tests using tools like Jest, React Testing Library.",
  },
  {
    name: "TypeScript",
    image: "/Skills/typescript.png",
    description:
      "Strong proficiency in TypeScript, including static typing, interfaces, and generics. Experienced in building type-safe applications and improving codebase reliability and maintainability.",
  },
  {
    name: "Python",
    description:
      "Proficient in Python programming language, including syntax, data structures, and object-oriented programming concepts. Skilled in web development with Django and Flask frameworks.",
  },
  {
    name: "Database Management",
    image: "/Skills/mongoDb.png",
    description:
      "Expertise in relational database management with MySQL, PostgreSQL, and SQLite. Experienced in designing schemas, optimizing queries, and ensuring data integrity and security.",
  },
  {
    name: "Version Control",
    description:
      "Strong knowledge of version control systems like Git, including branching, merging, and resolving conflicts. Proficient in collaborative development workflows using platforms like GitHub and GitLab.",
  },
  {
    name: "Websockets & Real-Time Communication",
    image: "/Skills/socket.io.png",
    description:
      "Experienced in implementing real-time features using technologies like Socket.IO and Websockets. Skilled in bidirectional communication between clients and servers for chat applications, live updates, and gaming.",
  },
];
