import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { getCurrentUser } from "../../../featured/auth/authUtils";

// Navigation Links Data
const navLinks = [
  { label: "About", path: "/about" },
  { label: "Tracks", path: "/tracks" },
  { label: "Video", path: "/video" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
  { label: "Admin", path: "/admin" },
];

const NavStyle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = getCurrentUser();

  return (
    <header className="sticky top-0 z-20 bg-black text-white">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-0">
        {/* Logo */}
        <Link to="/">
          <img className="w-[100px]" src="/image/ibracks_logo.png" alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-[40px] md:flex">
          <ul className="flex items-center gap-6 text-base text-zinc-300 capitalize">
            {navLinks.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  className="font-medium text-zinc-300 transition-colors hover:text-gray-400"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons + Login */}
          <div className="flex items-center gap-5 text-zinc-300">
            <FiSearch className="h-5 w-5 cursor-pointer transition-colors hover:text-white" />
            <HiOutlineShoppingBag className="h-5 w-5 cursor-pointer transition-colors hover:text-white" />
            {!user && (
              <FiUser className="h-5 w-5 cursor-pointer transition-colors hover:text-white" />
            )}

            <Link
              to="/login"
              className="text-base font-medium text-zinc-300 transition-colors hover:text-gray-400"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-zinc-300 focus:outline-none"
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-black px-4 pb-4 md:hidden">
          <ul className="space-y-3 border-t border-gray-700 py-2">
            {navLinks.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  className="block py-2 text-base font-medium text-zinc-300 transition-colors hover:text-gray-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t border-gray-700 pt-3">
            <div className="flex items-center gap-4 text-zinc-300">
              <FiSearch className="h-5 w-5 cursor-pointer hover:text-white" />
              <HiOutlineShoppingBag className="h-5 w-5 cursor-pointer hover:text-white" />
              {!user && (
                <FiUser className="h-5 w-5 cursor-pointer hover:text-white" />
              )}
            </div>
            <Link
              to="/login"
              className="text-base font-medium text-zinc-300 transition-colors hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavStyle;
