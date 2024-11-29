import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useModal } from "../stores/useDataStore";

export function DialogDefault({ title, message, onClose, onVerify, cancel, confirm }) {
  const { isModal, setIsModal } = useModal();
  const handleOpen = () => setIsModal(isModal);

  return (
    <>
      <Dialog open={isModal} handler={handleOpen} size="xs">
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>
          {message}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              handleOpen()
              if (onClose) onClose();
            }}
            className="mr-1"
          >
            <span>{cancel}</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleOpen()
              if (onVerify) onVerify();
            }}
          >
            <span>{confirm}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
