import { useLocation, useNavigate } from "react-router-dom";
import { FiEdit, FiHome, FiMusic, FiSettings, FiVideo } from "react-icons/fi";
import { GrLineChart } from "react-icons/gr";

const userRolesData = [
  {
    role: "admin",
    status: "active",
    email: "admin@ibracks.com",
  },
  {
    role: "editor",
    status: "idle",
    email: "editor@ibracks.com",
  },
];

const navLinksData = [
  // { name: "dashboard", icon: <FiHome />, path: "/admin" },
  { name: "Total Songs Uploaded", icon: <FiMusic />, path: "/admin/songs" },
  { name: "Total Sales (Amount)", icon: <GrLineChart />, path: "/admin/salse" },
  // { name: "videos", icon: <FiVideo />, path: "/admin/videos" },
  // { name: "settings", icon: <FiSettings />, path: "/admin/settings" },
];

const LeftSide = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-70">
      {/* Logo */}
      <div className="flex justify-center">
        <img src="/image/ibracks_logo.png" alt="Logo " className="w-30 p-2" />
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col pt-10">
        {navLinksData.map((link) => (
          <a
            key={link.name}
            onClick={() => navigate(link.path)}
            className={`relative flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-base font-normal capitalize transition-colors duration-200 ${
              isActive(link.path)
                ? "text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {/* Left active indicator */}
            {isActive(link.path) && (
              <div className="absolute top-2 right-0 h-10 w-1 rounded-tl-sm rounded-bl-sm bg-white" />
            )}

            {/* Icon bubble */}
            <span
              className={`rounded-lg p-2 transition-colors duration-200 ${
                isActive(link.path)
                  ? "bg-gradient-to-b from-orange-200 to-yellow-500 text-black"
                  : "bg-neutral-700 text-white"
              }`}
            >
              {link.icon}
            </span>

            <span className="whitespace-nowrap">{link.name}</span>
          </a>
        ))}
      </nav>

      {/* User Roles */}
      <div className="m-4 flex flex-col gap-4 rounded-lg bg-white/10 p-4">
        {userRolesData.map((user) => (
          <div key={user.role} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-2 w-2 rounded-full ${
                  user.status === "active" ? "bg-green-500" : "bg-amber-400"
                }`}
              ></div>
              <div>
                <p className="text-sm font-normal text-white capitalize">
                  {user.role}
                </p>
                <p className="text-xs text-green-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => alert(`Editing ${user.role}`)}
              className="text-amber-400 hover:text-amber-300"
            >
              <FiEdit />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftSide;
