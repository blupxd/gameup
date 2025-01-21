import Image from "next/image";
import React from "react";

const Participants = ({ participants }: any) =>
  participants.map((participant: any, index: number) => (
    <div
      key={index}
      className="relative w-full min-w-4 max-w-8 aspect-square overflow-hidden"
    >
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/${participant.championName}.png`}
        alt={participant.championName}
        fill
        className="object-cover"
      />
    </div>
  ));

export default Participants;
