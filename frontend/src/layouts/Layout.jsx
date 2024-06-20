import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

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
        <div className="h_btn">
          <Link to={"/"}>
            <i className="fa-solid fa-home" title="Go to Home" />
          </Link>
          <Link to={"/new-post"}>
            <i className="fa-solid fa-plus h-plus" title="New Post" />
          </Link>

          <Link to={"/user-chat"}>
            <i className="fa-regular fa-comments" title="Chat with friends" />
          </Link>
        </div>
      </div>
      <ToastContainer position="bottom-center" theme="colored" />
    </>
  );
};

export default Layout;
