"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import TextInput from "@/components/form/TextInput";
import Dropdown from "../Dropdown";
import { fnGM, lolGM, valGM } from "@/data/gamemodes";
import { Earth } from "lucide-react";
import { languages } from "@/data/languages";
import Image from "next/image";
import { displayRank } from "@/data/leagueRankDisplay";
import ToggleSwitch from "./ToggleSwitch";
import { useAppStore } from "@/store/useStore";

interface Session {
  user: {
    id: string;
    riotId: string;
    username: string;
    steamid: string;
    epicId: string;
  };
}

interface PostFormProps {
  onCreatePost: (value: boolean) => void;
  game: string;
  session: Session | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  playerData: any;
}

const PostForm: React.FC<PostFormProps> = ({
  game,
  session,
  playerData,
  onCreatePost,
}) => {
  const [selectedMode, setSelectedMode] = useState<string[]>([]);
  const triggerSignal = useAppStore((state) => state.triggerSignal);
  const [language, setLanguage] = useState<string>("Any Language");
  const methods = useForm({
    defaultValues: {
      id: session?.user.id || "",
      game: game || "",
      gameUsername: session?.user.riotId || "",
      gameMode: "",
      rank: "",
      rankIcon: "",
      winRate: "N/A",
      language: "Any Language",
      microphone: false,
      note: "",
    },
  });

  const getRankedData = () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    playerData?.rankedData?.find(
      (data: any) => data.queueType === selectedMode[1]
    );
  console.log(playerData);
  const rankedData = getRankedData();
  const checkWhichGame = () => {
    switch (game) {
      case "League of Legends":
        return {
          name: "League of Legends",
          modes: lolGM,
          gameIcon: "/assets/game_icons/lol.png",
          playerName: session?.user.riotId,
          profileIcon: playerData?.data?.profileIconId
            ? `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${playerData.data.profileIconId}.png`
            : "/images/default-lol-icon.png", // Default LOL ikonica
          level: playerData?.data?.summonerLevel,
          rankIcon: displayRank(rankedData?.tier),
          rank: rankedData
            ? `${rankedData?.tier} ${rankedData?.rank}`
            : "Unranked",
          winRate: (
            (rankedData?.wins / (rankedData?.wins + rankedData?.losses)) *
            100
          ).toFixed(1),
        };
      case "Valorant":
        return {
          name: "Valorant",
          modes: valGM,
          gameIcon: "/assets/game_icons/valorant.png",
          playerName: session?.user.riotId,
          profileIcon: playerData?.playerCard
            ? `https://media.valorant-api.com/playercards/${playerData.playerCard}/smallart.png`
            : "/images/default-valorant-icon.png",
          level: playerData?.level,
          rankIcon: playerData?.rank[1],
          rank: playerData?.rank[0],
          winRate: (
            playerData?.wins /
            (playerData?.wins + playerData?.losses)
          ).toFixed(1),
        };
      case "Fortnite":
        return {
          name: "Fortnite",
          modes: fnGM,
          gameIcon: "/assets/game_icons/fortnite.webp",
          playerName: session?.user.epicId.split("-+")[0],
          profileIcon: playerData?.icon,
          level: playerData?.level,
          rankIcon: `/assets/fortnite/ranked_emblems/${playerData?.rank}.png`,
          rank: playerData?.rank,
          winRate: playerData?.winRate,
        };
      default:
        return { name: "", modes: [], profileIcon: "/images/default-icon.png" }; // Opšta default ikonica
    }
  };

  const { name, profileIcon, level,playerName,gameIcon, rank, rankIcon, modes, winRate } =
    checkWhichGame();
  useEffect(() => {
    methods.setValue("gameMode", selectedMode[0]);
    methods.setValue("language", language);
    methods.setValue("rank", rank);
    methods.setValue("rankIcon", rankIcon);
    methods.setValue("winRate", winRate + "");
  }, [selectedMode, language, rank, rankIcon, winRate]);
  useEffect(() => {
    setSelectedMode(modes[0]);
    methods.setValue("gameMode", selectedMode[0]);
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log(data);
    if (data.gameMode === "") setSelectedMode(modes[0]);
    if (session?.user.id) {
      try {
        const response = await fetch("/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        onCreatePost(false);
        triggerSignal();
        if (!response.ok) throw new Error("Failed to register");
      } catch (error: unknown) {
        console.error(error);
      }
    } else console.log("You are not authorized to create a post");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col px-4 py-6 text-sm"
      >
        <div className="max-h-[40vh] overflow-y-auto scrollbar">
          <div className="flex justify-between items-start">
            <div className="flex flex-col max-w-max">
              <h1 className="mb-2">Game</h1>
              <div className="px-4 text-sm py-2 border rounded border-[#707070] bg-[#171717] flex items-center">
                <Image src={gameIcon + ""} alt="game_icon" width={15} height={15} className="mr-2 max-w-max"/> {name}
              </div>
            </div>
            <div className="flex flex-col  max-w-max">
              <h1 className="mb-2">Gamemode</h1>
              <Dropdown
              className="w-52"
                overflown={true}
                items={modes.map((mode) => mode[0])}
                placeholder={modes[0][0]}
                onSelect={(value) =>
                  setSelectedMode(
                    modes.find((mode) => mode[0] === value) || modes[0]
                  )
                }
              />
            </div>
          </div>
          {playerData && (
            <div className="flex flex-col md:flex-row items-start md:space-y-0 space-y-6 md:space-x-12 my-6 lg:my-4">
              <div className="flex items-start space-x-4">
                <div className="rounded-full relative w-16 h-16 border-2 overflow-hidden border-white">
                  <Image
                    src={profileIcon || ""}
                    alt="Profile Icon"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-white">
                    {playerName}
                  </h1>
                  <h2 className="text-sm font-bold text-[#5AECE5]">
                    Level {level}
                  </h2>
                  <button className="px-6 max-w-max py-0.5 text-sm mt-1 rounded font-bold bg-[#E82D2D]">
                    Change
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold">
                  {modes.find((mode) => mode[1] === selectedMode[1])?.[0] ||
                    modes[0][0]}
                </h1>
                <div className="flex items-center space-x-2">
                  <Image
                    src={rankIcon}
                    alt="Rank"
                    width={35}
                    height={35}
                    className="lg:w-16 w-10 h-auto lg:h-auto"
                  />
                  <h1 className="font-semibold text-lg md:text-sm">{rank}</h1>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col max-w-max">
            <h1 className="mb-2">Select prefered language</h1>
            <Dropdown
              overflown={true}
              onSelect={setLanguage}
              icon={<Earth size={16} />}
              placeholder="Any Language"
              items={languages}
            />
          </div>
          <div className="flex flex-col max-w-max my-4">
            <h1 className="mb-2">Microphone</h1>
            <ToggleSwitch
              onToggle={(value: boolean) =>
                methods.setValue("microphone", value)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <TextInput
              name="note"
              label="Leave a note"
              placeholder="Write something what you’re looking for in a partner"
              type="text"
            />
            <p className="text-[#D28585]">
              Any verbal offense or sexual harassment may lead to legal
              consequences if reported!
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="mt-12 bg-[#5AECE5] border-2 border-[#5b9e9b] text-[#1c1c1c] font-bold py-1.5 px-4 rounded"
        >
          Create Post
        </button>
      </form>
    </FormProvider>
  );
};

export default PostForm;
