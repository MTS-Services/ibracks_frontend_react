import { Outlet, useLocation } from "react-router-dom";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import NavbarStyle from "./NavbarStyle";
import BottomPlayer from "../../../pages/private/songs/components/BottomPlayer";

const DashboardLayout = () => {
  const location = useLocation();
  const showPlayer = location.pathname === "/admin/songs";

  return (
    // Use a parent wrapper
    <div className="relative min-h-screen">
      <section className="flex justify-between text-white">
        <div className="h-screen w-70 bg-[#212121]">
          <LeftSide />
        </div>

        <div className="flex h-screen flex-1 flex-col bg-gradient-to-b from-[#050306] via-[#5D006D] to-[#5D006D]">
          <NavbarStyle />
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
        <div className="h-screen w-70 bg-[#212121]">
          <RightSide />
        </div>
      </section>
      {showPlayer && <BottomPlayer />}
    </div>
  );
};

export default DashboardLayout;
