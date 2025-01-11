export const rankDisplay = (rank: any) => {
    const rankNames = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Elite", "Champion", "Unreal"];
    let rankName = "";

    if (rank >= 0 && rank < rankNames.length - 3) {
        rankName = `${rankNames[Math.floor(rank / 10)]} Rank ${rank % 10 + 1}`;
    } else if (rank >= rankNames.length - 3 && rank < rankNames.length) {
        rankName = `${rankNames[rank]}`;
    } else {
        rankName = "Unknown Rank"
    }

    return `/assets/fortnite/ranked_emblems/${rankName}.png`;
}