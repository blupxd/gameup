import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface InviteButtonProps {
  gameName: string;
  toUserId: string;
  postId: string;
}

const InviteButton: React.FC<InviteButtonProps> = ({ gameName, toUserId, postId }) => {
  const { data: session } = useSession();
  const [isInviteSent, setIsInviteSent] = useState(false);

  useEffect(() => {
    const fetchSentInvites = async () => {
      if (session?.user) {
        try {
          const response = await fetch(`/api/invites`);
          if (!response.ok) {
            throw new Error('Failed to fetch sent invites');
          }
          const { sentInvites } = await response.json();
          const hasSentInvite = sentInvites.some((invite: any) => invite.postId === postId);
          setIsInviteSent(hasSentInvite);
        } catch (error) {
          console.error('Error fetching sent invites:', error);
        }
      }
    };

    fetchSentInvites();
  }, [session, postId]);

  const handleInvite = async () => {
    if (session?.user) {
      const inviteMessage = `${session.user.username} wants to play ${gameName} with you`;
      console.log(`Sending invite to user: ${toUserId} with message: ${inviteMessage}`);

      // Post the notification to the backend API
      try {
        const response = await fetch('/api/invites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: session.user.id,
            userId: toUserId,
            postId,
            message: inviteMessage,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to send invite');
        }

        console.log('Invite posted successfully');
        setIsInviteSent(true); // Update the state immediately after a successful response
      } catch (error) {
        console.error('Error posting invite:', error);
      }
    }
  };

  return (
    <button
      onClick={handleInvite}
      className="ml-auto bg-[#865B9E] text-xs flex items-center justify-center text-white px-4 py-2 rounded"
      disabled={isInviteSent}
    >
      {isInviteSent ? "Sent" : "Invite"}
    </button>
  );
};

export default InviteButton;