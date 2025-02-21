"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { fn, lol, cs, val } from "@/data/ranks";
import { csGM, fnGM, lolGM, valGM } from "@/data/gamemodes";
import { Earth } from "lucide-react";
import { languages } from "@/data/languages";
import PostPopUp from "./post/PostPopUp";
import { useSession } from "next-auth/react";
import LolInfo from "./LolInfo";
import ValInfo from "./ValInfo";
import FortInfo from "./FortInfo";
import CS2Info from "./CS2Info";

interface TableFilters {
  game: string;
  gameMode: string;
  language: string;
  rank: string;
}
interface StatsProps {
  gameName: string;
  onChange: (value: TableFilters) => void;
}

const ProfileStats: React.FC<StatsProps> = ({ gameName, onChange }) => {
  const { data: session } = useSession();
  const [createPost, setCreatePost] = useState<boolean>(false);
  const [rank, setRank] = useState<string>("");

  const [language, setLanguage] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [playerData, setPlayerData] = useState<any>();
  const checkWhichGame = () => {
    switch (gameName) {
      case "League of Legends":
        return [lol, lolGM];
      case "Fortnite":
        return [fn, fnGM];
      case "Valorant":
        return [val, valGM];
      case "CS2":
        return [cs, csGM];
      default:
        return [["Unknown Rank"], [["Unknown Mode", "unknown_mode"]]]; // Default fallback
    }
  };
  const [gameMode, setGameMode] = useState<string>(checkWhichGame()[1][0][0]);
  useEffect(() => {
    console.log(session?.user.epicId)
    onChange({ game: gameName, rank, gameMode, language });
  }, [rank, gameMode, language]);

  const renderGameInfo = () => {
    if (session) {
      switch (gameName) {
        case "League of Legends":
          if (session.user.riotId !== "null")
            return (
              <LolInfo
                getPlayerData={setPlayerData}
                platformRoute={session?.user.platformRoute}
                regionalRoute={session?.user.regionalRoute}
                riotId={session?.user.riotId}
              />
            );
          break;
        case "Valorant":
          if (session.user.riotId !== "null")
            return (
              <ValInfo
                getPlayerData={setPlayerData}
                platformRoute={session?.user.platformRoute}
                regionalRoute={session?.user.regionalRoute}
                riotId={session?.user.riotId}
              />
            );
          break;
        case "Fortnite":
          if (session.user.epicId !== "null")
            return (
              <FortInfo
                getPlayerData={setPlayerData}
                epicId={session?.user.epicId}
                gameModes={fnGM}
              />
            );
        case "CS2":
          if (session.user.steamid !== "null")
            return (
              <CS2Info
                steamid={session?.user.steamid}
                gameModes={csGM}
                getPlayerData={setPlayerData}
              />
            );
      }
    }
  };
  return (
    <div className="flex flex-col h-full">
      {renderGameInfo()}
      <div className="flex flex-col lg:flex-row items-start justify-between">
        <div className="flex flex-wrap items-start w-full xl:space-y-0 gap-4 xl:space-x-6">
          <Dropdown
            className="xl:w-52 lg:w-48 w-full"
            onSelect={setRank}
            placeholder="Any Rank"
            items={checkWhichGame()[0] as string[]}
          />
          <Dropdown
            className="xl:w-52 lg:w-48 w-full"
            onSelect={setGameMode}
            placeholder={checkWhichGame()[1][0][0]}
            items={checkWhichGame()[1].map((mode) => mode[0])}
          />

          <Dropdown
            className="xl:w-52 lg:w-48 w-full"
            onSelect={setLanguage}
            icon={<Earth size={16} />}
            placeholder="Any Language"
            items={languages}
          />
        </div>
        <button
          onClick={() => {
            console.log(createPost, playerData);
            setCreatePost(createPost ? false : true);
          }}
          className="px-10 text-sm lg:max-w-max w-full lg:mt-0 mt-6 hover:bg-[#4dc1bb] border border-[#5B9E9B] transition-colors duration-300 ease-in-out py-2 rounded text-[#1c1c1c] font-bold bg-[#5AECE5]"
        >
          Post or Find Partner
        </button>
      </div>
      {createPost && playerData && (
        <PostPopUp
          gameName={gameName}
          playerData={playerData}
          session={session}
          setCreatePost={setCreatePost}
        />
      )}
    </div>
  );
};

export default ProfileStats;
