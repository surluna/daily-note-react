"use client";
import { useState } from "react";
import Link from "next/link";
import "@/style.css";
const Header = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Notes", path: "/notes" },
    { name: "Create", path: "/create" },
    { name: "About", path: "/about" },
  ];
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <nav className="fixed right-0 top-0 z-50 w-full h-16 bg-[#6f493d] flex items-center justify-end text-[#e3be86]">
      <ul className="flex space-x-12 pr-12">
        {navItems.map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(index)}
            className={`cursor-pointer font-semibold transition ${
              selectedIndex === index ? "underline" : ""
            }`}
          >
            <Link href={item.path} className="text-[#e3be86] font-semibold">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Header;
