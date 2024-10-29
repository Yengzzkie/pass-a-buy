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
            <Link to={"/home"}>Home</Link>
            <Link to={"/"}>My Profile</Link>
            <Link to={"/"}>Feeds</Link>
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
            <Link to={"/register"}>Sign Up</Link>
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
  );
}
