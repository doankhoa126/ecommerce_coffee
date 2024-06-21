import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/users/homepage";
import ProfileUser from "./pages/users/profile";
import MasterLayout from "./pages/masterLayout";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

const renderUserRouter = () => {
  const userRouter = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePage />
    },
    {
      path: ROUTERS.USER.PROFILE,
      component: <ProfileUser />
    },
    {
      path: "/login",
      component: <Login />
    },
    {
      path: "/register", // Đường dẫn cho trang Register
      component: <Register />
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
