"use client";

import React, { useEffect, useState } from "react";
import ProjectInformation from "./ProjectInformation";
import { useCreateProjectMutation } from "../../../../redux/features/projects/projectApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {};

const CreateProject = (props: Props) => {
  const [createProject, { isSuccess, isLoading, error }] =
    useCreateProjectMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Project created successfully!");
      redirect("/admin/projects");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, isLoading]);

  const [projectInfo, setProjectInfo] = useState({
    name: "",
    description: "",
    projectUrl: "",
    projectThumbnail: "",
    links: [
      {
        title: "",
        url: "",
      },
    ],
    tags: "",
    categories: "",
  });

  const handleCreateProject = async (e: any) => {
    const data = {
      name: projectInfo.name,
      description: projectInfo.description,
      categories: projectInfo.categories,
      tags: projectInfo.tags,
      projectUrl: projectInfo.projectUrl,
      projectThumbnail: projectInfo.projectThumbnail,
      links: projectInfo.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
    };

    if (!isLoading) {
      console.log(data);
      await createProject(data);
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        <ProjectInformation
          projectInfo={projectInfo}
          setProjectInfo={setProjectInfo}
          handleCreateProject={handleCreateProject}
          isLoading={isLoading}
          isEdit={false}
        />
      </div>
    </div>
  );
};

export default CreateProject;
