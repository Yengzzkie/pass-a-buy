import { DialogDefault } from "../components/PostModal";
import { useUserData } from "../stores/useDataStore";
import { useModal } from "../stores/useDataStore";
import { useLogout } from "../utils/useLogout";
import { Button } from "@material-tailwind/react";
import axios from "axios";

export default function EditProfile() {
  const { isModal, setIsModal } = useModal();
  const { userData } = useUserData();
  const { handleLogout } = useLogout();

  async function handleDeleteUser() {
    handleLogout();
    await axios.post(`http://localhost:8080/users/delete/${userData.id}`, {withCredentials: true});
  }

  const title = "Warning";
  const cancelBtn = "Cancel";
  const confirmBtn = "Proceed";
  const message = (
    <>
      <span className="text-red-500 font-semibold">This action is irreversible</span>.
      <p className="mt-4">
        Click the <span className="font-semibold">Cancel</span> button if you changed your mind,
        or click <span className="font-semibold">Confirm</span> to proceed.
      </p>
    </>
    
  );

  return (
    <div>
      <DialogDefault title={title} message={message} onVerify={handleDeleteUser} cancel={cancelBtn} confirm={confirmBtn} />
      <input type="text" value={userData.firstName} /> <button>Save</button>
      <Button onClick={() => setIsModal(isModal)}>Delete Account</Button>
    </div>
  )
}