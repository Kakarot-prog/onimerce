import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./assets/page/notFound.jsx";
import React from "react";
import Home from "./assets/page/Home.jsx";
import Login from "./assets/page/Login.jsx";
import Register from "./assets/page/Register.jsx";
import Verify from "./assets/page/Verify.jsx";
import VerifyUser from "./assets/page/verifyUser.jsx";
import ForgotPassword from "./assets/page/ForgotPassEmail.jsx";
import NewPassword from "./assets/page/NewPassword.jsx";
import Product from "./assets/page/Product.jsx";
import ResetPasswordEmailSent from "./assets/page/ResetPasswordEmailSent.jsx";
import ChangePassword from "./assets/page/ChangePass.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/verify/:token" element={<VerifyUser />} />
          <Route path="/forgotPass" element={<ForgotPassword />} />
          <Route path="/api/v1/auth/forgot/:token" element={<NewPassword />} />
          <Route path="/product" element={<Product />} />
          <Route
            path="/reset/password/email"
            element={<ResetPasswordEmailSent />}
          />
          <Route path="/change/password" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
