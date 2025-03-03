import AddPrayer from "../pages/User/AddPrayer";
import Main from "../pages/User/Main";

export const protectedRoutes = [
  { element: <Main />, path: "/" },
  { element: <AddPrayer />, path: "/add-prayer" },
];
