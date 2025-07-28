import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useContext, useState, useRef, useEffect } from "react";
import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";

import { CartContext } from "../../../utils/CartContextDefinition";
import { AuthContext } from "../../../featured/auth/AuthContext";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Tracks", path: "/tracks" },
  { label: "Video", path: "/video" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const NavStyle = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false); // Close dropdown on logout
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-20 bg-black">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between py-2">
        {/* Logo */}
        <Link to="/">
          <img className="w-[100px]" src="/image/ibracks_logo.png" alt="Logo" />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-[40px]">
          <ul className="flex items-center gap-6 text-base text-zinc-300 capitalize">
            {navLinks.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  className="cursor-pointer text-base font-medium text-zinc-300 hover:text-gray-500"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons + Login/User Profile */}
          <div className="flex items-center gap-6 text-zinc-300">
            <FiSearch className="h-5 w-5 cursor-pointer hover:text-white" />
            <Link
              to="/shop-cart"
              className="relative flex items-center hover:text-gray-300"
            >
              <HiOutlineShoppingBag className="text-2xl" />

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={profileMenuRef}>
                {/* User Profile Image - Clickable to open/close dropdown */}
                <img
                  src={user.profileImage || "/treacks/cart3.png"} // Default image if user.profileImage is not available
                  alt="User Profile"
                  className="h-8 w-8 cursor-pointer rounded-full object-cover"
                  onClick={toggleProfileMenu}
                />
                {/* Profile Dropdown Menu */}
                <div
                  className={`absolute right-0 z-30 mt-2 w-52 origin-top-right rounded-lg border border-[rgba(239,166,69,0.2)] bg-[#16021A] py-1 shadow-lg transition-all duration-300 ease-out ${isProfileMenuOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
                >
                  {/* User Info Section */}
                  <div className="border-b border-[rgba(239,166,69,0.3)] px-4 py-3 text-white">
                    <p className="gap-1 bg-gradient-to-b from-orange-100 to-yellow-300 bg-clip-text text-xl font-semibold text-transparent">
                      <span>Name: </span>
                      {user.name}
                    </p>
                  </div>

                  {/* Navigation Links in Dropdown */}
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-purple-800"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    View Profile
                  </Link>

                  <Link
                    to="/my-classes"
                    className="block px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-purple-800"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    My Classes
                  </Link>
                  <Link
                    to="/bookmark"
                    className="block px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-purple-800"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Bookmark
                  </Link>

                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-purple-800"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Settings
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="block w-full items-center border-t border-[rgba(239,166,69,0.3)] px-4 py-2 text-left text-sm text-red-400 transition-colors duration-200 hover:bg-purple-800"
                  >
                    <p className="flex items-center gap-1 text-base font-bold text-[#EFA645]">
                      Logout{" "}
                      <span>
                        <HiMiniArrowLeftStartOnRectangle />
                      </span>
                    </p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex cursor-pointer items-center gap-2 hover:text-white">
                <Link to="/login">
                  <span className="text-base text-zinc-300 capitalize hover:text-gray-500">
                    Log In
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavStyle;
