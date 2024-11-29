import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth, useUserData } from "../stores/useDataStore";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/SideBar";
import LoadingProfile from "../components/LoadingProfile";

export default function Dashboard() {
  const API = import.meta.env.VITE_API_URL
  const { userData, setUserData } = useUserData();
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
        .get(`${API}/users/myprofile/${userID.id}`, {
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
    <div className="dashboard-height flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar userData={userData} />

      {/* Main content */}
      <div className="flex-grow p-6 overflow-y-auto">
        {loading ? <LoadingProfile /> : <Outlet className="h-[50vh]" />}
      </div>
    </div>
  );
}