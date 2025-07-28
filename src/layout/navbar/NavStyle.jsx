import { Link } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { getCurrentUser } from "../../../featured/auth/authUtils";
import { CartContext } from "../../../utils/CartContextDefinition";
import { useContext } from "react";
// ssss
// ssss
// ssss
// ssss
const navLinks = [
  { label: "About", path: "/about" },
  { label: "Tracks", path: "/tracks" },
  { label: "Video", path: "/video" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const NavStyle = () => {
  const { cartItems } = useContext(CartContext);

  const user = getCurrentUser();

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

          {/* Icons + Login */}
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
              ""
            ) : (
              <FiUser className="h-5 w-5 cursor-pointer hover:text-white" />
            )}

            <div className="flex cursor-pointer items-center gap-2 hover:text-white">
              <Link to="/login">
                <span className="text-base text-zinc-300 capitalize hover:text-gray-500">
                  Log In
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavStyle;
