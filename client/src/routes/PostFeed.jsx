import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePostData, useUserAuth, useModal } from "../stores/useDataStore";
import { DialogDefault } from "../components/PostModal";
import { Button } from "flowbite-react";

function PostFeed() {
  const API = import.meta.env.VITE_API_URL
  const { isModal, setIsModal } = useModal();
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

      const response = await axios.get(`${API}/posts`, {
        withCredentials: true,
      });

      // sort posts from newest to oldest
      const sortedPost = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPostData(sortedPost);
      setInitialPostData(response.data);
      setAuth(authenticated.isAuthenticated);
    } catch (error) {
      const errorMessage = error.response;
      if (errorMessage.status === 403) {
        setIsModal(isModal); // This will open the modal automatically
      }
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

  const title = "Limited access";
  const cancelBtn = "Close";
  const confirmBtn = "Verify now";
  const message = (
    <>
      To access this content, please verify your email. To verify, go to{" "}
      <span className="font-semibold">Dashboard</span> &gt;
      <span className="font-semibold">Edit Profile</span> then click on{" "}
      <span className="font-semibold underline">Verify email</span>.
    </>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <DialogDefault title={title} message={message} onClose={() => navigate("/dashboard")} onVerify={() => navigate(`/dashboard/dashboard/edit/${userID.id}`)} cancel={cancelBtn} confirm={confirmBtn} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            Post Feed
          </h1>
          <div className="flex gap-2">
            <Button
              className="text-gray-700 border-2 border-gray-700"
              onClick={showAllPosts}
            >
              Show All
            </Button>
            <Button
              className="text-gray-700 border-2 border-gray-700"
              onClick={filterPosts}
            >
              Filter
            </Button>
            <Button
              className="text-gray-700 border-2 border-gray-700"
              onClick={reversePosts}
            >
              Reverse
            </Button>
          </div>
          {/* Feed container */}
          <div className="grid gap-6">
            {auth && postData ? (
              postData.map((post) => (
                <div
                  key={post.id}
                  className="bg-white shadow-lg rounded-lg p-4"
                >
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
                    <h1 className="bold text-2xl mb-4">{post.title}</h1>
                    <p>
                      <span className="font-semibold">From:</span> {post.origin}
                    </p>
                    <p>
                      <span className="font-semibold">To:</span>{" "}
                      {post.destination}
                    </p>
                    <p>
                      <span className="font-semibold">
                        Origin Departure Date:
                      </span>{" "}
                      {new Date(post.origin_departure).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">
                        Origin Arrival Date:
                      </span>{" "}
                      {new Date(post.origin_arrival).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">
                        Destination Departure Date:
                      </span>{" "}
                      {new Date(
                        post.destination_departure
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">
                        Destination Arrival Date:
                      </span>{" "}
                      {new Date(post.destination_arrival).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Item Type:</span>{" "}
                      {post.itemType}
                    </p>
                    <p>
                      <span className="font-semibold">Restricted Items:</span>{" "}
                      {post.restrictions}
                    </p>
                    <p>
                      <span className="font-semibold">Capacity:</span>{" "}
                      {post.capacity} kg
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
                  {/* Date Stamp */}
                  <div className="flex">
                    <span className="text-[#8f8f8f] font-thin italic text-sm block ml-auto">
                      Date created:{" "}
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      ,
                      {new Date(post.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostFeed;
