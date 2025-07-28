import React, { useState } from "react";
import { FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { getCurrentUser } from "../../../featured/auth/authUtils";
import { CartContext } from "../../../utils/CartContextDefinition";
import { useContext } from "react";
// ssss
const navLinks = [
  { label: "About", path: "/about" },
  { label: "Tracks", path: "/tracks" },
  { label: "Video", path: "/video" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

// const navLinks = [
//   { label: "About", path: "/about" },
//   { label: "Contact", path: "/contact-view" },
//   { label: "Services", path: "/services" },
//   { label: "Login", path: "/login" },
//   { label: "Signup", path: "/signup" },
//   { label: "Shopping Cart", path: "/shopping-cart" },
//   { label: "CheckOut", path: "/check-out" },
//   { label: "Video", path: "/video" },
//   { label: "TracksView", path: "/tracks" },
//   { label: "Products", path: "/products" },
// ];

const NavStyle = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-black text-zinc-300">
      <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4 lg:px-32">
        {/* Logo */}
        <Link to="/">
          <img
            className="h-[63px] w-[90px]"
            src="/image/ibracks_logo.png"
            alt="Logo"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-6 text-base capitalize lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.path}
                className="transition duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="hidden items-center gap-6 lg:flex">
          <FiSearch className="h-5 w-5 cursor-pointer hover:text-white" />
          <FiUser className="h-5 w-5 cursor-pointer hover:text-white" />
          <div className="flex cursor-pointer items-center gap-2 hover:text-white">
            <span className="text-base capitalize">Log In</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-zinc-300 lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-black px-6 pb-4 lg:hidden">
          <ul className="flex flex-col gap-4 text-base capitalize">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="block w-full py-1 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-4">
            <FiSearch className="h-5 w-5 cursor-pointer hover:text-white" />
            <FiUser className="h-5 w-5 cursor-pointer hover:text-white" />
            <span className="cursor-pointer text-base capitalize hover:text-white">
              Log In
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavStyle;
