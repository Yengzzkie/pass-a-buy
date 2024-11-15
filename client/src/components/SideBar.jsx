// Sidebar.js
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreateIcon from "@mui/icons-material/Create";
import BarChartIcon from "@mui/icons-material/BarChart";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useUserData } from "../stores/useDataStore";

export default function Sidebar() {
  const { userData } = useUserData();
  const {firstName, lastName} = userData;

  return (
    <div className="sidebar min-w-64 w-64 bg-purple-800 text-white flex flex-col">
      <img src={`https://ui-avatars.com/api/?name=${firstName}${lastName}&background=random`} alt="avatar" className="w-4/12 rounded-full mx-auto my-4" />
      <p className="text-xl font-bold py-4 px-6 border-b border-purple-700 text-center">
        Hi {firstName} {lastName}
      </p>
      <nav className="flex-1 p-4 space-y-4">
        <NavLink
          to="/dashboard"
          className="flex items-center space-x-2 p-2 hover:bg-purple-600 rounded"
        >
          <DashboardIcon />
          <span>Dashboard Home</span>
        </NavLink>
        <NavLink
          to="dashboard/myposts"
          className="flex items-center space-x-2 p-2 hover:bg-purple-600 rounded"
        >
          <BarChartIcon />
          <span>My Posts</span>
        </NavLink>
        <NavLink
          to="/dashboard/create"
          className="flex items-center space-x-2 p-2 hover:bg-purple-600 rounded"
        >
          <CreateIcon />
          <span>Create Post</span>
        </NavLink>
        <NavLink
          to={`dashboard/edit/${userData.id}`}
          className="flex items-center space-x-2 p-2 hover:bg-purple-600 rounded"
        >
          <EditNoteIcon />
          <span>Edit Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}
