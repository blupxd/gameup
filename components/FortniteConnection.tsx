"use client";
import React, { useState } from "react";
import TextInput from "./form/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Dropdown from "./Dropdown";

interface ConnectionPopUpProps {
  setConnection: (value: boolean) => void;
}
interface Platform {
  name: string;
  value: string;
}

const FortniteConnection: React.FC<ConnectionPopUpProps> = ({
  setConnection,
}) => {
  const { update, data: session } = useSession();

  const platforms: Platform[] = [
    { name: "Epic", value: "epic" },
    { name: "PlayStation", value: "psn" },
    { name: "Xbox", value: "xbl" },
  ];
  const [platform, setPlatform] = useState<string>("epic");
  const methods = useForm({
    defaultValues: {
      epicId: "",
      userId: session?.user?.id,
    },
  });

  const handleSubmit = async (data: { epicId: string }) => {
    const sendData = {
      userId: session?.user?.id,
      epicId: `${data.epicId} ${platform}`,
    };
    console.log(sendData);
    try {
      const response = await fetch("/api/auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      if (!response.ok) throw new Error("Failed to update RiotID");
      alert("User Updated successfully");
      await update({
        epicId: `${data.epicId} ${platform}`,
      });
    } catch (error: unknown) {
      alert(error);
    }
    console.log("EpicId submitted:", sendData);
    // Close the popup after submission
    setConnection(false);
  };

  return (
    <div className="bg-black/70 z-30 absolute left-0 bottom-0 right-0 top-0 flex items-center justify-center">
      <div className="bg-[#171717] rounded border border-[#707070] px-6 py-4">
        <h1 className="text-white mb-4">Please enter your RiotID</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="flex flex-col space-y-4"
          >
            <TextInput
              label="Game Name"
              name="epicId"
              placeholder="Enter your game name."
              type="text"
            />
            <Dropdown
              overflown={true}
              className="w-52"
              onSelect={(e) =>
                setPlatform(platforms.find((p) => p.name === e)!.value)
              }
              placeholder="Select Platform"
              items={platforms.map((platform) => platform.name)}
            />

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="px-10 w-full hover:bg-[#4dc1bb] transition-colors duration-300 ease-in-out py-1 mt-2 rounded text-[#1c1c1c] font-bold bg-[#5AECE5]"
              >
                Connect
              </button>
              <button
                type="button"
                onClick={() => setConnection(false)}
                className="px-10 w-full hover:bg-[#aa3737] transition-colors duration-300 ease-in-out py-1 mt-2 rounded text-white font-bold bg-[#d93232]"
              >
                Close
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default FortniteConnection;
