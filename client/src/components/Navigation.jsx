import { Navbar } from "flowbite-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../stores/useDataStore";

export default function Navigation() {
  const navigate = useNavigate();
  const { auth, setAuth } = useUserAuth();

  useEffect(() => {
    const storedLoginStatus = JSON.parse(localStorage.getItem("auth"));
    // if there is no stored token/auth in the local storage, we want to stop the code
    // execution so we dont end up in a rerender hell
    if (!storedLoginStatus) {
      return
    }

    setAuth(storedLoginStatus);
}, [setAuth]);

  async function handleLogout() {
    try {
      const response = await axios.post(
        'http://localhost:8080/logout',
        {},
        { withCredentials: true } 
      );
  
      if (response.status === 200) {
        setAuth(false);
        localStorage.removeItem("userID");
        localStorage.removeItem("auth");
        navigate("/login");
      } else {
        console.log("Logout unsuccessful:", response.data);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <div>
      {auth ? (
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
