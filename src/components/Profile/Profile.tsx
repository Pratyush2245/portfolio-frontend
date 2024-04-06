import React, { useState } from "react";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";

type Props = {
  user: any;
};

const Profile = ({ user }: Props) => {
  const [avatar, setAvatar] = useState(null);

  // Below lines are not required for social auth as signOut from next auth refresh the page, therefore the query is not executed, we need to add these lines in header file, I added these lines for normal auth only.
  const [logout, setLogout] = useState(false);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);

    // remove our session
    await signOut();
  };

  console.log(user);

  return (
    <div className="w-full h-full bg-transparent mt-[80px]">
      <ProfileInfo avatar={avatar} user={user} logOutHandler={logOutHandler} />
    </div>
  );
};

export default Profile;
