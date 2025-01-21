import Image from "next/image";
import React from "react";

const Items = ({ items }: any) => (
  <div className="hidden md:flex items-center w-36 mb-auto">
    <div className="grid grid-cols-3 grid-rows-2 gap-1">
      {items.slice(0, 6).map((item: any, index: number) => (
        <div
          key={index}
          className="relative bg-[#1c1c1c] w-6 h-6 rounded overflow-hidden"
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
    </div>
    {items[6] !== 0 && (
      <div className="relative w-6 h-6 ml-1 rounded overflow-hidden">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/item/${items[6]}.png`}
          alt="item-7"
          fill
          className="object-cover"
        />
      </div>
    )}
  </div>
);

export default Items;
