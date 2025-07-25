import React from "react";
import { FiMenu, FiSearch, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

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
            <Link
              to="/contact-view"
              className="cursor-pointer hover:text-white"
            >
              contact{" "}
            </Link>
            <Link to="/services" className="cursor-pointer hover:text-white">
              Services
            </Link>
            <Link to="/about" className="cursor-pointer hover:text-white">
              About
            </Link>
            <Link to="/login" className="cursor-pointer hover:text-white">
              Login
            </Link>
            <Link to="/signup" className="cursor-pointer hover:text-white">
              Signup
            </Link>
            <Link
              to="/shopping-cart"
              className="cursor-pointer hover:text-white"
            >
              Shopping Cart
            </Link>
            <Link to="/check-out" className="cursor-pointer hover:text-white">
              CheckOut
            </Link>
            <Link to="/video" className="cursor-pointer hover:text-white">
              Video
            </Link>
            <Link to="/tracks" className="cursor-pointer hover:text-white">
              TracksView
            </Link>
            <Link to="/products" className="cursor-pointer hover:text-white">
              Products
            </Link>
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
