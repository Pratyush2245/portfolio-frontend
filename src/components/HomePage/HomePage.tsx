import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import Image from "next/image";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { words } from "@/lib/utils/constants";
import ProfilePic from "../../../public/Profile_Pic.png";

const HomePage = ({}) => {
  return (
    <div>
      <div className="dark:hidden block absolute bottom-0 left-0 right-0 top-0 bg-[rgba(90,88,100,0.5)] opacity-50 blur-[80px]  [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="w-full h-full flex items-center -mt-10 flex-col lg:flex-row">
        <div className="lg:w-[50%] h-[100vh] flex items-center justify-start lg:ml-20 mx-6">
          <div className="flex flex-col">
            <h1 className="lg:text-[50px] text-[30px] font-bold font-sans text-start">
              Hi, I&apos;m Pratyush
            </h1>
            <TypewriterEffectSmooth words={words} />
            <p className="text-start">
              Welcome to my digital space! I am a dedicated web developer with a
              relentless passion for creating engaging online experiences.
              Embracing innovation and creativity, I bring ideas to life in the
              vast world of technology.
            </p>
            <div className="flex flex-row justify-start mt-5 gap-8">
              <a
                href="mailto:pratyushbhattacharya923@gmail.com?subject=Job%20Opportunity%20Inquiry"
                target="_blank"
              >
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                >
                  <span>Hire Me</span>
                </HoverBorderGradient>
              </a>
              <a
                href="https://telegram.me/PratyushBhattacharya123"
                target="_blank"
              >
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                >
                  <span>Let&apos;s Talk!✨</span>
                </HoverBorderGradient>
              </a>
            </div>
          </div>
        </div>
        <div className="lg:w-[50%] h-[calc(100vh - 80px)] items-center justify-center ml-20 hidden lg:flex relative">
          <div className="flex items-end">
            <Image
              src={ProfilePic}
              alt="Profile"
              height="550"
              width="550"
              className="object-contain z-[10000]"
            />
          </div>
          <div className="absolute h-[700px] w-[450px] flex-1 overflow-x-hidden z-[100000] blur-xl">
            <div className="absolute bottom-0 top-[75%] bg-gradient-to-t from-background dark:from-[#020817] left-0 -right-20 z-10" />
            <div className="absolute bottom-0 top-[75%] bg-gradient-to-t from-background dark:from-[#020817] left-0 -right-20 z-10" />
            <div className="absolute bottom-0 top-[75%] bg-gradient-to-t from-background dark:from-[#020817] left-0 -right-20 z-10" />
            <div className="absolute bottom-0 top-[75%] bg-gradient-to-t from-background dark:from-[#020817] left-0 -right-20 z-10" />
            <div className="absolute bottom-0 top-[75%] bg-gradient-to-t from-background dark:from-[#020817] left-0 -right-20 z-10" />
            <div className="absolute bottom-0 top-[75%] bg-gradient-to-t from-background dark:from-[#020817] left-0 -right-20 z-10" />
          </div>
        </div>
        <div className="absolute bottom-0 top-0 bg-gradient-to-r dark:from-purple-800 dark:to-purple-900 opacity-20 left-[60%] right-[30px] blur-[80px] z-10 rounded-full lg:flex hidden" />
        <div className="absolute bottom-[80%] top-0 bg-gradient-to-t dark:from-purple-500 dark:to-purple-600 opacity-10 blur-3xl left-0 right-0 z-10" />
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default HomePage;
