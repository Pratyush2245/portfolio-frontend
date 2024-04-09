import { GithubIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  setOpen?: any;
};

const Footer = ({ setOpen }: Props) => {
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] md:w-full md:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:space-y-3 space-y-2">
            <h3 className="md:text-[20px] text-[16px] font-semibold text-black dark:text-white">
              About
            </h3>
            <ul className="md:space-y-3 space-y-1">
              <li>
                <Link
                  href={"/about"}
                  className="md:text-base text-[14px] text-muted-foreground hover:text-foreground/80"
                >
                  My Story
                </Link>
              </li>
              <li>
                <Link
                  href={"/privacy-policy"}
                  className="md:text-base text-[14px] text-muted-foreground hover:text-foreground/80 pointer-events-none"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:space-y-3 space-y-2">
            <h3 className="md:text-[20px] text-[16px] font-semibold text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="md:space-y-3 space-y-1">
              <li>
                <Link
                  href={"/projects"}
                  className="md:text-base text-[14px] text-muted-foreground hover:text-foreground/80"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href={"/blogs"}
                  className="md:text-base text-[14px] text-muted-foreground hover:text-foreground/80"
                >
                  My Blogs
                </Link>
              </li>
              <li>
                <Link
                  href={"/contact"}
                  className="md:text-base text-[14px] text-muted-foreground hover:text-foreground/80 cursor-pointer"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:space-y-3 space-y-2">
            <h3 className="md:text-[20px] text-[16px] font-semibold text-black dark:text-white">
              Social Links
            </h3>
            <ul className="md:space-y-3 space-y-1">
              <li>
                <Link
                  href={
                    "https://www.linkedin.com/in/pratyush-bhattacharya-9b2a30214"
                  }
                  target="_blank"
                  className="md:text-base text-[14px] text-muted-foreground hover:text-foreground/80 flex items-center gap-2"
                >
                  <LinkedinIcon className="md:size-[14px] size-[10px] text-foreground/80 hover:transform hover:-rotate-12 hover:transition-all hover:duration-150" />
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href={"https://github.com/PratyushBhattacharya123"}
                  target="_blank"
                  className="md:text-base text-[14px] text-muted-foreground hover:text-foreground/80 flex items-center gap-2"
                >
                  <GithubIcon className="md:size-[14px] size-[10px] text-foreground/80 hover:transform hover:-rotate-12 hover:transition-all hover:duration-150" />
                  Github
                </Link>
              </li>
              <li>
                <Link
                  href={
                    "https://www.instagram.com/pratyush.bhattacharya?igsh=cGdtY3dvbTdybHBl"
                  }
                  target="_blank"
                  className="md:text-base text-[14px] text-muted-foreground hover:text-foreground/80 flex items-center gap-2"
                >
                  <InstagramIcon className="md:size-[14px] size-[10px] text-foreground/80 hover:transform hover:-rotate-12 hover:transition-all hover:duration-150" />
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:space-y-3 space-y-1">
            <h3 className="text-[20px] font-semibold text-black dark:text-white">
              Contact Info
            </h3>
            <ul className="md:space-y-3 space-y-2">
              <p className="md:text-base text-[14px] text-black dark:text-gray-300 dark:hover:text-white pb-2">
                <span className="font-medium text-foreground/50">
                  Call Me :
                </span>{" "}
                96789 *****
                <br />
                <span className="font-medium text-foreground/50">
                  Address :
                </span>{" "}
                Guwahati, Assam, India, 781005
                <br />
                <span className="font-medium text-foreground/50">
                  Mail Me :
                </span>{" "}
                <a href="mailto:pratyushbhattacharya923@gmail.com">
                  Pratyush Bhattacharya
                </a>
              </p>
            </ul>
          </div>
        </div>
        <br />
        <p className="text-center text-black dark:text-white mb-4">
          Copyright &#169; 2024 Pratyush | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
