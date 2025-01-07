import { navLinks } from "@/data/links";
import Link from "next/link";
import React from "react";
import UserProfile from "./UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ColoredLink from "./ColoredLink";
import DropdownLinks from "./DropdownLinks";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex w-full bg-gradient-to-b from-black/60 to-transparent flex-col fixed max-h-max z-20 px-4 md:px-20">
      <div className="flex py-4 justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="max-w-max text-2xl">
            Arena.<span className="font-black text-[#5AECE5]">GG</span>
          </Link>
          <DropdownLinks />
        </div>

        <div className="max-w-max hidden font-bold lg:flex items-center text-base space-x-20">
          {navLinks.map((link) => (
            <ColoredLink key={link.url} url={link.url} name={link.name} />
          ))}
        </div>
        <UserProfile session={session} />
      </div>
      <hr className="w-full h-[1px] bg-gradient-to-r from-[#CCCCCC]/0 border-none via-[#865B9E] to-[#CCCCCC]/0" />
    </nav>
  );
};

export default Navbar;
