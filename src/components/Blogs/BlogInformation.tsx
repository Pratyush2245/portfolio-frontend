import { Label } from "@/components/ui/label";
import { styles } from "../../styles/style";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useGetCategoryDataQuery } from "../../../redux/features/layout/layoutApi";
import CustomLoader from "@/components/global/CustomLoader";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { BsLink45Deg } from "react-icons/bs";
import Loading from "@/components/global/Loader";
import { cn } from "@/lib/utils/cn";

interface BlogInformationProps {
  blogInfo: any;
  setBlogInfo: (blogInfo: any) => void;
  handleCreateBlog: any;
  isLoading: boolean;
  isEdit: boolean;
}

const BlogInformation: React.FC<BlogInformationProps> = ({
  blogInfo,
  setBlogInfo,
  handleCreateBlog,
  isEdit,
  isLoading,
}) => {
  const [dragging, setDragging] = useState(false);

  const { data, isLoading: dataLoading } = useGetCategoryDataQuery({});

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.categories?.[0]?.categories);
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
          setBlogInfo({ ...blogInfo, blogThumbnail: e.target.result });
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
        setBlogInfo({ ...blogInfo, blogThumbnail: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLink = (linkIndex: number) => {
    const updatedData = { ...blogInfo };
    updatedData.links.splice(linkIndex, 1);
    setBlogInfo(updatedData);
  };

  const handleAddLink = () => {
    const updatedData = { ...blogInfo };
    const linkData = updatedData.links;
    const lastLinkData = linkData[linkData.length - 1];
    if (lastLinkData) {
      const { title, url } = lastLinkData;
      if (!title || !url) {
        toast.error("Please fill all the fields of the current link");
        return;
      } else {
        updatedData.links.push({ title: "", url: "" });
        setBlogInfo(updatedData);
      }
    }
  };

  const handleCategoryChange = (e: any) => {
    setBlogInfo({ ...blogInfo, categories: e.target.value });
  };

  const handleCreateButton = () => {
    if (
      blogInfo.title === "" ||
      blogInfo.description === "" ||
      blogInfo.tags === "" ||
      blogInfo.categories === ""
    ) {
      toast.error("Section data cannot be empty!");
    } else {
      handleCreateBlog();
    }
  };

  return (
    <>
      {dataLoading ? (
        <CustomLoader />
      ) : (
        <div className="m-auto my-10">
          <div className="flex justify-center mb-5">
            <div className="bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent z-[10000] dark:from-blue-300 dark:to-blue-600/80 w-[300px]">
              <h1 className="md:text-[50px] text-[35px] font-bold">
                {isEdit ? "Edit " : "Create "} Blog
              </h1>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <LabelInputContainer>
                <Label htmlFor="name">Blog Title</Label>
                <Input
                  type="text"
                  name=""
                  required
                  value={blogInfo.title}
                  onChange={(e: any) =>
                    setBlogInfo({ ...blogInfo, title: e.target.value })
                  }
                  id="name"
                  placeholder="Enter blog title here..."
                  className="!bg-background"
                />
              </LabelInputContainer>
            </div>
            <br />
            <div className="mb-5">
              <LabelInputContainer>
                <Label htmlFor="description">Blog Description</Label>
                <Textarea
                  name=""
                  id="description"
                  cols={30}
                  rows={8}
                  required
                  placeholder="Describe your blog in detail..."
                  className="!bg-background !h-min !py-2"
                  value={blogInfo.description}
                  onChange={(e: any) =>
                    setBlogInfo({
                      ...blogInfo,
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
                    value={blogInfo.tags}
                    onChange={(e: any) =>
                      setBlogInfo({ ...blogInfo, tags: e.target.value })
                    }
                    id="tags"
                    placeholder="Enter tags (comma-separated)"
                    className="!bg-background"
                  />
                </LabelInputContainer>
              </div>
              <div className="w-[50%]">
                <Label htmlFor="blogCategory">Blog Category</Label>
                <select
                  onChange={handleCategoryChange}
                  value={blogInfo.categories}
                  name="blogCategory"
                  id="blogCategory"
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
              {blogInfo?.links.map((link: any, linkIndex: number) => (
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
                      placeholder="Enter link title here..."
                      className="!bg-background"
                      value={link.title}
                      onChange={(e) => {
                        const updateData = { ...blogInfo };
                        updateData.links[linkIndex].title = e.target.value;
                        setBlogInfo(updateData);
                      }}
                    />
                    <Input
                      type="url"
                      placeholder="Enter url here..."
                      className="!bg-background"
                      value={link.url}
                      onChange={(e) => {
                        const updateData = { ...blogInfo };
                        updateData.links[linkIndex].url = e.target.value;
                        setBlogInfo(updateData);
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
                {blogInfo.blogThumbnail ? (
                  <img
                    src={blogInfo.blogThumbnail}
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

export default BlogInformation;
