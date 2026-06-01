import Button from "../Button/Button";
import Modal from "./Modal";
import type { WarningModalProps } from "./type";
import Image from "next/image";

const WarningModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  buttonTextLeft = "아니요",
  buttonTextRight = "네",
}: WarningModalProps) => {
  return (
    <Modal
      className="flex flex-col gap-5 items-center justify-center"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <Image
          src="/warning-icon.svg"
          alt="경고 아이콘"
          width={88}
          height={88}
          className="w-[49px] h-[49px] md:w-[88px] md:h-[88px]"
        />
        <p className="text-center text-16-bold md:text-18-bold">{message}</p>
      </div>

      <div className="flex gap-2 md:gap-3 justify-center items-center">
        <Button
          styleVariant="fillWhite"
          heightSize="custom"
          className="w-[113px] h-[41px] px-10 py-3 text-[14px] rounded-xl md:w-[135px] md:h-[47px] md:py-[14px]"
          onClick={onClose}
        >
          {buttonTextLeft}
        </Button>
        <Button
          styleVariant="fillPrimaryBlue"
          heightSize="custom"
          className="w-[113px] h-[41px] px-10 py-3 text-[14px] rounded-xl md:w-[135px] md:h-[47px] md:py-[14px]"
          onClick={onConfirm || onClose}
        >
          {buttonTextRight}
        </Button>
      </div>
    </Modal>
  );
};

export default WarningModal;
