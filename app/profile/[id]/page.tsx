'use client'
import Profile from "@/components/profile/Profile";
import ProfileGames from "@/components/profile/ProfileGames";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProfileProvider } from "@/components/context/ProfileContext"; 

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch(`/api/auth/user?username=${id}`);
      const data = await response.json();
      setProfileData(data);
    };

    fetchProfileData();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen">
      {profileData ? (
        <ProfileProvider profileData={profileData}>
          <Profile />
          <ProfileGames />
        </ProfileProvider>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;