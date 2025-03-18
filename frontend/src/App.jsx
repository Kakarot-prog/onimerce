import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./assets/page/notFound.jsx";
import React from "react";
import Home from "./assets/page/Home.jsx";
import Login from "./assets/page/Login.jsx";
import Register from "./assets/page/Register.jsx";
import Verify from "./assets/page/Verify.jsx";
import VerifyUser from "./assets/page/verifyUser.jsx";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
