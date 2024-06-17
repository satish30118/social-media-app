import React from "react";
import "../assets/css/header.css";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/img/logo1.jpg";

export default function Header() {
  return (
    <>
      <header>
        <div className="header-left">
          <Link>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header-right">
          <NavLink>Login</NavLink>
        </div>
      </header>
    </>
  );
}
