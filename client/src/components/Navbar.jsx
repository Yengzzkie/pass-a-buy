import { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../stores/useDataStore";
import { useLogout } from "../utils/useLogout";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

export default function NavbarDefault() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const { auth, setAuth } = useUserAuth();
  const { handleLogout } = useLogout();

  useEffect(() => {
    const storedLoginStatus = JSON.parse(localStorage.getItem("auth"));
    // if there is no stored token/auth in the local storage, we want to stop the code
    // execution so we dont end up in a rerender hell
    if (!storedLoginStatus) {
      return;
    }

    setAuth(storedLoginStatus);
  }, [setAuth]);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // by default this component uses "a" tags for the links which by default refreshes the
  // page when clicked, so I changed it to a function to navigate manually to corresponding
  // routes to avoid page refreshes
  const navList = (
    <ul className="nav-links mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 0.5C1.46957 0.5 0.960859 0.710714 0.585786 1.08579C0.210714 1.46086 0 1.96957 0 2.5V4.5C0 5.03043 0.210714 5.53914 0.585786 5.91421C0.960859 6.28929 1.46957 6.5 2 6.5H4C4.53043 6.5 5.03914 6.28929 5.41421 5.91421C5.78929 5.53914 6 5.03043 6 4.5V2.5C6 1.96957 5.78929 1.46086 5.41421 1.08579C5.03914 0.710714 4.53043 0.5 4 0.5H2ZM2 8.5C1.46957 8.5 0.960859 8.71071 0.585786 9.08579C0.210714 9.46086 0 9.96957 0 10.5V12.5C0 13.0304 0.210714 13.5391 0.585786 13.9142C0.960859 14.2893 1.46957 14.5 2 14.5H4C4.53043 14.5 5.03914 14.2893 5.41421 13.9142C5.78929 13.5391 6 13.0304 6 12.5V10.5C6 9.96957 5.78929 9.46086 5.41421 9.08579C5.03914 8.71071 4.53043 8.5 4 8.5H2ZM8 2.5C8 1.96957 8.21071 1.46086 8.58579 1.08579C8.96086 0.710714 9.46957 0.5 10 0.5H12C12.5304 0.5 13.0391 0.710714 13.4142 1.08579C13.7893 1.46086 14 1.96957 14 2.5V4.5C14 5.03043 13.7893 5.53914 13.4142 5.91421C13.0391 6.28929 12.5304 6.5 12 6.5H10C9.46957 6.5 8.96086 6.28929 8.58579 5.91421C8.21071 5.53914 8 5.03043 8 4.5V2.5ZM8 10.5C8 9.96957 8.21071 9.46086 8.58579 9.08579C8.96086 8.71071 9.46957 8.5 10 8.5H12C12.5304 8.5 13.0391 8.71071 13.4142 9.08579C13.7893 9.46086 14 9.96957 14 10.5V12.5C14 13.0304 13.7893 13.5391 13.4142 13.9142C13.0391 14.2893 12.5304 14.5 12 14.5H10C9.46957 14.5 8.96086 14.2893 8.58579 13.9142C8.21071 13.5391 8 13.0304 8 12.5V10.5Z"
            fill="#90A4AE"
          />
        </svg>
        <a onClick={() => navigate("/dashboard")} className="flex items-center">
          Dashboard
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="bg-indigo-600 border-none rounded-none px-4 py-2 lg:px-4 lg:py-4 h-[var(--nav-height)] w-full max-w-screen-full">
      <div className="container mx-auto flex items-center justify-between text-[#fff]">
        <Typography
          onClick={() => navigate("/")}
          className="mr-4 cursor-pointer py-1.5 font-bold"
        >
          <p>Pass-a-Buy</p>
        </Typography>
        <div className="hidden lg:block">{auth ? navList : null}</div>
        <div className="flex items-center gap-x-1">
          {auth ? (
            <Button
              onClick={handleLogout}
              size="sm"
              className="bg-[var(--navy-blue)] hover:text-[#ccc] hidden lg:inline-block border-none"
            >
              <span>Log out</span>
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              size="sm"
              className="bg-[var(--light-blue)] hover:text-[#ccc] hidden lg:inline-block border-none"
            >
              <span>Sign in</span>
            </Button>
          )}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </Collapse>
    </Navbar>
  );
}
