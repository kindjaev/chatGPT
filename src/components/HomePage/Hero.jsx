import React from "react";
import whale1 from "../../assets/images/whale1.png";
import whale2 from "../../assets/images/whale2.png";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

function Hero() {
  const [user] = useAuthState(auth);
  return (
    <main className="hero relative flex justify-end">
      <img
        src={whale1}
        alt="whale"
        className="hidden md:block absolute left-0 -top-12 w-[60%] "
      />

      <div className="md:max-w-[500px] lg:max-w-[630px]  mt-[3rem] md:mt-10 px-10 text-right m:text-right relative">
        <h1 className="text-5xl lg:text-6xl text-primaryPurple">
          The Future is AI: Embrace the Power of Intelligence
        </h1>
        <p className="shadow-lg rounded-lg px-10 py-6 my-5 text-gray-700 ">
          Discover the power of artificial intelligence and take your business
          to new heights. Our AI solutions are designed to help you streamline
          your operations, optimize your workflows, and make better decisions
          based on data-driven insights.
        </p>
        <Link to="/chat">
          <button
            className="rounded-lg text-primaryPurple py-1 px-5 ring-2 ring-primaryPurple hover:bg-primaryPurple hover:text-white mt-3 mb-2"
            disabled={!user}
          >
            Try AI
          </button>
        </Link>
        {!user && (
          <p className="text-sm text-gray-500 mb-[20%]">Sign in to try Ai...</p>
        )}
        {/* <img
          src={whale2}
          alt="whale"
          className="whale absolute -scale-x-100 md:hidden -z-10 -bottom-[300px]"
        /> */}
      </div>
    </main>
  );
}

export default Hero;
