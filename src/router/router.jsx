import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/template/main/MainLayout";
import NotFoundView from "../pages/error/NotFoundView";

import HomeView from "../pages/public/home/HomeView";
import AboutView from "../pages/public/about/AboutView";
import ContactView from "../pages/public/contact/ContactView";
import ServicesView from "../pages/public/services/ServicesView";
import RegisterView from "../pages/auth/register/RegisterView";
import LoginView from "../pages/auth/login/LoginView";
import VideosView from "../pages/public/videos/VideosView";

import TracksView from "../pages/public/tracks/TracksView";
import ProductsView from "../pages/public/products/ProductsView";
import DashboardLayout from "../layout/template/admin/DashboardLayout";
import CheckOutView from "../pages/public/Checkout/CheckOut";
import CartView from "../pages/public/cart/CartView";
import Dashboard from "../pages/private/dashboard/Dashboard";
import TotalSongs from "../pages/private/songs/TotalSongs";
import SalseAnalysis from "../pages/private/salse/SalseAnalysis";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
        path: "/shop-cart",
        element: <CartView />,
      },
      {
        path: "/check-out",
        element: <CheckOutView />,
      },
      {
        path: "/tracks-view",
        element: <TracksView />,
      },
      {
        path: "/products",
        element: <ProductsView />,
      },
      {
        path: "/video",
        element: <VideosView />,
      },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "songs",
        element: <TotalSongs />,
      },
      {
        path: "salse",
        element: <SalseAnalysis />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
]);

export { AppRoutes };
