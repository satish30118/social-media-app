import { createBrowserRouter } from "react-router-dom";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Error from "./layouts/Error";
import NewPost from "./pages/newPost/NewPost";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";

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
    path: "/new-post",
    element: <NewPost />,
  },
  {
    id: 6,
    path: "/account/forgot-password",
    element: <ForgotPassword />,
  },
  {
    id: 7,
    path: "*",
    element: <Error />,
  },
]);

export default router;
