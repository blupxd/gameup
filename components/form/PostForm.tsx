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
  playerData: any;
}

const PostForm: React.FC<PostFormProps> = ({
  game,
  session,
  playerData,
  onCreatePost,
}) => {
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [language, setLanguage] = useState<string>("Any Language");
  const methods = useForm({
    defaultValues: {
      id: session?.user.id || "",
      game: game || "",
      gameUsername: session?.user.riotId || "",
      gameMode: "",
      language: "Any Language",
      microphone: false,
      note: "",
    },
  });

  useEffect(() => {
    methods.setValue("gameMode", selectedMode);
    methods.setValue("language", language);
  }, [selectedMode, language]);
  const getRankedData = () =>
    playerData?.rankedData?.find(
      (data: any) => data.queueType === selectedMode
    );

  const rankedData = getRankedData();
  const checkWhichGame = () => {
    switch (game) {
      case "League of Legends":
        return {
          name: "League of Legends",
          modes: lolGM,
          profileIcon: playerData?.data?.profileIconId
            ? `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${playerData.data.profileIconId}.png`
            : "/images/default-lol-icon.png", // Default LOL ikonica
          level: playerData?.data?.summonerLevel,
          rankIcon: displayRank(rankedData?.tier),
          rank: rankedData
            ? `${rankedData?.tier} ${rankedData?.rank}`
            : "Unranked",
        };
      case "Valorant":
        return {
          name: "Valorant",
          modes: valGM,
          profileIcon: playerData?.playerCard
            ? `https://media.valorant-api.com/playercards/${playerData.playerCard}/smallart.png`
            : "/images/default-valorant-icon.png",
          level: playerData?.level,
          rankIcon: playerData?.rank[1],
          rank: playerData?.rank[0],
        };
      case "Fortnite":
        return {
          name: "Fortnite",
          modes: fnGM,
          profileIcon: playerData?.playerCard
            ? `https://media.valorant-api.com/playercards/${playerData.playerCard}/smallart.png`
            : "/images/default-fn-icon.png", // Default FN ikonica
          level: playerData?.level,
          rankIcon: "",
          rank: "",
        };
      case "CS2":
        return {
          name: "CS2",
          modes: [],
          profileIcon: "/images/default-cs2-icon.png",
          level: playerData?.level,
          rankIcon: "",
          rank: "",
        };
      default:
        return { name: "", modes: [], profileIcon: "/images/default-icon.png" }; // Opšta default ikonica
    }
  };

  const { name, profileIcon, level, rank, rankIcon, modes } = checkWhichGame();
  useEffect(() => {
    setSelectedMode(modes[0][1]);
    methods.setValue("gameMode", selectedMode);
  }, []);
  const onSubmit = async (data: any) => {
    console.log(data);
    if (data.gameMode === "") setSelectedMode(modes[0][1]);
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
              <div className="px-6 text-sm py-2 border rounded border-[#707070] bg-[#171717] flex items-center">
                {name}
              </div>
            </div>
            <div className="flex flex-col  max-w-max">
              <h1 className="mb-2">Gamemode</h1>
              <Dropdown
                overflown={true}
                items={modes.map((mode) => mode[0])}
                placeholder={modes[0][0]}
                onSelect={(value) =>
                  setSelectedMode(
                    modes.find((mode) => mode[0] === value)?.[1] || modes[0][1]
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
                    {session?.user.riotId}
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
                  {modes.find((mode) => mode[1] === selectedMode)?.[0] ||
                    modes[0][0]}
                </h1>
                <div className="flex items-center space-x-2">
                  <Image
                    src={rankIcon}
                    alt="Rank"
                    width={70}
                    height={70}
                    className="lg:w-16 w-10 h-10 lg:h-16"
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
