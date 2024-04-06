"use client";

import React from "react";
import ProjectDetailsPage from "../../../components/Project/ProjectDetailsPage";

type Props = {
  params: any;
};

const page = ({ params }: Props) => {
  return (
    <div>
      <ProjectDetailsPage id={params.id} />
    </div>
  );
};

export default page;
