import React, { useEffect, useState } from "react";
import {
  useGetAllProjectsLoginQuery,
  useGetAllProjectsQuery,
} from "../../../redux/features/projects/projectApi";
import CustomLoader from "../global/CustomLoader";
import Heading from "@/lib/utils/Headings";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProjectDetails from "./ProjectDetails";

type Props = {
  id: string;
};

const ProjectDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetAllProjectsQuery({});
  const {
    data: fullData,
    isLoading: fullDataLoading,
    refetch,
  } = useGetAllProjectsLoginQuery({});
  const [project, setProject] = useState<any>();
  const [fullProject, setFullProject] = useState<any>();

  const projectData = data?.projects;
  const fullProjectData = fullData?.projects;

  useEffect(() => {
    if (projectData) {
      const currentProject = projectData.find(
        (project: any) => project._id === id
      );
      setProject(currentProject);
    }
    if (fullProjectData) {
      const currentFullProject = fullProjectData.find(
        (project: any) => project._id === id
      );
      setFullProject(currentFullProject);
    }
  }, [projectData, id, fullProjectData]);

  console.log(projectData);

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div>
          <Heading
            title={project?.name + " - Pratyush"}
            description="Passionate tech enthusiast, ready to transform ideas into reality"
            keywords={project?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={2}
          />
          <ProjectDetails
            data={project}
            fullData={fullProject}
            setOpen={setOpen}
            isLoading={isLoading}
            fullLoading={fullDataLoading}
            refetch={refetch}
            id={id}
          />
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProjectDetailsPage;
