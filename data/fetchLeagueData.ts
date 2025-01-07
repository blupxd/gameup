import { User } from "@prisma/client";

interface Post {
  id: string;
  game: string;
  gameUsername: string;
  gameMode: string;
  language: string;
  microphone: boolean;
  note: string;
  createdAt: string;
  author: User;
}
interface Game {
  game: string;
  user: string;
  language: string;
  time: string;
  rank: string;
  winRate: string;
  gameMode: string;
  note: string;
}

export const fetchPuuid = async (riotId: string, regionalRoute: string) => {
  const [gameName, tagLine] = riotId.split("#");
  const apiUrl = `https://${regionalRoute}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) {
      console.error(
        `Failed to fetch PUUID. Status: ${res.status} - ${res.statusText}`
      );
      throw new Error(`Failed to fetch PUUID: ${res.status}`);
    }
    const data = await res.json();

    if (!data?.puuid) {
      throw new Error("PUUID not found in the response.");
    }

    console.log("PUUID fetched successfully:", data.puuid);
    return data.puuid;
  } catch (error) {
    console.error("Error fetching PUUID at URL:", apiUrl, error);
    throw error;
  }
};
export const fetchRankedData = async (
  summonerId: string,
  platformRoute: string
) => {
  const apiUrl = `https://${platformRoute}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) {
      console.error(
        `Failed to fetch profile data. Status: ${res.status} - ${res.statusText}`
      );
      throw new Error(`Failed to fetch profile data: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile data at URL:", apiUrl, error);
    throw error;
  }
};
export const fetchProfileData = async (
  puuid: string,
  platformRoute: string
) => {
  const apiUrl = `https://${platformRoute}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) {
      console.error(
        `Failed to fetch profile data. Status: ${res.status} - ${res.statusText}`
      );
      throw new Error(`Failed to fetch profile data: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile data at URL:", apiUrl, error);
    throw error;
  }
};

export // Fetch League of Legends data
const fetchLolData = async (post: Post): Promise<Game | null> => {
  try {
    const response = await fetch("/api/riot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        riotId: post.gameUsername,
        regionalRoute: post.author.regionalRoute,
        platformRoute: post.author.platformRoute,
      }),
    });
    const data = await response.json();

    const rankedData = data.rankedData.find(
      (ranked: any) => ranked.queueType === post.gameMode
    );

    return {
      game: "League of Legends",
      user: post.gameUsername,
      language: post.language,
      time: new Date(post.createdAt).toLocaleString(),
      gameMode: post.gameMode === "RANKED_SOLO_5x5" ? "Ranked Solo/Duo" : "Ranked Flex",
      rank: rankedData ? `${rankedData.tier} ${rankedData.rank}` : "Unranked",
      winRate: rankedData
        ? `${Math.round(
            (rankedData.wins / (rankedData.wins + rankedData.losses)) * 100
          )}%`
        : "N/A",
      note: post.note || "No note provided",
    };
  } catch (error) {
    console.error("Failed to fetch League of Legends data:", error);
    return null;
  }
};
