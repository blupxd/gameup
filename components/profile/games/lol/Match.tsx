import { useProfileContext } from "@/components/context/ProfileContext";
import {
  getQueueDetails,
  getSummonerDetails,
  getSummonerSpellDetails,
  getRuneDetails,
} from "@/data/fetchLeagueData";
import { formatDistanceToNowStrict } from "date-fns";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Items from "./Items";
import Participants from "./Participants";
import Runes from "./Runes";
import SummonerSpells from "./SummonerSpells";

const Match = ({ match }: any) => {
  const { profileData } = useProfileContext();
  const [riotIdGameName, riotIdTagline] = profileData.riotId.split("#");
  const [summonerDetails, setSummonerDetails] = useState<any>();
  const [showParticipants, setShowParticipants] = useState(false);

  useEffect(() => {
    setSummonerDetails(
      getSummonerDetails(match, riotIdGameName, riotIdTagline)
    );
  }, [match]);

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
  };

  const toggleParticipants = () => {
    setShowParticipants(!showParticipants);
  };

  return summonerDetails ? (
    <div className="flex lg:flex-row flex-col xl:justify-between w-full xl:items-center bg-[#252525] px-6 py-4 relative rounded overflow-hidden">
      <div className="flex items-center justify-between w-full">
        <div className="z-10 flex flex-col w-40">
          <p className="text-[10px] sm:text-sm md:text-[10px]">
            <span className="font-semibold mr-2">
              {formatDistanceToNowStrict(new Date(match.gameEndTimestamp), {
                addSuffix: true,
              })}
            </span>
            {formatDuration(match.gameDuration)}
          </p>
          <h1 className="font-bold text-xs sm:text-base md:text-xs leading-4">
            {getQueueDetails(match.queueId).description}
          </h1>
          <h2
            className={`font-bold text-[10px] sm:text-sm ${
              summonerDetails.win ? "text-[#A9EF93]" : "text-[#F65858]"
            }`}
          >
            {summonerDetails.win ? "Victory" : "Defeat"}
          </h2>
          <p className="text-[10px] sm:text-sm md:text-[10px]">
            {summonerDetails.kills} / {summonerDetails.deaths} /{" "}
            {summonerDetails.assists}
            <span className="font-bold text-[#5AECE5] ml-2">
              {(
                summonerDetails.kills +
                summonerDetails.assists / summonerDetails.deaths
              ).toFixed(1)}{" "}
              KDA
            </span>
          </p>
        </div>
        <div className="flex max-w-max ml-auto md:w-32">
          <div className="relative md:w-14 w-16 aspect-square rounded overflow-hidden">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/${summonerDetails.championName}.png`}
              alt="image"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-[#1c1c1c] p-0.5 rounded-tr z-10 flex items-center justify-center">
              <Image
                src={`/assets/lol/lanes/${summonerDetails.lane}.webp`}
                alt="role"
                width={16}
                height={16}
              />
            </div>
            <div className="absolute top-0 right-0 bg-[#2e2e2e] w-5 h-5 rounded-bl z-10 flex items-center justify-center">
              <p className="text-xs">{summonerDetails.champLevel}</p>
            </div>
          </div>
          <div className="flex flex-col max-w-max h-full ml-4 md:mx-4">
            <SummonerSpells
              spells={[
                summonerDetails.summonerSpells.spell1,
                summonerDetails.summonerSpells.spell2,
              ]}
            />
            <Runes
              runes={[summonerDetails.firstRune, summonerDetails.secondRune]}
            />
            <p className="text-[8px] mt-auto">
              CS/min{" "}
              <span className="font-bold">
                {(summonerDetails.cs / 60).toFixed(1)}
              </span>
            </p>
          </div>
        </div>
        <Items items={summonerDetails.items} />

        <div className="flex flex-col space-y-1">
          <div className="border-l-2 pl-1 border-blue-500 hidden md:grid grid-cols-5 gap-1 items-center z-20 w-32 ml-4">
            <Participants participants={match.participants.slice(0, 5)} />
          </div>
          <div className="border-l-2 pl-1 border-red-500 hidden md:grid grid-cols-5 gap-1 items-center z-10 w-32 ml-4">
            <Participants participants={match.participants.slice(5, 10)} />
          </div>
        </div>
      </div>
      <div className="flex md:hidden z-10 gap-x-1 mt-2 items-center w-full">
        {summonerDetails.items.map((item: any, index: number) => (
          <div
            key={index}
            className={`relative bg-[#1c1c1c] w-6 h-6 rounded overflow-hidden ${
              index === 6 && "ml-2"
            }`}
          >
            {item !== 0 && (
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/item/${item}.png`}
                alt={`item-${index}`}
                fill
                className="object-cover"
              />
            )}
          </div>
        ))}
        <button
          className="text-xs max-w-max px-4 sm:px-16 py-1 ml-auto border rounded border-[#3f3f3f] bg-[#282828]"
          onClick={toggleParticipants}
        >
          <ChevronDown
            size={16}
            className={`${
              showParticipants ? "rotate-180" : ""
            } transition-transform duration-300 ease-in-out`}
          />
        </button>
      </div>
      {showParticipants && (
        <div className="flex md:hidden items-center justify-between mt-2 w-full max-h-max">
          <div className="border-l-2 pl-1 border-blue-500 flex gap-1 max-h-max items-center z-10 max-w-max">
            <Participants participants={match.participants.slice(0, 5)} />
          </div>
          <div className="border-l-2 pl-1 border-red-500 flex gap-1 max-h-max items-center z-10 max-w-max">
            <Participants participants={match.participants.slice(5, 10)} />
          </div>
        </div>
      )}
      <span
        className={`absolute bg-gradient-to-r inset-0 left-0 w-[220px] ${
          summonerDetails.win
            ? "from-[#5AECE5]/50 via-[#5AECE5]/15 to-[#5AECE5]/0"
            : "from-[#EC6B5A]/50 via-[#EC6B5A]/15 to-[#EC6B5A]/0"
        }`}
      >
        <span
          className={`w-1 z-10 absolute inset-0 rounded-r ${
            summonerDetails.win ? "bg-[#5AECE5]" : "bg-[#FF0101]"
          } left-0 h-1/3 my-auto`}
        />
      </span>
    </div>
  ) : (
    <div className="px-4 py-2 h-16 bg-[#2e2e2e] animate-pulse w-full" />
  );
};

export default Match;
