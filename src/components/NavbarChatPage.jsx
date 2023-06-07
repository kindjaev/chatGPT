import React from "react";
import logo from "../assets/whale-logo.png";
import bgMoon from "../assets/images/bg-moon.png";
import SignOut from "./Navbar/SignOut";

function Navbar() {
  return (
    <nav className="flex items-center px-10 py-2 text-gray-300 bg-[#202123] relative">
      <a href="/" className="flex items-center flex-1">
        <img src={logo} alt="whale-logo" width="50px" />
        <h4>Whale AI</h4>
      </a>
      <div className="">
        <SignOut />
      </div>
    </nav>
  );
}

export default Navbar;
