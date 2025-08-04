import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./router/router";

import "react-datepicker/dist/react-datepicker.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Provider } from "react-redux";
import { store } from "./featured/store/store";

import { AuthProvider } from "./featured/auth/AuthProvider";
import CartProvider from "./context/cart/CartProvider"; // or "./utils/CartProvider", depending on your final directory

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={AppRoutes} />
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
