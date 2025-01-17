export interface Game {
  name: string;
  icon: string;
}

export const games: Game[] = [
  {
    name: "League of Legends",
    icon: "/assets/game_icons/lol.png",
  },
  {
    name: "Valorant",
    icon: "/assets/game_icons/val.png",
  },
  {
    name: "Counter-Strike 2",
    icon: "/assets/game_icons/cs2.png",
  },
  {
    name: "Fortnite",
    icon: "/assets/game_icons/fortnite.webp",
  },
];
