import React, { useEffect, useState } from "react";
import { LampContainer } from "../ui/lamp";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils/cn";
import { Textarea } from "../ui/textarea";
import { useCreateContactMutation } from "../../../redux/features/contacts/contactApi";
import toast from "react-hot-toast";
import Loading from "../global/Loader";

type Props = {};

const Contact = (props: Props) => {
  const [createContact, { isSuccess, isLoading, error }] =
    useCreateContactMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Message sent successfully!");
      setContactInfo({
        firstName: "",
        lastName: "",
        emailAddress: "",
        message: "",
      });
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, isLoading]);

  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    message: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCreateButton = () => {
    if (
      contactInfo.firstName === "" ||
      contactInfo.lastName === "" ||
      contactInfo.emailAddress === "" ||
      contactInfo.message === ""
    ) {
      toast.error("Data cannot be empty!");
    } else {
      handleCreateContact();
    }
  };

  const handleCreateContact = async () => {
    const data = {
      name: contactInfo.firstName + " " + contactInfo.lastName,
      email: contactInfo.emailAddress,
      message: contactInfo.message,
    };

    if (!isLoading) {
      await createContact(data);
    }
  };

  return (
    <div>
      <div className="dark:hidden block absolute bottom-0 left-0 right-0 top-0 bg-[rgba(90,88,100,0.5)] opacity-50 blur-[80px]  [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="flex flex-col items-center justify-center">
        <LampContainer />
        <div className="dark:md:-mt-24 dark:md:mr-8 mt-6 dark:-mt-40 bg-gradient-to-r from-slate-500 to-slate-800 dark:md:text-slate-200 bg-clip-text text-transparent z-[10000] dark:from-slate-300 dark:to-slate-500">
          <h1 className="md:text-[50px] text-[35px] font-bold">Contact Me</h1>
        </div>
        <div className="max-w-[800px] w-[90%] mt-4 md:mt-6 md:mb-12 mb-8 mx-auto rounded-md md:rounded-2xl p-4 md:p-8 shadow-input backdrop-blur-3xl z-[100000] bg-transparent">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 md:text-left text-center">
            Welcome to My Portfolio
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 md:text-left text-center">
            Please feel free to share your query
          </p>

          <form className="mt-6 mb-1" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  placeholder="John"
                  type="text"
                  className="!bg-background"
                  value={contactInfo.firstName}
                  onChange={(e: any) =>
                    setContactInfo({
                      ...contactInfo,
                      firstName: e.target.value,
                    })
                  }
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Doe"
                  type="text"
                  className="!bg-background"
                  value={contactInfo.lastName}
                  onChange={(e: any) =>
                    setContactInfo({
                      ...contactInfo,
                      lastName: e.target.value,
                    })
                  }
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="johndoe@rediff.com"
                type="email"
                className="!bg-background"
                value={contactInfo.emailAddress}
                onChange={(e: any) =>
                  setContactInfo({
                    ...contactInfo,
                    emailAddress: e.target.value,
                  })
                }
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="message">Message</Label>
              <Textarea
                name=""
                id="message"
                cols={30}
                rows={8}
                required
                placeholder="Write your message here..."
                className="!bg-background !h-min"
                value={contactInfo.message}
                onChange={(e: any) =>
                  setContactInfo({
                    ...contactInfo,
                    message: e.target.value,
                  })
                }
              />
            </LabelInputContainer>

            <div className="flex justify-end">
              <div
                className={`bg-gradient-to-br relative group/btn from-slate-100 dark:from-slate-400 dark:to-slate-900 to-slate-300 dark:bg-zinc-800 w-full md:w-[150px] dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] flex items-center justify-center cursor-pointer hover:from-slate-200 hover:bg-slate-400 dark:hover:from-slate-500 dark:hover:to-slate-950 ${
                  isLoading && "!cursor-not-allowed"
                }`}
                onClick={() => handleCreateButton()}
              >
                {isLoading ? <Loading /> : "Send"}
                <BottomGradient />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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

export default Contact;
