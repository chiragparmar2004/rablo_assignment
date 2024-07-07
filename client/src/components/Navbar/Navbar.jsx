import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <nav className="bg-[#1d1c1c] text-2xl text-white ">
      <div className="container mx-auto flex justify-between items-center p-2">
        <h1 className="text-4xl">Products</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">
            All Products
          </Link>
          <Link to="/addProduct" className="hover:underline">
            Add Product
          </Link>
          <Link to="/myProducts" className="hover:underline">
            My Products
          </Link>
        </div>
        <div className="flex space-x-4">
          {currentUser ? (
            <div className=" flex  justify-between items-center gap-2">
              <img
                src={currentUser.profilePicture}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <button
                onClick={logout}
                className="bg-blue-700 px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
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
