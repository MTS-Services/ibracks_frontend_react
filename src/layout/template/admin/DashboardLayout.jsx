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
      <div className="w-full bg-gradient-to-br from-[#2e0c4f65] to-[#3f0c5854]">
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
