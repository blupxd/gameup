'use client'
import React, { useState, useMemo } from "react";
import { Game, games } from "@/data/gameIcons";
import Image from "next/image";
import LeagueStats from "./games/LeagueStats";
import CommentSection from "./comments/CommentSection";
import { useProfileContext } from "../context/ProfileContext";

const ProfileGames = () => {
  const [selectedGame, setSelecetedGame] = useState<Game>(games[0]);
  const { profileData: profile } = useProfileContext();

  // Memoize the result of switchGameStats
  const renderedStats = useMemo(() => {
    switch (selectedGame.name) {
      case "League of Legends":
        return <LeagueStats />;
      case "Valorant":
        return <></>;
      case "Fortnite":
        return <></>;
      case "CS2":
        return <></>;
      default:
        return <></>;
    }
  }, [selectedGame]);

  return (
    <div className="flex flex-col px-4 py-8 w-full md:px-20">
      <div className="flex flex-col md:my-0 my-6 space-y-6">
        <h1 className="font-bold text-xl">Games</h1>
        <div className="flex items-center md:space-x-10 bg-[#1E1E1E] p-1 border border-[#303030] rounded w-full md:justify-normal justify-between md:max-w-max">
          {games.map((game, idx) => (
            <button
              key={idx}
              onClick={() => setSelecetedGame(game)}
              className={`p-2 rounded ${
                selectedGame.name === game.name && "bg-[#151515]"
              } flex items-center justify-center`}
            >
              <Image src={game.icon} width={25} height={25} alt={game.name} />
            </button>
          ))}
        </div>
      </div>
      {renderedStats}
      <div className="grid grid-cols-1-reverse lg:grid-cols-2 mt-8 gap-4">
        {profile && <CommentSection userId={profile.id} />}
      </div>
    </div>
  );
};

export default ProfileGames;
