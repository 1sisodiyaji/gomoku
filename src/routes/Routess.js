import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Protected from "../config/Protected";
import Navbar from "../component/Navbar";
import { Footer } from "../component/Footer";
import { FootNabar } from "../component/FootNavbar";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import RecoverPassword from "../pages/Auth/RecoverPassword";
import HomePage from "../pages/HomePage";
import Profile from "../pages/Profile";
import Rules from "../pages/Game/Rules";
import Reward from "../pages/Game/Rewards";
import YourRewards from "../component/YourRewards";
import PreviousMatch from "../component/PreviousMatch";

const Routess = () => {
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setShouldScrollToTop(false);
    }
  }, [shouldScrollToTop, location]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/RecoverPassword" element={<RecoverPassword />} />

        <Route path="/profile" element={<Protected Component={Profile} />} />
        <Route path="/Rules" element={<Rules />} />
        <Route path="/Rewards" element={<Reward />} />
        <Route path="/Your-Rewards" element={<Protected Component={YourRewards} />} />
        <Route path="/History" element={<Protected Component={PreviousMatch} />} />
      </Routes>
      <FootNabar />
      <Footer />
    </>
  );
};

export default Routess;
