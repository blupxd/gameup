"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Bell, RefreshCcw } from "lucide-react";

const InviteNotification: React.FC = () => {
  const { data: session } = useSession();
  const [invites, setInvites] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fetchNotifications = async () => {
    if (session?.user) {
      try {
        const response = await fetch(`/api/invites`);
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const { notifications } = await response.json();
        setInvites(notifications.map((invite: any) => invite.message));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, [session]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="relative max-w-max max-h-max "
      >
        <Bell size={32} />
        {invites.length > 0 && (
          <span className="absolute -top-2 font-bold -right-2 w-5 h-5 bg-[#5AECE5] text-[#1c1c1c] flex items-center justify-center rounded-full text-xs">
            {invites.length}
          </span>
        )}
      </button>
      {isDropdownOpen && (
        <div className="absolute px-4 py-2 right-0 mt-2 w-64 bg-[#171717]/90 border border-[#707070] flex flex-col items-center rounded shadow-lg">
          <h2 className="text-lg font-semibold">Invites</h2>
          {invites.length > 0 ? (
            <ul className="text-xs">
              {invites.map((invite, index) => (
                <li key={index} className="p-2 border-b border-gray-200">
                  {invite}
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
