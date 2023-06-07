import React from "react";
import logo from "../../assets/whale-logo.png";
// import bgMoon from "../assets/images/bg-moon.png";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase.js";

function Navbar() {
  const [user] = useAuthState(auth);
  return (
    <nav className="flex items-center px-10 py-2 text-primaryPurple relative">
      <a href="/" className="flex items-center flex-1">
        <img src={logo} alt="whale-logo" width="50px" />
        <h4>Whale AI</h4>
      </a>
      <div>
        <ul className="flex items-center">
          {!user ? (
            <li className="border-2 border-primaryPurple px-5 py-1 rounded-xl">
              <SignIn />
            </li>
          ) : (
            <li className="">
              <SignOut />
            </li>
          )}
        </ul>
      </div>

      {/* <img
        src={bgMoon}
        alt="background-moon"
        className="absolute top-0 left-0 -z-50 w-[90%] md:w-[50%]"
      /> */}
    </nav>
  );
}

export default Navbar;
