"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface LinkProps {
  url: string;
  name: string;
  className?: string;
}

const ColoredLink: React.FC<LinkProps> = ({ url, name, className}) => {
  const pathname = usePathname();
  const getLinkClass = (url: string) => {
    return pathname === url ? "text-[#5AECE5]" : "";
  };
  return <Link href={url} className={`${getLinkClass(url)} ${className}`}>{name}</Link>;
};

export default ColoredLink;
