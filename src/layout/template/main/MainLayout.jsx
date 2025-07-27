import { Outlet } from "react-router-dom";
import NavStyle from "./NavStyle";
import FooterStyle from "./FooterStyle";

const MainLayout = () => {
  return (
    <>
      <NavStyle />
      <main>
        <Outlet />
      </main>
      <FooterStyle />
    </>
  );
};

export default MainLayout;
