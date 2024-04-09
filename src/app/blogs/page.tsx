"use client";

import Header from "../../components/Header/Header";
import Heading from "../../lib/utils/Headings";
import React, { useState } from "react";
import Blogs from "../../components/Blogs/Blogs";
import Footer from "@/components/Footer/Footer";

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
      <div className="min-h-screen">
        <div className="dark:hidden block absolute bottom-0 left-0 right-0 top-0 bg-[rgba(90,88,100,0.5)] opacity-50 blur-[80px]  [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={3}
          route={route}
          setRoute={setRoute}
        />
        <Blogs setOpen={setOpen} />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
