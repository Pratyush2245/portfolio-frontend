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
