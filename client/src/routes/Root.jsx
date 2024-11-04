// import Navigation from "../components/Navigation";
import NavbarDefault from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Toast from "../components/Toast";

export default function Root() {

  return (
    <div>
      {/* <Navigation /> */}
      <NavbarDefault />
      <Toast />
      <Outlet />
    </div>
  );
}
