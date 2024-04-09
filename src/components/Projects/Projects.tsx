import React, { useEffect, useState } from "react";
import { useGetAllProjectsQuery } from "../../../redux/features/projects/projectApi";
import { useGetHeroDataQuery } from "../../../redux/features/layout/layoutApi";
import { styles } from "@/styles/style";
import { MdOutlineSmsFailed } from "react-icons/md";
import { Button } from "../ui/moving-border";
import ProjectSection from "../../components/Projects/ProjectSection";
import CustomLoader from "../global/CustomLoader";

type Props = {};

const Projects = (props: Props) => {
  const { data, isSuccess, error, isLoading } = useGetAllProjectsQuery(
    undefined,
    {}
  );
  const { data: categoryData } = useGetHeroDataQuery({});
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setProjects(data?.projects);
    }
    if (category !== "All") {
      setProjects(
        data?.projects?.filter(
          (project: any) => project.categories === category
        )
      );
    }
  }, [category, data]);

  const categories = categoryData?.layout?.[0]?.categories;

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="w-[95%] md:w-[85%] m-auto">
          <br />
          <div className="w-full flex items-center flex-wrap">
            <span className="mr-4 mb-2">
              <Button
                className={`h-[35px] border-none z-[1000000] ${
                  category === "All"
                    ? "from-foreground/70 to-muted-foreground/70 dark:text-black text-white bg-gradient-to-t"
                    : "bg-transparent text-black dark:text-white"
                } px-4 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer w-auto`}
                onClick={() => setCategory("All")}
              >
                All
              </Button>
            </span>
            {categories &&
              categories.map((item: any, index: number) => (
                <div key={index} className="mr-4 mb-2">
                  <Button
                    className={`h-[35px] border-none z-[1000000] ${
                      category === item.title
                        ? "from-foreground/70 to-muted-foreground/70 dark:text-black text-white bg-gradient-to-t"
                        : "bg-transparent text-black dark:text-white"
                    } px-4 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer w-auto`}
                    onClick={() => setCategory(item.title)}
                  >
                    {item.title}
                  </Button>
                </div>
              ))}
          </div>
          {projects && projects.length === 0 && (
            <p
              className={`${styles.label} min-h-[50vh] flex flex-col justify-center items-center text-center gap-10 mt-14`}
            >
              <MdOutlineSmsFailed className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] text-muted-foreground/30" />
              No projects found in this category.
              <br />
              Please try another one!
            </p>
          )}
          <br />
          <br />
          <ProjectSection projects={projects} />
        </div>
      )}
    </>
  );
};

export default Projects;
