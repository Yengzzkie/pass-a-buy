import NavbarDefault from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Toast from "../components/Toast";

export default function Root() {
  return (
    <div>
      <NavbarDefault />
      <Toast />
      <Outlet />
    </div>
  );
}
