import { cn } from "../../lib/utils/cn";

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
  id,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id?: string;
}) => {
  return (
    <a
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 dark:shadow-slate-500 p-4 bg-gradient-to-b dark:from-slate-950 dark:to-slate-800 dark:border-white/[0.2] from-slate-100 to-slate-300/70 shadow-lg shadow-slate-400 border border-transparent justify-between flex flex-col space-y-4 z-[100000] m-2",
        className
      )}
      href={`/project/${id}`}
    >
      {header}
      <div className="group-hover/bento:scale-[0.99] transition duration-200">
        {icon}
        <div className="font-sans font-bold text-black/80 dark:text-neutral-200 mb-3 mt-3 text-center">
          {title}
        </div>

        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 text-overflow:ellipsis line-clamp-5 max-h-40 overflow-hidden">
          {description}
        </div>
      </div>
    </a>
  );
};
