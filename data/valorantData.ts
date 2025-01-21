import response from "./valResponse.json";
import { filterRank } from "./sortValorantRank";
interface PlayerData {
  rank: string[];
  level: number | undefined;
  puuid: string;
  playerCard: string;
  wins: number;
  losses: number;
}
export const getValorantData = (puuid: string) => {
  const player = response.players.find((player) => player.puuid === puuid);
  const filteredPlayerRank = player ? player.competitiveTier : 0;
  const playerData: PlayerData = {
    rank: filterRank(filteredPlayerRank),
    level: player?.accountLevel,
    puuid: puuid,
    playerCard: player?.playerCard || "",
    wins: 50,
    losses: 42,
  };
  return playerData;
};

const agentCache = new Map<string, { agent: string; icon: string }>();
const mapCache = new Map<string, { displayName: string; splash: string }>();

const getCharacterById = async (characterId: string) => {
  if (agentCache.has(characterId)) {
    return agentCache.get(characterId);
  }

  try {
    const response = await fetch(
      `https://valorant-api.com/v1/agents/${characterId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data for characterId: ${characterId}`);
    }

    const data = await response.json();
    const result = {
      agent: data.data.displayName,
      icon: data.data.displayIcon,
    };
    agentCache.set(characterId, result); // Keširaj rezultat
    return result;
  } catch (error) {
    console.error(error);
    return { agent: "Unknown", icon: "" }; // Default vrednosti u slučaju greške
  }
};
const getMap = async (mapId: string) => {
  if (mapCache.has(mapId)) {
    return mapCache.get(mapId);
  }

  try {
    const response = await fetch("https://valorant-api.com/v1/maps");
    if (!response.ok) {
      throw new Error(`Failed to fetch data for mapId: ${mapId}`);
    }

    const data = await response.json();
    const mapa = data.data.find((map: any) => map.mapUrl === mapId);
    const result = {
      displayName: mapa.displayName,
      splash: mapa.splash,
    };
    mapCache.set(mapId, result); // Keširaj rezultat
    return result;
  } catch (error) {
    console.error(error);
    return { displayName: "Unknown", splash: "" }; // Default vrednosti u slučaju greške
  }
};
export const getPlayerMatchStats = async (
  match: any,
  gameName: string,
  tagLine: string
) => {
  const player = match.players.find(
    (player: any) => player.gameName === gameName && player.tagLine === tagLine
  );
  if (!player) {
    return null;
  }

  let totalDamage = 0;
  let totalHeadshots = 0;
  let totalRounds = 0;
  let totalScore = 0;

  match.roundResults.forEach((round: any) => {
    const playerStats = round.playerStats.find(
      (stats: any) => stats.puuid === player.puuid
    );
    if (playerStats) {
      totalDamage += playerStats.damage.reduce(
        (acc: any, dmg: any) => acc + dmg.damage,
        0
      );
      totalHeadshots += playerStats.damage.reduce(
        (acc: any, hs: any) => acc + hs.headshots,
        0
      );
      totalScore += playerStats.score;
      totalRounds += 1;
    }
  });
  const participants = await Promise.all(
    match.players.map(async (player: any) => ({
      gameName: player.gameName,
      tagLine: player.tagLine,
      teamId: player.teamId,
      characterInfo: await getCharacterById(player.characterId),
    }))
  );
  const hsPercentage = totalRounds ? Number(((totalHeadshots / totalRounds) * 100).toFixed(1)) : 0;
  const adr = totalRounds ? Number((totalDamage / totalRounds).toFixed(1)) : 0;
  const averageScore = totalRounds ? Number((totalScore / totalRounds).toFixed(1)) : 0;
  console.log(hsPercentage, adr, averageScore);
  const characterInfo = await getCharacterById(player.characterId);
  const mapInfo = await getMap(match.matchInfo.mapId);
  return {
    kills: player.stats.kills,
    deaths: player.stats.deaths,
    assists: player.stats.assists,
    win: match.teams.find((team: any) => team.won)?.teamId === player.teamId,
    characterInfo,
    mapInfo,
    hsPercentage,
    adr,
    averageScore,
    participants
  };
};


