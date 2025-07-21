import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/template/main/MainLayout";
import NotFoundView from "../pages/error/NotFoundView";

import HomeView from "../pages/public/home/HomeView";
import AboutView from "../pages/public/about/AboutView";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundView />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "/about",
        element: <AboutView />,
      },
    ],
  },
]);

export { AppRoutes };
