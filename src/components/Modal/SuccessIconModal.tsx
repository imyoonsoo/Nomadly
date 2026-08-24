import Button from "../Button/Button";
import Modal from "./Modal";
import type { SuccessModalProps } from "./type";
import Image from "next/image";

const SuccessIconModal = ({
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
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/successIcon.svg"
          alt="성공 아이콘"
          width={88}
          height={88}
          className="h-12.25 w-12.25 md:h-22 md:w-22"
        />
        <p className="text-16-bold md:text-18-bold text-center">{message}</p>
      </div>

      <Button
        variant="mainBlue"
        height="custom"
        className="h-10 w-45 rounded-xl px-5 py-1 text-[14px] md:h-11.75 md:w-50 md:px-10 md:py-3.5"
        onClick={onClose}
      >
        {buttonText}
      </Button>
    </Modal>
  );
};

export default SuccessIconModal;
