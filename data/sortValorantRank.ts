export const filterRank = (rank: number) => {
    switch (rank) {
        case 3: return ["Iron 1", "/assets/valorant/ranked_emblems/Iron_1_Rank.png"];
        case 4: return ["Iron 2", "/assets/valorant/ranked_emblems/Iron_2_Rank.png"];
        case 5: return ["Iron 3", "/assets/valorant/ranked_emblems/Iron_3_Rank.png"];
        case 6: return ["Bronze 1", "/assets/valorant/ranked_emblems/Bronze_1_Rank.png"];
        case 7: return ["Bronze 2", "/assets/valorant/ranked_emblems/Bronze_2_Rank.png"];
        case 8: return ["Bronze 3", "/assets/valorant/ranked_emblems/Bronze_3_Rank.png"];
        case 9: return ["Silver 1", "/assets/valorant/ranked_emblems/Silver_1_Rank.png"];
        case 10: return ["Silver 2", "/assets/valorant/ranked_emblems/Silver_2_Rank.png"];
        case 11: return ["Silver 3", "/assets/valorant/ranked_emblems/Silver_3_Rank.png"];
        case 12: return ["Gold 1", "/assets/valorant/ranked_emblems/Gold_1_Rank.png"];
        case 13: return ["Gold 2", "/assets/valorant/ranked_emblems/Gold_2_Rank.png"];
        case 14: return ["Gold 3", "/assets/valorant/ranked_emblems/Gold_3_Rank.png"];
        case 15: return ["Platinum 1", "/assets/valorant/ranked_emblems/Platinum_1_Rank.png"];
        case 16: return ["Platinum 2", "/assets/valorant/ranked_emblems/Platinum_2_Rank.png"];
        case 17: return ["Platinum 3", "/assets/valorant/ranked_emblems/Platinum_3_Rank.png"];
        case 18: return ["Diamond 1", "/assets/valorant/ranked_emblems/Diamond_1_Rank.png"];
        case 19: return ["Diamond 2", "/assets/valorant/ranked_emblems/Diamond_2_Rank.png"];
        case 20: return ["Diamond 3", "/assets/valorant/ranked_emblems/Diamond_3_Rank.png"];
        case 21: return ["Ascendent 1", "/assets/valorant/ranked_emblems/Ascendent_1_Rank.png"];
        case 22: return ["Ascendent 2", "/assets/valorant/ranked_emblems/Ascendent_2_Rank.png"];
        case 23: return ["Ascendent 3", "/assets/valorant/ranked_emblems/Ascendent_3_Rank.png"];
        case 24: return ["Immortal 1", "/assets/valorant/ranked_emblems/Immortal_1_Rank.png"];
        case 25: return ["Immortal 2", "/assets/valorant/ranked_emblems/Immortal_2_Rank.png"];
        case 26: return ["Immortal 3", "/assets/valorant/ranked_emblems/Immortal_3_Rank.png"];
        case 27: return ["Radiant", "/assets/valorant/ranked_emblems/Radiant_Rank.png"];
        default: return ["Unranked", "/assets/valorant/ranked_emblems/Unranked.png"];
    }
    }