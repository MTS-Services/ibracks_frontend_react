import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layout/template/main/MainLayout";
import { PrivateRoute, PrivateAdminRoute } from "@/featured/auth/PrivateRoute"; // Import both
import HomeView from "@/pages/public/home/HomeView";
import AboutView from "@/pages/public/about/AboutView";

import CartView from "@/pages/public/cart/CartView";
import TracksView from "@/pages/public/tracks/TracksView";
import ProductsView from "@/pages/public/products/ProductsView";
import VideosView from "@/pages/public/videos/VideosView";
import ContactView from "@/pages/public/contact/ContactView";

import AuthLayout from "@/layout/template/auth/AuthLayout";
import RegisterView from "@/pages/auth/register/RegisterView";
import LoginView from "@/pages/auth/login/LoginView";

import DashboardLayout from "@/layout/template/admin/DashboardLayout";
import Dashboard from "@/pages/private/dashboard/Dashboard";
import TotalSongs from "@/pages/private/songs/TotalSongs";
import SalseAnalysis from "@/pages/private/salse/SalseAnalysis";
import CartTestView from "@/pages/public/cart/CartTestView";
import CheckoutView from "@/pages/public/checkout/CheckoutView";
import Account from "@/pages/private/Account/Account";
import UploadPage from "@/pages/private/upload/UploadPage";
import PravateRoutsTest from "@/components/PravateRoutsTest";
import OrderHistory from "@/pages/public/checkout/components/OrderHistory";

import NotFoundView from "@/pages/error/NotFoundView";
// import ServicesView from "../pages/public/services/ServicesView";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomeView /> },
      { path: "about", element: <AboutView /> },
      { path: "contact", element: <ContactView /> },
      // { path: "services", element: <ServicesView /> },
      { path: "shoping-cart", element: <CartView /> },
      { path: "test-cart", element: <CartTestView /> },
      { path: "check-out", element: <CheckoutView /> },
      {
        path: "account",
        element: (
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        ),
      },
      {
        path: "/order-history",
        element: <OrderHistory />,
      },
      { path: "tracks", element: <TracksView /> },
      { path: "products", element: <ProductsView /> },
      { path: "video", element: <VideosView /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginView /> },
      { path: "register", element: <RegisterView /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        {/* General user route */}
        <PravateRoutsTest />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <PrivateAdminRoute>
        {" "}
        {/* Admin-only route */}
        <DashboardLayout />
      </PrivateAdminRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "songs", element: <TotalSongs /> },
      { path: "salse", element: <SalseAnalysis /> },
      { path: "upload", element: <UploadPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
]);

export { AppRoutes };
