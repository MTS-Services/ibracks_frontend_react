import { useContext, useEffect, useRef, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";

import { HiOutlineShoppingBag } from "react-icons/hi";

import { FaUserTie, FaShoppingBag } from "react-icons/fa";

import { RiProductHuntLine, RiCustomerService2Fill } from "react-icons/ri";

import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";

import { useSelector } from "react-redux";

import { AuthContext } from "../../../featured/auth/AuthContext";

import toast, { Toaster } from "react-hot-toast";

import CartDropdown from "../../../components/common/CartDropdown";

const NavStyle = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { totalQuantity } = useSelector((state) => state.cart);

  const dropdownRef = useRef(null);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const profileMenuRef = useRef(null);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const location = useLocation();

  const { user, logout } = useContext(AuthContext);

  const prevUserRef = useRef(user);

  useEffect(() => {
    if (prevUserRef.current && !user) {
      toast.success("You have been logged out successfully!", {
        position: "top-center",
      });
    }

    prevUserRef.current = user;
  }, [user]);

  const handleLogout = () => {
    logout();

    setIsProfileMenuOpen(false);

    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const navLinks = [
    { label: "Home", path: "/" },

    { label: "About", path: "/about" },

    { label: "Tracks", path: "/tracks" },

    { label: "Video", path: "/video" },

    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },

    ...(user
      ? user.role === "admin"
        ? [{ label: "Dashboard", path: "/admin" }]
        : []
      : []),
  ];

  const profileDropdownLinks = user
    ? [
        { label: "View Account", path: "/account", icon: FaUserTie },

        ...(user.role === "admin"
          ? [{ label: "Dashboard", path: "/admin", icon: RiProductHuntLine }]
          : user.role === "user"
            ? [
                {
                  label: "My Dashboard",
                  path: "/order-history",

                  path: "/dashboard",

                  icon: RiProductHuntLine,
                },
              ]
            : []),

        { label: "Services", path: "/services", icon: RiCustomerService2Fill },
        {
          label: "Orders",
          path: "/order-history",
          icon: RiCustomerService2Fill,
        },
      ]
    : [];

  return (
    <nav className="sticky top-0 z-20 bg-black text-white">
      <Toaster position="top-center" />

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-1 pb-2 md:px-6 md:py-3 lg:px-0">
        <Link to="/">
          <img
            className="hidden w-[100px] md:block"
            src="/image/ibracks_logo.png"
            alt="Logo"
          />
        </Link>

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

          <div className="flex items-center gap-5 text-zinc-300">
            {/* Desktop search icon link */}

            <Link to="/tracks#search-section">
              <FiSearch className="h-5 w-5 cursor-pointer hover:text-white" />
            </Link>

            <button
              onClick={toggleCart}
              className="relative cursor-pointer hover:text-white"
            >
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {totalQuantity}
                </span>
              )}

              <HiOutlineShoppingBag className="h-5 w-5 text-white" />
            </button>

            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <img
                  src={user.profileImage || "/treacks/cart3.png"}
                  alt="User Profile"
                  className="h-8 w-8 cursor-pointer rounded-full object-cover"
                  onClick={toggleProfileMenu}
                />

                <div
                  className={`absolute top-10 right-0 z-30 w-52 origin-top-right rounded-lg border border-[rgba(239,166,69,0.2)] bg-[#16021A] p-2 py-1 shadow-xl transition-all duration-300 ease-out ${
                    isProfileMenuOpen
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-95 opacity-0"
                  }`}
                >
                  <div className="border-b border-[rgba(239,166,69,0.3)] px-4 py-3 text-white">
                    <p className="gap-1 bg-gradient-to-b from-orange-100 to-yellow-300 bg-clip-text font-semibold text-transparent">
                      {user.name}
                    </p>
                  </div>

                  {profileDropdownLinks.map(({ label, path, icon: Icon }) => (
                    <Link
                      key={label}
                      to={path}
                      className="flex items-center gap-1 border-b-1 border-[rgba(239,166,69,0.2)] px-4 py-2 text-sm font-[600] text-white transition-colors duration-200 hover:bg-purple-800"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4 text-[#EFA645]" />

                      {label}
                    </Link>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="block w-full items-center border-t border-[rgba(239,166,69,0.3)] px-4 py-2 text-left text-sm font-[600] text-red-400 transition-colors duration-200 hover:bg-purple-800"
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
              <div className="flex items-center gap-2">
                <FiUser className="h-5 w-5 cursor-pointer hover:text-white" />

                <Link
                  to="/auth/login"
                  className="text-base font-medium text-white transition-colors hover:text-gray-400"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-8 md:hidden">
        <div>
          <Link to="/">
            <img
              className="h-[60px] w-full"
              src="/image/ibracks_logo.png"
              alt="Logo"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4 pl-4 text-zinc-300">
          {/* Mobile search icon link */}

          <Link to="/tracks#search-section">
            <FiSearch className="h-6 w-6 cursor-pointer hover:text-white" />
          </Link>

          <button
            onClick={toggleCart}
            className="relative cursor-pointer hover:text-white"
          >
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {totalQuantity}
              </span>
            )}

            <HiOutlineShoppingBag className="h-6 w-6 text-white" />
          </button>

          {!user && (
            <FiUser className="h-5 w-5 cursor-pointer hover:text-white" />
          )}
        </div>

        <div className="flex items-center border-2 border-[rgba(239,166,69,0.2)] md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-zinc-300 focus:outline-none"
          >
            {isMenuOpen ? (
              <FiX className="h-8 w-8" />
            ) : (
              <FiMenu className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="rounded-2xl border-t-0 border-r-2 border-b-2 border-l-2 border-[rgba(239,166,69,0.2)] bg-black/60 md:hidden">
          <ul className="px-4 py-2">
            {navLinks.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block border-t-1 border-[rgba(239,166,69,0.2)] px-2 py-2 text-base font-medium transition-colors hover:bg-[#16021A] ${
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

          <div className="flex items-center justify-between border-t-1 border-[rgba(239,166,69,0.2)] px-2 py-2">
            {user ? (
              <div className="relative flex items-center">
                <div
                  className={`origin-top-right rounded-lg border border-[rgba(239,166,69,0.2)] bg-[#16021A] p-2 px-2 py-1 shadow-xl`}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-[600] text-red-400 transition-colors duration-200"
                  >
                    <img
                      src={user.profileImage || "/treacks/cart3.png"}
                      alt="User Profile"
                      className="h-8 w-8 cursor-pointer rounded-full object-cover"
                      onClick={toggleProfileMenu}
                    />

                    <p className="flex items-center gap-1 text-base font-bold text-[#EFA645] hover:text-white">
                      Logout
                      <span>
                        <HiMiniArrowLeftStartOnRectangle />
                      </span>
                    </p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FiUser className="h-5 w-5 cursor-pointer hover:text-white" />

                <Link
                  to="/auth/login"
                  className="text-base font-bold text-[#EFA645] transition-colors hover:text-gray-400"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="absolute right-80 z-50 w-96" ref={dropdownRef}>
          <CartDropdown onClose={() => setIsCartOpen(false)} />
        </div>
      )}
    </nav>
  );
};

export default NavStyle;
