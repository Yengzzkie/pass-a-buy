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
import UserProfile from "./routes/UserProfile";
import PostForm from "./components/PostForm";
import DashboardContent from "./components/DashboardContent";
import EditProfile from "./routes/EditProfile";
import MyPosts from "./routes/MyPosts";
import VerifyEmail from "./routes/VerifiyEmail";

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
        children: [
          {
            path: "/dashboard",
            element: (
              <PrivateRoute>
                <DashboardContent />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/create",
            element: (
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            ),
          },
          {
            path: "dashboard/myposts",
            element: (
              <PrivateRoute>
                <MyPosts />
              </PrivateRoute>
            ),
          },
          {
            path: "dashboard/edit/:id",
            element: (
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            ),
          },
        ],
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
            <PostForm />
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
      {
        path: "/verify-email/:token",
        element: (
          <VerifyEmail />
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
