import { useUserData } from "../stores/useDataStore";
import { useLogout } from "../utils/useLogout";
import { Button } from "@material-tailwind/react";
import { useToast } from "../utils/useToast";
import { useState, useEffect } from "react";
import axios from "axios";
import SpringModal from "../components/ui/components/Modal";

export default function EditProfile() {
  const API = import.meta.env.VITE_NODE_ENV === 'development' ? 'http://localhost:8080' : import.meta.env.VITE_API_URL
  const { userData } = useUserData();
  const { handleLogout } = useLogout();
  const { notifySuccess } = useToast();
  const [countdown, setCountdown] = useState(0); 
  const [isOpen, setIsOpen] = useState(false);

  // will delete user's account
  async function handleDeleteUser() {
    handleLogout();
    await axios.delete(`${API}/users/delete/${userData.id}`, {
      withCredentials: true,
    });
  }

  // sends verification email to user
  async function handleVerifyEmail() {
    setCountdown(30); 
    try {
      await axios.post(`${API}/verify-email/${userData.id}`, {
        withCredentials: true,
      });
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
        Are you sure you want to delete your account?
      </p>
      <p><span className="font-semibold">Confirm</span> to proceed.</p>
    </>
  );

  return ( 
    <div>
      {isOpen && (
        <SpringModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onVerify={handleDeleteUser}
          title={title}
          cancelBtn={cancelBtn}
          confirmBtn={confirmBtn}
          message={message}
        />
      )}
      <input type="text" value={userData.firstName} /> <button>Save</button>
      <Button onClick={() => setIsOpen(!isOpen)}>Delete Account</Button>
  
      {userData.emailVerified === true ? (
        // if user is already verified, render this
        <span className="bg-[#c4febf] text-[#2E7D32] p-2.5 rounded-md border border-[#2E7D32]">Email Verified</span>
      ) : (
        // if not, then render the verify email button
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
