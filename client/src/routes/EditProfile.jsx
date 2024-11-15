import { DialogDefault } from "../components/PostModal";
import { useUserData } from "../stores/useDataStore";
import { useModal } from "../stores/useDataStore";
import { useLogout } from "../utils/useLogout";
import { Button } from "@material-tailwind/react";
import { useToast } from "../utils/useToast";
import axios from "axios";
import { useState, useEffect } from "react";

export default function EditProfile() {
  const { userData } = useUserData();
  const { isModal, setIsModal } = useModal();
  const { handleLogout } = useLogout();
  const { notifySuccess } = useToast();
  const [countdown, setCountdown] = useState(0); 

  async function handleDeleteUser() {
    handleLogout();
    await axios.delete(`http://localhost:8080/users/delete/${userData.id}`, {
      withCredentials: true,
    });
  }

  async function handleVerifyEmail() {
    setCountdown(30); 
    try {
      // await axios.post(`http://localhost:8080/verify-email/${userData.id}`, {
      //   withCredentials: true,
      // });
      notifySuccess(`Verification email sent to ${userData.email}.`);
    } catch (error) {
      console.error(error);
    }
  }

  // Countdown timer effect
  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Content for modal warning
  const title = "Warning";
  const cancelBtn = "Cancel";
  const confirmBtn = "Proceed";
  const message = (
    <>
      <span className="text-red-500 font-semibold">
        This action is irreversible
      </span>
      .
      <p className="mt-4">
        Click the <span className="font-semibold">Cancel</span> button if you
        changed your mind, or click{" "}
        <span className="font-semibold">Confirm</span> to proceed.
      </p>
    </>
  );

  return (
    <div>
      <DialogDefault
        title={title}
        message={message}
        onVerify={handleDeleteUser}
        cancel={cancelBtn}
        confirm={confirmBtn}
      />
      <input type="text" value={userData.firstName} /> <button>Save</button>
      <Button onClick={() => setIsModal(isModal)}>Delete Account</Button>
  
      {userData.emailVerified === true ? (
        <span className="bg-[#c4febf] text-[#2E7D32] p-2.5 rounded-md border border-[#2E7D32]">Email Verified</span>
      ) : (
        <>
          <Button onClick={handleVerifyEmail} disabled={countdown > 0}>
            Verify Email
          </Button>
          {countdown > 0 && (
            <span>Wait {countdown}s before sending another email</span>
          )}
        </>
      )}
    </div>
  );
  
}
