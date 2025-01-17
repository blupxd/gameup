import GameSection from "@/components/GameSection";
import GameTable from "@/components/GameTable";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-auto flex w-full flex-col ">
      <section className="flex z-10 flex-col py-48 px-4 md:px-20">
        <Hero />
        <GameSection />
        <section className="flex flex-col">
          <h3 className="font-bold my-12 text-2xl md:text-3xl">Latest posts</h3>
          <GameTable
            filters={{
              game: "Any Game",
              rank: "Any Rank",
              gameMode: "Any Gamemode",
              language: "Any Language",
            }}
          />
       
        </section>
      </section>
      <div className="absolute inset-0 -top-32 overflow-hidden">
        <Image
          src="/assets/BG.png"
          alt="Bg"
          quality={100}
          fill
          className="object-cover"
        />
      </div>
    </main>
  );
}
