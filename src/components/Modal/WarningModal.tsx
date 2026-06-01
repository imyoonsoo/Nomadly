import Button from "../Button/Button";
import Modal from "./Modal";
import type { WarningModalProps } from "./type";
import Image from "next/image";

const WarningModal = ({
  isOpen,
  onClose,
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
          src="/warningIcon.svg"
          alt="성공 아이콘"
          width={88}
          height={88}
          className="w-[49px] h-[49px] md:w-[88px] md:h-[88px]"
        />
        <p className="text-center text-16-bold md:text-18-bold">{message}</p>
      </div>

      <div className="flex gap-2 md:gap-3 justify-center items-center">
        <Button onClick={onClose}>{buttonTextLeft}</Button>
        <Button onClick={onClose}>{buttonTextRight}</Button>
      </div>
    </Modal>
  );
};

export default WarningModal;
