"use client";
import { checkGame } from "@/data/checkGame";
import { sortRank } from "@/data/sortRank";
import { useAppStore } from "@/store/useStore";

import { formatDistanceToNow } from "date-fns";
import { Mic, MicOff } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InviteButton from "./InviteButton";

interface Game {
  id: string;
  game: string;
  user: string;
  createdAt: string;
  gameUsername: string;
  language: string;
  microphone: boolean;
  rank: string;
  rankIcon: string;
  gameMode: string;
  winRate: string;
  note: string;
  author: any;
}
interface TableFilters {
  game: string;
  gameMode: string;
  language: string;
  rank: string;
}

interface FilterProps {
  filters: TableFilters;
}

const GameTable: React.FC<FilterProps> = ({ filters }) => {
  const [games, setGames] = useState<Game[]>([]);
  const signal = useAppStore((state) => state.signal);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/post");
        const data = await response.json();
        setGames(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [signal]);

  const filteredGames = games.filter((game: Game) => {
    const { game: gameFilter, gameMode, rank, language } = filters;

    const isRankInRange = (rank: string, gameRank: string) => {
      if (rank === "Any Rank") return true;
      const rankValue = parseInt(gameRank, 10);
      switch (rank) {
        case "0-4999":
          return rankValue >= 0 && rankValue <= 4999;
        case "5000-9999":
          return rankValue >= 5000 && rankValue <= 9999;
        case "10000-14900":
          return rankValue >= 10000 && rankValue <= 14900;
        case "15000-19999":
          return rankValue >= 15000 && rankValue <= 19999;
        case "20000-24999":
          return rankValue >= 20000 && rankValue <= 24999;
        case "25000-29999":
          return rankValue >= 25000 && rankValue <= 29999;
        case "30000":
          return rankValue >= 30000;
        default:
          return true;
      }
    };

    return (
      (gameFilter === "Any Game" || !gameFilter || game.game === gameFilter) &&
      (!gameMode ||
        game.gameMode === gameMode ||
        gameMode === "Any Gamemode") &&
      (gameFilter === "CS2"
        ? isRankInRange(rank, game.rank)
        : rank === "Any Rank" ||
          !rank ||
          game.rank.toLocaleLowerCase() === rank.toLocaleLowerCase()) &&
      (!language || game.language === language || language === "Any Language")
    );
  });
  console.log({ filteredGames, filters });
  return (
    <div className="overflow-x-auto scrollbar lg:mt-0 mt-4">
      <div className="min-w-max overflow-auto text-sm w-full flex flex-col text-white">
        {/* Table Headers */}

        <div className="flex items-center space-x-4 md:px-4 px-2 py-1 md:py-2 rounded-t-md">
          <div className="w-16 flex-none text-center font-bold">Game</div>
          <div className="flex-none w-48 font-bold">Username</div>
          <div className="w-24 flex-none font-bold">Time</div>
          <div className="w-32 flex-none font-bold">Game Mode</div>
          <div className="w-32 flex-none font-bold">Rank</div>
          <div className="w-24 flex-none font-bold">Win Rate</div>
          <div className="w-24 flex-none font-bold">Language</div>
          <div className="flex-1 font-bold">Note</div>
          <div className="flex-1 font-bold"></div>
        </div>

        {/* Table Content */}
        <div className="bg-[#171717]/90 text-sm rounded-b-md border w-full border-[#707070]">
          {filteredGames.length > 0 ? (
            filteredGames.map((game, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-4 md:px-4 px-2 py-1 md:py-2 border-b border-[#3A434D]"
              >
                {/* Game Icon */}
                <div className="w-16 flex-none flex justify-center items-center">
                  <Image
                    src={checkGame(game.game)}
                    alt="Game icon"
                    width={24}
                    height={24}
                  />
                </div>

                {/* Username */}
                <div className="flex-none w-48 text-[#5AECE5] font-semibold">
                  <div className="flex items-center gap-x-2">
                    <p className="text-wrap text-xs">{game.gameUsername}</p>
                    {game.microphone ? (
                      <Mic className="text-[#5aec83]" size={20} />
                    ) : (
                      <MicOff className="text-[#ec5a5a]" size={20} />
                    )}
                  </div>
                </div>

                {/* Time */}
                <div className="w-24 flex-none text-xs">
                  {formatDistanceToNow(new Date(game.createdAt), {
                    addSuffix: true,
                  })}
                </div>

                {/* Game Mode */}
                <div className="w-32 flex-none font-semibold text-[#C188E1] text-xs">
                  {game.gameMode}
                </div>

                {/* Rank */}
                <div className="w-32 flex-none flex items-center gap-x-2">
                  {game.game === "CS2" ? (
                    <div className="relative flex justify-center max-w-max items-center">
                      <Image
                        src={game.rankIcon}
                        alt="Rank"
                        width={25}
                        height={25}
                        className="lg:w-16 w-10 h-auto lg:h-auto"
                      />
                      <h1
                        style={{ color: sortRank(Number(game.rank))?.[1] }}
                        className="absolute left-3 z-10 italic font-bold text-lg md:text-sm text-center"
                      >
                        {game.rank}
                      </h1>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={game.rankIcon}
                        width={25}
                        height={25}
                        alt="Game profile picture"
                      />
                      <span className="font-semibold text-[#cfcfcf] text-xs">
                        {game.rank}
                      </span>
                    </>
                  )}
                </div>

                {/* Win Rate */}
                <div
                  className={`w-24 flex-none font-bold text-xs ${
                    parseFloat(game.winRate) > 50
                      ? "text-[#A9EF93]"
                      : "text-[#ce343b]"
                  }`}
                >
                  {game.winRate}%
                </div>
                <div className="w-24 flex-none text-xs font-bold">
                  {game.language}
                </div>
                {/* Note */}
                <div className="flex-1">
                  <p className="text-xs border w-36 h-auto border-[#1E1E1E] p-2 rounded bg-[#252525] overflow-x-auto whitespace-nowrap scrollbar">
                    {game.note || "No note"}
                  </p>
                </div>

                {/* Request Button */}
                <div className="flex-1 text-center">
                  <InviteButton
                    postId={game.id}
                    gameName={game.game}
                    toUserId={game?.author?.id + ""}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">No posts available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameTable;
