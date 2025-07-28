import { RouterProvider } from "react-router";
import { AppRoutes } from "./router/router";
import "react-datepicker/dist/react-datepicker.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Provider } from "react-redux";
import { store } from "./featured/store/store";
import CartProvider from "./context/cart/CartProvider";

const App = () => {
  return (
    <Provider store={store}>
      <CartProvider>
        <RouterProvider router={AppRoutes} />
      </CartProvider>
    </Provider>
  );
};

export default App;
