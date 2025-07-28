import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { getCurrentUser } from "../../../featured/auth/authUtils";

// Navigation Links Data
const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Tracks", path: "/tracks" },
  { label: "Video", path: "/video" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products" },
  { label: "Contact", path: "/contact" },
];

const NavStyle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = getCurrentUser();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-20 bg-black text-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-0">
        {/* Logo */}
        <Link to="/">
          <img className="w-[100px]" src="/image/ibracks_logo.png" alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-[40px] md:flex">
          <ul className="flex items-center gap-6 text-base capitalize">
            {navLinks.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  className={`font-medium transition-colors ${
                    isActive(path)
                      ? "text-white underline underline-offset-4"
                      : "text-zinc-300 hover:text-gray-400"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons + Login */}
          <div className="flex items-center gap-5 text-zinc-300">
            <FiSearch className="h-5 w-5 cursor-pointer hover:text-white" />
            <Link to="/check-out" className="cursor-pointer hover:text-white">
              <HiOutlineShoppingBag className="h-5 w-5 text-white" />
            </Link>
            {!user && (
              <FiUser className="h-5 w-5 cursor-pointer hover:text-white" />
            )}

            <Link
              to="/auth/login"
              className="text-base font-medium text-white transition-colors hover:text-gray-400"
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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-black md:hidden">
          <ul className="border-t border-gray-700 px-4 py-2">
            {navLinks.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-base font-medium transition-colors ${
                    isActive(path)
                      ? "text-white underline underline-offset-4"
                      : "text-zinc-300 hover:text-gray-400"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t border-gray-700 px-4 py-3">
            <div className="flex items-center gap-4 text-zinc-300">
              <FiSearch className="h-5 w-5 cursor-pointer hover:text-white" />
              <Link
                to="/check-out"
                className="h-5 w-5 cursor-pointer hover:text-white"
              >
                <HiOutlineShoppingBag className="h-5 w-5 text-white" />
              </Link>
              {!user && (
                <FiUser className="h-5 w-5 cursor-pointer hover:text-white" />
              )}
            </div>
            <Link
              to="/auth/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium text-zinc-300 transition-colors hover:text-gray-400"
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavStyle;
