import { RouterProvider } from "react-router";
import { AppRoutes } from "./router/router";
import "./app.css";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  return <RouterProvider router={AppRoutes} />;
};

export default App;
