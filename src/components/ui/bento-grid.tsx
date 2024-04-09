import Image from "next/image";
import { cn } from "../../lib/utils/cn";
import defaultAvatar from "../../../public/Avatar.png";
import { format } from "timeago.js";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[35px] mb-12 border-0 ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  createdAt,
  author,
  isBlog,
  href,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  createdAt?: any;
  author?: any;
  isBlog?: boolean;
  href: string;
}) => {
  return (
    <a
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 dark:shadow-slate-500 p-4 bg-gradient-to-b dark:from-slate-950 dark:to-slate-800 dark:border-white/[0.2] from-slate-100 to-slate-300/70 shadow-lg shadow-slate-400 border border-transparent justify-between flex flex-col space-y-4 z-[100000] m-2",
        className
      )}
      href={href}
    >
      <div className="group-hover/bento:scale-[0.99] transition duration-200">
        <span className="bg-gradient-to-r from-foreground/70 to-background/70 w-fit flex justify-start px-[6px] py-1 rounded-full text-[10px] mb-2 !text-white">
          {header}
        </span>
        {icon}
        <div className="font-sans font-bold text-black/80 dark:text-neutral-200 mb-3 mt-3 text-center text-[14px]">
          {title}
        </div>

        <div
          className={`font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 text-overflow:ellipsis max-h-40 overflow-hidden ${
            isBlog ? "line-clamp-3" : "line-clamp-5"
          }`}
        >
          {description}
        </div>
        {isBlog && (
          <>
            <div className="flex mt-3 items-center">
              <div className="shrink-0">
                <Image
                  src={author?.avatar ? author?.avatar?.url : defaultAvatar}
                  alt=""
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px] rounded-full object-fit"
                />
              </div>
              <div className="pl-2 flex flex-col items-start">
                <h5 className="text-[14px]">
                  <div className="flex items-center text-wrap">
                    {author.name}
                  </div>
                </h5>
                <small className="text-muted-foreground text-[10px]">
                  {format(createdAt)}
                </small>
              </div>
            </div>
          </>
        )}
      </div>
    </a>
  );
};
