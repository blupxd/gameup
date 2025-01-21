"use client";
import React, { useEffect, useMemo } from "react";
import Match from "./Match";
import { useGameProfileContext } from "@/components/context/GameContext";
import { useProfileContext } from "@/components/context/ProfileContext";

const LeagueMatches = () => {
  const { leagueProfileData, lolMatches, setLolMatches } = useGameProfileContext();
  const { profileData } = useProfileContext();

  const fetchMatches = useMemo(() => {
    return async () => {
      if (leagueProfileData?.data.puuid) {
        try {
          const response = await fetch(
            `/api/riot?puuid=${leagueProfileData.data.puuid}&regionalRoute=${profileData.regionalRoute}`
          );
          const data = await response.json();
          console.log(data);

          // Postavljanje podataka u kontekst
          setLolMatches(data.matchHistory);
        } catch (error) {
          console.error("Error fetching matches:", error);
        }
      }
    };
  }, [profileData, leagueProfileData, setLolMatches]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return (
    <div className="flex flex-col w-full lg:w-[60%]">
      <h1 className="font-bold text-xl">Match History</h1>
      <div className="mt-4 flex flex-col space-y-4 rounded border border-[#303030] p-2 bg-[#1e1e1e]">
        {lolMatches && lolMatches.length > 0 ? (
          lolMatches.map((match: any, idx: number) => (
            <Match key={idx} match={match.info} />
          ))
        ) : (
          <p>No recent matches</p>
        )}
      </div>
    </div>
  );
};

export default LeagueMatches;
