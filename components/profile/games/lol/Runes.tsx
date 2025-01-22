import { getRuneDetails } from "@/data/fetchLeagueData";
import Image from "next/image";
import React from "react";

const Runes = ({ runes }: any) => {
  return (
    <div className="grid grid-cols-2 gap-1 max-w-max">
      {runes.map((rune: any, index: number) => (
        <div
          key={index}
          className="relative w-6 h-6 md:w-4 md:h-4 rounded group"
        >
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/img/${
              getRuneDetails(rune).icon
            }`}
            alt="rune"
            fill
            className="object-cover"
          />
          <div className="absolute z-20 top-full mt-1 left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex items-center justify-center bg-[#1c1c1c]/80 text-white text-xs rounded py-1 px-2">
            <h1 className="text-[10px] font-semibold text-[#e3c27c]">
              {getRuneDetails(rune).name}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Runes;
