"use client";

import React, { useState } from "react";
import Heading from "../../../lib/utils/Headings";
import CreateBlog from "../../../components/Blogs/CreateBlog";
import { WriterProtected } from "@/hooks/writerProtected";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <WriterProtected>
        <Heading
          title="Pratyush's Portfolio"
          description="Passionate tech enthusiast, ready to transform ideas into reality"
          keywords="Full Stack Developer, Web Developer, Front End Developer, Back End Developer, MERN Stack Developer"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={3}
          route={route}
          setRoute={setRoute}
        />
        <div className="flex w-full items-center justify-center mx-auto max-w-7xl">
          <CreateBlog user={user} />
        </div>
        <Footer />
      </WriterProtected>
    </div>
  );
};

export default Page;
