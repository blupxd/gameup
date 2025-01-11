"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { calculateRank } from "@/data/fortniteRankCalculator";

interface ProfileData {
  icon: string;
  rank: string;
  level: number;
  wins: number;
  kd: number;
  top5: number;
  top10: number;
  top25: number;
  matches: number;
  winRate: number;
}

interface FortInfoProps {
  epicId: string | undefined;
  gameModes: string[][];
  getPlayerData: (data: any) => void;
}

const FortInfo: React.FC<FortInfoProps> = ({
  epicId,
  getPlayerData,
}) => {

  const stats = [
    "Wins",
    "K/D",
    "Top 5",
    "Top 10",
    "Top 25",
    "Matches",
    "Win Rate",
  ];
  const statKeyMapping: { [key: string]: keyof ProfileData } = {
    Wins: "wins",
    "K/D": "kd",
    "Top 5": "top5",
    "Top 10": "top10",
    "Top 25": "top25",
    Matches: "matches",
    "Win Rate": "winRate",
  };
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams({
        name: "" + epicId?.split("-+")[0],
        accountType: "" + epicId?.split("-+")[1],
        timeWindow: "season",
      });
      const url = `https://fortnite-api.com/v2/stats/br/v2?${params.toString()}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: "" + process.env.NEXT_PUBLIC_FORTNITE_API_KEY,
          },
        });
        const data = await response.json();
        calculateRank(data.data.stats.all.overall);
        const playerData = {
          icon: `/assets/fortnite/icons/${Math.floor(Math.random() * 6) + 1}.jpg`,
          rank: calculateRank(data.data.stats.all.overall),
          level: data.data.battlePass.level,
          wins: data.data.stats.all.overall.wins,
          kd: data.data.stats.all.overall.kd,
          top5: data.data.stats.all.overall.top5,
          top10: data.data.stats.all.overall.top10,
          top25: data.data.stats.all.overall.top25,
          matches: data.data.stats.all.overall.matches,
          winRate: data.data.stats.all.overall.winRate,
        };
        if (!response.ok || !data || !data.data || !data.data.stats) {
          setError(true);
          return;
        } else {
          getPlayerData(playerData);
          setProfileData(playerData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [epicId]);

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
                    {epicId?.split("-+")[0]}
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
                Overall Rank
                <span className="text-xs font-normal text-[#fa9dd7]">
                  (calculated by your perfomance)
                </span>
              </h1>
              <div className="flex items-center space-x-2">
                <Image
                  src={
                    profileData.rank
                      ? `/assets/fortnite/ranked_emblems/${profileData.rank}.PNG`
                      : "/assets/fortnite/ranked_emblems/Unknown.PNG"
                  }
                  alt="Rank"
                  width={75}
                  height={75}
                  className="mt-2 w-24 h-full"
                />

                <h1 className="font-semibold text-2xl lg:text-xl">
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

export default FortInfo;
