import clsx from "clsx";
import { v4 } from "uuid";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CardDescription, CardTitle } from "../ui/card";
import CustomCard from "./CustomCard";
import TitleSection from "./TitleSection";
import { StaticSkills } from "@/lib/utils/constants";

type Props = {};

const StaticReview = (props: Props) => {
  return (
    <section className="relative mb-12">
      <div className="w-full blur-[120px] rounded-full h-32 absolute bg-brand/brand-primary-purple/50 -z-10" />
      <div className="-mt-80 px-4 sm:px-6 flex flex-col overflow-x-hidden overflow-visible">
        <TitleSection
          title="My Skills"
          subheading="Explore the skills and expertise I bring to the table."
          pill="Skills"
        />
        {[...Array(2)].map((arr, index) => (
          <div
            key={v4()}
            className={twMerge(
              clsx("mt-10 flex flex-nowrap gap-6 self-start", {
                "flex-row-reverse": index === 1,
                "animate-[slide_150s_linear_infinite]": true,
                "animate-[slide_150s_linear_infinite_reverse": index === 1,
                "ml-[100vw]": index === 1,
              }),
              "hover:paused"
            )}
          >
            {StaticSkills.map((testimonial, index) => (
              <CustomCard
                key={testimonial.name}
                className="w-[500px] shrink-0 rounded-xl bg-gradient-to-t dark:from-border dark:to-background from-slate-50 to-slate-200"
                cardHeader={
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.image}
                        className="object-fit"
                      />
                      <AvatarFallback>
                        {testimonial.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-foreground sm:text-2xl text-xl">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="dark:text-Washed-Purple/washed-purple-800 pt-[2px] italic">
                        {testimonial.name.toLocaleLowerCase()}
                      </CardDescription>
                    </div>
                  </div>
                }
                cardContent={
                  <p className="dark:text-Washed-Purple/washed-purple-800 sm:text-[16px] text-[12px]">
                    {testimonial.description}
                  </p>
                }
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaticReview;
