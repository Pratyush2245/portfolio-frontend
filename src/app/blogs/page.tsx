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
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={3}
          route={route}
          setRoute={setRoute}
        />
        <Blogs />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
