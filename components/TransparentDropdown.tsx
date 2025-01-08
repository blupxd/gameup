"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface DropdownProps {
  items: string[];
  placeholder: string;
  icon?: React.ReactNode; // Updated type to React.ReactNode
  onSelect: (selectedItem: string) => void;
}

const TransparentDropdown: React.FC<DropdownProps> = ({ items, placeholder, icon, onSelect }) => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleSelect = (item: string) => {
    setSelectedText(item);
    onSelect(item);
    setOpen(false);
  };

  return (
    <div className="relative flex text-lg xl:text-2xl flex-col w-full">
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex font-bold items-center"
      >
        {icon && <span className="mr-2">{icon}</span>} {/* Render the icon */}
        {selectedText ? selectedText : placeholder}
        <ChevronDown
          size={24}
          className={`ml-auto ${
            open && "rotate-180"
          } transition-all duration-200 ease-in-out`}
        />
      </div>
      {open && (
        <ul className="h-32 absolute top-full w-full max-h-max overflow-auto bg-[#171717] scrollbar">
          {items.map((item: string, idx: number) => (
            <li
              onClick={() => handleSelect(item)}
              key={idx}
              className="px-6 text-lg transition-color duration-150 ease-in-out cursor-pointer hover:bg-[#363535] py-1.5"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransparentDropdown;
