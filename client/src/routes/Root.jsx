import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";
import {
  UserContext,
  UserProfileContext,
  LoginStatusContext,
} from "../context/context";
import { useState } from "react";

export default function Root() {
  const [userCredentials, setUserCredentials] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <LoginStatusContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <UserContext.Provider value={{ userCredentials, setUserCredentials }}>
          <Navigation />
          <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
            <Outlet />
          </UserProfileContext.Provider>
        </UserContext.Provider>
      </LoginStatusContext.Provider>
    </div>
  );
}
