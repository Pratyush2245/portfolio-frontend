import React from "react";
import { LampContainer } from "../ui/lamp";
import { BackgroundBeams } from "../ui/background-beams";
import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";
import ProfilePic from "../../../public/Profile_Pic_With_BG.png";
import Link from "next/link";
import { Button } from "../ui/moving-border";

type Props = {};

const About = (props: Props) => {
  return (
    <div>
      <div className="dark:hidden block absolute bottom-0 left-0 right-0 top-0 bg-[rgba(90,88,100,0.5)] opacity-50 blur-[80px]  [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="flex flex-col items-center justify-center">
        <LampContainer />
        <div className="dark:md:-mt-24 dark:md:mr-8 mt-6 dark:-mt-40 bg-gradient-to-r from-slate-500 to-slate-800 dark:md:text-slate-200 bg-clip-text text-transparent z-[10000] dark:from-blue-300 dark:to-blue-600/80">
          <h1 className="md:text-[50px] text-[35px] font-bold">About Me</h1>
        </div>
        <div className="w-full flex flex-col justify-center md:flex-row md:mt-20 mt-8 md:mb-20 mb-10">
          <div className="flex w-full md:w-[50%] lg:w-[35%] lg:-ml-16 flex-col justify-start items-center gap-6">
            <BackgroundGradient className="rounded-full max-w-sm bg-white dark:bg-zinc-900">
              <Image
                src={ProfilePic}
                alt="Profile"
                className="object-contain rounded-full md:w-[300px] md:h-[300px] w-[150px] h-[150px] border-[4px] bg-cyan-200/40 bg-clip-border border-transparent"
              />
            </BackgroundGradient>
            <Link href={"/Resume__Updated_April.pdf"} target="_blank">
              <Button
                borderRadius="1.75rem"
                className="bg-gradient-to-r dark:bg-gradient-to-t dark:from-slate-500 dark:to-slate-900 from-slate-50 to-slate-300 text-black dark:text-white flex items-center border-none h-10 w-28 md:h-12 md:w-32 text-[12px] md:text-[14px]"
              >
                My Resume✨
              </Button>
            </Link>
          </div>
          <div className="lg:w-[65%] md:w-[50%] w-full z-[100000] mt-10 md:mt-0 flex justify-center">
            <div className="w-full max-w-[90%] mx-5 text-start text-foreground/80 text-[14px] md:text-[16px]">
              <p>
                Hello, I&apos;m Pratyush, a passionate full stack developer with
                expertise in both front-end and back-end technologies. I
                specialize in building scalable web applications using a variety
                of programming languages, frameworks, and tools.
              </p>
              <br />
              <p>
                With 2 years of experience in the field, I have a solid
                understanding of software development principles and best
                practices. I thrive in collaborative environments, where I can
                contribute my skills to create innovative solutions to complex
                problems.
              </p>
              <br />
              <p>My technical skills include:</p>
              <ul>
                <li>
                  • Front-End development :{" "}
                  <span className="text-muted-foreground">
                    HTML, CSS, JavaScript, Next.js, React.js, Angular
                  </span>
                </li>
                <li>
                  • Back-end development :{" "}
                  <span className="text-muted-foreground">
                    Node.js, Express.js, Python, Django, Nest.js
                  </span>
                </li>
                <li>
                  • Database management :{" "}
                  <span className="text-muted-foreground">
                    SQL (MySQL, PostgreSQL), NoSQL (MongoDB, Firebase)
                  </span>
                </li>
                <li>• RESTful APIs, GraphQL</li>
                <li>
                  • Version control :{" "}
                  <span className="text-muted-foreground">
                    Git, GitHub, Bitbucket
                  </span>
                </li>
                <li>
                  • Deployment and hosting :{" "}
                  <span className="text-muted-foreground">
                    AWS, Heroku, Netlify, Vercel, Docker
                  </span>
                </li>
                <li>
                  • Agile methodologies, Test-driven development (TDD),
                  Continuous Integration/Continuous Deployment (CI/CD)
                </li>
              </ul>
              <br />
              <p>
                I am always eager to learn and stay updated with the latest
                technologies and trends in the industry.
              </p>
              <br />
              <p>
                Feel free to{" "}
                <a
                  href="mailto:pratyushbhattacharya923@gmail.com"
                  className="text-blue-500"
                >
                  contact me
                </a>{" "}
                to discuss potential collaborations or opportunities. Let&apos;s
                build something amazing together!
              </p>
            </div>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default About;
