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
import Profile from "./pages/user/Profile";
import General from "./components/user/profile-views/General";
import Addresses from "./components/user/profile-views/Addresses";
import AddAddress from "./components/user/profile-views/AddAddress";
import EditAddress from "./components/user/profile-views/EditAddress";
import UserOrders from "./components/user/profile-views/Orders";
import OrderDetails from "./components/user/profile-views/OrderDetails";
import Wallet from "./components/user/profile-views/Wallet";
import Cart from "./pages/user/Cart";
import Wishlist from "./pages/user/Wishlist";
import ProtectRoute from "./pages/user/ProtectRoute";
import Checkout from "./pages/user/Checkout";
import OrderSuccess from "./components/user/OrderSuccess";
import OrderFailure from "./components/user/OrderFailure";
import Breadcrumbs from "./components/user/Breadcrumbs";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
import AdminLogin from "./pages/admin/AdminLoagin";
import AdminProtectPage from "./pages/admin/AdminProtectPage";
import WalletSuccess from "./components/user/WalletSuccess";
import WalletFailure from "./components/user/WalletFailure";

const UserLayout = ({ children }) => (
  <>
    <Navabr />
    <Breadcrumbs/>
    {children}
    <Footer />
  </>
);
const UserLayoutWithoutFooter = ({ children }) => (
  <>
    <Navabr />
    <Breadcrumbs/>
    {children}
  </>
);

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* User Routes with Navbar and Footer */}
        <Route path="/"element={<UserLayout><Home /></UserLayout>} />
        <Route path="/login"element={<ProtectRoute isProtectedForLoggedIn={true}><UserLayout><Login /></UserLayout></ProtectRoute>}/>
        <Route path="/register"element={<ProtectRoute isProtectedForLoggedIn={true}><UserLayout><Register /></UserLayout></ProtectRoute>}/>
        <Route path="/shop"element={<UserLayout><Shop /></UserLayout>}/>
        <Route path="/cart"element={<UserLayout><Cart /></UserLayout>}/>
        <Route path="/wishlist"element={<UserLayout><Wishlist /></UserLayout>}/>
        <Route path="/checkout"element={<UserLayout><Checkout /></UserLayout>}/>
        <Route path="/about"element={<UserLayout><About /></UserLayout>}/>
        <Route path="/contact"element={<UserLayout><Contact /></UserLayout>}/>
        <Route path="/shop/:id"element={<UserLayout><ProductDetail /></UserLayout>}/>

<Route path="/profile" element={<UserLayoutWithoutFooter><Profile /></UserLayoutWithoutFooter>}>
          <Route path="general" element={<General/>} />
          <Route index element={<General />} />
          <Route path="address" element={<Addresses />} />
          <Route path="add_address" element={<AddAddress />} />
          <Route path="orders" element={<UserOrders/>} />
          <Route path="order_details/:id" element={<OrderDetails />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="edit_address/:id" element={<EditAddress />} />
</Route>


<Route path="/order-success" element={<OrderSuccess />} />
<Route path="/order-failure" element={<OrderFailure />} />
<Route path="wallet_success" element={<WalletSuccess />} />
<Route path="wallet_failure" element={<WalletFailure />} />

<Route path="admin_login" element={<AdminProtectPage ><AdminLogin /></AdminProtectPage>} />

        {/* Admin Routes without Navbar and Footer */}
        <Route path="/dashboard" element={<AdminProtectPage ><Dashboard /></AdminProtectPage>}>
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
