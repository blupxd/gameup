import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CommentProps {
  session: any;
  comment: {
    id: string;
    author: {
      username: string;
      id: string;
    };
    content: string;
    createdAt: string;
    userId: string;
  };
  renderReplies: (commentId: string) => React.ReactNode;
  comments: Array<{
    id: string;
    parentId: string | null;
  }>;
  visibleReplies: { [key: string]: boolean };
  reply: string | null;
  setReplyComment: (value: string) => void;
  replyComment: string;
  setReply: (value: string | null) => void;
  setDeleteCommentId: (value: string) => void;
  toggleReplies: (commentId: string) => void;
  handlePostComment: (commentId: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  session,
  comment,
  renderReplies,
  comments,
  visibleReplies,
  reply,
  setReplyComment,
  replyComment,
  setReply,
  setDeleteCommentId,
  toggleReplies,
  handlePostComment,
}) => {
  return (
    <div key={comment.id} className="flex flex-col leading-4">
      <div className="flex items-center space-x-2">
        <Link href={`/profile/${comment.author.username}`}
          className={`font-bold hover:underline flex items-center ${
            session?.user.username === comment.author.username &&
            "text-[#5AECE5]"
          }`}
        >
          {comment.author.username}
          {session?.user.username === comment.author.username && (
            <span className="text-sm ml-1 font-normal">(You)</span>
          )}
        </Link>
        <p className="text-sm text-gray-400">
          {formatDistanceToNow(new Date(comment.createdAt))} ago
        </p>
      </div>
      <p>{comment.content}</p>
      <div className="flex items-center mt-1 space-x-2">
        {reply === comment.id ? (
          <div className="mt-4 flex flex-col space-y-2 w-full">
            <textarea
              className="w-full focus:outline-none focus:border-[#5b5b5b] p-2 rounded border border-[#303030] bg-[#1e1e1e] text-white"
              rows={1}
              value={replyComment}
              onChange={(e) => setReplyComment(e.target.value)}
              placeholder="Write a reply..."
            />
            <div className="flex justify-end space-x-2">
              <button
                className="text-sm max-w-max px-6 py-1 mt-2 max-h-max border rounded border-[#303030] bg-[#252525]"
                onClick={() => setReply(null)}
              >
                Cancel
              </button>
              <button
                className="text-sm max-w-max px-6 py-1 mt-2 max-h-max border rounded border-[#4cc2bc] bg-[#55c2bd]"
                onClick={() => handlePostComment(comment.id)}
              >
                Post Reply
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4 text-sm text-[#bebebe]">
            <button
              className="hover:underline"
              onClick={() => setReply(comment.id)}
            >
              Reply
            </button>
            {comments.some((c) => c.parentId === comment.id) && (
              <button
                className="hover:underline"
                onClick={() => toggleReplies(comment.id)}
              >
                {visibleReplies[comment.id] ? "Hide Replies" : "Show Replies"}
              </button>
            )}
            {(session?.user.id === comment.author.id ||
              session?.user.id === comment.userId) && (
              <button
                className="flex items-center hover:underline"
                onClick={() => setDeleteCommentId(comment.id)}
              >
                Delete <Trash2 size={16} className="ml-1" />
              </button>
            )}
          </div>
        )}
      </div>
      {renderReplies(comment.id)}
    </div>
  );
};

export default Comment;
