import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout, { ProtectedLayout } from "./components/Layout/Layout";
import Login from "./pages/login";
import Register from "./pages/register";
import HomePage from "./pages/HomePage";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
    {
      path: "/",
      element: <ProtectedLayout />,
      // errorElement: <ErrorPage />,
      children: [
        { path: "/addProduct", element: <AddProduct /> },
        { path: "/myProducts", element: <MyProducts /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
