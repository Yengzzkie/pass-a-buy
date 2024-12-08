import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
import { useUserData } from "../stores/useDataStore";
import { Link } from "react-router-dom";

const EditProfileCards = () => {
  const { userData } = useUserData();

  return (
    <div className="p-6">
      <p className="text-xl font-semibold mb-2">Settings</p>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card
          title="Account"
          subtitle="Manage profile"
          Icon={FiUser}
          href={`manage`}
        />
        <Card title="Email" subtitle="Manage email" href={`edit/${userData.id}/manage`} Icon={FiMail} />
        <Card title="Team" subtitle="Manage team" href="#" Icon={FiUsers} />
        <Card
          title="Billing"
          subtitle="Manage cards"
          href="#"
          Icon={FiCreditCard}
        />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <Link
      to={href}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-indigo-400 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-gray-200 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p>
    </Link>
  );
};

export default EditProfileCards;
