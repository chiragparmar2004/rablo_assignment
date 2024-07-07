import { Outlet, Navigate } from "react-router-dom";
import "./Layout.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../Navbar/Navbar";

const ProtectedLayout = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
export { ProtectedLayout };
