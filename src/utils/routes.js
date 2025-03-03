import Auth from "../pages/Auth";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
export const routes = [
  { element: <Login />, path: "/login" },
  { element: <Register />, path: "/register" },
  { element: <Auth />, path: "/auth" },
];
