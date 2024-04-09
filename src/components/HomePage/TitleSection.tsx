import React from "react";
import { Button } from "../ui/moving-border";

interface TitleSectionProps {
  title: string;
  subheading?: string;
  pill: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  subheading,
  pill,
}) => {
  return (
    <React.Fragment>
      <section
        className="flex flex-col gap-4 justify-center items-center absolute md:-top-36 -top-40 transform -translate-x-1/2 left-1/2
      "
      >
        <article className="rounded-full p-[1px] text-sm dark:bg-gradient-to-r dark:from-brand/brand-primary-blue dark:to-brand/brand-primary-purple">
          <Button className="rounded-full px-3 py-1 bg-transparent border-none text-foreground">
            {pill}
          </Button>
        </article>
        {subheading ? (
          <>
            <h2 className="text-left text-3xl sm:text-5xl sm:max-w-[750px] md:text-center font-semibold">
              {title}
            </h2>
            <p className="text-muted-foreground sm:max-w-[90vw] text-center w-full text-xs sm:text-base">
              {subheading}
            </p>
          </>
        ) : (
          <h1 className="text-left text-4xl sm:text-6xl sm:max-w-[850px] md:text-center font-semibold">
            {title}
          </h1>
        )}
      </section>
    </React.Fragment>
  );
};

export default TitleSection;
