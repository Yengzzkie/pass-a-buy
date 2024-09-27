"use client";

import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <Navbar fluid className="text-gray-600">
      <Navbar.Brand as={Link} href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Odin Express</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link to={"/"}>
          Home
        </Link>
        <Link to={"/newuser"}>
          New User
        </Link>
        <Link to={"/"}>Services</Link>
        <Link href="#">Pricing</Link>
        <Link href="#">Contact</Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
