"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { calculateRank } from "@/data/fortniteRankCalculator";
import { sortRank } from "@/data/sortRank";

interface ProfileData {
  icon: string;
  rank: number;
  level: number;
  wins: number;
  kd: number;
  adr: number;
  hs: number;
  winRate: number;
}

interface CSInfoProps {
  steamid: string | undefined;
  gameModes: string[][];
  getPlayerData: (data: any) => void;
}

const CS2Info: React.FC<CSInfoProps> = ({ steamid, getPlayerData }) => {
  const stats = ["Wins", "K/D", "Win Rate", "ADR", "HS%"];
  const statKeyMapping: { [key: string]: keyof ProfileData } = {
    Wins: "wins",
    "K/D": "kd",
    "Win Rate": "winRate",
    ADR: "adr",
    "HS%": "hs",
  };
  const [profileData, setProfileData] = useState<ProfileData>({
    icon: "https://avatars.fastly.steamstatic.com/ec6641cab08854aaaece050a517c0828d8c186a9_full.jpg",
    rank: 25500,
    level: 10,
    wins: 100,
    kd: 1.5,
    adr: 100,
    hs: 50,
    winRate: 20,
  });
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {getPlayerData(profileData)},[])
  return (
    <div className="mb-6">
      {profileData ? (
        !error ? (
          <div className="flex items-start lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-6 lg:justify-between w-full">
            <div className="flex items-start space-x-4">
              <div className="rounded-full relative w-24 h-24 border-4 overflow-hidden border-white">
                <Image
                  src={profileData.icon}
                  alt="Profile Icon"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col xl:flex-row xl:items-center xl:space-x-4">
                  <h1 className="text-xl font-bold text-white">
                    Cockta 1.5L 79.99
                  </h1>
                  <h2 className="text-xl font-bold text-[#5AECE5]">
                    Level {profileData.level}
                  </h2>
                </div>
                <button className="px-6 max-w-max py-1 mt-1 lg:mt-4 rounded font-bold bg-[#E82D2D]">
                  Change
                </button>
              </div>
            </div>

            <div className="grid items-start grid-cols-2 xl:grid-cols-4 w-full xl:max-w-max gap-4 lg:gap-4">
              {stats.map((stat) => {
                const key = statKeyMapping[stat];
                const value = profileData ? profileData[key] : "N/A";
                return (
                  <div
                    key={stat}
                    className="flex flex-col px-4 py-2 lg:px-2 lg:py-1 w-full rounded border border-[#707070] bg-[#171717]/60"
                  >
                    <h1 className="text-xl lg:text-base">{stat}</h1>
                    <p className="font-bold text-3xl lg:text-lg">
                      {stat === "Win Rate" && typeof value === "number"
                        ? `${value.toFixed(2)}%`
                        : value}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col w-full lg:w-64">
              <h1 className="text-xl flex flex-col font-bold">
                Comeptitive Rank
              </h1>
              <div className="relative flex justify-center max-w-max items-center">
                <Image
                  src={sortRank(profileData.rank)?.[0] + ""}
                  alt="Rank"
                  width={75}
                  height={75}
                  className="w-24 h-full"
                />
                <h1
                  style={{ color: sortRank(profileData.rank)?.[1] }}
                  className="absolute left-5 z-10 italic font-bold text-2xl lg:text-xl text-center"
                >
                  {profileData.rank}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-max max-h-max my-auto mx-auto font-bold">
            User not found. Please check your account details and make your
            account public
          </div>
        )
      ) : (
        <div className="max-w-max max-h-max my-auto mx-auto font-bold">
          Loading...
        </div>
      )}
    </div>
  );
};

export default CS2Info;
