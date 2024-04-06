"use client";

import Header from "../../components/Header/Header";
import Heading from "../../lib/utils/Headings";
import React, { useState } from "react";
import Contact from "../../components/Contact/Contact";
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
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={4}
        route={route}
        setRoute={setRoute}
      />
      <Contact />
      <Footer setOpen={setOpen} />
    </div>
  );
};

export default Page;
