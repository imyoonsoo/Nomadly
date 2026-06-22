"use client";

import Modal from "@/components/Modal/Modal";
import DeleteIcon from "@/assets/icons/delete.svg";
import StarOn from "@/assets/icons/star-on.svg";
import StarOff from "@/assets/icons/star-off.svg";
import { useEffect } from "react";
import TextArea from "@/components/Input/TextArea";
import Button from "@/components/Button/Button";
import { useForm, Controller } from "react-hook-form";

interface ReviewSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  onSubmit: (data: FormValues) => void;
}

interface FormValues {
  rating: number;
  content: string;
}

const ReviewSubmitModal = ({
  isOpen,
  onClose,
  title,
  date,
  startTime,
  endTime,
  headCount,
  onSubmit,
}: ReviewSubmitModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      rating: 0,
      content: "",
    },
  });

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen]);

  const onSubmitForm = (data: FormValues) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      className="w-[327px] h-[479px]"
    >
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex flex-col gap-[20px]"
      >
        <div className="flex flex-col gap-[14px]">
          <div className="flex flex-col gap-[8px]">
            <div className="flex justify-end">
              <button type="button" onClick={onClose}>
                <DeleteIcon width={24} height={24} />
              </button>
            </div>
            <p className="text-14-bold text-center md:text-16-bold">{title}</p>
            <p className="text-13-medium text-gray-500 text-center md:text-14-medium">
              {date} / {startTime} - {endTime} ({headCount}명)
            </p>
          </div>

          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <div className="flex justify-center gap-[6px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      field.onChange(star === field.value ? star - 1 : star)
                    }
                  >
                    {star <= field.value ? (
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
            )}
          />
        </div>

        <div className="flex flex-col gap-[4px]">
          <TextArea
            label="소중한 경험을 들려주세요"
            placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
            textCount
            textareaClassName="h-[179px]"
            {...register("content", { required: "리뷰를 입력해주세요" })}
          />
          {errors.content && (
            <p className="text-red-500 text-12">{errors.content.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="mainBlue"
          height="custom"
          className="w-full h-[41px] rounded-xl md:h-[54px]"
        >
          작성하기
        </Button>
      </form>
    </Modal>
  );
};

export default ReviewSubmitModal;
