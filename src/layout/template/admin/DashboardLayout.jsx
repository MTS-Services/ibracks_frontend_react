import { Outlet } from "react-router-dom";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import NavbarStyle from "./NavbarStyle";

const DashboardLayout = () => {
  return (
    <section className="flex justify-between text-white">
      <div className="h-screen w-70 bg-[#212121]">
        <LeftSide />
      </div>
      <div className="w-full bg-gradient-to-b from-[#050306] via-[#5D006D] to-[#5D006D]">
        <NavbarStyle />
        <Outlet />
      </div>

      <div className="h-screen w-70 bg-[#212121]">
        <RightSide />
      </div>
    </section>
  );
};

export default DashboardLayout;
