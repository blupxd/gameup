import React from "react";

interface Link {
  name: string;
  url: string;
}

interface Footer {
  links: Link[];
  terms: Link[];
  socials: Link[];
}

const Footer = () => {
  const footerData: Footer = {
    links: [
      { name: "League Of Legends", url: "/league-of-legends" },
      { name: "Valorant", url: "/valorant" },
      { name: "Fortnite", url: "/fortnite" },
      { name: "CS2", url: "/cs2" },
      { name: "About", url: "/about" },
      { name: "Support Us", url: "/donate" },
      { name: "Help", url: "/help" },
    ],
    terms: [
      { name: "Terms of Privacy", url: "/privacy" },
      { name: "Terms of Service", url: "/terms" },
    ],
    socials: [
      { name: "Instagram", url: "https://instagram.com/matijastefanovic5" },
      { name: "Discord", url: "https://discord.com" },
      { name: "X", url: "https://x.com" },
      { name: "Tiktok", url: "https://tiktok.com" },
    ],
  };

  return (
    <footer className="md:px-20 md:py-10 px-4 py-2 gap-y-16 flex items-start flex-wrap justify-between bg-[#1C1C1C]">
      <div className="flex flex-col gap-y-4 w-96">
        <h1 className="text-lg md:text-2xl font-medium">
          Duo<span className="font-black text-[#5AECE5]">Grind</span>
        </h1>
        <h2 className="text-base font-semibold">© 2025 DuoGrind copyright </h2>
        <p className="text-sm text-[#5AECE5]">
          This platform's stats are not endorsed by the respective game
          developers or publishers and do not reflect the views or opinions of
          any company officially involved in producing or managing video games.
        </p>
      </div>
      {Object.keys(footerData).map((key) => (
        <div key={key} className="flex flex-col gap-y-6 w-48">
          <h3 className="text-lg font-semibold text-[#5AECE5]">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </h3>
          <ul className="text-sm space-y-2">
            {footerData[key as keyof Footer].map((item, index) => (
              <li key={index}>
                <a href={item.url} className="text-white hover:underline">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  );
};

export default Footer;
