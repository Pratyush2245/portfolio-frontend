"use client";

import Heading from "../../lib/utils/Headings";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import { AdminProtected } from "../../hooks/adminProtected";
// import DashboardHero from "../../components/Admin/DashboardHero";

const page = () => {
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
            {/* <DashboardHero isDashboard={true} /> */}
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
