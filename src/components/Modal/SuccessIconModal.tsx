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
      className="flex flex-col gap-5 items-center justify-center"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/successIcon.svg"
          alt="성공 아이콘"
          width={88}
          height={88}
          className="w-[49px] h-[49px] md:w-[88px] md:h-[88px]"
        />
        <p className="text-center text-16-bold md:text-18-bold">{message}</p>
      </div>

      <Button
        variant="mainBlue"
        height="custom"
        className="w-[180px] h-[41px] px-[20px] py-[4px] md:px-10 md:py-3 text-[14px] rounded-xl md:w-[200px] md:h-[47px] md:py-[14px]"
        onClick={onClose}
      >
        {buttonText}
      </Button>
    </Modal>
  );
};

export default SuccessIconModal;
