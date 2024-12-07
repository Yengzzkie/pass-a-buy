import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function UserProfile() {
  const API = import.meta.env.VITE_NODE_ENV === 'development' ? 'http://localhost:8080' : import.meta.env.VITE_API_URL
  const { userId } = useParams();
  const [userData, setUserData] = useState({});

  async function fetchUserProfile() {
    const user = await axios.get(`${API}/users/search/${userId}`, { withCredentials: true });
    console.log(user.data)
    setUserData(user.data);
  }

  useEffect(() => {
    fetchUserProfile();
  }, [])

  return (
    <div className="px-8 py-4">
      <h1>{userData.firstName} </h1>
    </div>
  )
}

