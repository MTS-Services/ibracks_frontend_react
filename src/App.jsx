import { RouterProvider } from "react-router";
import { AppRoutes } from "./router/router";
import "react-datepicker/dist/react-datepicker.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CartProvider from "./utils/CartProvider";

const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={AppRoutes} />
    </CartProvider>
  );
};

export default App;
