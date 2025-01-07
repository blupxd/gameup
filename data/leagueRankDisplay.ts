export const displayRank = (rank:string) => {
    switch (rank) {
        case "IRON": return "/assets/lol/ranked_emblems/Rank=Iron.png";
        case "BRONZE": return "/assets/lol/ranked_emblems/Rank=Bronze.png";
        case "SILVER": return "/assets/lol/ranked_emblems/Rank=Silver.png";
        case "EMERALD": return "/assets/lol/ranked_emblems/Rank=Emerald.png";
        case "GOLD": return "/assets/lol/ranked_emblems/Rank=Gold.png";
        case "PLATINUM": return "/assets/lol/ranked_emblems/Rank=Platinum.png";
        case "DIAMOND": return "/assets/lol/ranked_emblems/Rank=Diamond.png";
        case "MASTER": return "/assets/lol/ranked_emblems/Rank=Master.png";
        case "GRANDMASTER": return "/assets/lol/ranked_emblems/Rank=Grandmaster.png";
        case "CHALLENGER": return "/assets/lol/ranked_emblems/Rank=Challenger.png";
        default: return "/assets/lol/ranked_emblems/Unranked.webp";
    }
}