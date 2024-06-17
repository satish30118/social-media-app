import React from "react";
import { Circles } from "react-loader-spinner";

const Sppinner = () => {
  return (
    <div
      style={{
        height: "250px",
        width: "250px",
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "7px",
        margin: "30px auto",
        textAlign:"center",
      }}
    >
      <div>
        <Circles />
        <p style={{ fontWeight: "700" }}>Please Wait...</p>
      </div>
    </div>
  );
};

export default Sppinner;
