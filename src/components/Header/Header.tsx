"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../../../public/My_logo.png";
import CustomModal from "../../components/global/CustomModal";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { UserCircleIcon } from "lucide-react";
import { ModeToggle } from "../global/mode-toggle";
import NavItems from "./nav-items";
import Login from "../auth/Login";
import { useSession } from "next-auth/react";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "../../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import Avatar from "../../../public/Avatar.png";

interface HeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  open,
  setOpen,
  activeItem,
  route,
  setRoute,
}) => {
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openSidebar, setOpenSidebar] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });
          refetch();
        }
      }
      if (data === null) {
        if (isSuccess) {
          toast.success("Logged in Successfully!");
        }
      }
      if (data === null && !isLoading && !userData) {
        setLogout(true);
      }
    }
  }, [data, userData, isLoading]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  console.log(userData);

  return (
    <>
      <header
        className={`sticky top-0 right-0 p-4 flex items-center justify-between z-[9999999] dark:bg-[#060d1d] bg-slate-100 transition-transform duration-300 ${show}`}
      >
        <div className="w-full flex items-center justify-between">
          <Link
            href={"/"}
            className="md:ml-5 flex gap-2 justify-start items-center"
          >
            <Image src={Logo} alt="Pratyush Logo" width={45} height={45} />
          </Link>
          <NavigationMenu className="hidden md:block dark:border-[1px] rounded-full py-2 px-3 pr-6 border-muted-foreground/50 bg-gradient-to-r dark:from-slate-950 dark:to-slate-800">
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem className="cursor-pointer">
                <NavigationMenuLink>
                  <NavItems activeItem={activeItem} isMobile={false} />
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <aside className="md:mr-5 flex items-center gap-2 justify-end">
            <ModeToggle />
            {/* Only for desktop */}
            <div className="hidden md:flex">
              {userData ? (
                <Link href={"/profile"} className="cursor-pointer">
                  <Image
                    src={
                      userData?.user?.avatar
                        ? userData?.user?.avatar.url
                        : Avatar
                    }
                    alt=""
                    height={40}
                    width={40}
                    className="w-[40px] h-[40px] rounded-full border border-[#37a39a]/20"
                    style={{
                      border: activeItem === 5 ? "2px solid #37a39a" : "",
                    }}
                  />
                </Link>
              ) : (
                <UserCircleIcon
                  size={35}
                  className="cursor-pointer dark:text-white/85 text-black/70"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
            {/* Only for Mobile */}
            <div className="md:hidden">
              <HiOutlineMenuAlt3
                size={25}
                className="cursor-pointer text-muted-foreground ml-1"
                onClick={() => setOpenSidebar(true)}
              />
            </div>
          </aside>
        </div>
      </header>
      <div className="w-full relative">
        <div>
          {/* Mobile Sidebar */}
          {openSidebar && (
            <div
              className="fixed w-full h-screen top-0 left-0 z-[1000000000] dark:bg-[unset] bg-[#00000024]"
              onClick={handleClose}
              id="screen"
            >
              <div className="w-[70%] fixed h-screen bg-[#f5f9f8d9] dark:bg-[#0e1116]/80 dark:bg-opacity-90 top-0 right-0 backdrop-blur-md">
                <NavItems activeItem={activeItem} isMobile={true} />
                <div className="flex md:hidden">
                  {userData ? (
                    <Link href={"/profile"} className="cursor-pointer ml-6">
                      <Image
                        src={
                          userData?.user?.avatar
                            ? userData?.user?.avatar.url
                            : Avatar
                        }
                        alt=""
                        height={40}
                        width={40}
                        className="w-[40px] h-[40px] rounded-full border border-[#37a39a]/20"
                        style={{
                          border: activeItem === 5 ? "2px solid #37a39a" : "",
                        }}
                      />
                    </Link>
                  ) : (
                    <UserCircleIcon
                      size={35}
                      className="cursor-pointer text-muted-foreground ml-6"
                      onClick={() => {
                        setOpen(true);
                        setOpenSidebar(false);
                      }}
                    />
                  )}
                </div>
                <br />
                <br />
                <p className="text-[16px] px-2 pl-5 text-black/70 dark:text-muted-foreground">
                  Copyright &#169; 2024 Pratyush
                </p>
              </div>
            </div>
          )}
        </div>
        {route === "Login" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={Login}
                refetch={refetch}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Header;
