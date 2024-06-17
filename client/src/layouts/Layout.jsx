import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";

const Layout = ({ children }) => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <div className="layout">
        <Header />
        <div className="layout-child">{children}</div>
      </div>
      <ToastContainer position="bottom-center" theme="colored" />
    </>
  );
};

export default Layout;
