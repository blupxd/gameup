import Image from "next/image";
import React from "react";

const Map = ({ map }: any) => {
  return (
    <div className="flex lg:flex-row flex-col xl:justify-between w-full xl:items-center bg-[#252525] px-6 py-4 relative rounded overflow-hidden">
      <div className="flex z-20 items-center justify-between w-full">
        <div className="flex flex-col items-center">
          <Image
            src={`/assets/cs2/map_icons/${map.map}.png`}
            alt=" "
            width={50}
            height={50}
          />
          <h1 className="text-[10px] font-bold">{map.map}</h1>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-sm">Win Rate</h1>
          <p className="text-sm font-bold">{map.winPercentage}%</p>
        </div>
        <div className="flex flex-col items-start">
          <div className="flex items-center text-[#64cec9] w-full xl:w-40">
            <p className="w-14 font-bold">{map?.totalWins ?? "N/A"} W</p>
            <span
              className="h-2 ml-2 rounded bg-[#64cec9]"
              style={{
                width: `${
                  map?.totalWins + map?.totalLosses > 0
                    ? (map?.totalWins * 100) /
                      (map?.totalWins + map?.totalLosses)
                    : 0
                }%`,
              }}
            />
          </div>
          <div className="flex items-center text-[#ea7070] w-full xl:w-40">
            <p className="w-14 font-bold">{map?.totalLosses ?? "N/A"} L</p>
            <span
              className="h-2 ml-2 rounded bg-[#ea7070]"
              style={{
                width: `${
                  map?.totalWins + map?.totalLosses > 0
                    ? (map?.totalLosses * 100) /
                      (map?.totalWins + map?.totalLosses)
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
      </div>
      <div className="absolute ml-auto z-10 inset-0 overflow-hidden w-[90%]">
        <Image
          src={`/assets/cs2/map_images/${map.map}.jpg`}
          alt="image"
          fill
          className="object-cover opacity-60 ml-0.5"
        />
        <span className="absolute inset h-full w-full bg-gradient-to-r pl-0.5 z-10 from-[#252525] to-transparent" />
      </div>
    </div>
  );
};

export default Map;
