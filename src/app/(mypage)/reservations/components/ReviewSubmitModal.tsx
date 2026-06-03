"use client";

import Modal from "@/components/Modal/Modal";
import DeleteIcon from "@/assets/icons/delete.svg";
import StarOn from "@/assets/icons/star-on.svg";
import StarOff from "@/assets/icons/star-off.svg";
import { useState } from "react";
import TextArea from "@/components/Input/TextArea";
import Button from "@/components/Button/Button";

interface ReviewSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewSubmitModal = ({ isOpen, onClose }: ReviewSubmitModalProps) => {
  const [rating, setRating] = useState(0);

  return (
    <>
      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        className="w-[327px] h-[479px]"
      >
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[14px]">
            <div className="flex flex-col gap-[8px]">
              <div className="flex justify-end">
                <button onClick={onClose}>
                  <DeleteIcon width={24} height={24} />
                </button>
              </div>
              <p className="text-14-bold text-center md:text-16-bold">
                함께 배우면 즐거운 스트릿 댄스
              </p>
              <p className="text-13-medium text-gray-500 text-center md:text-14-medium">
                2023.02.14 / 11:00 - 12:30 (10명)
              </p>
            </div>
            <div className="flex justify-center gap-[6px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)}>
                  {star <= rating ? (
                    <StarOn
                      width={36}
                      height={36}
                      className="md:w-[42px] md:h-[42px]"
                    />
                  ) : (
                    <StarOff
                      width={36}
                      height={36}
                      className="md:w-[42px] md:h-[42px]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <TextArea
            label="소중한 경험을 들려주세요"
            name="review"
            placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
            textCount
            textareaClassName="h-[179px]"
          />
          <Button
            variant="mainBlue"
            height="custom"
            className="w-full h-[41px] rounded-[12px] md:h-[54px]"
          >
            작성하기
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ReviewSubmitModal;
