import React, { useEffect, useState } from "react";
import { useGetCategoryDataQuery } from "../../../redux/features/layout/layoutApi";
import { styles } from "@/styles/style";
import { MdOutlineSmsFailed, MdPending } from "react-icons/md";
import { Button } from "../ui/moving-border";
import CustomLoader from "../global/CustomLoader";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { FaBlogger } from "react-icons/fa";
import { useGetAllBlogsQuery } from "../../../redux/features/blogs/blogApi";
import BlogSection from "./BlogSection";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { FcCancel } from "react-icons/fc";
import {
  useCreateBlogRequestMutation,
  useGetAllBlogRequestsQuery,
} from "../../../redux/features/blogRequest/blogRequestApi";
import toast from "react-hot-toast";
import Loading from "../global/Loader";
import { useSelector } from "react-redux";

interface BlogsProps {
  setOpen: any;
}

const Blogs: React.FC<BlogsProps> = ({ setOpen }) => {
  const { data, isSuccess, error, isLoading, refetch } = useGetAllBlogsQuery(
    undefined,
    {}
  );
  const [
    createBlogRequest,
    {
      isSuccess: requestSuccess,
      error: requestError,
      isLoading: requestLoading,
    },
  ] = useCreateBlogRequestMutation();
  const { user } = useSelector((state: any) => state.auth);
  const { data: categoryData } = useGetCategoryDataQuery({});
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("All");
  const [isBlogRequestExists, setIsBlogRequestExists] = useState(false);

  const {
    data: requestData,
    isLoading: requestDataLoading,
    refetch: requestRefetch,
  } = useGetAllBlogRequestsQuery(undefined, {});

  useEffect(() => {
    if (category === "All") {
      setBlogs(data?.blogs);
    }
    if (category !== "All") {
      setBlogs(
        data?.blogs?.filter((blog: any) => blog.categories === category)
      );
    }
  }, [category, data]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  console.log(user);

  const categories = categoryData?.categories?.[0]?.categories;

  const handleLoginClick = () => {
    if (!user) {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (requestSuccess) {
      toast.success("Create request sent successfully!");
      requestRefetch();
    }
    if (requestError) {
      if ("data" in requestError) {
        const errorData = requestError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [requestError, requestSuccess, requestLoading]);

  const handleSendRequest = async () => {
    const data = user;
    await createBlogRequest(data);
  };

  useEffect(() => {
    if (requestData && !requestDataLoading) {
      requestRefetch();
      setIsBlogRequestExists(
        user?.email === requestData?.blogRequests?.[0]?.email
      );
    }
  }, [user, requestDataLoading, requestData]);

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          <div className="w-[95%] md:w-[85%] m-auto">
            <br />
            <div className="w-full flex justify-start flex-wrap">
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
            <div className="flex justify-end max-w-6xl w-full mb-10 mt-4 sm:mt-2 -ml-2 sm:ml-0">
              <>
                {!user && (
                  <HoverBorderGradient
                    className="flex items-center justify-center gap-2 dark:bg-gradient-to-r dark:from-foreground/60 border-none bg-gradient-to-l from-background/60 hover:bg-gradient-to-bl dark:hover:bg-gradient-to-br"
                    onClick={handleLoginClick}
                  >
                    <FaBlogger size={20} />
                    <span className="text-[12px]">Login to Create Blog</span>
                  </HoverBorderGradient>
                )}
                {user && (user.role === "admin" || user.role === "writer") && (
                  <a href="/blogs/create-blog">
                    <HoverBorderGradient className="flex items-center justify-center gap-2 dark:bg-gradient-to-r dark:from-foreground/60 border-none bg-gradient-to-l from-background/60 hover:bg-gradient-to-bl dark:hover:bg-gradient-to-br">
                      <FaBlogger size={20} />
                      <span className="text-[12px]">Create your Blog</span>
                    </HoverBorderGradient>
                  </a>
                )}
                {user.role === "user" && (
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <HoverBorderGradient className="flex items-center justify-center gap-2 dark:bg-gradient-to-r dark:from-foreground/60 border-none bg-gradient-to-l from-background/60 hover:bg-gradient-to-bl dark:hover:bg-gradient-to-br">
                        <FaBlogger size={20} />
                        <span className="text-[12px]">Create Blog Request</span>
                      </HoverBorderGradient>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[90%] rounded-md z-[10000000]">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          New Blog Creator Request
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Click the Request button below to apply to become a
                          blog creator.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center gap-1 sm:mr-3">
                          <FcCancel size={20} />
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleSendRequest}
                          className={`sm:!w-[130px] bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-1 ${
                            requestLoading && "cursor-not-allowed"
                          })
                          }`}
                          disabled={isBlogRequestExists}
                        >
                          {requestLoading ? (
                            <Loading />
                          ) : (
                            <>
                              {isBlogRequestExists ? (
                                <>
                                  <MdPending size={20} />
                                  Pending
                                </>
                              ) : (
                                <>
                                  <FaBlogger size={20} />
                                  Request
                                </>
                              )}
                            </>
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </>
            </div>
            {blogs && blogs.length === 0 && category !== "All" && (
              <p
                className={`${styles.label} min-h-[50vh] flex flex-col justify-center items-center text-center gap-10 mb-10`}
              >
                <MdOutlineSmsFailed className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] text-muted-foreground/30" />
                No Blogs found in this category.
                <br />
                Please try another one!
              </p>
            )}
            {blogs && blogs.length === 0 && category === "All" && (
              <p
                className={`${styles.label} min-h-[50vh] flex flex-col justify-center items-center text-center gap-10 mb-10`}
              >
                <MdOutlineSmsFailed className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] text-muted-foreground/30" />
                No Blogs created till now.
                <br />
                Please click the create button to create one!
              </p>
            )}
            <BlogSection blogs={blogs} />
          </div>
          <></>
        </>
      )}
    </>
  );
};

export default Blogs;
