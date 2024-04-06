"use client";

import React, { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../styles/style";
// import { useLoginMutation } from "../../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch: any;
}

const Login: React.FC<Props> = ({ setRoute, setOpen, refetch }) => {
  // const [login, { isSuccess, data, error, isLoading }] = useLoginMutation();
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("Logged in Successfully!");
  //     setOpen(false);
  //     refetch();
  //   }
  //   if (error) {
  //     if ("data" in error) {
  //       const errorData = error as any;
  //       toast.error(errorData.data.message);
  //     }
  //   }
  // }, [isSuccess, error]);

  return (
    <div className="w-full px-4 mb-4">
      <h1 className={`${styles.title} !text-[30px] md:!text-[35px] mb-2`}>
        Join With
      </h1>
      <form>
        <div className="flex items-center justify-center my-3">
          <FcGoogle
            size={50}
            className="cursor-pointer md:mr-4 mr-2 md:size-[50px] size-[40px]"
            onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={50}
            className="cursor-pointer md:ml-4 ml-2 md:size-[50px] size-[40px]"
            onClick={() => signIn("github")}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
