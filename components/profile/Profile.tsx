import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Profile = ({ session }: any) => {
  return (
    <div className="relative max-h-[350px] h-[350px] w-full px-20">
      <div className="flex flex-col items-center">
        <div className="absolute mx-auto top-1/2 z-10 flex flex-col items-center max-w-max">
          <div className="w-56 h-56 rounded-full border-[5px] border-[#303030] bg-[#1f1f1f]"></div>
          <div className="flex absolute items-center top-[85%] space-x-2 bg-[#1E1E1E] border border-[#303030] px-4 py-2">
            <p className="text-2xl font-bold">{session?.user.username}</p>
            <Link href={`/profile/${session?.user.username}/settings`}>
              <Settings size={16} />
            </Link>
          </div>
        </div>
      </div>
      <Image
        src="/assets/profilepage/bgLol.png"
        fill
        className="object-cover"
        alt="bgImage"
      />
      <div className="text-xs absolute top-24 right-4 md:right-20 flex items-center space-x-2">
        <Image
          src="/assets/profilepage/discord.svg"
          width={24}
          height={24}
          alt="discord"
          className="mr-2"
        />
        Link your discord
      </div>
    </div>
  );
};

export default Profile;
