import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <br />
      
      <br/>
      <Outlet />
      <br />
      <Footer/>
     
    </div>
  );
};

export default Layout;
