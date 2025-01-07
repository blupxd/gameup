import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="text-center flex flex-col items-center">
      <h1 className="text-5xl md:text-6xl font-bold w-full lg:w-3/5 text-wrap">
        FIND YOUR <span className="text-[#5AECE5]">PARTNER</span> AND CLIMB
        TOGETHER
      </h1>
      <p className="text-xl md:text-2xl">
        Play smarter, climb faster - Find your perfect partner for any game!
      </p>
      <Link
        href="/register"
        className="px-12 mt-6 py-1.5 rounded text-[#1c1c1c] font-bold bg-[#5AECE5] border border-[#5B9E9B]"
      >
        DIVE IN
      </Link>
    </div>
  );
};

export default Hero;
