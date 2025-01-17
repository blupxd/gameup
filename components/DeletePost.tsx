"use client";
import { useAppStore } from "@/store/useStore";
import { Loader, Trash } from "lucide-react";
import { useState } from "react";

interface DeletePostProps {
  postId: string;
}

const DeletePost: React.FC<DeletePostProps> = ({ postId }) => {
  const triggerSignal = useAppStore((state) => state.triggerSignal);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/post`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
        }),
      });

      if (response.ok) {
        triggerSignal();
        console.log("Post deleted successfully");
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("An error occurred while deleting the post", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="ml-auto bg-[#f43f3f] hover:bg-[#ae3d33] transition-all duration-300 ease-in-out text-xs flex items-center justify-center text-white px-4 py-2 rounded"
    >
      {isDeleting ? (
        <Loader size={16} className="animate-spin" />
      ) : (
        <Trash size={16} />
      )}
    </button>
  );
};
export default DeletePost;
