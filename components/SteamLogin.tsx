"use client";
import Image from "next/image";
import React from "react";

export const SteamLogin = () => {
  const handleSteamLogin = async () => {
    try {
      const response = await fetch("/api/auth/steam");
      const data = await response.json();
      if (data?.authenticationURL) {
        window.location.href = data.authenticationURL;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        className="flex font-bold items-center rounded px-4 py-2 bg-[#333333]"
        onClick={() => handleSteamLogin()}
      >
        <Image
          src="/assets/steam.svg"
          alt="steam"
          width={20}
          height={20}
          className="mr-2"
        />
        Login with steam
      </button>
    </div>
  );
};

export default SteamLogin;
