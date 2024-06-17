import React from "react";
import "../assets/css/header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header>
        <div className="header-left">Tangle</div>
        <div className="header-right">
          <NavLink>Login</NavLink>
        </div>
      </header>
    </>
  );
}
