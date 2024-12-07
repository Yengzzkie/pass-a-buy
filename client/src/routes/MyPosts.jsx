import { useEffect, useState } from "react";
import { useUserData, useUserPostsData } from "../stores/useDataStore";
import SpringModal from "../components/ui/components/Modal";
import axios from "axios";
import { useParams } from "react-router-dom";

function MyPosts() {
  const API = import.meta.env.VITE_NODE_ENV === 'development' ? 'http://localhost:8080' : import.meta.env.VITE_API_URL
  const { userData } = useUserData();
  const { posts, setPosts } = useUserPostsData();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const { userId } = useParams();
  // const [posts, setPosts] = useState([]);
  const [loading, setIsLoading] = useState(false);

  // Fetch user's posts
  async function fetchUserPosts() {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API}/posts/user/${userId}`, { withCredentials: true });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserPosts();
  }, [userData, userId]);

  // Open modal for confirmation
  function openModal(postId) {
    setSelectedPostId(postId);
    setIsOpen(true);
  }

  // Handle post deletion
  async function handleDeletePost() {
    if (!selectedPostId) return;
    try {
      await axios.delete(`${API}/posts/${selectedPostId}`, { withCredentials: true });
      fetchUserPosts();
      setIsOpen(false); 
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  // Modal content
  const title = "Hold up!";
  const cancelBtn = "Cancel";
  const confirmBtn = "Confirm";
  const message = (
    <>
      <span className="text-red-500 font-semibold">This action is irreversible</span>.
      <p className="mt-4">
        Click the <span className="font-semibold">Cancel</span> button if you changed your mind, or click{" "}
        <span className="font-semibold">Confirm</span> to proceed.
      </p>
    </>
  );

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        !posts || posts.length === 0 ? (
          <p>You have no posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white shadow-lg rounded-lg p-4 mb-6">
              {/* Header: Poster Info */}
              <div className="flex items-center mb-4 relative">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${userData.firstName}${userData.lastName}&background=random`}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {post.firstName} {post.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">{post.email}</p>
                </div>
  
                {/* Post Status */}
                <div className="flex items-center w-full">
                  <p
                    className={`${
                      post.status === "ACTIVE"
                        ? "text-green-500"
                        : post.status === "COMPLETED"
                        ? "text-blue-500"
                        : "text-orange-400"
                    } font-semibold ml-auto mr-4`}
                  >
                    {post.status}
                  </p>
                  <button
                    onClick={() => openModal(post.id)}
                    className="bg-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {/* Post Details */}
              <div className="text-gray-700 mb-4">
                <h1 className="bold text-2xl mb-4">{post.title}</h1>
                <p><span className="font-semibold">From:</span> {post.origin}</p>
                <p><span className="font-semibold">To:</span> {post.destination}</p>
                <p><span className="font-semibold">Origin Departure Date:</span> {new Date(post.origin_departure).toLocaleDateString()}</p>
                <p><span className="font-semibold">Origin Arrival Date:</span> {new Date(post.origin_arrival).toLocaleDateString()}</p>
                <p><span className="font-semibold">Destination Departure Date:</span> {new Date(post.destination_departure).toLocaleDateString()}</p>
                <p><span className="font-semibold">Destination Arrival Date:</span> {new Date(post.destination_arrival).toLocaleDateString()}</p>
                <p><span className="font-semibold">Item Type:</span> {post.itemType}</p>
                <p><span className="font-semibold">Restricted Items:</span> {post.restrictions}</p>
                <p><span className="font-semibold">Capacity:</span> {post.capacity} kg</p>
                <p><span className="font-semibold">Fee:</span> ${post.fee}</p>
              </div>
  
              {/* Date Stamp */}
              <div className="flex">
                <span className="text-[#8f8f8f] font-thin italic text-sm block ml-auto">
                  Date created:{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  , {new Date(post.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          ))
        )
      )}

      {/* Conditionally Render Modal */}
      {isOpen && (
        <SpringModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onVerify={handleDeletePost}
          title={title}
          cancelBtn={cancelBtn}
          confirmBtn={confirmBtn}
          message={message}
        />
      )}
    </div>
  );
}

export default MyPosts;
