import { useState } from "react";
import {
  FiChevronDown,
  FiChevronsRight,
  FiClipboard,
  FiEdit,
  FiGrid,
  FiPenTool,
  FiShoppingCart,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCircleQuestion } from "react-icons/fa6";
import { useUserPostsData } from "../stores/useDataStore"

const Sidebar = ({ userData }) => {
  return (
    <div className="flex bg-indigo-50 ">
      <Sidebars userData={userData} />
    </div>
  );
};

const Sidebars = ({ userData }) => {
  const { posts } = useUserPostsData()
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className={`sticky top-0 h-[90vh] shrink-0 border-r border-slate-300 bg-white p-2 ${
        open ? "w-screen lg:w-[240px]" : "w-fit"
      }`}
    >
      <TitleSection userData={userData} open={open} />
      <div className="space-y-1">
        <Link to="/dashboard">
          <Option
            Icon={FiGrid}
            title="Dashboard"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        </Link>
        <Link to={`myposts/${userData.id}`}>
          <Option
            Icon={FiPenTool}
            title="My Posts"
            selected={selected}
            setSelected={setSelected}
            open={open}
            notifs={posts.length !== 0 ? posts.length : null}
          />
        </Link>
        <Link to="posts">
          <Option
            Icon={FiClipboard}
            title="View All Posts"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        </Link>
        <Option
          Icon={FiShoppingCart}
          title="Products"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiTag}
          title="Tags"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Link to={`edit/${userData.id}`}>
          <Option
            Icon={FiEdit}
            title="Edit Profile"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        </Link>
        <Link to="users">
          <Option
            Icon={FiUsers}
            title="Members"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        </Link>
        <Link to="dashboard/users">
          <Option
            Icon={FaCircleQuestion}
            title="FAQ"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        </Link>
      </div>
      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs }) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors px-4 ${selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
    >
      <motion.div
        layout
        className="grid h-full w-2 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium ml-5"
        >
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open, userData }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo userData={userData} />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">
                Hello, {userData.firstName}
              </span>
              <span className="block text-xs text-slate-500 mt-1 truncate">
                {userData.email}
              </span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};

const Logo = ({ userData }) => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.div
      layout
      className="grid size-8 shrink-0 place-content-center"
    >
      <img
        src={`https://ui-avatars.com/api/?name=${userData.firstName}-${userData.lastName}&background=random`}
        alt="User Avatar"
        className=" rounded-full"
      />
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default Sidebar;
