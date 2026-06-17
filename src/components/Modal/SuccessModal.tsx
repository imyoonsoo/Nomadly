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
      className="flex flex-col gap-5 items-center justify-center"
      isOpen={isOpen}
      onClose={onClose}
    >
      <p className="text-16-bold md:text-18-bold">{message}</p>
      <Button
        variant="mainBlue"
        height="custom"
        className="w-45 h-10 px-5 py-1 md:px-10 md:py-3 text-[14px] rounded-xl md:w-50 md:h-[47px] md:py-[14px]"
        onClick={onClose}
      >
        {buttonText}
      </Button>
    </Modal>
  );
};

export default SuccessModal;
