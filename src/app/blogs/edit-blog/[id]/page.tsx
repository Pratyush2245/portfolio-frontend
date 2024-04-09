"use client";

import React, { useEffect, useState } from "react";
import Heading from "../../../../lib/utils/Headings";
import EditBlog from "../../../../components/Blogs/EditBlog";
import { WriterProtected } from "@/hooks/writerProtected";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useGetAllBlogsQuery } from "../../../../../redux/features/blogs/blogApi";
import CustomLoader from "@/components/global/CustomLoader";

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params?.id;
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [blog, setBlog] = useState<any>();
  const { data, isLoading } = useGetAllBlogsQuery({});

  const blogData = data?.blogs;

  useEffect(() => {
    if (blogData) {
      const currentBlog = blogData.find((blog: any) => blog._id === id);
      setBlog(currentBlog);
    }
  }, [blogData, id]);

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div>
          <WriterProtected>
            <Heading
              title={blog?.title + " - Pratyush"}
              description="Passionate tech enthusiast, ready to transform ideas into reality"
              keywords={blog?.tags}
            />
            <Header
              open={open}
              setOpen={setOpen}
              activeItem={3}
              route={route}
              setRoute={setRoute}
            />
            <div className="flex w-full items-center justify-center mx-auto max-w-7xl">
              <EditBlog blog={blog} id={id} />
            </div>
            <Footer />
          </WriterProtected>
        </div>
      )}
    </>
  );
};

export default Page;
