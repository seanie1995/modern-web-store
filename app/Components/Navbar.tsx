import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="border bg-blue-950 py-2 flex justify-evenly">
      <span className="text-white">THE WEBSITE</span>
      <nav className="text-white">
        <li className="list-none">
          <Link href="/">Home </Link>
        </li>
      </nav>
    </div>
  );
};

export default Navbar;
