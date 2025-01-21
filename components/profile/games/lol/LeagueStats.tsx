'use client'
import { useGameProfileContext } from "@/components/context/GameContext";
import { useProfileContext } from "@/components/context/ProfileContext";
import Dropdown from "@/components/Dropdown";
import { lolGM } from "@/data/gamemodes";
import { displayRank } from "@/data/leagueRankDisplay";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";

const LeagueStats = () => {
  const { profileData: profile } = useProfileContext();
  const [gameMode, setGameMode] = useState<string>(lolGM[0][0]);
  const { leagueProfileData, setLeagueProfileData } = useGameProfileContext();

  // Memoize fetchData to avoid refetching data unnecessarily
  const fetchData = useMemo(() => {
    if (profile && profile.riotId !== "null" && profile.regionalRoute && profile.platformRoute) {
      const { riotId, regionalRoute, platformRoute } = profile;
      const fetchDataFromAPI = async () => {
        try {
          const response = await fetch("/api/riot", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ riotId, regionalRoute, platformRoute }),
          });
          const data = await response.json();
          console.log(data);
          setLeagueProfileData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchDataFromAPI();
    }
  }, [profile, setLeagueProfileData]);

  useEffect(() => {
    fetchData;  // Invoke the memoized fetchData only if the profile data changes
  }, [fetchData]);

  const getRankedData = () =>
    leagueProfileData?.rankedData?.find(
      (data: any) =>
        data.queueType === lolGM.find((mode) => mode[0] === gameMode)?.[1]
    );

  const rankedData = getRankedData();
  
  return leagueProfileData ? (
    <div className="xl:flex grid grid-cols-1 md:grid-cols-2 mt-4 xl:grid-cols-5 xl:gap-0 xl:justify-between gap-8 lg:space-x-4">
      <div className="w-full xl:max-w-max md:col-span-2 col-span-1 lg:col-span-1 xl:col-span-2 flex items-center">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${leagueProfileData.data.profileIconId}.png`}
          alt="Profile Icon"
          width={100}
          height={100}
          className="rounded-full border-2 border-white"
        />
        <div className="flex text-xl font-bold w-full flex-col h-full ml-4">
          <h1 className="mb-0">{profile.riotId}</h1>
          <h2 className="text-[#5AECE5] mt-0">
            Level {leagueProfileData.data.summonerLevel}
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
          placeholder={lolGM[0][0]}
          items={lolGM.map((mode) => mode[0])}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h1 className="text-xl font-bold">Rank</h1>
        <div className="flex items-center space-x-4">
          <Image
            src={displayRank(rankedData?.tier)}
            width={100}
            height={100}
            alt="rank"
          />
          <div className="flex flex-col">
            <h1 className="font-bold text-xl">
              {rankedData
                ? `${rankedData?.tier.charAt(0).toUpperCase() + rankedData?.tier.slice(1).toLowerCase()} ${rankedData?.rank}`
                : "Unranked"}
            </h1>
            <p className="text-base">{rankedData?.leaguePoints ?? "N/A"} LP</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex font-bold flex-col space-y-1">
        <h1 className="text-xl">Matches</h1>
        <div className="flex items-center text-[#5AECE5] w-full xl:w-72">
          <p className="w-16">{rankedData?.wins ?? "N/A"} W</p>
          <span
            className="h-4 ml-2 bg-[#5AECE5]"
            style={{
              width: `${
                rankedData?.wins + rankedData?.losses > 0
                  ? (rankedData?.wins * 100) / (rankedData?.wins + rankedData?.losses)
                  : 0
              }%`,
            }}
          />
        </div>
        <div className="flex items-center text-[#E82D2D] w-full xl:w-72">
          <p className="w-16">{rankedData?.losses ?? "N/A"} L</p>
          <span
            className="h-4 ml-2 bg-[#E82D2D]"
            style={{
              width: `${
                rankedData?.wins + rankedData?.losses > 0
                  ? (rankedData?.losses * 100) / (rankedData?.wins + rankedData?.losses)
                  : 0
              }%`,
            }}
          />
        </div>
        <p className="font-normal text-sm">
          {rankedData?.wins + rankedData?.losses > 0
            ? `${((rankedData?.wins * 100) / (rankedData?.wins + rankedData?.losses)).toFixed(1)}% Winrate`
            : "N/A"}
        </p>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default LeagueStats;
