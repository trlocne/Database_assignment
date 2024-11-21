import React from "react";
import { Navbar } from "../../component/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../../component/Footer/index.jsx";

const HomeTemplate = () => {
  return (
    <div>
      <Navbar />
      <div className="mb-11">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomeTemplate;
