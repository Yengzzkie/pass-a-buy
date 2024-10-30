import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";
import {
  UserContext,
  UserProfileContext,
  LoginStatusContext,
  PostsContext,
} from "../context/context";
import { useState } from "react";

export default function Root() {
  const [userCredentials, setUserCredentials] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);

  return (
    <div>
      <LoginStatusContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <UserContext.Provider value={{ userCredentials, setUserCredentials }}>
          <Navigation />
          <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
            <PostsContext.Provider value={{ posts, setPosts }}>
              <Outlet />
            </PostsContext.Provider>
          </UserProfileContext.Provider>
        </UserContext.Provider>
      </LoginStatusContext.Provider>
    </div>
  );
}
