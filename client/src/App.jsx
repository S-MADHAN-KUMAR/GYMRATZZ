import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PageLoader from "./components/PageLoader"; // Import the PageLoader component
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; 

// Lazy-load all your components
const Home = lazy(() => import("./pages/user/Home"));
const Login = lazy(() => import("./pages/user/Login"));
const Register = lazy(() => import("./pages/user/Register"));
const Shop = lazy(() => import("./pages/user/Shop"));
const ProductDetail = lazy(() => import("./pages/user/ProductDetail"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Products = lazy(() => import("./components/admin/Products"));
const ProtectRoute = lazy(() => import("./pages/user/ProtectRoute"));
const Users = lazy(() => import("./components/admin/Users"));
const Coupons = lazy(() => import("./components/admin/Coupons"));
const Offers = lazy(() => import("./components/admin/Offers"));
const Categories = lazy(() => import("./components/admin/Categories"));
const Reviews = lazy(() => import("./components/admin/Reviews"));
const Orders = lazy(() => import("./components/admin/Orders"));
const AdminHome = lazy(() => import("./components/admin/Home"));
const Brands = lazy(() => import("./components/admin/Brands"));
const Banners = lazy(() => import("./components/admin/Banners"));
const NotFound = lazy(() => import("./components/NotFound"));
const Navbar = lazy(() => import("./components/user/Navbar"));
const Footer = lazy(() => import("./components/user/Footer"));
const AddProducts = lazy(() => import("./components/admin/add/AddProducts"));
const AddCoupons = lazy(() => import("./components/admin/add/AddCoupons"));
const AddBanner = lazy(() => import("./components/admin/add/AddBanner"));
const AddBrands = lazy(() => import("./components/admin/add/AddBrands"));
const AddCategories = lazy(() => import("./components/admin/add/AddCategories"));
const EditProducts = lazy(() => import("./components/admin/edit/EditProducts"));
const Profile = lazy(() => import("./pages/user/Profile"));
const General = lazy(() => import("./components/user/profile-views/General"));
const Addresses = lazy(() => import("./components/user/profile-views/Addresses"));
const AddAddress = lazy(() => import("./components/user/profile-views/AddAddress"));
const EditAddress = lazy(() => import("./components/user/profile-views/EditAddress"));
const UserOrders = lazy(() => import("./components/user/profile-views/Orders"));
const OrderDetails = lazy(() => import("./components/user/profile-views/OrderDetails"));
const Wallet = lazy(() => import("./components/user/profile-views/Wallet"));
const Cart = lazy(() => import("./pages/user/Cart"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const Checkout = lazy(() => import("./pages/user/Checkout"));
const OrderSuccess = lazy(() => import("./components/user/OrderSuccess"));
const OrderFailure = lazy(() => import("./components/user/OrderFailure"));
const Breadcrumbs = lazy(() => import("./components/user/Breadcrumbs"));
const About = lazy(() => import("./pages/user/About"));
const Contact = lazy(() => import("./pages/user/Contact"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLoagin"));
const AdminProtectPage = lazy(() => import("./pages/admin/AdminProtectPage"));
const WalletSuccess = lazy(() => import("./components/user/WalletSuccess"));
const WalletFailure = lazy(() => import("./components/user/WalletFailure"));
const AddProductOffers = lazy(() => import("./components/admin/add/AddProductOffers"));
const AddCategoriesOffers = lazy(() => import("./components/admin/add/AddCategoriesOffers"));

// User Layouts
const UserLayout = ({ children }) => (
  <>
    <Navbar />
    <Breadcrumbs />
    {children}
    <Footer />
  </>
);

const UserLayoutWithoutFooter = ({ children }) => (
  <>
    <Navbar />
    <Breadcrumbs />
    {children}
  </>
);

const App = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* User Routes with Navbar and Footer */}
          <Route path="/" element={<ProtectRoute><UserLayout><Home /></UserLayout></ProtectRoute>} />
          <Route path="/login" element={<ProtectRoute isProtectedForLoggedIn={true}><UserLayout><Login /></UserLayout></ProtectRoute>} />
          <Route path="/register" element={<ProtectRoute isProtectedForLoggedIn={true}><UserLayout><Register /></UserLayout></ProtectRoute>} />
          <Route path="/shop" element={<UserLayout><Shop /></UserLayout>} />
          <Route path="/cart" element={<UserLayout><Cart /></UserLayout>} />
          <Route path="/wishlist" element={<UserLayout><Wishlist /></UserLayout>} />
          <Route path="/checkout" element={<UserLayout><Checkout /></UserLayout>} />
          <Route path="/about" element={<UserLayout><About /></UserLayout>} />
          <Route path="/contact" element={<UserLayout><Contact /></UserLayout>} />
          <Route path="/shop/:id" element={<UserLayout><ProductDetail /></UserLayout>} />

          <Route path="/profile" element={<UserLayoutWithoutFooter><Profile /></UserLayoutWithoutFooter>}>
            <Route path="general" element={<General />} />
            <Route index element={<General />} />
            <Route path="address" element={<Addresses />} />
            <Route path="add_address" element={<AddAddress />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="order_details/:id" element={<OrderDetails />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="edit_address/:id" element={<EditAddress />} />
          </Route>

          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order-failure" element={<OrderFailure />} />
          <Route path="wallet_success" element={<WalletSuccess />} />
          <Route path="wallet_failure" element={<WalletFailure />} />

          <Route path="admin_login" element={<AdminProtectPage><AdminLogin /></AdminProtectPage>} />

          {/* Admin Routes */}
          <Route path="/dashboard" element={<AdminProtectPage><Dashboard /></AdminProtectPage>}>
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
            <Route path="add_categories" element={<AddCategories />} />
            <Route path="add_products_offers" element={<AddProductOffers />} />
            <Route path="add_categories_offers" element={<AddCategoriesOffers />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>

          {/* NOT FOUND PAGE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </Router>
  );
};

export default App;
