import { Link } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Tracks", path: "/tracks-view" },
  { label: "Video", path: "/video" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact-view" },
];

const NavStyle = () => {
  return (
    <header className="sticky top-0 z-10 bg-black">
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
            <HiOutlineShoppingBag className="h-5 w-5 cursor-pointer hover:text-white" />
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
