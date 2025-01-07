"use client";
import { checkGame } from "@/data/checkGame";
import { fetchLolData } from "@/data/fetchLeagueData";
import { displayRank } from "@/data/leagueRankDisplay";
import { User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Game {
  game: string;
  user: string;
  time: string;
  language: string;
  rank: string;
  gameMode: string;
  winRate: string;
  note: string;
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
interface Post {
  id: string;
  game: string;
  gameUsername: string;
  gameMode: string;
  language: string;
  microphone: boolean;
  note: string;
  createdAt: string;
  author: User;
}

const GameTable: React.FC<FilterProps> = ({ filters }) => {
  const [games, setGames] = useState<Game[]>([]);

  // Handle posts based on the game type
  const handlePosts = async (posts: Post[]) => {
    const gameDataPromises = posts.map(async (post) => {
      if (post.game === "League of Legends") {
        return await fetchLolData(post);
      }
      // Add handling for other games here if necessary
      return null;
    });

    const gameData = await Promise.all(gameDataPromises);
    console.log(gameData);
    setGames(gameData.filter((game): game is Game => game !== null)); // Filter out nulls
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/post");
        const data = await response.json();
        await handlePosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);
  console.log(filters);
  const filteredGames = games.filter((game: Game) => {
    const { game: gameFilter, gameMode, rank } = filters;

    return (
      (!gameFilter || gameFilter === "Any Game" || game.game === gameFilter) &&
      (!gameMode || game.gameMode === gameMode) &&
      (!rank ||
        rank === "Any Rank" ||
        game.rank.toLocaleLowerCase() === rank.toLocaleLowerCase())
    );
  });
  return (
    <div className="overflow-x-auto lg:mt-0 mt-4">
      <div className="min-w-max overflow-auto scrollbar w-full flex flex-col text-white">
        {/* Table Headers */}
        <div className="flex items-center space-x-4 md:px-6 px-4 py-2 md:py-4 rounded-t-md">
          <div className="w-16 flex-none text-center font-bold">Game</div>
          <div className="flex-1 font-bold">Username</div>
          <div className="w-32 flex-none font-bold">Time</div>
          <div className="w-40 flex-none font-bold">Game Mode</div>
          <div className="w-40 flex-none font-bold">Rank</div>
          <div className="w-24 flex-none font-bold">Win Rate</div>
          <div className="w-24 flex-none font-bold">Language</div>
          <div className="flex-1 font-bold">Note</div>
          <div className="w-24 flex-none font-bold"></div>
        </div>

        {/* Table Content */}
        <div className="bg-[#171717]/90 text-sm rounded-b-md border w-full border-[#707070]">
          {filteredGames.length > 0 ? (
            filteredGames.map((game, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-4 md:px-6 px-4 py-1 md:py-4 border-b border-[#3A434D]"
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
                <div className="flex-1 text-[#5AECE5] w-48 font-semibold">{game.user}</div>

                {/* Time */}
                <div className="w-32 flex-none">
                  {formatDistanceToNow(new Date(game.time), {
                    addSuffix: true,
                  })}
                </div>

                {/* Game Mode */}
                <div className="w-40 flex-none font-semibold text-[#C188E1]">
                  {game.gameMode}
                </div>

                {/* Rank */}
                <div className="w-40 flex-none flex items-center gap-2">
                  <span className="font-semibold text-[#cfcfcf]">{game.rank}</span>
                  {game.game === "League of Legends" && (
                    <Image
                      src={displayRank(game.rank.split(" ")[0])}
                      className="-mt-2"
                      width={70}
                      height={70}
                      alt="Game profile picture"
                    />
                  )}
                </div>

                {/* Win Rate */}
                <div
                  className={`w-24 flex-none font-bold text-lg ${
                    parseFloat(game.winRate) > 50
                      ? "text-[#A9EF93]"
                      : "text-[#ce343b]"
                  }`}
                >
                  {game.winRate}
                </div>
                <div className="w-24 flex-none font-bold">{game.language}</div>
                {/* Note */}
                <div className="flex-1">
                  <p className="text-xs border border-[#1E1E1E] p-2 rounded bg-[#252525] overflow-auto scrollbar">
                    {game.note}
                  </p>
                </div>

                {/* Request Button */}
                <div className="w-24 flex-none text-center">
                  <button className="ml-auto bg-[#865B9E] text-xs flex items-center justify-center text-white px-4 py-2 rounded">
                    REQUEST
                  </button>
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
