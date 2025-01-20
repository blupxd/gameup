import React, { createContext, useContext, useState, ReactNode } from "react";

interface GameProfileContextProps {
  leagueProfileData: any;
  setLeagueProfileData: (data: any) => void;
  valorantProfileData: any;
  setValorantProfileData: (data: any) => void;
  fortniteProfileData: any;
  setFortniteProfileData: (data: any) => void;
  cs2ProfileData: any;
  setCs2ProfileData: (data: any) => void;
  lolMatches: any[];
  setLolMatches: (data: any) => void;
}

const GameProfileContext = createContext<GameProfileContextProps | undefined>(undefined);

export const GameProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [leagueProfileData, setLeagueProfileData] = useState<any>(null);
  const [valorantProfileData, setValorantProfileData] = useState<any>(null);
  const [fortniteProfileData, setFortniteProfileData] = useState<any>(null);
  const [cs2ProfileData, setCs2ProfileData] = useState<any>(null);
  const [lolMatches, setLolMatches] = useState<any[]>([]);


  return (
    <GameProfileContext.Provider
      value={{
        leagueProfileData,
        setLeagueProfileData,
        valorantProfileData,
        setValorantProfileData,
        fortniteProfileData,
        setFortniteProfileData,
        cs2ProfileData,
        setCs2ProfileData,
        lolMatches,
        setLolMatches
      }}
    >
      {children}
    </GameProfileContext.Provider>
  );
};

export const useGameProfileContext = () => {
  const context = useContext(GameProfileContext);
  if (context === undefined) {
    throw new Error("useGameProfileContext must be used within a GameProfileProvider");
  }
  return context;
};