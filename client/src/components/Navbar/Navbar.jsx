import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="bg-[#1d1c1c] text-2xl text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl">Products</h1>
        <div className="flex space-x-4">
          <Link to="/add" className="hover:underline">
            Add Product
          </Link>
          <Link to="/update" className="hover:underline">
            Update Product
          </Link>
          <Link to="/all" className="hover:underline">
            All Products
          </Link>
        </div>
        <div className="flex space-x-4">
          {currentUser ? (
            <>
              <img
                src={currentUser.profilePicture}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <button
                onClick={logout}
                className="bg-blue-700 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-700 px-4 py-2 rounded">
                Sign In
              </Link>
              <Link to="/register" className="bg-blue-700 px-4 py-2 rounded">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
