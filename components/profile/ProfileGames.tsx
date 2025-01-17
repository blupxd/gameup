"use client";
import React, { useState } from "react";
import { Game, games } from "@/data/gameIcons";
import Image from "next/image";

const ProfileGames = () => {
  const [selectedGame, setSelecetedGame] = useState<Game>(games[0]);
  return (
    <div className="flex flex-col px-4 py-8 md:px-20">
      <div className="flex flex-col space-y-6">
        <h1 className="font-bold text-xl">Games</h1>
        <div className="flex items-center space-x-10 bg-[#1E1E1E] p-1 border border-[#303030] rounded max-w-max">
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
    </div>
  );
};

export default ProfileGames;
