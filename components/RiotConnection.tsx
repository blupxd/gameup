"use client";
import React from "react";
import { z } from "zod";
import TextInput from "./form/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Dropdown from "./Dropdown";
interface ConnectionPopUpProps {
  setConnection: (value: boolean) => void;
}

const riotIdSchema = z.object({
  riotId: z.string().regex(/^[a-zA-Z0-9]{3,16}#[a-zA-Z0-9]+$/, {
    message: "Invalid RiotID format. Example: Username#EUNE",
  }),
});

const RiotConnection: React.FC<ConnectionPopUpProps> = ({ setConnection }) => {
  const { update, data: session } = useSession();
  const regionalRoutes = ["Europe", "Americas", "Asia", "Sea"];
  const platformRoutes = [
    "eun1",
    "euw1",
    "na1",
    "kr",
    "jp1",
    "la1",
    "la2",
    "oc1",
    "tr1",
    "ru",
    "br1",
    "pbe1",
  ];
  const methods = useForm({
    resolver: zodResolver(riotIdSchema),
    defaultValues: {
      riotId: "",
      regionalRoute: "",
      platformRoute: "",
    },
  });

  const handleSubmit = async (data: {
    riotId: string;
    regionalRoute: string;
    platformRoute: string;
  }) => {
    const result = riotIdSchema.safeParse(data);
    if (!result.success) {
      methods.setError("riotId", {
        type: "manual",
        message: result.error.errors[0].message,
      });
      return;
    }
    const sendData = {
      userId: session?.user?.id,
      riotId: data.riotId,
      regionalRoute: methods.getValues("regionalRoute"),
      platformRoute: methods.getValues("platformRoute"),
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
        riotId: data.riotId,
        regionalRoute: methods.getValues("regionalRoute"),
        platformRoute: methods.getValues("platformRoute"),
      });
    } catch (error: unknown) {
      alert(error);
    }
    console.log("RiotID submitted:", sendData);
    // Close the popup after submission
    setConnection(false);
  };

  return (
    <div className="bg-black/70 z-20 absolute left-0 bottom-0 right-0 top-0 flex items-center justify-center">
      <div className="bg-[#171717] rounded border border-[#707070] px-6 py-4">
        <h1 className="text-white mb-4">Please enter your RiotID</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="flex flex-col space-y-4"
          >
            <TextInput
              label="RiotID"
              name="riotId"
              placeholder="Enter your RiotID ex. John#EUNE"
              type="text"
            />
            <div className="flex items-center space-x-6">
              <Dropdown
                onSelect={(e) => methods.setValue("regionalRoute", e)}
                placeholder="Base Region"
                items={regionalRoutes}
              />
              <Dropdown
                onSelect={(e) => methods.setValue("platformRoute", e)}
                placeholder="Platform Region"
                items={platformRoutes}
              />
            </div>
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

export default RiotConnection;
