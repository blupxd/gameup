export function calculateRank(stats: any) {
  const ranks = [
    "Bronze 1",
    "Bronze 2",
    "Bronze 3",
    "Silver 1",
    "Silver 2",
    "Silver 3",
    "Gold 1",
    "Gold 2",
    "Gold 3",
    "Platinum 1",
    "Platinum 2",
    "Platinum 3",
    "Diamond 1",
    "Diamond 2",
    "Diamond 3",
    "Elite",
    "Champion",
    "Unreal",
  ];

  // Weight multipliers for each stat
  const weights = {
    score: 0.78,
    killsPerMatch: 0.5,
    winRate: 0.65,
    outlivedPlayers: 0.4,
  };

  const {
    score = 0,
    matches = 1, // Prevent division by zero
    killsPerMatch = 0,
    winRate = 0,
    playersOutlived = 0,
  } = stats;

  // Scale winRate into a 0-1 range (max 50%)
  const scaledWinRate = Math.min(winRate / 50, 1);

  // Adjust criteria for matches played using ln
  const matchFactor =
    matches <= 1
      ? 0 // Avoid log(0) issues
      : Math.min(Math.log(matches) / Math.log(250), 1); // ln(matches) scaled to 120 as baseline

  // Calculate weighted score
  const weightedScore =
    Math.min(score / 252000, 1) * weights.score * matchFactor +
    Math.min(killsPerMatch / 10, 1) * weights.killsPerMatch * matchFactor +
    scaledWinRate * weights.winRate * matchFactor +
    Math.min(playersOutlived / (matches * 99), 1) *
      weights.outlivedPlayers *
      matchFactor;

  // Map weightedScore to a rank
  const rankIndex = Math.min(
    Math.floor(weightedScore * ranks.length),
    ranks.length - 1
  );
  console.log(rankIndex, weightedScore);
  console.log(ranks[rankIndex]);
  return ranks[rankIndex];
}
