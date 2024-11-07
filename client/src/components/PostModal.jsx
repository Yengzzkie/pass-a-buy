import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useModal } from "../stores/useDataStore";
import { useNavigate } from "react-router-dom";

export function DialogDefault() {
  const navigate = useNavigate();
  const { isModal, setIsModal } = useModal();
  const handleOpen = () => setIsModal(isModal);

  return (
    <>
      <Dialog open={isModal} handler={handleOpen} size="xs">
        <DialogHeader>Limited access</DialogHeader>
        <DialogBody>
          To access this content, please verify your email.
          To verify, go to <span className="font-semibold">Dashboard</span> &gt; <span className="font-semibold">Edit Profile</span> then click
          on <span className="font-semibold underline">Verify email</span>.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              handleOpen()
              navigate("/dashboard")
            }}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleOpen()
              navigate("/dashboard/dashboard/edit")
            }}
          >
            <span>Verify now</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
