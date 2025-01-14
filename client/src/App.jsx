import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Navabr from "./components/user/Navabr";
import Footer from "./components/user/Footer";
import Register from "./pages/user/Register";
import Shop from "./pages/user/Shop";
import ProductDetail from "./pages/user/ProductDetail";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./components/admin/Products";
import Users from "./components/admin/Users";
import Coupons from "./components/admin/Coupons";
import Offers from "./components/admin/Offers";
import Categories from "./components/admin/Categories";
import Reviews from "./components/admin/Reviews";
import Orders from "./components/admin/Orders";
import AdminHome from "./components/admin/Home";
import Brands from "./components/admin/Brands";
import Banners from "./components/admin/Banners";
import NotFound from "./components/NotFound";
import AddProducts from "./components/admin/add/AddProducts";
import AddCoupons from "./components/admin/add/AddCoupons";
import AddBanner from "./components/admin/add/AddBanner";
import AddBrands from "./components/admin/add/AddBrands";
import AddCategories from "./components/admin/add/AddCategories";
import EditProducts from "./components/admin/edit/EditProducts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLayout = ({ children }) => (
  <>
    <Navabr />
    {children}
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* User Routes with Navbar and Footer */}
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/login"
          element={
            <UserLayout>
              <Login />
            </UserLayout>
          }
        />
        <Route
          path="/register"
          element={
            <UserLayout>
              <Register />
            </UserLayout>
          }
        />
        <Route
          path="/shop"
          element={
            <UserLayout>
              <Shop />
            </UserLayout>
          }
        />
        <Route
          path="/shop/:id"
          element={
            <UserLayout>
              <ProductDetail />
            </UserLayout>
          }
        />

        {/* Admin Routes without Navbar and Footer */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<AdminHome />} />
          <Route index element={<AdminHome />} />
          <Route path="add_products" element={<AddProducts />} />
          <Route path="edit_products/:id" element={<EditProducts />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="add_coupons" element={<AddCoupons />} />
          <Route path="brands" element={<Brands />} />
          <Route path="add_brands" element={<AddBrands />} />
          <Route path="banners" element={<Banners />} />
          <Route path="add_banners" element={<AddBanner />} />
          <Route path="offers" element={<Offers />} />
          <Route path="categories" element={<Categories />} />
          <Route path="add_categories" element={<AddCategories/>} />
          <Route path="reviews" element={<Reviews />} />
        </Route>

        {/* NOT FUND PAGE */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
};

export default App;
