"use client";

import Heading from "@/lib/utils/Headings";
import React, { useState } from "react";
import Header from "../components/Header/Header";
import HomePage from "@/components/HomePage/HomePage";
import { HeroParallaxDemo } from "../components/HomePage/Parallax";
import Skills from "../components/HomePage/Skills";
import Footer from "../components/Footer/Footer";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Pratyush's Portfolio"
        description="Passionate tech enthusiast, ready to transform ideas into reality"
        keywords="Full Stack Developer, Web Developer, Front End Developer, Back End Developer, MERN Stack Developer"
      />

      <Header
        open={open}
        activeItem={0}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />
      <HomePage />
      <Skills />
      <HeroParallaxDemo />
      <div className="absolute h-[200px] w-full flex-1 overflow-x-hidden z-[100000] blur-xl">
        <div className="absolute bottom-[90%] -top-[10%] bg-black opacity-50 dark:opacity-100 left-0 -right-20 z-10" />
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
