import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/home";
import ProfileUser from "./pages/users/profile";
import MasterLayout from "./pages/masterLayout";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import DetailProduct from "./pages/detaiProduct/detailProduct";
import OrderCheckout from "./pages/orderCheckout/orderCheckout";

const renderUserRouter = () => {
  const userRouter = [
    {
      path: "/home",
      component: <HomePage />
    },
    {
      path: "/profile",
      component: <ProfileUser />
    },
    {
      path: "/login",
      component: <Login />
    },
    {
      path: "/register", // Đường dẫn cho trang Register
      component: <Register />
    },
    {
      path: "/forgot-password", // Đường dẫn cho trang 404
      component: <ForgotPassword />
    },
    {
      path: "/product-detail/:id",
      component: <DetailProduct />
    },
    {
      path: "/OrderCheckout",
      component: <OrderCheckout />
    }
    
  ];

  return (
    <Routes>
      {userRouter.map((item, key) => (
        <Route
          key={key}
          path={item.path}
          element={<MasterLayout>
            {item.component}</MasterLayout>}
        />
      ))}
    </Routes>
  );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;
