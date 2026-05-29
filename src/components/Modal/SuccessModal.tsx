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
        className="w-[180px] h-[41px] md:w-[200px] md:h-[47px]"
        onClick={onClose}
      >
        {buttonText}
      </Button>
    </Modal>
  );
};

export default SuccessModal;
