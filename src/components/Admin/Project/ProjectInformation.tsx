import { Label } from "@/components/ui/label";
import { styles } from "../../../styles/style";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useGetHeroDataQuery } from "../../../../redux/features/layout/layoutApi";
import CustomLoader from "@/components/global/CustomLoader";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { BsLink45Deg } from "react-icons/bs";
import Loading from "@/components/global/Loader";
import { cn } from "@/lib/utils/cn";

interface ProjectInformationProps {
  projectInfo: any;
  setProjectInfo: (courseInfo: any) => void;
  handleCreateProject: any;
  isLoading: boolean;
  isEdit: boolean;
}

const CourseInformation: React.FC<ProjectInformationProps> = ({
  projectInfo,
  setProjectInfo,
  handleCreateProject,
  isEdit,
  isLoading,
}) => {
  const [dragging, setDragging] = useState(false);

  const { data, isLoading: dataLoading } = useGetHeroDataQuery({});

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.[0]?.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setProjectInfo({ ...projectInfo, projectThumbnail: e.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setProjectInfo({ ...projectInfo, projectThumbnail: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLink = (linkIndex: number) => {
    const updatedData = { ...projectInfo };
    updatedData.links.splice(linkIndex, 1);
    setProjectInfo(updatedData);
  };

  const handleAddLink = () => {
    const updatedData = { ...projectInfo };
    const linkData = updatedData.links;
    const lastLinkData = linkData[linkData.length - 1];
    if (lastLinkData) {
      const { title, url } = lastLinkData;
      if (!title || !url) {
        toast.error("Please fill all the fields of the current link");
        return;
      } else {
        updatedData.links.push({ title: "", url: "" });
        setProjectInfo(updatedData);
      }
    }
  };

  const handleCategoryChange = (e: any) => {
    setProjectInfo({ ...projectInfo, categories: e.target.value });
  };

  const handleCreateButton = () => {
    if (
      projectInfo.title === "" ||
      projectInfo.description === "" ||
      projectInfo.projectUrl === "" ||
      projectInfo.links[0].title === "" ||
      projectInfo.links[0].url === "" ||
      projectInfo.tags === "" ||
      projectInfo.categories === ""
    ) {
      toast.error("Section data cannot be empty!");
    } else {
      handleCreateProject();
    }
  };

  return (
    <>
      {dataLoading ? (
        <CustomLoader />
      ) : (
        <div className="w-[80%] m-auto mt-24 mb-10">
          <form onSubmit={handleSubmit}>
            <div>
              <LabelInputContainer>
                <Label htmlFor="name">Project Name</Label>
                <Input
                  type="text"
                  name=""
                  required
                  value={projectInfo.name}
                  onChange={(e: any) =>
                    setProjectInfo({ ...projectInfo, name: e.target.value })
                  }
                  id="name"
                  placeholder="MERN stack LMS platform with Next.js"
                  className="!bg-background"
                />
              </LabelInputContainer>
            </div>
            <br />
            <div className="mb-5">
              <LabelInputContainer>
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  name=""
                  id="description"
                  cols={30}
                  rows={8}
                  required
                  placeholder="Describe your project in detail..."
                  className="!bg-background !h-min !py-2"
                  value={projectInfo.description}
                  onChange={(e: any) =>
                    setProjectInfo({
                      ...projectInfo,
                      description: e.target.value,
                    })
                  }
                />
              </LabelInputContainer>
            </div>
            <br />
            <div className="flex justify-between w-full">
              <div className="w-[45%]">
                <LabelInputContainer>
                  <Label htmlFor="tags">Project Tags</Label>
                  <Input
                    type="text"
                    name=""
                    value={projectInfo.tags}
                    onChange={(e: any) =>
                      setProjectInfo({ ...projectInfo, tags: e.target.value })
                    }
                    id="tags"
                    placeholder="MERN, Next.js, Node.js, Express, Socket.io, Tailwin CSS..."
                    className="!bg-background"
                  />
                </LabelInputContainer>
              </div>
              <div className="w-[50%]">
                <Label htmlFor="projectCategories">Project Categories</Label>
                <select
                  onChange={handleCategoryChange}
                  value={projectInfo.categories}
                  name="projectCategories"
                  id="ptojectCategories"
                  className={`${styles.input} !mt-[2px]`}
                >
                  <option value="" className="dark:bg-black/70 bg-white/50">
                    Select Category
                  </option>
                  {categories.map((category: any) => (
                    <option
                      className="dark:bg-black/70 bg-white/50"
                      value={category.title}
                      key={category._id}
                    >
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div className="w-full">
              {projectInfo?.links.map((link: any, linkIndex: number) => (
                <div className="mb-3 block" key={linkIndex}>
                  <LabelInputContainer>
                    <div className="w-full flex items-center justify-between">
                      <Label>Link {linkIndex + 1}</Label>
                      <AiOutlineDelete
                        className={`${
                          linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"
                        }`}
                        onClick={() =>
                          linkIndex === 0 ? null : handleRemoveLink(linkIndex)
                        }
                      />
                    </div>
                    <Input
                      type="text"
                      placeholder="Source code... (Link Title)"
                      className="!bg-background"
                      value={link.title}
                      onChange={(e) => {
                        const updateData = { ...projectInfo };
                        updateData.links[linkIndex].title = e.target.value;
                        setProjectInfo(updateData);
                      }}
                    />
                    <Input
                      type="url"
                      placeholder="Source code url... (Link Url)"
                      className="!bg-background"
                      value={link.url}
                      onChange={(e) => {
                        const updateData = { ...projectInfo };
                        updateData.links[linkIndex].url = e.target.value;
                        setProjectInfo(updateData);
                      }}
                    />
                  </LabelInputContainer>
                </div>
              ))}

              {/* Add link button */}
              <div className="inline-block mb-4">
                <p
                  className="flex items-center text-[18px] dark:text-white/80 hover:dark:text-white text-black/70 hover:text-black cursor-pointer"
                  onClick={() => handleAddLink()}
                >
                  <BsLink45Deg className="mr-2" /> Add Link
                </p>
              </div>
            </div>
            <br />
            <div className="w-full">
              <LabelInputContainer>
                <Label htmlFor="projectUrl">Project URL</Label>
                <Input
                  type="text"
                  name=""
                  value={projectInfo.projectUrl}
                  onChange={(e: any) =>
                    setProjectInfo({
                      ...projectInfo,
                      projectUrl: e.target.value,
                    })
                  }
                  id="projectUrl"
                  placeholder="mernstack/ajs123"
                  className="!bg-background"
                />
              </LabelInputContainer>
            </div>
            <br />
            <div className="w-full">
              <input
                type="file"
                accept="image/*"
                id="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file"
                className={`w-full min-h-[20vh] border-muted-foreground/25 p-3 border flex items-center justify-center rounded-[5px] ${
                  dragging ? "bg-blue-500" : "bg-transparent"
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
              >
                {projectInfo.projectThumbnail ? (
                  <img
                    src={projectInfo.projectThumbnail}
                    alt=""
                    className="max-h-full w-full object-cover"
                  />
                ) : (
                  <div className="dark:text-white/80 text-black/70 flex flex-col items-center justify-center hover:dark:text-white hover:text-black cursor-pointer">
                    <FaCloudUploadAlt
                      size={130}
                      className="text-muted-foreground/10 absolute"
                    />
                    Drag and drop your thumbnail here or click to browse
                  </div>
                )}
              </label>
            </div>
            <br />
            <div className="w-full flex items-center justify-end">
              <div
                className="w-full md:w-[180px] h-[40px] bg-[#37a39a] hover:bg-[#37a39adc] text-center text-[#fff] rounded mt-6 cursor-pointer flex items-center justify-center"
                onClick={() => handleCreateButton()}
              >
                {isLoading ? <Loading /> : <>{isEdit ? "Update" : "Create"}</>}
                <BottomGradient />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default CourseInformation;
