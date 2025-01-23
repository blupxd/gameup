"use client";
import { useGameProfileContext } from "@/components/context/GameContext";
import { useProfileContext } from "@/components/context/ProfileContext";
import Dropdown from "@/components/Dropdown";
import { csGM } from "@/data/gamemodes";
import { sortRank } from "@/data/sortRank";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

const CS2Stats = () => {
  const { profileData } = useProfileContext();
  const { setCs2ProfileData, cs2ProfileData } = useGameProfileContext();
  const [gameMode, setGameMode] = useState<string>(csGM[0][0]);
  const getRankIconPath = (cs2ProfileData: any, gameMode: string): string => {
    if (!cs2ProfileData || !cs2ProfileData.cs2Data?.profile?.ranks) {
      return "/assets/cs2/ranked_emblems/0-4999.png"; // Fallback za rank 0
    }
    const rankData = cs2ProfileData.cs2Data.profile.ranks.find(
      (rank: any) => rank.rank_type_id === (gameMode === "5vs5" ? 11 : 7)
    );
    const rankId = rankData ? rankData.rank_id : 0;
    const [rankUrl] = sortRank(rankId) || [];
    return rankUrl || "/assets/cs2/ranked_emblems/0-4999.png"; // Ako je URL undefined, vratiti fallback
  };
  const fetchData = useMemo(() => {
    console.log("Fetching CS2 data...");
    const fetchDataFromAPI = async () => {
      try {
        const response = await fetch(
          `/api/steam?steamid=${profileData.steamid}`
        );
        const data = await response.json();
        setCs2ProfileData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching CS2 data:", error);
      }
    };
    return fetchDataFromAPI;
  }, [profileData, setCs2ProfileData]);

  useEffect(() => {
    if (profileData?.steamid && !cs2ProfileData) {
      fetchData(); // Pozivamo fetch samo ako podaci nisu učitani
    }
  }, [profileData, cs2ProfileData, fetchData]);

  return cs2ProfileData ? (
    <div className="xl:flex grid grid-cols-1 md:grid-cols-2 mt-4 xl:grid-cols-5 xl:gap-0 xl:justify-between gap-8 lg:space-x-4">
      <div className="w-full xl:max-w-max md:col-span-2 col-span-1 lg:col-span-1 xl:col-span-2 flex items-center">
        <Image
          src={cs2ProfileData.steamData.avatarfull + ""}
          alt="Profile Icon"
          width={100}
          height={100}
          className="rounded-full border-2 border-white"
        />
        <div className="flex text-xl font-bold w-full flex-col h-full ml-4">
          <h1 className="mb-0">{cs2ProfileData.steamData.personaname}</h1>
          <h2 className="text-[#5AECE5] mt-0">
            Level {cs2ProfileData.steamLevel}
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
          placeholder={csGM[0][0]}
          items={csGM.map((mode) => mode[0])}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h1 className="text-xl font-bold">Rank</h1>
        <div className="relative flex justify-center max-w-max items-center">
          <Image
            src={getRankIconPath(cs2ProfileData, gameMode)}
            alt="Rank"
            width={75}
            height={75}
            className="w-24 h-full"
          />
          <h1
            style={{
              color: sortRank(
                cs2ProfileData.cs2Data.profile.ranks.find(
                  (rank: any) =>
                    rank.rank_type_id === (gameMode === "5vs5" ? 11 : 7)
                )
              )?.[1],
            }}
            className="absolute left-5 z-10 italic font-bold text-2xl lg:text-xl text-center"
          >
            {
              cs2ProfileData.cs2Data.profile.ranks.find(
                (rank: any) =>
                  rank.rank_type_id === (gameMode === "5vs5" ? 11 : 7)
              )?.rank_id
            }
          </h1>
        </div>
      </div>
      <div className="flex-1 text-sm flex font-bold flex-col space-y-2">
        <h1 className="text-xl">Matches</h1>
        <div className="flex items-center text-[#5AECE5] w-full xl:w-72">
          <p className="w-16">{cs2ProfileData?.cs2Data.totalWins ?? "N/A"} W</p>
          <span
            className="h-4 ml-2 bg-[#5AECE5]"
            style={{
              width: `${
                cs2ProfileData?.cs2Data.totalWins +
                  cs2ProfileData?.cs2Data.totalLosses >
                0
                  ? (cs2ProfileData?.cs2Data.totalWins * 100) /
                    (cs2ProfileData?.cs2Data.totalWins +
                      cs2ProfileData?.cs2Data.totalLosses)
                  : 0
              }%`,
            }}
          />
        </div>
        <div className="flex items-center text-[#E82D2D] w-full xl:w-72">
          <p className="w-16">
            {cs2ProfileData?.cs2Data.totalLosses ?? "N/A"} L
          </p>
          <span
            className="h-4 ml-2 bg-[#E82D2D]"
            style={{
              width: `${
                cs2ProfileData?.cs2Data.totalWins +
                  cs2ProfileData?.cs2Data.totalLosses >
                0
                  ? (cs2ProfileData?.cs2Data.totalLosses * 100) /
                    (cs2ProfileData?.cs2Data.totalWins +
                      cs2ProfileData?.cs2Data.totalLosses)
                  : 0
              }%`,
            }}
          />
        </div>
        <p className="font-normal text-sm">
          {cs2ProfileData?.cs2Data.totalWins +
            cs2ProfileData?.cs2Data.totalLosses >
          0
            ? `${(
                (cs2ProfileData?.cs2Data.totalWins * 100) /
                (cs2ProfileData?.cs2Data.totalWins +
                  cs2ProfileData?.cs2Data.totalLosses)
              ).toFixed(1)}% Winrate`
            : "N/A"}
        </p>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default CS2Stats;
