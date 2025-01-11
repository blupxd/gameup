import { getValorantData } from "@/data/valorantData";
import React, { useEffect, useState } from "react";
import TransparentDropdown from "./TransparentDropdown";
import Image from "next/image";
interface ProfileData {
  rank: string[];
  level: number | undefined;
  puuid: string;
  playerCard: string;
}
interface ValInfoProps {
  riotId: string | undefined;
  platformRoute: string | undefined;
  regionalRoute: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPlayerData: (data: any) => void;
}

interface GameMode {
  name: string;
  value: string;
}

const ValInfo: React.FC<ValInfoProps> = ({
  riotId,
  // platformRoute,
  // regionalRoute,
  getPlayerData,
}) => {
  const gameModes: GameMode[] = [
    { name: "Competitive", value: "competitive" },
    { name: "Unrated", value: "unrated" },
  ];
  const [selectedMode, setSelectedMode] = useState<string>(gameModes[0].value);
  const stats: string[] = ["Wins", "Losses", "Win %", "K/D Ratio"];
  const profileData: ProfileData = getValorantData(
    "ZFtN5K8TaIuanY_utRxsqXli0noAZUjk3o51YoxZ8KoNAja8FbVxVtOPn3Y59wea9CunDjHEBUFC6g"
  );
  useEffect(() => {
    console.log(selectedMode)
    getPlayerData(profileData);
  }, []);
  return (
    <div className="mb-6">
      {profileData && (
        <div className="flex items-start lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-6 lg:justify-between w-full">
          <div className="flex items-start space-x-4">
            <div className="rounded-full relative w-24 h-24 border-4 overflow-hidden border-white">
              <Image
                src={`https://media.valorant-api.com/playercards/${profileData.playerCard}/smallart.png`}
                alt="Profile Icon"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col xl:flex-row xl:items-center xl:space-x-4">
                <h1 className="text-xl font-bold text-white">{riotId}</h1>
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
              const value = "64.5%";
              // const value =
              //   stat === "Win %"
              //     ? rankedData?.wins && rankedData?.losses
              //       ? `${(
              //           (rankedData.wins /
              //             (rankedData.wins + rankedData.losses)) *
              //           100
              //         ).toFixed(1)}%`
              //       : "N/A"
              //     : stat === "LP"
              //     ? rankedData?.leaguePoints ?? "N/A"
              //     : rankedData?.[stat.toLowerCase()] ?? "N/A";
              return (
                <div
                  key={stat}
                  className="flex flex-col px-4 py-2 lg:px-2 lg:py-1 w-full rounded border border-[#707070] bg-[#171717]/60"
                >
                  <h1 className="text-xl lg:text-base">{stat}</h1>
                  <p className="font-bold text-3xl lg:text-lg">{value}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-full lg:w-64">
            <TransparentDropdown
              items={gameModes.map((mode) => mode.name)}
              placeholder={gameModes[0].name}
              onSelect={(value) =>
                setSelectedMode(
                  gameModes.find((mode) => mode.name === value)?.value ||
                    gameModes[0].value
                )
              }
            />
            <div className="flex items-center space-x-2">
             
                <Image
                  src={profileData.rank[1]}
                  alt="Rank"
                  width={100}
                  height={100}
                  className="mt-2 h-full w-24 lg:w-20"
                />
              
              <h1 className="font-semibold text-2xl lg:text-xl">
                {profileData.rank[0]}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValInfo;
