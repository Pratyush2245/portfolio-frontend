"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils/cn";

export const GlowingStarsBackgroundCard = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setMouseEnter(true);
      }}
      onMouseLeave={() => {
        setMouseEnter(false);
      }}
      className={cn("", className)}
    >
      <div className="">
        <Illustration />
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export const GlowingStarsDescription = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <p className={cn("text-base text-white max-w-[16rem]", className)}>
      {children}
    </p>
  );
};

export const GlowingStarsTitle = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <h2 className={cn("font-bold text-2xl text-[#eaeaea]", className)}>
      {children}
    </h2>
  );
};

export const Illustration = () => {
  const stars = 108;
  const columns = 18;
  const numGlowingStars = 6; // Number of stars to glow simultaneously

  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState<boolean[]>(
    Array(stars).fill(false)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newGlowingStars: any[] = [];
      const newVisibility = Array(stars).fill(false);

      // Generate unique random indexes for glowing stars
      while (newGlowingStars.length < numGlowingStars) {
        const randomIndex = Math.floor(Math.random() * stars);
        if (!newGlowingStars.includes(randomIndex)) {
          newGlowingStars.push(randomIndex);
          newVisibility[randomIndex] = true;
        }
      }

      setIsVisible(newVisibility);
      setGlowingStars(newGlowingStars);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-full p-1 w-full absolute"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const isVisibleStar = isVisible[starIdx];
        const delay = (starIdx % 10) * 0.1;
        return (
          <div
            key={`matrix-col-${starIdx}}`}
            className="relative flex items-center justify-center"
          >
            <Star
              isGlowing={isGlowing}
              delay={delay}
              isVisible={isVisibleStar}
            />
            <AnimatePresence mode="wait">
              {isGlowing && <Glow delay={delay} />}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const Star = ({
  isGlowing,
  delay,
  isVisible,
}: {
  isGlowing?: boolean;
  delay: number;
  isVisible: boolean;
}) => {
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 1,
        opacity: isVisible ? 1 : 0, // Set initial opacity based on visibility
      }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666",
        opacity: isVisible ? 1 : 0, // Animate opacity based on visibility
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className={cn(
        "bg-[#666] h-[1px] w-[1px] rounded-full relative z-20 dark:md:block hidden"
      )}
    ></motion.div>
  );
};

const Glow = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      className="absolute  left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-blue-500 blur-[1px] shadow-2xl shadow-blue-400 dark:md:block hidden"
    />
  );
};
