import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDataStore from "../stores/useDataStore";
import axios from "axios";

export default function Dashboard() {
  const { userData, setUserData, loginStatus, setLoginStatus } = useDataStore();
  const navigate = useNavigate();

  async function fetchUserProfile() {
    const userID = JSON.parse(localStorage.getItem("userID"));
    
    if (!userID) {
      navigate("/");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/users/myprofile/${userID.id}`,
        { withCredentials: true }
      );
      setLoginStatus(userID.status);
      setUserData(response.data);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      console.error("Error logging in:", errorMessage);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <h1 className="text-center">Home Page</h1>
      {loginStatus && userData ? (
        <div>
          <h1 className="text-5xl">Welcome, {userData.name}</h1>
          <p>Email: {userData.email}</p>
          <p>Location: {userData.location}</p>
          <p>Mobile: {userData.contact}</p>

          {/* Posts Table */}
          <h2 className="text-3xl mt-8 mb-4">Posts</h2>
          <table className="text-[#747474] table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Travelling From</th>
                <th className="border border-gray-300 p-2">Travelling To</th>
              </tr>
            </thead>
            <tbody>
              {userData.posts.map((post) => (
                <tr key={post.id}>
                  <td className="border border-gray-300 p-2">
                    {post.fromLocation}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {post.toLocation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
