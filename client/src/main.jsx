import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import RegisterForm from "./routes/RegisterForm";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import PostFeed from "./routes/PostFeed";
import Users from "./routes/Users";
import NotFound from "./routes/404";
import Home from "./routes/Home";
import PrivateRoute from "./routes/PrivateRoute";
import CreatePost from "./routes/CreatePost";
import UserProfile from "./routes/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "*", element: <NotFound /> },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: "/posts",
        element: (
          <PrivateRoute>
            <PostFeed />
          </PrivateRoute>
        ),
      },
      {
        path: "/posts/create",
        element: (
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/:userId",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// (
//   <PrivateRoute>
//   </PrivateRoute>
// )
