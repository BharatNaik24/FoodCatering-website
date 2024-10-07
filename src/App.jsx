import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import MyState from "./context/data/myState";
import Order from "./pages/order/Order";
import NoPage from "./pages/nopage/NoPage";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import ProductInfo from "./pages/productInfo/ProductInfo";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import Allproducts from "./pages/allproducts/AllProducts";

function App() {
  return (
    <MyState>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/order"
          element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutesForAdmin>
              <Dashboard />
            </ProtectedRoutesForAdmin>
          }
        />
        <Route path="/productinfo/:id" element={<ProductInfo />} />
        <Route path="/allproducts" element={<Allproducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/addproduct"
          element={
            <ProtectedRoutesForAdmin>
              <AddProduct />
            </ProtectedRoutesForAdmin>
          }
        />
        <Route
          path="/updateproduct"
          element={
            <ProtectedRoutesForAdmin>
              <UpdateProduct />
            </ProtectedRoutesForAdmin>
          }
        />
        <Route path="/*" element={<NoPage />} />
      </Routes>
      <ToastContainer />
    </MyState>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export const ProtectedRoutesForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));

  if (admin && admin.user && admin.user.email === "bbnaik05@gmail.com") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
