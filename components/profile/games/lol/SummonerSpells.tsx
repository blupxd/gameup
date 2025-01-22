import { getSummonerSpellDetails } from "@/data/fetchLeagueData";
import Image from "next/image";
import React from "react";

const SummonerSpells = ({ spells }: any) => (
  <div className="grid grid-cols-2 gap-1 max-w-max">
    {spells.map((spell: any, index: number) => (
      <div key={index} className="relative w-6 h-6 md:w-4 md:h-4 rounded group">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/spell/${
            getSummonerSpellDetails(spell).id
          }.png`}
          alt="spell"
          fill
          className="object-cover"
        />
        <div className="absolute flex-col z-20 w-40 top-full mt-1 left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex justify-center bg-[#1c1c1c]/80 text-white rounded py-1 px-2">
          <h1 className="text-[10px] font-semibold text-[#e3c27c]">
            {getSummonerSpellDetails(spell).id}
          </h1>
          <p className="text-[8px] w-full">{getSummonerSpellDetails(spell).description}</p>
        </div>
      </div>
    ))}
  </div>
);

export default SummonerSpells;
