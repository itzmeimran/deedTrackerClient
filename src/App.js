import "./App.css";
import Auth from "./pages/Auth";
import { Route, Router, Routes } from "react-router-dom";
import Main from "./pages/User/Main";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Auth/Register";
import { routes } from "./utils/routes";
import { protectedRoutes } from "./utils/protectedRoutes";
function App() {
  return (
    <div>
      <Routes>
        {routes.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {protectedRoutes.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
