import Image from "next/image";
import React, { useEffect, useState } from "react";
import AvatarIcon from "../../../public/Avatar.png";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AiOutlineCamera, AiOutlineLogout } from "react-icons/ai";
import { Button } from "../ui/moving-border";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import toast from "react-hot-toast";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import Loading from "../global/Loader";
import { cn } from "@/lib/utils/cn";

interface PropfileInfoProps {
  avatar: string | null;
  user: any;
  logOutHandler: any;
}

const ProfileInfo: React.FC<PropfileInfoProps> = ({
  avatar,
  user,
  logOutHandler,
}) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [
    editProfile,
    { isSuccess: profileUpdateSuccess, error: profileUpdateError, isLoading },
  ] = useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        console.log(avatar);
        updateAvatar(avatar);
      }
    };
    fileReader?.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || profileUpdateSuccess) {
      setLoadUser(true);
    }
    if (error) {
      toast.error("Failed to Upload Image");
      console.log(error);
    }
    if (profileUpdateError) {
      toast.error("Failed to update name!");
      console.log(error);
    }
    if (profileUpdateSuccess) {
      toast.success("Profile Updated Successfully!");
    }
  }, [isSuccess, error, profileUpdateSuccess, profileUpdateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  console.log(user);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : AvatarIcon}
            alt=""
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full z-[1000000]"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />
          <Label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer z-[1000000]">
              <AiOutlineCamera size={20} className="z-1 text-white" />
            </div>
          </Label>
        </div>
      </div>
      <br />
      <br />
      <div className="px-4">
        <form onSubmit={handleSubmit}>
          <div className="md:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <LabelInputContainer className="mb-4">
                <Label className="block">Full Name</Label>
                <Input
                  type="text"
                  className="!bg-background"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </LabelInputContainer>
            </div>
            <div className="w-[100%]">
              <LabelInputContainer className="mb-4">
                <Label className="block">Email Address</Label>
                <Input
                  type="text"
                  readOnly
                  className="!bg-background"
                  required
                  value={user?.email}
                />
              </LabelInputContainer>
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                className="w-[100px] md:w-[150px] h-[40px] flex items-center justify-center text-center dark:text-[#fff] text-black rounded-[6px] cursor-pointer bg-slate-200/50 font-semibold border-none dark:bg-slate-900/50"
                required
                value="Update"
              >
                {isLoading ? <Loading /> : "Update"}
              </Button>
              <div className="flex items-center justify-center">
                <HoverBorderGradient
                  className="flex items-center justify-center h-[40px]  bg-gradient-to-t from-slate-100 to-slate-400 dark:from-slate-600 dark:bg-slate-950"
                  onClick={() => logOutHandler()}
                >
                  <AiOutlineLogout
                    size={20}
                    className="dark:text-white text-black"
                  />
                  <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
                    Log Out
                  </h5>
                </HoverBorderGradient>
              </div>
            </div>
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default ProfileInfo;
