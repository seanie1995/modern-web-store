import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="border bg-blue-950 py-2 flex justify-evenly">
      <span className="text-white">THE WEBSITE</span>
      <nav className="text-white flex gap-8">
        <li className="list-none">
          <Link href="/">Home </Link>
        </li>
        <li className="list-none">
          <Link href="/product">Products </Link>
        </li>
        {/*  <li className="list-none">
          <Link href="/">Categories </Link>
        </li> */}
      </nav>
    </div>
  );
};

export default Navbar;
