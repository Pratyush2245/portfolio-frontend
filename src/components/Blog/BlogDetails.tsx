import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CustomLoader from "../global/CustomLoader";
import { Button } from "../ui/moving-border";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { useSelector } from "react-redux";
import { Button as ShadButton } from "../ui/button";
import { Edit, Link2Icon, SendHorizonalIcon } from "lucide-react";
import { format } from "timeago.js";
import { MdDescription, MdVerified } from "react-icons/md";
import toast from "react-hot-toast";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Loading from "../global/Loader";
import Ratings from "@/lib/utils/Ratings";
import {
  useAddReplyInReviewBlogMutation,
  useAddReviewInBlogMutation,
  useDeleteBlogMutation,
} from "../../../redux/features/blogs/blogApi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
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
import { redirect } from "next/navigation";
import defaultAvatar from "../../../public/Avatar.png";
import { FaComment } from "react-icons/fa";

type Props = {
  data: any;
  isLoading: boolean;
  refetch: any;
  id: string;
  setOpen: any;
};

const BlogDetails = ({ data, isLoading, refetch, id, setOpen }: Props) => {
  const { user } = useSelector((state: any) => state.auth);

  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [reviewReply, setReviewReply] = useState("");

  const [
    addReviewInBlog,
    { isLoading: reviewLoading, error: reviewError, isSuccess: reviewSuccess },
  ] = useAddReviewInBlogMutation({});

  const [
    addReplyInReviewBlog,
    {
      isLoading: reviewReplyLoading,
      error: reviewReplyError,
      isSuccess: reviewReplySuccess,
    },
  ] = useAddReplyInReviewBlogMutation({});

  const reviews = data?.reviews;

  const isReviewExists = reviews?.find(
    (item: any) => item.user._id === user._id
  );

  console.log(data?.reviews);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  const handleReviewSubmit = async () => {
    if (review === "") {
      toast.error("Review cannot be empty!");
    } else {
      console.log({
        blogId: id,
        review,
        rating,
      });
      addReviewInBlog({
        blogId: id,
        review,
        rating,
      });
    }
  };

  const handleReviewReplySubmit = async () => {
    if (reviewReply === "") {
      toast.error("Review reply cannot be empty!");
    } else {
      console.log({
        comment: reviewReply,
        blogId: id,
        reviewId,
      });
      addReplyInReviewBlog({
        comment: reviewReply,
        blogId: id,
        reviewId,
      });
    }
  };

  useEffect(() => {
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      refetch();
      toast.success("Review Added Successfully");
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorData = reviewError as any;
        toast.error(errorData.data.message);
      }
    }
    if (reviewReplySuccess) {
      setReviewReply("");
      refetch();
      toast.success("Review Reply Added Successfully!");
    }
    if (reviewReplyError) {
      if ("data" in reviewReplyError) {
        const errorData = reviewReplyError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [reviewError, reviewReplyError, reviewReplySuccess, reviewSuccess]);

  console.log(data);
  console.log(user);

  const [
    deleteBlog,
    {
      isLoading: deleteIsLoading,
      isSuccess: deleteSuccess,
      error: deleteError,
    },
  ] = useDeleteBlogMutation({});

  useEffect(() => {
    if (deleteSuccess) {
      refetch();
      toast.success("Successfully deleted the blog!");
      redirect("/blogs");
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [deleteSuccess, deleteError, refetch]);

  const handleDeleteBlog = async (blogId: string) => {
    try {
      await deleteBlog(blogId);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          <div className="dark:hidden block absolute bottom-0 left-0 right-0 top-0 bg-[rgba(90,88,100,0.5)] opacity-50 blur-[80px]  [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          {/* <TracingBeam className="px-6"> */}
          <div className="max-w-4xl mx-auto antialiased pt-4 relative flex flex-col items-center justify-center">
            <div className="mb-10 flex flex-col items-start ml-5 md:ml-10 lg:ml-0 wf">
              <div className="flex justify-between items-center w-full">
                <Button className="h-[35px] border-none z-[1000000] dark:bg-transparent bg-slate-100/10 text-black dark:text-white px-4 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer w-auto py-1">
                  {data?.categories}
                </Button>
                {user &&
                  (user.role === "admin" ||
                    user.email === data?.user?.email) && (
                    <div className="flex sm:gap-3 gap-2 items-center md:mr-10 mr-5 lg:mr-0">
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger>
                            <Link href={`/blogs/edit-blog/${id}`}>
                              <Edit
                                size={25}
                                className="text-muted-foreground hover:text-foreground lg:size-[25px] size-[20px]"
                              />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent className="z-[100000000]">
                            <p>Edit Blog</p>
                          </TooltipContent>
                        </Tooltip>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger>
                                <AiOutlineDelete
                                  size={30}
                                  className="text-muted-foreground hover:text-foreground mt-1 lg:size-[30px] size-[23px]"
                                />
                              </TooltipTrigger>
                              <TooltipContent className="z-[100000000]">
                                <p>Delete Blog</p>
                              </TooltipContent>
                            </Tooltip>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the project and remove the
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteBlog(id)}
                                className="bg-destructive/80 hover:bg-destructive text-white"
                              >
                                {deleteIsLoading ? <Loading /> : "Continue"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TooltipProvider>
                    </div>
                  )}
              </div>
              <p
                className={twMerge(
                  "md:text-xl mb-2 mt-4 font-semibold text-lg"
                )}
              >
                {data?.title}
              </p>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <div className="shrink-0">
                    <Image
                      src={
                        data?.user?.avatar
                          ? data?.user?.avatar?.url
                          : defaultAvatar
                      }
                      alt=""
                      width={45}
                      height={45}
                      className="md:w-[45px] md:h-[45px] w-[35px] h-[35px] rounded-full object-fit"
                    />
                  </div>
                  <div className="pl-2 flex flex-col items-start">
                    <h5 className="md:text-base text-sm">
                      <div className="flex items-center text-wrap">
                        {data?.user?.name}
                      </div>
                    </h5>
                    <small className="text-muted-foreground md:text-xs text-[10px]">
                      {format(data?.createdAt)}
                    </small>
                  </div>
                </div>
              </div>

              <div className="flex items-center mr-5 md:mr-10 lg:mr-0 overflow-x-hidden shadow-lg dark:shadow-slate-500 shadow-slate-600 hover:shadow-slate-700 hover:shadow-xl dark:hover:shadow-slate-500 lg:rounded-3xl md:rounded-2xl rounded-xl lg:mt-4 lg:mb-6 mt-2 mb-2 cursor-pointer">
                <Image
                  src={data?.blogThumbnail?.url}
                  alt="Thumbnail"
                  width={1000}
                  height={500}
                  className="w-full h-auto lg:rounded-3xl md:rounded-2xl rounded-xl z-10"
                />
              </div>

              <div className="h-auto [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start mt-2 z-10">
                <Tabs
                  defaultValue="description"
                  className="flex flex-col items-start justify-center"
                >
                  <TabsList className="text-[12px] h-auto px-0 py-1 w-full justify-start !bg-transparent">
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <TabsTrigger value="description">
                            <MdDescription
                              size={25}
                              className="md:size-[25px] size-[20px]"
                            />
                          </TabsTrigger>
                        </TooltipTrigger>
                        <TooltipContent className="z-[100000000]">
                          <p>Blog Details</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <TabsTrigger
                            value="links"
                            className="-rotate-45 md:-ml-2 -ml-3"
                          >
                            <Link2Icon
                              size={25}
                              className="md:size-[25px] size-[20px]"
                            />
                          </TabsTrigger>
                        </TooltipTrigger>
                        <TooltipContent className="z-[100000000]">
                          <p>Additional Links</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <TabsTrigger
                            value="reviews"
                            className="md:-ml-2 -ml-3"
                          >
                            <FaComment
                              size={20}
                              className="md:size-[20px] size-[16px]"
                            />
                          </TabsTrigger>
                        </TooltipTrigger>
                        <TooltipContent className="z-[100000000]">
                          <p>Reviews</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TabsList>
                  <div className="w-[90vw] xl:w-[60vw] mt-3 md:mt-6">
                    <TabsContent value="description">
                      <div className="md:text-[14px] text-[12px]">
                        {data?.description}
                      </div>
                    </TabsContent>
                    <TabsContent value="links">
                      <div className="">
                        <>
                          {data?.links &&
                            data?.links.map((link: any, index: number) => (
                              <div
                                className="w-full flex items-center gap-3 md:gap-5 mb-5"
                                key={index}
                              >
                                <p className="font-medium md:text-[18px] text-[14px] mb-1">
                                  {link?.title}
                                </p>
                                <a
                                  href={link?.url}
                                  target="_blank"
                                  className=""
                                >
                                  <ShadButton className="bg-gradient-to-br from-slate-100 to-slate-400 hover:from-slate-200 hover:to-slate-500 dark:from-slate-600 dark:to-slate-900 dark:hover:from-slate-700 dark:hover:to-slate-950 text-black/70 hover:text-black dark:text-white/70 hover:dark:text-white">
                                    <span className="text-sm">Click here</span>
                                  </ShadButton>
                                </a>
                                <div className="mb-6" />
                              </div>
                            ))}
                        </>
                      </div>
                    </TabsContent>
                    <TabsContent value="reviews">
                      <>
                        {!user && (
                          <>
                            <div className="ml-2">
                              <p className="font-medium md:text-[18px] md:mb-4 mb-2 text-[14px] text-foreground/80">
                                Please login to add a Review!
                              </p>
                              <HoverBorderGradient
                                onClick={() => setOpen(true)}
                                className="bg-gradient-to-t from-slate-100 to-slate-400 dark:from-slate-600 dark:bg-slate-950 text-black/85 dark:text-white"
                              >
                                <span className="text-sm">
                                  Click here to Login
                                </span>
                              </HoverBorderGradient>
                            </div>
                          </>
                        )}
                        {user &&
                          !isReviewExists &&
                          user?.email !== data?.user?.email && (
                            <>
                              <div className="w-full flex">
                                <Image
                                  src={
                                    user?.avatar
                                      ? user?.avatar?.url
                                      : defaultAvatar
                                  }
                                  alt=""
                                  width={50}
                                  height={50}
                                  className="md:w-[50px] md:h-[50px] w-[40px] h-[40px] rounded-full object-cover"
                                />
                                <div className="w-full">
                                  <h5 className="pl-3 md:text-[20px] text-[16px] font-medium text-foreground/80">
                                    Give a Rating{" "}
                                    <span className="!text-red-500">*</span>
                                  </h5>
                                  <div className="flex w-full ml-[10px] pb-3">
                                    {[1, 2, 3, 4, 5].map((i) =>
                                      rating >= i ? (
                                        <AiFillStar
                                          key={i}
                                          className="mr-1 cursor-pointer h-[20px] w-[20px] md:h-[25px] md:w-[25px]"
                                          color="rgb(246, 186, 0)"
                                          onClick={() => setRating(i)}
                                        />
                                      ) : (
                                        <AiOutlineStar
                                          key={i}
                                          className="mr-1 cursor-pointer h-[20px] w-[20px] md:h-[25px] md:w-[25px]"
                                          color="rgb(246, 186, 0)"
                                          onClick={() => setRating(i)}
                                        />
                                      )
                                    )}
                                  </div>
                                  <textarea
                                    name=""
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    id=""
                                    cols={40}
                                    rows={5}
                                    placeholder="Write your comment..."
                                    className="outline-none bg-transparent md:ml-3 border dark:border-[#ffffff57] border-muted-foreground/30 shadow-md md:w-full p-2 rounded w-[90%] md:text-[18px] font-Poppins text-[14px] text-foreground/80"
                                  />
                                </div>
                              </div>
                              <div className="w-[92%] md:w-full flex justify-end mt-2">
                                <Button
                                  className={`h-[35px] border-none z-[1000000] bg-gradient-to-r dark:bg-gradient-to-t from-slate-200 to-slate-400 dark:from-slate-600 dark:to-slate-900 text-foreground/70 hover:text-foreground hover:from-slate-300 hover:to-slate-500 hover:dark:from-slate-700 hover:dark:to-slate-950 px-4 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer py-1 w-[100px] ${
                                    reviewLoading && "cursor-not-allowed"
                                  }`}
                                  onClick={handleReviewSubmit}
                                >
                                  {reviewLoading ? <Loading /> : "Submit"}
                                </Button>
                              </div>
                            </>
                          )}
                        <br />
                        <div className="w-full h-[1px] dark:bg-[#ffffff3b] bg-muted-foreground/30" />
                        {!user &&
                          reviews &&
                          reviews.reverse().map((item: any, index: number) => (
                            <div className="w-full my-5" key={index}>
                              <div className="w-full flex">
                                <div>
                                  <Image
                                    src={
                                      item?.user?.avatar
                                        ? item?.user?.avatar.url
                                        : defaultAvatar
                                    }
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="md:w-[40px] md:h-[40px] w-[35px] h-[35px] rounded-full object-fit"
                                  />
                                </div>
                                <div className="pl-3">
                                  <h5 className="md:text-[20px] text-[16px]">
                                    <div className="flex gap-1 items-center">
                                      {item.user.name}
                                      {item.user.role === "admin" && (
                                        <MdVerified
                                          size={18}
                                          className="text-blue-700"
                                        />
                                      )}
                                      {data?.user?.email ===
                                        item?.user?.email && (
                                        <MdVerified
                                          size={18}
                                          className="text-green-500"
                                        />
                                      )}
                                    </div>
                                  </h5>
                                  <div className="-ml-[10px]">
                                    <div className="md:ml-2">
                                      <Ratings rating={item?.rating} />
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-[14px] mt-1 md:text-[16px]">
                                        {item?.comment}
                                      </p>
                                      <small className="text-muted-foreground">
                                        {format(item?.createdAt)}
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <>
                                <div className="w-full flex ml-[2px]">
                                  <span
                                    className="pl-[52px] text-muted-foreground cursor-pointer mr-2 text-[14px] md:text-[16px]"
                                    onClick={() => {
                                      setIsReviewReply(!isReviewReply);
                                      setReviewId(item._id);
                                    }}
                                  >
                                    {!isReviewReply
                                      ? item.commentReplies.length === 0
                                        ? ""
                                        : "View Reply"
                                      : "Hide Reply"}
                                  </span>
                                </div>
                                {isReviewReply && (
                                  <>
                                    {item.commentReplies.map((item: any) => (
                                      <div
                                        className="md:w-full flex ml-8 md:ml-16 my-5"
                                        key={item}
                                      >
                                        <div className="shrink-0">
                                          <Image
                                            src={
                                              item?.user?.avatar
                                                ? item?.user?.avatar.url
                                                : defaultAvatar
                                            }
                                            alt=""
                                            width={40}
                                            height={40}
                                            className="md:w-[40px] md:h-[40px] w-[35px] h-[35px] rounded-full object-fit"
                                          />
                                        </div>
                                        <div className="pl-2">
                                          <h5 className="md:text-[20px] text-[14px]">
                                            <div className="flex gap-1 items-center">
                                              {item.user.name}
                                              {item.user.role === "admin" && (
                                                <MdVerified
                                                  size={18}
                                                  className="text-blue-700"
                                                />
                                              )}
                                              {data?.user?.email ===
                                                item?.user?.email && (
                                                <MdVerified
                                                  size={18}
                                                  className="text-green-500"
                                                />
                                              )}
                                            </div>
                                          </h5>
                                          <p className="md:text-inherit text-[14px]">
                                            {item.comment}
                                          </p>
                                          <small className="text-muted-foreground">
                                            {format(item.createdAt)}
                                          </small>
                                        </div>
                                      </div>
                                    ))}
                                  </>
                                )}
                              </>
                            </div>
                          ))}
                        <div className="w-full">
                          {user &&
                            reviews &&
                            reviews
                              .reverse()
                              .map((item: any, index: number) => (
                                <div className="w-full my-5" key={index}>
                                  <div className="w-full flex">
                                    <div>
                                      <Image
                                        src={
                                          item?.user?.avatar
                                            ? item?.user?.avatar.url
                                            : defaultAvatar
                                        }
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="md:w-[40px] md:h-[40px] w-[35px] h-[35px] rounded-full object-fit"
                                      />
                                    </div>
                                    <div className="pl-3">
                                      <h5 className="md:text-[20px] text-[16px]">
                                        <div className="flex gap-1 items-center">
                                          {item.user.name}
                                          {item.user.role === "admin" && (
                                            <MdVerified
                                              size={18}
                                              className="text-blue-700"
                                            />
                                          )}
                                          {data?.user?.email ===
                                            item?.user?.email && (
                                            <MdVerified
                                              size={18}
                                              className="text-green-500"
                                            />
                                          )}
                                        </div>
                                      </h5>
                                      <div className="-ml-[10px]">
                                        <div className="md:ml-2">
                                          <Ratings rating={item?.rating} />
                                        </div>
                                        <div className="ml-3">
                                          <p className="text-[14px] mt-1 md:text-[16px]">
                                            {item?.comment}
                                          </p>
                                          <small className="text-muted-foreground">
                                            {format(item?.createdAt)}
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <>
                                    <div className="w-full flex ml-[2px]">
                                      <span
                                        className="pl-[52px] text-muted-foreground cursor-pointer mr-2 text-[14px] md:text-[16px]"
                                        onClick={() => {
                                          setIsReviewReply(!isReviewReply);
                                          setReviewId(item._id);
                                        }}
                                      >
                                        {!isReviewReply
                                          ? item.commentReplies.length === 0
                                            ? item.user.role === "admin" ||
                                              data?.user?.email ===
                                                item?.user?.email
                                              ? "Add Reply"
                                              : ""
                                            : "View Reply"
                                          : "Hide Reply"}
                                      </span>
                                    </div>
                                    {isReviewReply && (
                                      <>
                                        {item.commentReplies.map(
                                          (item: any) => (
                                            <div
                                              className="md:w-full flex ml-8 md:ml-16 my-5"
                                              key={item}
                                            >
                                              <div className="shrink-0">
                                                <Image
                                                  src={
                                                    item?.user?.avatar
                                                      ? item?.user?.avatar.url
                                                      : defaultAvatar
                                                  }
                                                  alt=""
                                                  width={40}
                                                  height={40}
                                                  className="md:w-[40px] md:h-[40px] w-[35px] h-[35px] rounded-full object-fit"
                                                />
                                              </div>
                                              <div className="pl-2">
                                                <h5 className="md:text-[20px] text-[14px]">
                                                  <div className="flex gap-1 items-center">
                                                    {item.user.name}
                                                    {item.user.role ===
                                                      "admin" && (
                                                      <MdVerified
                                                        size={18}
                                                        className="text-blue-700"
                                                      />
                                                    )}
                                                    {data?.user?.email ===
                                                      item?.user?.email && (
                                                      <MdVerified
                                                        size={18}
                                                        className="text-green-500"
                                                      />
                                                    )}
                                                  </div>
                                                </h5>
                                                <p className="md:text-inherit text-[14px]">
                                                  {item.comment}
                                                </p>
                                                <small className="text-muted-foreground">
                                                  {format(item.createdAt)}
                                                </small>
                                              </div>
                                            </div>
                                          )
                                        )}
                                        <>
                                          {(item.commentReplies.length === 0 ||
                                            data?.user?.email ===
                                              user?.email) && (
                                            <>
                                              {(user.role === "admin" ||
                                                user.email ===
                                                  data?.user?.email) && (
                                                <div className="w-full flex relative">
                                                  <input
                                                    type="text"
                                                    placeholder="Enter your reply..."
                                                    value={reviewReply}
                                                    onChange={(e) =>
                                                      setReviewReply(
                                                        e.target.value
                                                      )
                                                    }
                                                    className="block ml-12 mt-2 outline-none bg-transparent border-b border-muted-foreground p-[5px] w-[95%]"
                                                  />
                                                  <button
                                                    type="submit"
                                                    className={`absolute right-0 bottom-[6px] cursor-pointer ${
                                                      (reviewReplyLoading ||
                                                        reviewReply === "") &&
                                                      "opacity-70 cursor-not-allowed"
                                                    }`}
                                                    onClick={
                                                      handleReviewReplySubmit
                                                    }
                                                    disabled={
                                                      reviewReply === "" ||
                                                      reviewReplyLoading
                                                    }
                                                  >
                                                    <SendHorizonalIcon
                                                      size={25}
                                                      className="text-green-500"
                                                    />
                                                  </button>
                                                </div>
                                              )}
                                            </>
                                          )}
                                        </>
                                      </>
                                    )}
                                  </>
                                </div>
                              ))}
                        </div>
                      </>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
          {/* </TracingBeam> */}
          {/* <BackgroundBeams /> */}
        </>
      )}
    </>
  );
};

export default BlogDetails;
