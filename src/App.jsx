import { RouterProvider } from "react-router";
import { AppRoutes } from "./router/router";

const App = () => {
  return <RouterProvider router={AppRoutes} />;
};

export default App;
