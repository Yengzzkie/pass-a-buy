import { Outlet } from "react-router-dom";
import EditProfileCards from "../components/EditProfileCards";

export default function EditProfile() {

  return (
    <div>
      <EditProfileCards />
      <Outlet className="h-[50vh]" />
    </div>
  );
}
