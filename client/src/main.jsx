import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import RegisterForm from "./routes/RegisterForm";
import App from "./routes/App";
import Dashboard from "./routes/Dashboard";
import PostFeed from "./routes/PostFeed";
import MyProfile from "./routes/MyProfile";
import NotFound from "./routes/404";
import PrivateRoute from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <App /> },
      { path: "/register", element: <RegisterForm /> },
      {
        path: "/dashboard",
        element: (

            <Dashboard />

        ),
      },
      {
        path: "/posts",
        element: (

            <PostFeed />

        ),
      },
      {
        path: "/myprofile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
