import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePostData, useUserCredentials } from "../stores/useDataStore";

function PostFeed() {
  const { postData, setPostData } = usePostData();
  const { loginStatus, setLoginStatus } = useUserCredentials();
  const navigate = useNavigate();
  const userID = JSON.parse(localStorage.getItem("userID"));
  
  async function fetchPosts() {
    try {
  
      if (!userID) {
        navigate("/");
        return;
      };

      const response = await axios.get(`http://localhost:8080/posts`, {
        withCredentials: true,
      });
      setPostData(response.data);
      setLoginStatus(userID.isAuthenticated);
      console.log(response)
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      console.error("Error fetching posts:", errorMessage);
    }
  }

  function filterPosts() {
    const filteredPost = postData.filter((post) => (post.userId === userID.id));
    setPostData(filteredPost)
  }

  function reversePosts() {
    const reversedPost = postData.reverse();
    setPostData(reversedPost);
  }
  
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Post Feed</h1>

      <button className="text-gray-700 border-2 border-gray-700" onClick={filterPosts}>Filter</button>
      <button className="text-gray-700 border-2 border-gray-700" onClick={reversePosts}>Reverse</button>

      {/* Feed container */}
      <div className="grid gap-6">
        {loginStatus && postData ? (
          postData.map((post) => (
            <div key={post.id} className="bg-white shadow-lg rounded-lg p-4">
              {/* Header: Poster Info */}
              <div className="flex items-center mb-4 relative">
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
                <p className="text-black m-auto">{post.userId === userID.id ? (<button className="border-gray-700">Edit</button>) : (null)}</p>
                {post.status === "PENDING" ? (<p className="text-[#ff8c28] font-semibold ml-auto mr-4">{post.status}</p>) : (<p className="text-[green] font-semibold absolute top-2 right-2">{post.status}</p>)}
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
