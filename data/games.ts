export interface Game {
    name: string;
    showcaseImage: string;
    url: string;
  }
  
  export const games: Game[] = [
    {
      name: "Fortnite",
      showcaseImage: "/assets/fortnite.jpg",
      url: "/fortnite",
    },
    {
      name: "League of Legends",
      showcaseImage: "/assets/league-of-legends.jpg",
      url: "/league-of-legends",
    },
    {
      name: "Valorant",
      showcaseImage: "/assets/valorant.jpg",
      url: "/valorant",
    },
    {
      name: "Counter-Strike 2",
      showcaseImage: "/assets/cs2.webp",
      url: "/cs2",
    },
  ];