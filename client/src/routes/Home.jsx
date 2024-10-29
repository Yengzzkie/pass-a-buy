import { useContext } from "react";
import { UserProfileContext } from "../context/context";

export default function Home() {
  const { userProfile } = useContext(UserProfileContext);


  return (
    <div>
      <h1 className="text-center">Home Page</h1>
      {userProfile ? (
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
              {userProfile.posts.map(post => (
                <tr key={post.id}>
                  <td className="border border-gray-300 p-2">{post.fromLocation}</td>
                  <td className="border border-gray-300 p-2">{post.toLocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}
