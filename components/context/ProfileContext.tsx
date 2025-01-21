import React, { createContext, useContext, ReactNode, useState } from "react";

interface ProfileContextProps {
  profileData: any;
  profileBG: string;
  setProfileBG: (bg: string) => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode; profileData: any }> = ({ profileData, children }) => {
  const [profileBG, setProfileBG] = useState<string>("bgLol.png");

  return (
    <ProfileContext.Provider value={{ profileData, profileBG, setProfileBG }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
