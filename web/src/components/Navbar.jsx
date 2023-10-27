import React from "react";

const Navbar = () => {
  return (
    <header className="grid grid-cols-3">
      <div className="flex items-center font-bold text-xl">ATRONS</div>
      <div></div>
      <nav className="grid grid-cols-3 font-semibold">
        <a href="#" className="text-black">
          Home
        </a>
        <a href="#" className="text-black">
          About
        </a>
        <a href="#" className="text-black">
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
