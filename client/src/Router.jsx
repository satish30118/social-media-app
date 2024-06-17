import UserDashboard from "./Pages/Dashboard/UserDashboard";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Home from "./Pages/home/Home";
import Error from "./layouts/Error";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    id: 1,
    path: "/",
    element: <Home />,
  },
  {
    id: 2,
    path: "/account-login",
    element: <Login />,
  },
  {
    id: 3,
    path: "/account-registration",
    element: <Register />,
  },
  {
    id: 4,
    path: "/dashboard",
    element: <UserDashboard />,
  },
  {
    id: 5,
    path: "*",
    element: <Error />,
  },
]);

export default router;
