import React, { useEffect, useState } from "react";
import CustomLoader from "../global/CustomLoader";
import Heading from "@/lib/utils/Headings";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BlogDetails from "./BlogDetails";
import { useGetAllBlogsQuery } from "../../../redux/features/blogs/blogApi";

type Props = {
  id: string;
};

const BlogDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useGetAllBlogsQuery({});
  const [blog, setBlog] = useState<any>();

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
          <Heading
            title={blog?.title + " - Pratyush"}
            description="Passionate tech enthusiast, ready to transform ideas into reality"
            keywords={blog?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={3}
          />
          <BlogDetails
            data={blog}
            isLoading={isLoading}
            refetch={refetch}
            id={id}
            setOpen={setOpen}
          />
          <Footer />
        </div>
      )}
    </>
  );
};

export default BlogDetailsPage;
