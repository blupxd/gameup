import React, { createContext, useContext, ReactNode } from "react";

interface ProfileContextProps {
  profileData: any;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ profileData: any; children: ReactNode }> = ({ profileData, children }) => {
  return <ProfileContext.Provider value={{ profileData }}>{children}</ProfileContext.Provider>;
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};