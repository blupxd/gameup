"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Bell, Check, RefreshCcw, X } from "lucide-react";
interface Invite {
  id: string;
  userId: string;
  postId: string;
  senderId: string;
  message: string;
  createdAt: Date;
  accepted: string;
}

const InviteNotification: React.FC = () => {
  const { data: session } = useSession();
  const [invites, setInvites] = useState<Invite[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const fetchNotifications = async () => {
    if (session?.user) {
      try {
        const response = await fetch(`/api/invites`);
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        console.log(data);
        setInvites(data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
  };
  useEffect(() => {
    fetchNotifications();
    console.log(invites);
  }, [session]);
  const inviteHandler = async (
    invite: string,
    id: string,
    senderId: string,
    inviteId: string
  ) => {
    if (session?.user) {
      try {
        const response = await fetch(`/api/invites`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inviteId,
            postId: id,
            senderId: senderId,
            accepted: invite,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to accept invite");
        }
        fetchNotifications();
      } catch (error) {
        console.error("Error accepting invite:", error);
      }
    }
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative mt-1">
      <button
        onClick={toggleDropdown}
        className="relative max-w-max max-h-max"
      >
        <Bell size={24} />
        {invites.filter((pending) => pending.accepted === "pending").length >
          0 && (
          <span className="absolute -top-2 font-bold -right-2 w-5 h-5 bg-[#5AECE5] text-[#1c1c1c] flex items-center justify-center rounded-full text-xs">
            {invites.filter((pending) => pending.accepted === "pending").length}
          </span>
        )}
      </button>
      {isDropdownOpen && (
        <div className="absolute px-4 py-2 right-0 mt-2 w-64 bg-[#171717]/90 border border-[#707070] flex flex-col items-center rounded shadow-lg">
          <h2 className="text-lg font-semibold">Invites</h2>
          {invites.length > 0 ? (
            <ul className="text-xs max-h-48 overflow-auto scrollbar">
              {invites.map((invite, index) => (
                <li
                  key={index}
                  className={`${
                    !invite.postId &&
                    (invite.accepted === "accepted"
                      ? "bg-gradient-to-r border-l-4 border-[#5AECE5] from-[#54a389] to transparent"
                      : "bg-gradient-to-r border-l-4 border-[#f63737]  from-[#d45757] to transparent")
                  } p-2 flex items-center space-x-2 border-b px-2 border-gray-200`}
                >
                  {invite.message}
                  {invite.accepted === "pending" ? (
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() =>
                          inviteHandler(
                            "accepted",
                            invite.postId,
                            invite.senderId,
                            invite.id
                          )
                        }
                        className="bg-[#44bab4] text-white px-2 py-1 rounded flex items-center"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() =>
                          inviteHandler(
                            "rejected",
                            invite.postId,
                            invite.senderId,
                            invite.id
                          )
                        }
                        className="bg-[#dc3d3d] text-white px-2 py-1 rounded flex items-center"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    invite.postId &&
                    (invite.accepted === "accepted" ? (
                      <p className="text-[#44bab4] font-bold">Accepted</p>
                    ) : (
                      <p className="text-[#dc3d3d] font-bold">Declined</p>
                    ))
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-2">No invites yet</p>
          )}
          <button
            onClick={() => fetchNotifications()}
            className="bg-[#5AECE5] flex items-center justify-center my-2 text-[#1c1c1c] font-semibold rounded w-full text-xs py-1 border border-[#43dfd7]"
          >
            Refresh <RefreshCcw size={16} className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default InviteNotification;
