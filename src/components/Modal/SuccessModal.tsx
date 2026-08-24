import Button from "../Button/Button";
import Modal from "./Modal";
import type { SuccessModalProps } from "./type";

const SuccessModal = ({
  isOpen,
  onClose,
  message,
  buttonText = "확인",
}: SuccessModalProps) => {
  return (
    <Modal
      className="flex flex-col items-center justify-center gap-5"
      isOpen={isOpen}
      onClose={onClose}
    >
      <p className="text-16-bold md:text-18-bold">{message}</p>
      <Button
        variant="mainBlue"
        height="custom"
        className="h-10 w-45 rounded-xl px-5 py-1 text-[14px] md:h-11.75 md:w-50 md:px-10 md:py-3 md:py-3.5"
        onClick={onClose}
      >
        {buttonText}
      </Button>
    </Modal>
  );
};

export default SuccessModal;
