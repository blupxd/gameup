import response from "./response.json";
import { filterRank } from "./sortValorantRank";
interface PlayerData {
  rank: string[];
  level: number | undefined;
  puuid: string;
  playerCard: string;
}
export const getValorantData = (puuid: string) => {
  const player = response.players.find((player) => player.puuid === puuid);
  const filteredPlayerRank = player ? player.competitiveTier : 0;
  const playerData: PlayerData = {
    rank: filterRank(filteredPlayerRank),
    level: player?.accountLevel,
    puuid: puuid,
    playerCard: player?.playerCard || "",
  };
  return playerData
};
