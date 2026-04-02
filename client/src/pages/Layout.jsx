import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Haeder";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
