import { SKILLS } from "@/lib/utils/constants";
import Image from "next/image";
import React from "react";

type Props = {};

const Skills = (props: Props) => {
  return (
    <section className="relative">
      <div className="overflow-hidden flex -mt-10">
        {[...Array(2)].map((arr) => (
          <div key={arr} className="flex flex-nowrap animate-slide">
            {SKILLS.map((skill) => (
              <div
                key={skill.alt}
                className="relative w-[200px] m-10 md:m-16 lg:m-20 shrink-0 flex items-center"
              >
                <Image
                  src={skill.logo}
                  alt={skill.alt}
                  className={`object-contain h-[60px] md:h-[80px] lg:h-[100px] w-auto ${skill.className}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
