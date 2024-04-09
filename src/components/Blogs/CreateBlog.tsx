"use client";

import React, { useEffect, useState } from "react";
import BlogInformation from "./BlogInformation";
import { useCreateBlogMutation } from "../../../redux/features/blogs/blogApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  user: any;
};

const CreateBlog = ({ user }: Props) => {
  const [createBlog, { isSuccess, isLoading, error }] = useCreateBlogMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Blog created successfully!");
      redirect("/blogs");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, isLoading]);

  const [blogInfo, setBlogInfo] = useState({
    title: "",
    description: "",
    blogThumbnail: "",
    links: [
      {
        title: "",
        url: "",
      },
    ],
    tags: "",
    categories: "",
  });

  const handleCreateBlog = async () => {
    const data = {
      title: blogInfo.title,
      description: blogInfo.description,
      categories: blogInfo.categories,
      tags: blogInfo.tags,
      blogThumbnail: blogInfo.blogThumbnail,
      links: blogInfo.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      user: user,
    };

    if (!isLoading) {
      console.log(data);
      await createBlog(data);
    }
  };

  return (
    <div className="w-full flex justify-center min-h-screen">
      <div className="w-[80%]">
        <BlogInformation
          blogInfo={blogInfo}
          setBlogInfo={setBlogInfo}
          handleCreateBlog={handleCreateBlog}
          isLoading={isLoading}
          isEdit={false}
        />
      </div>
    </div>
  );
};

export default CreateBlog;
