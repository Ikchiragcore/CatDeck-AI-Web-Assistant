import React from "react";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="fixed top-4 md:top-6 left-0 w-full px-4 md:px-10 flex items-center justify-center z-50">
      <div className="flex items-center max-w-full">
        <NavItems />
      </div>
    </nav>
  );
};

export default Navbar;
