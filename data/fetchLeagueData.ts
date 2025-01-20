import queueIds from "./queueIds.json";
import summonerSpells from "./summonerSpells.json";
import leagueRunes from "./leagueRunes.json";
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

export const fetchGameIds = async (regionalRoute: string, puuid: string) => {
  const apiUrl = `https://${regionalRoute}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=3&api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) {
      console.error(
        `Failed to fetch game ids. Status: ${res.status} - ${res.statusText}`
      );
      throw new Error(`Failed to fetch game ids: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching game ids at URL:", apiUrl, error);
    throw error;
  }
};
const fetchGameDetails = async (regionalRoute: string, gameId: string) => {
  const apiUrl = `https://${regionalRoute}.api.riotgames.com/lol/match/v5/matches/${gameId}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) {
      console.error(
        `Failed to fetch game details. Status: ${res.status} - ${res.statusText}`
      );
      throw new Error(`Failed to fetch game details: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching game details at URL:", apiUrl, error);
    throw error;
  }
};

export const fetchMultipleGameDetails = async (
  regionalRoute: string,
  gameIds: string[]
) => {
  const gameDetailsPromises = gameIds.map((gameId) =>
    fetchGameDetails(regionalRoute, gameId)
  );
  try {
    const gameDetails = await Promise.all(gameDetailsPromises);
    return gameDetails;
  } catch (error) {
    console.error("Error fetching multiple game details", error);
    throw error;
  }
};
export const getSummonerDetails = (
  match: any,
  riotIdGameName: string,
  riotIdTagline: string
) => {
  const summoner = match.participants.find(
    (participant: any) =>
      participant.riotIdGameName === riotIdGameName &&
      participant.riotIdTagline === riotIdTagline
  );
  if (!summoner) return null;
  return {
    summonerSpells: {
      spell1: summoner.summoner1Id,
      spell2: summoner.summoner2Id,
    },
    firstRune: summoner.perks.styles[0].selections[0].perk,
    secondRune: summoner.perks.styles[1].style,
    cs: summoner.totalMinionsKilled,
    champLevel: summoner.champLevel,
    kills: summoner.kills,
    deaths: summoner.deaths,
    assists: summoner.assists,
    items: [
      summoner.item0,
      summoner.item1,
      summoner.item2,
      summoner.item3,
      summoner.item4,
      summoner.item5,
      summoner.item6,
    ],
    win: summoner.win,
    lane: summoner.teamPosition,
    team: summoner.teamId,
    championName: summoner.championName,
  };
};
export const getQueueDetails = (queueId: number) => {
  const queue = queueIds.find((queue) => queue.queueId === queueId);
  if (!queue) {
    throw new Error(`Queue with ID ${queueId} not found.`);
  }
  return queue;
};
export const getRuneDetails = (runeId: number) => {
  // Funkcija za rekurzivno pretragu runa
  const findRune = (trees: any[]): any => {
    for (let tree of trees) {
      if (tree.id === runeId) {
        return tree;
      }
      for (let slot of tree.slots) {
        const rune = slot.runes.find((rune: any) => rune.id === runeId);
        if (rune) {
          return rune;
        }
      }
    }

    return undefined;
  };
  const rune = findRune(leagueRunes);

  if (!rune) {
    throw new Error(`Rune with ID ${runeId} not found.`);
  }

  return rune;
};

export const getSummonerSpellDetails = (summonerSpellId: number) => {
  const summonerSpell = Object.values(summonerSpells).find(
    (spell: any) => spell.key == summonerSpellId
  );

  if (!summonerSpell) {
    throw new Error(`Summoner spell with ID ${summonerSpellId} not found.`);
  }

  return summonerSpell;
};
