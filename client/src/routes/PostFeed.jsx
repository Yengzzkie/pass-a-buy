import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePostData, useUserAuth } from "../stores/useDataStore";

function PostFeed() {
  const { postData, setPostData } = usePostData();
  const { auth, setAuth } = useUserAuth();
  const [initialPostData, setInitialPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userID = JSON.parse(localStorage.getItem("userID"));
  const authenticated = JSON.parse(localStorage.getItem("auth"));

  async function fetchPosts() {
    try {
      setLoading(true);
      // Check for userID validity before fetching posts
      if (!userID) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`http://localhost:8080/posts`, {
        withCredentials: true,
      });
      setPostData(response.data.reverse());
      setInitialPostData(response.data);
      setAuth(authenticated.isAuthenticated); 
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      console.error("Error fetching posts:", errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // This will get the posts of the user
  function filterPosts() {
    if (userID) {
      const filteredPost = postData.filter((post) => post.userId === userID.id);
      setPostData(filteredPost);
    }
  }

  // Show all posts
  function showAllPosts() {
    setPostData(initialPostData);
  }

  // Reverse posts
  function reversePosts() {
    const reversedPost = postData.reverse();
    setPostData(reversedPost);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loading ? (<p>Loading...</p>) : (
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">Post Feed</h1>
          <button
            className="text-gray-700 border-2 border-gray-700"
            onClick={showAllPosts}
          >
            Show All
          </button>
          <button
            className="text-gray-700 border-2 border-gray-700"
            onClick={filterPosts}
          >
            Filter
          </button>
          <button
            className="text-gray-700 border-2 border-gray-700"
            onClick={reversePosts}
          >
            Reverse
          </button>
          {/* Feed container */}
          <div className="grid gap-6">
            {auth && postData ? (
              postData.map((post) => (
                <div key={post.id} className="bg-white shadow-lg rounded-lg p-4">
                  {/* Header: Poster Info */}
                  <div className="flex items-center mb-4 relative">
                    <div className="flex-shrink-0 mr-4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${post.user.firstName}${post.user.lastName}&background=random`}
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {post.user.firstName} {post.user.lastName}
                      </h2>
                      <p className="text-sm text-gray-500">{post.user.email}</p>
                    </div>
                    <p className="text-black m-auto">
                      {post.userId === userID?.id ? (
                        <button className="border-gray-700">Edit</button>
                      ) : null}
                    </p>
                    {/* Post Status */}
                    {post.status === "PENDING" ? (
                      <p className="text-[#ff8c28] font-semibold ml-auto mr-4">
                        {post.status}
                      </p>
                    ) : (
                      <p className="text-[green] font-semibold absolute top-2 right-2">
                        {post.status}
                      </p>
                    )}
                  </div>
                  {/* Post Details */}
                  <div className="text-gray-700 mb-4">
                    <p><span className="font-semibold">From:</span> {post.fromLocation}</p>
                    <p><span className="font-semibold">To:</span> {post.toLocation}</p>
                    <p><span className="font-semibold">Travel Date:</span> {new Date(post.travelDate).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Return Date:</span> {new Date(post.returnDate).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Item Type:</span> {post.itemType}</p>
                    <p><span className="font-semibold">Capacity:</span> {post.capacity} kg</p>
                    <p><span className="font-semibold">Fee:</span> ${post.fee}</p>
                  </div>
                  {/* Additional Details */}
                  <span className="text-gray-700 font-semibold">Additional Notes:</span>
                  {post.additionalDetails && (
                    <div className="bg-gray-50 p-3 rounded-lg text-gray-600">
                      <p>{post.additionalDetails}</p>
                    </div>
                  )}
                  {/* Date Stamp */}
                  <div className="flex">
                    <span className="text-[#8f8f8f] font-thin italic text-sm block ml-auto">
                      Date created: {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}, 
                      {new Date(post.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>)}
    </div>
  );
}

export default PostFeed;
