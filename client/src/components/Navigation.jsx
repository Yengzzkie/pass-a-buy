"use client";

import { useContext } from "react";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { LoginStatusContext, UserContext } from "../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginStatusContext);
  const { setUserCredentials } = useContext(UserContext);

  async function handleLogout() {
    try {
      const response = await axios.post(
        'http://localhost:8080/logout',
        {},
        { withCredentials: true } 
      );
  
      if (response.status === 200) {
        console.log("Logged out successfully");
        setIsLoggedIn(false);
        setUserCredentials("");
        localStorage.removeItem("userID")
        navigate("/");
      } else {
        console.log("Logout unsuccessful:", response.data);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }
  

  return (
    <div>
      {isLoggedIn ? (
        <Navbar fluid className="text-gray-600">
          <Navbar.Brand as={Link} href="#">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Pass-a-Buy
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Link to={"/home"}>Dashboard</Link>
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
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
  );
}
