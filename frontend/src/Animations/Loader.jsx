import React from "react";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const Loader = ({ msg }) => {
  return (
    <div
      style={{
        height: "93vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "lightgray",
        color: "darkblue",
      }}
    >
      <div>
        <h3 style={{ textAlign: "center" }}>
          {msg ? msg : <RotatingLines background="yellow" />}
        </h3>
        {msg ? (
          <Link
            to={msg !== "Access denied. Not allowed" ? "/account-login" : "/"}
          >
            <button
              className="btn"
              style={{ background: "blue", width: "250px" }}
            >
              {msg !== "Access denied. Not allowed" ? "Login" : "Go to home"}
              <i
                className="fa-solid fa-arrow-up-right-from-square"
                style={{ marginLeft: "6px" }}
              />
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Loader;
