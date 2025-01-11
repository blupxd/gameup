import { X } from "lucide-react";
import React, { useEffect } from "react";
import PostForm from "../form/PostForm";

interface Session {
  user: {
    id: string;
    riotId: string;
    steamid: string;
    epicId: string;
    username: string;
  };
}
interface PopUpProps {
  setCreatePost: (value: boolean) => void;
  session: Session | null;
  gameName: string;
  playerData: any;
}

const PostPopUp: React.FC<PopUpProps> = ({
  setCreatePost,
  session,
  gameName,
  playerData,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="bg-black/70 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-[#1E1E1E] w-[550px] rounded border border-[#171717]">
        <div className="px-4 py-2 border-b border-[#171717] flex justify-between items-center">
          <h1 className="font-bold md:text-lg lg:text-xl">
            Post that you are looking for a partner
          </h1>
          <button onClick={() => setCreatePost(false)} className="text-sm">
            <X />
          </button>
        </div>
        {(session?.user.riotId || session?.user.epicId) && session?.user.id ? (
          <div>
            <PostForm
              onCreatePost={setCreatePost}
              playerData={playerData}
              game={gameName}
              session={session}
            />
          </div>
        ) : (
          <div>Connect your account to post</div>
        )}
      </div>
    </div>
  );
};

export default PostPopUp;
