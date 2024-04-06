import React from "react";
import { NavItemsData } from "@/lib/utils/constants";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/My_logo.png";

interface Props {
  activeItem: number;
  isMobile: boolean;
}

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden md:flex">
        {NavItemsData &&
          NavItemsData.map((item, index) => (
            <Link href={`${item.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                } text-[18px] px-4 lg:px-6 font-normal`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <>
          <div className="flex items-center justify-center mt-8 gap-2">
            <Image src={Logo} alt="Pratyush Logo" height={45} width={45} />
          </div>
          <div className="mt-2 800px:hidden w-full text-center py-6 flex flex-col items-start gap-8">
            {NavItemsData &&
              NavItemsData.map((item, index) => (
                <Link href={`${item.url}`} key={index} passHref>
                  <span
                    className={`${
                      activeItem === index
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    } text-[18px] px-6 font-Poppins font-normal`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default NavItems;
