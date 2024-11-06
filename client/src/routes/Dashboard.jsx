import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth, useUserData } from "../stores/useDataStore";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/SideBar";

export default function Dashboard() {
  const { setUserData } = useUserData();
  const { setAuth } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authenticated = JSON.parse(localStorage.getItem("auth"));
  const userID = JSON.parse(localStorage.getItem("userID"));

  async function fetchUserProfile() {
    try {
      if (!authenticated) {
        navigate("/");
        return;
      }
      setLoading(true);

      axios
        .get(`http://localhost:8080/users/myprofile/${userID.id}`, {
          withCredentials: true,
        })
        .then((data) => {
          setAuth(authenticated.isAuthenticated);
          setUserData(data.data);
        });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      console.error("Error logging in:", errorMessage);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow p-6 overflow-y-auto h-screen">
        {loading ? <h1 className="text-white">Loading...</h1> : <Outlet />}
      </div>
    </div>
  );
}
