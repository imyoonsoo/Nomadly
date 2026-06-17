import Button from "../Button/Button";
import Modal from "./Modal";
import type { WarningModalProps } from "./type";
import Image from "next/image";

const WarningModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  buttonTextLeft = "아니오",
  buttonTextRight = "네",
}: WarningModalProps) => {
  return (
    <Modal
      className="flex flex-col gap-5 items-center justify-center"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/warningIcon.svg"
          alt="경고 아이콘"
          width={88}
          height={88}
          className="w-[49px] h-[49px] md:w-22 md:h-22"
        />
        <p className="text-center text-16-bold md:text-18-bold whitespace-pre-line">
          {message}
        </p>
      </div>

      <div className="flex gap-2 md:gap-3 justify-center items-center">
        <Button
          variant="whitenGray"
          height="custom"
          className="w-28 h-10 px-5 py-1 md:px-10 md:py-3 text-[14px] rounded-xl md:w-34 md:h-12 md:py-[14px]"
          onClick={onClose}
        >
          {buttonTextLeft}
        </Button>
        <Button
          variant="mainBlue"
          height="custom"
          className="w-28 h-10 px-5 py-1 md:px-10 md:py-3 text-[14px] rounded-xl md:w-34 md:h-12 md:py-[14px] "
          onClick={onConfirm}
        >
          {buttonTextRight}
        </Button>
      </div>
    </Modal>
  );
};

export default WarningModal;
