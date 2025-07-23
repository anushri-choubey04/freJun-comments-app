import React from "react";

function Navbar({ onSearch }) {
  return (
    <nav className="bg-white shadow sticky top-0 z-10 p-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
      <img
        className="w-36 sm:w-50 h-auto mx-6"
        src="https://frejun.com/wp-content/uploads/2021/04/Frejun-logo.svg"
        alt="Frejun logo"
      />

      <input
        type="text"
        placeholder="🔍 Search by email..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full sm:w-100 px-4 py-2 mx-20 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </nav>
  );
}

export default Navbar;
