import React from "react";

function Footer() {
  return (
    <div className="border-t-2 flex flex-col md:flex-row text-center justify-between text-gray-400 py-5 px-5 mt-3 ">
      <div>Copyrights reserved @{new Date().getFullYear()}</div>
      <div>
        <a href="https://www.flaticon.com/free-icons/brain" title="brain icons">
          Icons created by Freepik - Flaticon
        </a>
      </div>
    </div>
  );
}

export default Footer;
