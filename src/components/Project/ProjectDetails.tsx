import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CustomLoader from "../global/CustomLoader";
import { BackgroundBeams } from "../ui/background-beams";
import { Button } from "../ui/moving-border";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { useSelector } from "react-redux";
import { Button as ShadButton } from "../ui/button";
import { SendHorizonalIcon } from "lucide-react";
import { format } from "timeago.js";
import { MdVerified } from "react-icons/md";
import {
  useAddReplyInReviewMutation,
  useAddReviewInProjectMutation,
} from "../../../redux/features/projects/projectApi";
import toast from "react-hot-toast";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Loading from "../global/Loader";
import defaultAvatar from "../../../public/Avatar.png";
import Ratings from "@/lib/utils/Ratings";

type Props = {
  data: any;
  fullData: any;
  setOpen: any;
  isLoading: boolean;
  fullLoading: boolean;
  refetch: any;
  id: string;
};

const ProjectDetails = ({
  data,
  setOpen,
  isLoading,
  fullData,
  fullLoading,
  refetch,
  id,
}: Props) => {
  const { data: userData, isLoading: userLoading } = useLoadUserQuery({}, {});
  const { user } = useSelector((state: any) => state.auth);

  const [sourceCodeLoaded, setSourceCodeLoaded] = useState(false);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [reviewReply, setReviewReply] = useState("");

  const [
    addReviewInProject,
    { isLoading: reviewLoading, error: reviewError, isSuccess: reviewSuccess },
  ] = useAddReviewInProjectMutation({});

  const [
    addReplyInReview,
    {
      isLoading: reviewReplyLoading,
      error: reviewReplyError,
      isSuccess: reviewReplySuccess,
    },
  ] = useAddReplyInReviewMutation({});

  const reviews = fullData?.reviews;
  const withoutLoginReviews = data?.reviews;

  const isReviewExists = reviews?.find(
    (item: any) => item.user._id === user._id
  );

  console.log(data?.reviews);

  useEffect(() => {
    if (user) {
      refetch();
    }
    if (user && fullData) {
      setSourceCodeLoaded(true);
    }
  }, [user, fullData]);

  const handleReviewSubmit = async () => {
    if (review === "") {
      toast.error("Review cannot be empty!");
    } else {
      console.log({
        projectId: id,
        review,
        rating,
      });
      addReviewInProject({
        projectId: id,
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
        projectId: id,
        reviewId,
      });
      addReplyInReview({
        comment: reviewReply,
        projectId: id,
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

  return (
    <>
      {isLoading || fullLoading || userLoading ? (
        <CustomLoader />
      ) : (
        <>
          <div className="dark:hidden block absolute bottom-0 left-0 right-0 top-0 bg-[rgba(90,88,100,0.5)] opacity-50 blur-[80px]  [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          {/* <TracingBeam className="px-6"> */}
          <div className="max-w-4xl mx-auto antialiased pt-4 relative flex flex-col items-center justify-center">
            <div className="mb-10 mx- flex flex-col items-start ml-5 md:ml-10 lg:ml-0">
              <Button className="h-[35px] border-none z-[1000000] dark:bg-transparent bg-slate-100/10 text-black dark:text-white px-4 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer w-auto py-1">
                {data?.categories}
              </Button>

              <p
                className={twMerge(
                  "md:text-xl mb-4 mt-4 font-semibold text-lg"
                )}
              >
                {data?.name}
              </p>

              <a
                className="flex items-center mr-5 md:mr-10 lg:mr-0 overflow-x-hidden shadow-lg dark:shadow-slate-500 shadow-slate-600 hover:shadow-slate-700 hover:shadow-xl dark:hover:shadow-slate-500 lg:rounded-3xl md:rounded-2xl rounded-xl lg:mt-4 lg:mb-6 md:mt-2 md:mb-4 mb-2 cursor-pointer"
                href={data?.projectUrl}
                target="_blank"
              >
                <Image
                  src={data?.projectThumbnail?.url}
                  alt="Thumbnail"
                  width={1000}
                  height={500}
                  className="w-full h-auto lg:rounded-3xl md:rounded-2xl rounded-xl z-10"
                />
              </a>

              <div className="h-auto [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start mt-6 z-10">
                <Tabs
                  defaultValue="description"
                  className="flex flex-col items-start justify-center"
                >
                  <TabsList className="text-[12px] h-auto px-0 py-1 md:gap-5 w-full justify-evenly">
                    <TabsTrigger
                      value="description"
                      className="text-[12px] p-1 md:p-[6px] lg:text-[14px]"
                    >
                      Description
                    </TabsTrigger>
                    <TabsTrigger
                      value="links"
                      className="text-[12px] p-1 md:p-[6px] lg:text-[14px]"
                    >
                      Source Code
                    </TabsTrigger>
                    <TabsTrigger
                      value="projectUrl"
                      className="text-[12px] p-1 md:p-[6px] lg:text-[14px]"
                    >
                      Project URL
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="text-[12px] p-1 md:p-[6px] lg:text-[14px]"
                    >
                      Reviews
                    </TabsTrigger>
                  </TabsList>
                  <div className="w-[90vw] xl:w-[60vw] mt-3 md:mt-6">
                    <TabsContent value="description">
                      <div className="md:text-[14px] text-[12px]">
                        {data?.description}
                      </div>
                    </TabsContent>
                    <TabsContent value="links">
                      <div className="">
                        {user ? (
                          user && sourceCodeLoaded ? (
                            <>
                              {fullData?.links &&
                                fullData?.links.map(
                                  (link: any, index: number) => (
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
                                          <span className="text-sm">
                                            Click here
                                          </span>
                                        </ShadButton>
                                      </a>
                                      <div className="mb-6" />
                                    </div>
                                  )
                                )}
                            </>
                          ) : (
                            <CustomLoader />
                          )
                        ) : (
                          <div className="ml-2">
                            <p className="font-medium md:text-[18px] md:mb-4 mb-2 text-[14px] text-foreground/80">
                              Please login to get full access!
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
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="projectUrl">
                      <div className="">
                        <p className="font-medium md:text-[18px] text-[14px] md:mb-2 mb-1">
                          Click the below URL to view my Project!
                        </p>
                        <a
                          className="text-muted-foreground md:text-[14px] text-[12px] hover:text-blue-500"
                          href={data?.projectUrl}
                          target="_blank"
                        >
                          {data?.projectUrl}
                        </a>
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
                        {!isReviewExists && user.role === "user" && (
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
                          withoutLoginReviews &&
                          withoutLoginReviews
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
                                      {item?.user?.name}
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
                          {reviews &&
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
                                        {item?.user?.name}
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
                                            ? "Add Reply"
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
                                                  height={40}
                                                  width={40}
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
                                          {item.commentReplies.length === 0 && (
                                            <>
                                              {user.role === "admin" && (
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
          <BackgroundBeams />
        </>
      )}
    </>
  );
};

export default ProjectDetails;
