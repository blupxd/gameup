import Profile from "@/components/profile/Profile";
import ProfileGames from "@/components/profile/ProfileGames";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col min-h-screen">
      <Profile session={session} />
      <ProfileGames />
    </div>
  );
};

export default ProfilePage;
