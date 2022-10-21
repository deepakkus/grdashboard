import React from "react";
import logo from "./../../images/LOGO.svg";

export default function Logo() {
  return (
    <>
      <div className="logocontainer">
        <div className="logo">
          <img src={logo} alt="Sensegrass-logo"></img>
        </div>
        <div>
          <p className="logo-heading">SENSEGRASS</p>
        </div>
      </div>
    </>
  );
}
