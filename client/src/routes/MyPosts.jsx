import { useUserData } from "../stores/useDataStore";

function MyPosts() {
  const { userData } = useUserData();

  return (
    <div>
      {userData.posts.map((post) => (
        <div key={post.id} className="bg-white shadow-lg rounded-lg p-4 mb-6">
          {/* Header: Poster Info */}
          <div className="flex items-center mb-4 relative">
            <div className="flex-shrink-0 mr-4">
              <img
                src={`https://ui-avatars.com/api/?name=${post.firstName}${post.lastName}&background=random`}
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
              <span className="font-semibold">To:</span> {post.destination}
            </p>
            <p>
              <span className="font-semibold">Origin Departure Date:</span>{" "}
              {new Date(post.origin_departure).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Origin Arrival Date:</span>{" "}
              {new Date(post.origin_arrival).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Destination Departure Date:</span>{" "}
              {new Date(post.destination_departure).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Destination Arrival Date:</span>{" "}
              {new Date(post.destination_arrival).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Item Type:</span> {post.itemType}
            </p>
            <p>
              <span className="font-semibold">Restricted Items:</span>{" "}
              {post.restrictions}
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
          <span className="text-gray-700 font-semibold">Additional Notes:</span>
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
      ))}
    </div>
  );
}

export default MyPosts;
