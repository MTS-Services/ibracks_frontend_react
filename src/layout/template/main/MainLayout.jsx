import React from "react";
import { Outlet } from "react-router-dom";
import NavStyle from "../../navbar/NavStyle";
import FooterStyle from "../../footer/FooterStyle";

const MainLayout = () => {
  return (
    <>
      <NavStyle />
      <main>
        <Outlet />
      </main>
      <footer>
        <FooterStyle />
      </footer>
    </>
  );
};

export default MainLayout;
