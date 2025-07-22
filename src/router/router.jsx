import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/template/main/MainLayout";
import NotFoundView from "../pages/error/NotFoundView";

import HomeView from "../pages/public/home/HomeView";
import AboutView from "../pages/public/about/AboutView";
import ContactView from "../pages/public/contact/ContactView";
import ServicesView from "../pages/public/Services/ServicesView";
import RegisterView from "../pages/auth/register/RegisterView";
import LoginView from "../pages/auth/login/LoginView";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import VideosView from "../pages/public/videos/VideosView";

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
      {
        path: "/login",
        element: <LoginView />,
      },
      {
        path: "/signup",
        element: <RegisterView />,
      },
      {
        path: "/contact-view",
        element: <ContactView />,
      },
      {
        path: "/services",
        element: <ServicesView />,
      },

      {
        path: "/shopping-cart",
        element: <ShoppingCart />,
      },

      {
        path: "/video",
        element: <VideosView />,
      },
    ],
  },
]);

export { AppRoutes };
