import { createBrowserRouter } from "react-router-dom";

import ServicesView from "../pages/public/services/ServicesView";
import MainLayout from "../layout/template/main/MainLayout";
import HomeView from "../pages/public/home/HomeView";
import AboutView from "../pages/public/about/AboutView";
import LoginView from "../pages/auth/login/LoginView";
import RegisterView from "../pages/auth/register/RegisterView";
import ContactView from "../pages/public/contact/ContactView";
import CartView from "../pages/public/cart/CartView";
import CheckOutView from "../pages/public/checkout/CheckOut";
import TracksView from "../pages/public/tracks/TracksView";
import ProductsView from "../pages/public/products/ProductsView";
import VideosView from "../pages/public/videos/VideosView";
import DashboardLayout from "../layout/template/admin/DashboardLayout";
import Dashboard from "../pages/private/dashboard/Dashboard";
import TotalSongs from "../pages/private/songs/TotalSongs";
import SalseAnalysis from "../pages/private/salse/SalseAnalysis";
import NotFoundView from "../pages/error/NotFoundView";

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
        path: "/register",
        element: <RegisterView />,
      },
      {
        path: "/contact",
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
        path: "/tracks",
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
