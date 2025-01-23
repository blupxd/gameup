import { useGameProfileContext } from "@/components/context/GameContext";
import { useProfileContext } from "@/components/context/ProfileContext";
import Dropdown from "@/components/Dropdown";
import { calculateRank } from "@/data/fortniteRankCalculator";
import { fnGM } from "@/data/gamemodes";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

const FortStats = () => {
  const { profileData } = useProfileContext();
  const { setFortniteProfileData, fortniteProfileData } =
    useGameProfileContext();
  const [gameMode, setGameMode] = useState<string>(fnGM[0][0]);

  const fetchData = useMemo(() => {
    const fetchDataFromAPI = async () => {
      const params = new URLSearchParams({
        name: "" + profileData.epicId?.split(" ")[0],
        accountType: "" + profileData.epicId?.split(" ")[1],
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

        const playerData = {
          icon: `/assets/fortnite/icons/${
            Math.floor(Math.random() * 6) + 1
          }.jpg`,
          rank: calculateRank(data.data.stats.all.overall),
          killsPerMatch: data.data.stats.all.overall.killsPerMatch,
          level: data.data.battlePass.level,
          wins: data.data.stats.all.overall.wins,
          kd: data.data.stats.all.overall.kd,
          top5: data.data.stats.all.overall.top5,
          top10: data.data.stats.all.overall.top10,
          top25: data.data.stats.all.overall.top25,
          matches: data.data.stats.all.overall.matches,
          winRate: data.data.stats.all.overall.winRate,
        };
        setFortniteProfileData(playerData);
        console.log(playerData);
      } catch (error) {
        console.error("Error fetching FN data:", error);
      }
    };
    return fetchDataFromAPI;
  }, [profileData, setFortniteProfileData]);

  useEffect(() => {
    if (profileData?.epicId && !fortniteProfileData) {
      fetchData(); // Pozivamo fetch samo ako podaci nisu učitani
    }
  }, [profileData, fortniteProfileData, fetchData]);

  return fortniteProfileData ? (
    <div className="xl:flex grid grid-cols-1 md:grid-cols-2 mt-4 xl:grid-cols-5 xl:gap-0 xl:justify-between gap-8 lg:space-x-4">
      <div className="w-full xl:max-w-max md:col-span-2 col-span-1 lg:col-span-1 xl:col-span-2 flex items-center">
        <div className="rounded-full relative w-40 aspect-square border-2 overflow-hidden border-white">
          <Image
            src={fortniteProfileData.icon}
            alt="Profile Icon"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex text-xl font-bold w-full flex-col h-full ml-4">
          <h1 className="mb-0">{profileData.epicId.split(" ")[0]}</h1>
          <h2 className="text-[#5AECE5] mt-0">
            Level {fortniteProfileData.level}
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
          placeholder={fnGM[0][0]}
          items={fnGM.map((mode) => mode[0])}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h1 className="text-xl flex flex-col font-bold">
          Overall Rank
          <span className="text-xs font-normal text-[#fa9dd7]">
            (calculated by your perfomance)
          </span>
        </h1>
        <div className="flex items-center space-x-2">
          <Image
            src={
              fortniteProfileData.rank
                ? `/assets/fortnite/ranked_emblems/${fortniteProfileData.rank}.PNG`
                : "/assets/fortnite/ranked_emblems/Unknown.PNG"
            }
            alt="Rank"
            width={75}
            height={75}
          />
          {fortniteProfileData.rank}
        </div>
      </div>
      <div className="flex-1 text-sm flex font-bold flex-col space-y-2">
        <h1 className="text-xl">Matches</h1>
        <div className="flex items-center text-[#5AECE5] w-full xl:w-72">
          <p className="w-14">{fortniteProfileData?.wins ?? "N/A"} W</p>
          <span
            className="h-4 ml-auto bg-[#5AECE5]"
            style={{
              width: `${
            fortniteProfileData?.wins +
              (fortniteProfileData?.matches - fortniteProfileData?.wins) >
            0
              ? (fortniteProfileData?.wins * 100) /
                (fortniteProfileData?.wins +
                  (fortniteProfileData?.matches -
                fortniteProfileData?.wins))
              : 0
              }%`,
            }}
          />
        </div>
        <div className="flex items-center text-[#E82D2D] w-full xl:w-72">
          <p className="w-14">
            {fortniteProfileData?.matches - fortniteProfileData?.wins} L
          </p>
          <span
            className="h-4 ml-auto bg-[#E82D2D]"
            style={{
              width: `${
            fortniteProfileData?.wins +
              (fortniteProfileData?.matches - fortniteProfileData?.wins) >
            0
              ? ((fortniteProfileData?.matches -
                  fortniteProfileData?.wins) *
                  100) /
                (fortniteProfileData?.wins +
                  (fortniteProfileData?.matches -
                fortniteProfileData?.wins))
              : 0
              }%`,
            }}
          />
        </div>
        <p className="font-normal text-sm">
          {fortniteProfileData.winRate.toFixed(1)}% Win Rate
        </p>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default FortStats;
