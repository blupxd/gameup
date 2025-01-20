"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import CommentDelete from "./CommentDelete";
import Comment from "./Comment";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  parentId: string | null;
  userId: string;
  author: {
    id: string;
    username: string;
  };
}

const CommentSection: React.FC<{ userId: string }> = ({ userId }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [replyComment, setReplyComment] = useState<string>("");
  const [reply, setReply] = useState<string | null>(null); // Aktivni odgovor
  const [loading, setLoading] = useState<boolean>(true); // Učitavanje komentara
  const [visibleReplies, setVisibleReplies] = useState<{
    [key: string]: boolean;
  }>({});
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null); // State for delete comment

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comment?userId=${userId}`);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [userId]);

  const handlePostComment = useCallback(
    async (replyId?: string) => {
      const content = replyId ? replyComment : newComment;
      if (!content.trim()) return;

      try {
        const response = await fetch("/api/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId + "",
            content,
            parentId: replyId || null,
          }),
        });

        if (!response.ok) throw new Error(await response.text());
        const comment = await response.json();
        setComments((prevComments) => [comment, ...prevComments]); // Dodaj komentar
        if (replyId) {
          setReplyComment(""); // Resetuj polje za odgovor
          setReply(null); // Resetuj odgovor
        } else {
          setNewComment(""); // Resetuj input za novi komentar
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    },
    [newComment, replyComment, userId]
  );
  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch("/api/comment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: commentId }),
      });

      if (!response.ok) throw new Error(await response.text());

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      setDeleteCommentId(null); // Reset delete state
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const toggleReplies = (commentId: string) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // Promeni stanje vidljivosti
    }));
  };

  const renderReplies = (parentId: string, level = 1) => {
    const replies = comments.filter((comment) => comment.parentId === parentId);
    if (!visibleReplies[parentId]) return null;

    return (
      <div
        className="flex flex-col mt-2 space-y-4"
        style={{ marginLeft: `${level * 15}px` }}
      >
        {replies.map((rep) => (
          <div
            key={rep.id}
            className="relative flex space-x-4 space-y-2"
            style={{ marginLeft: `${level * 10}px` }}
          >
            <div className="absolute w-[10px] h-full -left-[10px] top-0 border-l border-b border-[#383838]" />
            {/* Sadržaj odgovora */}
            <Comment
              key={rep.id}
              comment={rep}
              comments={comments}
              handlePostComment={handlePostComment}
              renderReplies={renderReplies}
              reply={reply}
              replyComment={replyComment}
              session={session}
              setDeleteCommentId={setDeleteCommentId}
              setReply={setReply}
              setReplyComment={setReplyComment}
              toggleReplies={toggleReplies}
              visibleReplies={visibleReplies}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full lg:w-[40%]">
      <h1 className="text-xl font-bold">Impressions</h1>
      <div className="mt-4 flex flex-col space-y-4 rounded border border-[#303030] p-4 bg-[#1e1e1e]">
        {loading ? (
          <p className="text-gray-400">Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map(
            (comment) =>
              comment.parentId === null && (
                <Comment
                  key={comment.id}
                  comment={comment}
                  comments={comments}
                  handlePostComment={handlePostComment}
                  renderReplies={renderReplies}
                  reply={reply}
                  replyComment={replyComment}
                  session={session}
                  setDeleteCommentId={setDeleteCommentId}
                  setReply={setReply}
                  setReplyComment={setReplyComment}
                  toggleReplies={toggleReplies}
                  visibleReplies={visibleReplies}
                />
              )
          )
        ) : (
          <p className="text-gray-400">Be the first to comment</p>
        )}
      </div>
      {session && (
        <div className="mt-4 text-xs flex flex-col space-y-2">
          <textarea
            className="w-full focus:outline-none focus:border-[#5b5b5b] p-2 rounded border border-[#303030] bg-[#1e1e1e] text-white"
            rows={1}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button
            className="text-xs w-full md:max-w-max px-4 self-end py-2 md:py-1 mt-2 max-h-max border rounded border-[#4cc2bc] bg-[#55c2bd]"
            onClick={() => handlePostComment()}
          >
            Post Comment
          </button>
        </div>
      )}
      {deleteCommentId && (
        <CommentDelete
          commentId={deleteCommentId}
          onDelete={handleDeleteComment}
          onCancel={() => setDeleteCommentId(null)}
        />
      )}
    </div>
  );
};

export default CommentSection;
