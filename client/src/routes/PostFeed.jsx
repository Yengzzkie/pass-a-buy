import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useDataStore from "../stores/useDataStore";

function PostFeed() {
  const { loginStatus, setLoginStatus, postData, setPostData } = useDataStore();
  const navigate = useNavigate();
  
  async function fetchPosts() {
    const userID = JSON.parse(localStorage.getItem("userID"));
  
    if (!userID) {
      navigate("/");
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:8080/posts`, {
        withCredentials: true,
      });
      setLoginStatus(userID.status);
      setPostData(response.data);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      console.error("Error fetching posts:", errorMessage);
    }
  }
  
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Post Feed</h1>

      {/* Feed container */}
      <div className="grid gap-6">
        {loginStatus && postData ? (
          postData.map((post) => (
            <div key={post.id} className="bg-white shadow-lg rounded-lg p-4">
              {/* Header: Poster Info */}
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${post.user.name}&background=random`}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {post.user.name}
                  </h2>
                  <p className="text-sm text-gray-500">{post.user.email}</p>
                </div>
              </div>
  
              {/* Post Details */}
              <div className="text-gray-700 mb-4">
                <p>
                  <span className="font-semibold">From:</span> {post.fromLocation}
                </p>
                <p>
                  <span className="font-semibold">To:</span> {post.toLocation}
                </p>
                <p>
                  <span className="font-semibold">Travel Date:</span>{" "}
                  {new Date(post.travelDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Return Date:</span>{" "}
                  {new Date(post.returnDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Item Type:</span>{" "}
                  {post.itemType}
                </p>
                <p>
                  <span className="font-semibold">Capacity:</span> {post.capacity}{" "}
                  kg
                </p>
                <p>
                  <span className="font-semibold">Fee:</span> ${post.fee}
                </p>
              </div>
  
              {/* Additional Details */}
              <span className="text-gray-700 font-semibold">
                Additional Notes:
              </span>
              {post.additionalDetails && (
                <div className="bg-gray-50 p-3 rounded-lg text-gray-600">
                  <p>{post.additionalDetails}</p>
                </div>
              )}
            </div>
          ))
        ) : (<p>Loading...</p>)}
      </div>
    </div>
  );
}

export default PostFeed;
