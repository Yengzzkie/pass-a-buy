"use client";

import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserCredentials } from "../stores/useDataStore";
import { useEffect } from "react";

export default function Navigation() {
  const navigate = useNavigate();
  const { loginStatus, setLoginStatus } = useUserCredentials();

  async function checkSessionStatus() {
    const userCredentials = JSON.parse(localStorage.getItem("userID"));
    return setLoginStatus(userCredentials.isAuthenticated);
  }

  async function handleLogout() {
    try {
      const response = await axios.post(
        'http://localhost:8080/logout',
        {},
        { withCredentials: true } 
      );
  
      if (response.status === 200) {
        setLoginStatus(false);
        localStorage.removeItem("userID")
        navigate("/login");
      } else {
        console.log("Logout unsuccessful:", response.data);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  useEffect(() => {checkSessionStatus()}, []);
  
  return (
    <div>
      {loginStatus ? (
        <Navbar fluid className="text-gray-600">
          <Navbar.Brand as={Link} href="#">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Pass-a-Buy
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Link to={"/dashboard"}>Dashboard</Link>
            <Link to={"/myprofile"}>My Profile</Link>
            <Link to={"/posts"}>Feeds</Link>
            <Link onClick={handleLogout}>Logout</Link>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar fluid className="text-gray-600">
          <Navbar.Brand as={Link} href="#">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Pass-a-Buy
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Link to={"/register"} className="bg-[#0e7490] text-white p-2 rounded-md hover:bg-[#1693b6]">Sign Up</Link>
            <Link to={"/login"} className="bg-[#0e7490] text-white p-2 rounded-md hover:bg-[#1693b6]">Login</Link>
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
  );
}
