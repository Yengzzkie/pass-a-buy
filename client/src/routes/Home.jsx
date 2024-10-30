import { useContext, useEffect } from "react";
import { UserProfileContext, LoginStatusContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const { userProfile, setUserProfile } = useContext(UserProfileContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginStatusContext);
  const navigate = useNavigate();
  // const { userCredentials } = useContext(UserContext);


  async function fetchUserProfile() {
    const userID = JSON.parse(localStorage.getItem("userID"));
    
    if (!userID) {
      navigate("/")
      return
    } 
    
    setIsLoggedIn(userID.status);
    
    try {
      const userData = await axios.get(
        `http://localhost:8080/users/myprofile/${userID.id}`,
        { withCredentials: true }
      );
      setUserProfile(userData.data);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      console.error("Error logging in:", errorMessage);
      throw error;
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <h1 className="text-center">Home Page</h1>
      {isLoggedIn ? (
        <div>
          <h1 className="text-5xl">Welcome, {userProfile.name}</h1>
          <p>Email: {userProfile.email}</p>
          <p>Location: {userProfile.location}</p>
          <p>Mobile: {userProfile.contact}</p>

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
              {userProfile.posts.map((post) => (
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
