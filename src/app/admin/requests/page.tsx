"use client";

import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../lib/utils/Headings";
import React from "react";
import { ModeToggle } from "@/components/global/mode-toggle";
import { AdminProtected } from "@/hooks/adminProtected";
import AllRequest from "@/components/Admin/Request/AllRequest";

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Pratyush's Portfolio"
          description="Passionate tech enthusiast, ready to transform ideas into reality"
          keywords="Full Stack Developer, Web Developer, Front End Developer, Back End Developer, MERN Stack Developer"
        />
        <div className="flex">
          <div className="2xl:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <div className="w-full flex items-center justify-end p-6 fixed top-5 right-6">
              <ModeToggle />
            </div>
            <AllRequest />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
