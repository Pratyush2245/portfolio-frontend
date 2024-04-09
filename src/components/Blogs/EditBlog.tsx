"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import BlogInformation from "./BlogInformation";
import { useEditBlogMutation } from "../../../redux/features/blogs/blogApi";

type Props = {
  blog: any;
  id: string;
};

const EditBlog = ({ blog, id }: Props) => {
  const [editBlog, { isSuccess, error, isLoading }] = useEditBlogMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Blog updated successfully!");
      redirect("/blogs");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, isLoading]);

  useEffect(() => {
    if (blog) {
      setBlogInfo({
        title: blog.title,
        description: blog.description,
        blogThumbnail: blog.blogThumbnail?.url,
        links: blog.links.map((link: any) => ({
          title: link.title,
          url: link.url,
        })),
        tags: blog.tags,
        categories: blog.categories,
      });
    }
  }, [blog]);

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

  const handleEditProject = async (e: any) => {
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
    };

    if (!isLoading) {
      await editBlog({ id: id, data });
    }
  };

  return (
    <div className="w-full flex justify-center min-h-screen">
      <div className="w-[80%]">
        <BlogInformation
          blogInfo={blogInfo}
          setBlogInfo={setBlogInfo}
          handleCreateBlog={handleEditProject}
          isLoading={isLoading}
          isEdit={true}
        />
      </div>
    </div>
  );
};

export default EditBlog;
