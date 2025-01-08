"use client";
import { navLinks } from "@/data/links";
import React, { useState } from "react";
import ColoredLink from "./ColoredLink";
import { ChevronDown } from "lucide-react";

const DropdownLinks = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="lg:hidden block w-full">
      <button onClick={toggleDropdown} className="flex items-center">
        <ChevronDown size={32} />
      </button>
      {isDropdownVisible && (
        <div className="absolute inset-0 pt-24 flex flex-col bg-[#171717]/95 w-full h-[120vh] -z-10">
          <div className="flex flex-col items-center h-full">
            {navLinks.map((link) => (
              <span
                key={link.url}
                onClick={toggleDropdown}
                className="w-full text-xl border-b text-center border-[#2e2e2e] py-6"
              >
                <ColoredLink url={link.url} name={link.name} />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownLinks;
