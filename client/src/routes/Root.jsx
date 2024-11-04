// import Navigation from "../components/Navigation";
import NavbarDefault from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Root() {

  return (
    <div>
      {/* <Navigation /> */}
      <NavbarDefault />
      <Outlet />
    </div>
  );
}
