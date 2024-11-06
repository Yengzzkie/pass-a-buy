import { useUserData } from "../stores/useDataStore";

export default function EditProfile() {
  const { userData } = useUserData();

  return (
    <div>
      <input type="text" value={userData.firstName} /> <button>Save</button>
    </div>
  )
}
