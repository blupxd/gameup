export const sortRank = (rank: number) => {
  if (rank <= 4999) return ["/assets/cs2/ranked_emblems/0-4999.png", '#83b0f7'];
  else if (rank >= 5000 && rank <= 9999)
    return ["/assets/cs2/ranked_emblems/5000-9999.png", '#61c7fa'];
  else if (rank >= 10000 && rank <= 14999)
    return ["/assets/cs2/ranked_emblems/10000-14999.png", '#3845ff']
  else if (rank >= 15000 && rank <= 19999)
    return ["/assets/cs2/ranked_emblems/15000-19999.png", '#8838ff'];
  else if (rank >= 20000 && rank <= 24999)
    return ["/assets/cs2/ranked_emblems/20000-24999.png", '#ef33f2'];
  else if (rank >= 25000 && rank <= 29999)
    return ["/assets/cs2/ranked_emblems/25000-29999.png", '#fc384b'];
  else if (rank >= 30000) return ["/assets/cs2/ranked_emblems/30000.png", '#f7d423'];
};
