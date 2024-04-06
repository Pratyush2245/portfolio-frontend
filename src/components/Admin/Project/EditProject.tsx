"use client";

import React, { useEffect, useState } from "react";
import ProjectInformation from "./ProjectInformation";
import {
  useEditProjectMutation,
  useGetAllProjectsLoginQuery,
} from "../../../../redux/features/projects/projectApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

const EditProject = ({ id }: Props) => {
  const { isLoading, data, refetch } = useGetAllProjectsLoginQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [editProject, { isSuccess, error }] = useEditProjectMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Project updated successfully!");
      redirect("/admin/projects");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, isLoading]);

  const editProjectData =
    data &&
    data.projects &&
    data.projects.find((project: any) => project._id === id);

  useEffect(() => {
    if (editProjectData) {
      setProjectInfo({
        name: editProjectData.name,
        description: editProjectData.description,
        projectUrl: editProjectData.projectUrl,
        projectThumbnail: editProjectData.projectThumbnail?.url,
        links: editProjectData.links.map((link: any) => ({
          title: link.title,
          url: link.url,
        })),
        tags: editProjectData.tags,
        categories: editProjectData.categories,
      });
    }
  }, [editProjectData]);

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

  const handleEditProject = async (e: any) => {
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
      await editProject({ id: editProjectData._id, data });
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        <ProjectInformation
          projectInfo={projectInfo}
          setProjectInfo={setProjectInfo}
          handleCreateProject={handleEditProject}
          isLoading={isLoading}
          isEdit={true}
        />
      </div>
    </div>
  );
};

export default EditProject;
