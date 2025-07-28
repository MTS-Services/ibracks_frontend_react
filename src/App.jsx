import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./router/router";
import "react-datepicker/dist/react-datepicker.css";
import { AuthProvider } from "./featured/auth/AuthProvider"; // AuthProvider ইম্পোর্ট করুন
import CartProvider from "./utils/CartProvider";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={AppRoutes} />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
