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
          className="h-[49px] w-[49px] md:h-22 md:w-22"
        />
        <p className="text-16-bold md:text-18-bold text-center">{message}</p>
      </div>

      <Button
        variant="mainBlue"
        height="custom"
        className="h-10 w-45 rounded-xl px-5 py-1 text-[14px] md:h-[47px] md:w-50 md:px-10 md:py-3 md:py-[14px]"
        onClick={onClose}
      >
        {buttonText}
      </Button>
    </Modal>
  );
};

export default SuccessIconModal;
