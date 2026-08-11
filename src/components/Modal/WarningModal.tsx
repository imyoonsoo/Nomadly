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
      className="flex flex-col items-center justify-center gap-5"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/warningIcon.svg"
          alt="경고 아이콘"
          width={88}
          height={88}
          className="h-[49px] w-[49px] md:h-22 md:w-22"
        />
        <p className="text-16-bold md:text-18-bold text-center whitespace-pre-line">
          {message}
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 md:gap-3">
        <Button
          variant="whitenGray"
          height="custom"
          className="h-10 w-28 rounded-xl px-5 py-1 text-[14px] md:h-[47px] md:w-34 md:px-10 md:py-3 md:py-[14px]"
          onClick={onClose}
        >
          {buttonTextLeft}
        </Button>
        <Button
          variant="mainBlue"
          height="custom"
          className="h-10 w-28 rounded-xl px-5 py-1 text-[14px] md:h-12 md:w-34 md:px-10 md:py-3 md:py-[14px]"
          onClick={onConfirm}
        >
          {buttonTextRight}
        </Button>
      </div>
    </Modal>
  );
};

export default WarningModal;
