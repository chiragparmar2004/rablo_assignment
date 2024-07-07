import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../Navbar/Navbar";
// import "./Layout.css"; // If you still need some custom styles

const ProtectedLayout = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="h-16">
        <Navbar />
      </div>
      <div className="flex-grow overflow-auto bg-blue-100">
        <Outlet />
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-16">
        <Navbar />
      </div>
      <div className="flex-grow overflow-auto bg-blue-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
export { ProtectedLayout };
