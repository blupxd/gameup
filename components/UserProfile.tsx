"use client";

import { UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import InviteNotification from "./InviteNotification";

interface User {
  username?: string;
}

interface Session {
  user?: User;
}

interface UserProfileProps {
  session: Session | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ session }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const currentSession = session || null;
  if (!currentSession?.user?.username) {
    return (
      <>
        <div className="md:flex hidden items-center text-base space-x-4 xl:space-x-8">
          <Link
            href="/login"
            className="px-4 xl:px-10 xl:w-full max-w-max lg:text-base hover:bg-[#4dc1bb] transition-colors duration-300 ease-in-out py-2 rounded text-[#1c1c1c] font-bold bg-[#5AECE5]"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-4 xl:px-10 py-2 xl:w-full max-w-max hover:bg-[#23272c] transition-colors duration-300 ease-in-out rounded text-[#D9D9D9] font-bold bg-[#3A434D]"
          >
            Create an account
          </Link>
        </div>
        <Link
          href="/login"
          className="px-2 md:hidden hover:bg-[#4dc1bb] transition-colors duration-300 ease-in-out py-1 rounded text-[#1c1c1c] font-bold bg-[#5AECE5]"
        >
          Get Started
        </Link>
      </>
    );
  }

  return (
    <div className="relative flex items-center space-x-6">
      <InviteNotification />
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 rounded md:bg-[#5AECE5] text-white md:text-[#1c1c1c] font-bold"
      >
        <p className="hidden md:flex">{currentSession.user.username}</p>
        <UserCircle className="md:hidden flex" size={32} />
      </button>
      {isDropdownVisible && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg transition-opacity duration-300">
          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Profile
          </Link>
          <button
            onClick={() => signOut()}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
