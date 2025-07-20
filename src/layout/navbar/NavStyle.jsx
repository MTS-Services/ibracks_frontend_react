import React from "react";
import { FiMenu, FiSearch, FiUser } from "react-icons/fi";

const NavStyle = () => {
  return (
    <header className="bg-black">
      <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between py-4 lg:px-32">
        {/* Logo */}
        <img
          className="h-[63px] w-[90px]"
          src="/image/ibracks_logo.png"
          alt="Logo"
        />

        {/* Navigation Links */}
        <div className="flex items-center gap-[40px]">
          {/* Menu Items */}
          <ul className="flex items-center gap-6 text-base text-zinc-300 capitalize">
            <li className="cursor-pointer hover:text-white">About</li>
            <li className="cursor-pointer hover:text-white">Tracks</li>
            <li className="cursor-pointer hover:text-white">Videos</li>
            <li className="cursor-pointer hover:text-white">Services</li>
            <li className="cursor-pointer hover:text-white">Contact</li>
          </ul>

          {/* Icons + Login */}
          <div className="flex items-center gap-6 text-zinc-300">
            <FiSearch className="h-5 w-5 cursor-pointer hover:text-white" />
            <FiUser className="h-5 w-5 cursor-pointer hover:text-white" />
            <div className="flex cursor-pointer items-center gap-2 hover:text-white">
              <span className="text-base capitalize">Log In</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavStyle;
