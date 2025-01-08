export const checkGame = (gameName: string) => {
  switch (gameName) {
    case "League of Legends":
      return "/assets/game_icons/lol.png";
    case "Valorant":
      return "/assets/game_icons/val.png";
    case "Fortnite":
      return "/assets/game_icons/fortnite.webp";
    default:
      return "/assets/game_icons/cs2.png";
  }
};
