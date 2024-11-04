import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function UserProfile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});

  async function fetchUserProfile() {
    const user = await axios.get(`http://localhost:8080/users/search/${userId}`, { withCredentials: true });
    console.log(user.data)
    setUserData(user.data);
  }

  useEffect(() => {
    fetchUserProfile();
  }, [])

  return (
    <div>
      <h1>{userData.name}</h1>
    </div>
  )
}

