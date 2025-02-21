import { getPlayerMatchStats } from "@/data/valorantData";
import { formatDistanceToNowStrict, formatDuration } from "date-fns";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ValMatch = ({ match }: any) => {
  const [playerDetails, setPlayerDetails] = useState<any>(null);
  const [showParticipants, setShowParticipants] = useState<boolean>(false);
  useEffect(() => {
    const fetchPlayerDetails = async () => {
      const details = await getPlayerMatchStats(match, "DNASIREN", "UwU");
      setPlayerDetails(details);
    };

    fetchPlayerDetails();
  }, [match]);

  return playerDetails ? (
    <div className="flex lg:flex-row flex-col xl:justify-between w-full xl:items-center bg-[#252525] px-6 py-4 relative rounded overflow-hidden">
      <div className="flex z-20 items-center w-full">
        <div className="flex flex-col flex-grow">
          <p className="text-[10px] sm:text-sm md:text-[10px]">
            <span className="font-semibold mr-2">
              {formatDistanceToNowStrict(
                new Date(match.matchInfo.gameStartMillis),
                {
                  addSuffix: true,
                }
              )}
            </span>
            {formatDuration(match.matchInfo.gameLengthMillis)}
          </p>
          <h1 className="font-bold text-xs sm:text-base md:text-xs leading-4">
            {match.matchInfo.queueId.charAt(0).toUpperCase() +
              match.matchInfo.queueId.slice(1)}
          </h1>

          <h2
            className={`font-bold text-[10px] sm:text-sm ${
              playerDetails.win ? "text-[#A9EF93]" : "text-[#F65858]"
            }`}
          >
            {playerDetails.win ? "Victory" : "Defeat"}
          </h2>
          <p className="text-[10px] sm:text-sm md:text-[10px]">
            {playerDetails.kills} / {playerDetails.deaths} /{" "}
            {playerDetails.assists}
            <span className="font-bold text-[#5AECE5] ml-2">
              {(
                playerDetails.kills +
                playerDetails.assists / playerDetails.deaths
              ).toFixed(1)}{" "}
              KDA
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative md:w-14 w-16 aspect-square rounded-full overflow-hidden">
            <Image
              src={playerDetails.characterInfo.icon}
              alt="image"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="font-bold text-sm md:text-[10px]">
            {playerDetails.characterInfo.agent}
          </h2>
        </div>
        <div className="flex flex-col items-center flex-grow justify-center">
          <div className="flex font-bold leading-6 text-2xl items-center space-x-1">
            <p className="text-[#5AECE5]">
              {
                match.teams.find((team: any) => team.teamId === "Blue")
                  .roundsWon
              }
            </p>
            <p>:</p>
            <p className="text-[#F65858]">
              {match.teams.find((team: any) => team.teamId === "Red").roundsWon}
            </p>
          </div>
          <h3 className="text-sm font-bold">
            {playerDetails.mapInfo.displayName}
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex md:flex-row flex-col text-[10px] sm:text-sm items-end md:items-center space-x-2 md:space-x-6">
            <div className="flex md:text-center text-left md:space-x-0 space-x-1 md:flex-col">
              <p>HS%</p>
              <p className="font-bold">{playerDetails.hsPercentage}%</p>
            </div>
            <div className="flex md:text-center text-left md:space-x-0 space-x-1 md:flex-col">
              <p>ADR</p>
              <p className="font-bold">{playerDetails.adr}</p>
            </div>
            <div className="flex md:text-center text-left md:space-x-0 space-x-1 md:flex-col">
              <p>ACS</p>
              <p className="font-bold">{playerDetails.averageScore}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              {playerDetails.participants
                .filter((participant: any) => participant.teamId === "Blue")
                .map((participant: any, index: number) => (
                  <div
                    key={index}
                    className="relative md:w-4 w-6 aspect-square rounded-full border-b-2 border-[#5AECE5] group"
                  >
                    {/* Character Icon */}
                    <Image
                      src={participant.characterInfo.icon}
                      alt="Team Blue Character"
                      fill
                      className="object-cover rounded-full"
                    />

                    {/* Tooltip */}
                    <div className="absolute z-10 top-full mt-1 left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex items-center justify-center bg-[#1c1c1c]/80 text-white text-xs rounded py-1 px-2">
                      {participant.characterInfo.agent}
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex items-center space-x-1">
              {playerDetails.participants
                .filter((participant: any) => participant.teamId === "Red")
                .map((participant: any, index: number) => (
                  <div
                    key={index}
                    className="relative md:w-4 w-6 aspect-square rounded-full border-b-2 border-[#F65858] group"
                  >
                    {/* Character Icon */}
                    <Image
                      src={participant.characterInfo.icon}
                      alt="Team Blue Character"
                      fill
                      className="object-cover rounded-full"
                    />

                    {/* Tooltip */}
                    <div className="absolute z-10 top-full mt-1 left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex items-center justify-center bg-[#1c1c1c]/80 text-white text-xs rounded py-1 px-2">
                      {participant.characterInfo.agent}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowParticipants((prev) => !prev)}
        className="flex md:hidden text-xs z-20 max-w-max px-8 sm:px-16 py-1 ml-auto border rounded border-[#3f3f3f] bg-[#282828]"
      >
        <ChevronDown
          size={16}
          className={`${
            showParticipants ? "rotate-180" : ""
          } transition-transform duration-300 ease-in-out`}
        />
      </button>
      {showParticipants && (
        <div className="flex md:hidden z-20 items-center justify-between mt-2 w-full max-h-max">
          <div className="flex items-center space-x-1">
            {playerDetails.participants
              .filter((participant: any) => participant.teamId === "Blue")
              .map((participant: any, index: number) => (
                <div
                  key={index}
                  className="relative md:w-4 w-6 aspect-square rounded-full border-b-2 border-[#5AECE5] group"
                >
                  {/* Character Icon */}
                  <Image
                    src={participant.characterInfo.icon}
                    alt="Team Blue Character"
                    fill
                    className="object-cover rounded-full"
                  />

                  {/* Tooltip */}
                  <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex items-center justify-center bg-[#1c1c1c]/80 text-white text-xs rounded py-1 px-2">
                    {participant.characterInfo.agent}
                  </div>
                </div>
              ))}
          </div>

          <div className="flex items-center space-x-1">
            {playerDetails.participants
              .filter((participant: any) => participant.teamId === "Red")
              .map((participant: any, index: number) => (
                <div
                  key={index}
                  className="relative md:w-4 w-6 aspect-square rounded-full border-b-2 border-[#F65858] group"
                >
                  {/* Character Icon */}
                  <Image
                    src={participant.characterInfo.icon}
                    alt="Team Blue Character"
                    fill
                    className="object-cover rounded-full"
                  />

                  {/* Tooltip */}
                  <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex items-center justify-center bg-[#1c1c1c]/80 text-white text-xs rounded py-1 px-2">
                    {participant.characterInfo.agent}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <span
        className={`absolute bg-gradient-to-r inset-0 left-0 w-1/2 sm:w-[220px] ${
          playerDetails.win
            ? "from-[#5AECE5]/50 via-[#5AECE5]/15 to-[#5AECE5]/0"
            : "from-[#EC6B5A]/50 via-[#EC6B5A]/15 to-[#EC6B5A]/0"
        }`}
      >
        <span
          className={`w-1 z-10 absolute inset-0 rounded-r ${
            playerDetails.win ? "bg-[#5AECE5]" : "bg-[#FF0101]"
          } left-0 h-1/3 my-auto`}
        />
      </span>
      <div className="absolute ml-auto z-10 inset-0 overflow-hidden w-1/2">
        <Image
          src={playerDetails.mapInfo.splash}
          alt="image"
          fill
          className="object-cover opacity-60 ml-0.5"
        />
        <span className="absolute inset h-full w-full bg-gradient-to-r pl-0.5 z-10 from-[#252525] to-transparent" />
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ValMatch;
