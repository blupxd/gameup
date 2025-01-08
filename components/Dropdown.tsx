"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface DropdownProps {
  items: string[];
  placeholder: string;
  className?: string;
  icon?: React.ReactNode; // Updated type to React.ReactNode
  onSelect: (selectedItem: string) => void;
  overflown?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ items, placeholder, overflown, icon, onSelect, className }) => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const handleSelect = (item: string) => {
    setSelectedText(item);
    onSelect(item);
    setOpen(false);
  };

  return (
    <div className={`relative flex text-sm z-20 flex-col ${className}`}>
      <div
        onClick={() => setOpen(!open)}
        className="px-6 cursor-pointer py-2 border rounded border-[#707070] bg-[#171717] flex items-center"
      >
        {icon && <span className="mr-2">{icon}</span>} {/* Render the icon */}
        {selectedText ? selectedText : placeholder}
        <ChevronDown
          size={16}
          className={`ml-auto ${
            open && "rotate-180"
          } transition-all duration-200 ease-in-out`}
        />
      </div>
      {open && (
        <ul className={`h-32 ${overflown ? "absolute" : "lg:absolute"} top-full w-full max-h-max overflow-auto bg-[#171717]/95 scrollbar`}>
          {items.map((item: string, idx: number) => (
            <li
              onClick={() => handleSelect(item)}
              key={idx}
              className="px-6 transition-color duration-150 ease-in-out cursor-pointer hover:bg-[#363535] py-1.5"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
