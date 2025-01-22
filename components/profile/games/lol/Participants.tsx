import Image from "next/image";
import React from "react";

const Participants = ({ participants }: any) =>
  participants.map((participant: any, index: number) => (
    <div
      key={index}
      className="relative w-full min-w-6 group max-w-8 aspect-square"
    >
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/${participant.championName}.png`}
        alt={participant.championName}
        fill
        className="object-cover"
      />
      <div className="absolute z-10 top-full mt-1 left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex items-center justify-center bg-[#1c1c1c]/80 text-white text-xs rounded py-1 px-2">
        {participant.championName}
      </div>
    </div>
  ));

export default Participants;
