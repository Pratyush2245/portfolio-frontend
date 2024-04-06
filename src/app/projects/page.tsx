"use client";

import Header from "../../components/Header/Header";
import Heading from "../../lib/utils/Headings";
import React, { useState } from "react";
import Projects from "../../components/Projects/Projects";
import Footer from "@/components/Footer/Footer";
import { BackgroundBeams } from "@/components/ui/background-beams";

interface Props {}

const Page: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Pratyush's Portfolio"
        description="Passionate tech enthusiast, ready to transform ideas into reality"
        keywords="Full Stack Developer, Web Developer, Front End Developer, Back End Developer, MERN Stack Developer"
      />
      <div className="min-h-[100vh]">
        <div className="dark:hidden block absolute bottom-0 left-0 right-0 top-0 bg-[rgba(90,88,100,0.5)] opacity-50 blur-[80px]  [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={2}
          route={route}
          setRoute={setRoute}
        />
        <Projects />
        <BackgroundBeams />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
