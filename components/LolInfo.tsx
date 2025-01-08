"use client";
import { displayRank } from "@/data/leagueRankDisplay";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TransparentDropdown from "./TransparentDropdown";

interface ProfileData {
  riotId: string | undefined;
  platformRoute: string | undefined;
  regionalRoute: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPlayerData: (data: any) => void
}
interface GameMode {
  name: string;
  value: string;
}

const LolInfo: React.FC<ProfileData> = ({
  riotId,
  regionalRoute,
  platformRoute,
  getPlayerData
}) => {
  const gameModes: GameMode[] = [
    { name: "Ranked Solo/Duo", value: "RANKED_SOLO_5x5" },
    { name: "Ranked Flex", value: "RANKED_TEAM_5x5" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string>(gameModes[0].value);
  const stats: string[] = ["Wins", "Losses", "Win %", "LP"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/riot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riotId, regionalRoute, platformRoute }),
        });
        const data = await response.json();
        setProfileData(data);
        getPlayerData(data)
      } catch {
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };
    if (riotId && regionalRoute && platformRoute) fetchData();
  }, [riotId, regionalRoute, platformRoute]);

  const getRankedData = () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profileData?.rankedData?.find(
      (data: any) => data.queueType === selectedMode
    );

  const rankedData = getRankedData();

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="flex flex-col">
        <h1 className="text-[#D28585]">
          Couldn&apos;t find your profile. Please check your settings.
        </h1>
      </div>
    );

  return (
    <div className="mb-6">
      {profileData && (
        <div className="flex items-start lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-6 lg:justify-between w-full">
          <div className="flex items-start space-x-4">
            <div className="rounded-full relative w-24 h-24 border-4 overflow-hidden border-white">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${profileData.data.profileIconId}.png`}
                alt="Profile Icon"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col xl:flex-row xl:items-center xl:space-x-4">
                <h1 className="text-xl font-bold text-white">{riotId}</h1>
                <h2 className="text-xl font-bold text-[#5AECE5]">
                  Level {profileData.data.summonerLevel}
                </h2>
              </div>
              <button className="px-6 max-w-max py-1 mt-1 lg:mt-4 rounded font-bold bg-[#E82D2D]">
                Change
              </button>
            </div>
          </div>

          <div className="grid items-start grid-cols-2 xl:grid-cols-4 w-full lg:w-96 xl:max-w-max gap-4 lg:gap-4">
            {stats.map((stat) => {
              const value =
                stat === "Win %"
                  ? rankedData?.wins && rankedData?.losses
                    ? `${(
                        (rankedData.wins /
                          (rankedData.wins + rankedData.losses)) *
                        100
                      ).toFixed(1)}%`
                    : "N/A"
                  : stat === "LP"
                  ? rankedData?.leaguePoints ?? "N/A"
                  : rankedData?.[stat.toLowerCase()] ?? "N/A";
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
          <div className="flex flex-col">
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
            <div className="flex items-center">
              <Image
                src={displayRank(rankedData?.tier)}
                alt="Rank"
                width={100}
                height={100}
                className="-mt-2 md:w-auto w-36 h-36 md:h-auto"
              />
              <h1 className="font-semibold text-base xl:text-xl">{rankedData ? `${rankedData?.tier} ${rankedData?.rank}` : "Unranked"}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LolInfo;
