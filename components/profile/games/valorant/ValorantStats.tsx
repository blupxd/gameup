"use client";
import { useGameProfileContext } from "@/components/context/GameContext";
import { useProfileContext } from "@/components/context/ProfileContext";
import Dropdown from "@/components/Dropdown";
import { valGM } from "@/data/gamemodes";
import { getValorantData } from "@/data/valorantData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ValorantStats = () => {
  const { setValorantProfileData, valorantProfileData } =
    useGameProfileContext();
  const { profileData: profile } = useProfileContext();
  const [gameMode, setGameMode] = useState<string>(valGM[0][0]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getValorantData(
        "ZFtN5K8TaIuanY_utRxsqXli0noAZUjk3o51YoxZ8KoNAja8FbVxVtOPn3Y59wea9CunDjHEBUFC6g"
      );
      setValorantProfileData(data);
      console.log(data);
    };

    fetchData();
  }, [setValorantProfileData, profile]);

  return valorantProfileData ? (
    <div className="xl:flex grid grid-cols-1 md:grid-cols-2 mt-4 xl:grid-cols-5 xl:gap-0 xl:justify-between gap-8 lg:space-x-4">
      <div className="w-full xl:max-w-max md:col-span-2 col-span-1 lg:col-span-1 xl:col-span-2 flex items-center">
        <Image
          src={`https://media.valorant-api.com/playercards/${valorantProfileData.playerCard}/displayicon.png`}
          alt="Profile Icon"
          width={100}
          height={100}
          className="rounded-full border-2 border-white"
        />
        <div className="flex text-xl font-bold w-full flex-col h-full ml-4">
          <h1 className="mb-0">{profile.riotId}</h1>
          <h2 className="text-[#5AECE5] mt-0">
            Level {valorantProfileData.level}
          </h2>
          <button className="text-sm max-w-max px-6 py-1 mt-2 max-h-max border rounded border-[#303030] bg-[#252525]">
            Change
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col lg:col-span-1 md:col-span-2">
        <h1 className="text-xl font-bold">Gamemode</h1>
        <Dropdown
          overflown={false}
          className="xl:w-52 mt-4 w-full"
          onSelect={setGameMode}
          placeholder={valGM[0][0]}
          items={valGM.map((mode) => mode[0])}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h1 className="text-xl font-bold">Rank</h1>
        <div className="flex items-center space-x-4">
          <Image
            src={valorantProfileData.rank[1]}
            width={75}
            height={75}
            alt="rank"
          />
          <div className="flex flex-col">
            <h1 className="font-bold text-xl">
              {valorantProfileData.rank[0]
                ? `${valorantProfileData.rank[0]}`
                : "Unranked"}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex-1 flex font-bold flex-col space-y-1">
        <h1 className="text-xl">Matches</h1>
        <div className="flex items-center text-[#5AECE5] w-full xl:w-72">
          <p className="w-16">{valorantProfileData?.wins ?? "N/A"} W</p>
          <span
            className="h-4 ml-2 bg-[#5AECE5]"
            style={{
              width: `${
                valorantProfileData?.wins + valorantProfileData?.losses > 0
                  ? (valorantProfileData?.wins * 100) /
                    (valorantProfileData?.wins + valorantProfileData?.losses)
                  : 0
              }%`,
            }}
          />
        </div>
        <div className="flex items-center text-[#E82D2D] w-full xl:w-72">
          <p className="w-16">{valorantProfileData?.losses ?? "N/A"} L</p>
          <span
            className="h-4 ml-2 bg-[#E82D2D]"
            style={{
              width: `${
                valorantProfileData?.wins + valorantProfileData?.losses > 0
                  ? (valorantProfileData?.losses * 100) /
                    (valorantProfileData?.wins + valorantProfileData?.losses)
                  : 0
              }%`,
            }}
          />
        </div>
        <p className="font-normal text-sm">
          {valorantProfileData?.wins + valorantProfileData?.losses > 0
            ? `${(
                (valorantProfileData?.wins * 100) /
                (valorantProfileData?.wins + valorantProfileData?.losses)
              ).toFixed(1)}% Winrate`
            : "N/A"}
        </p>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ValorantStats;
