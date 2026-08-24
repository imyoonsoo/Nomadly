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
      className="h-119.75 w-81.75"
    >
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-2">
            <div className="flex justify-end">
              <button type="button" onClick={onClose}>
                <DeleteIcon width={24} height={24} />
              </button>
            </div>
            <p className="text-14-bold md:text-16-bold text-center">{title}</p>
            <p className="text-13-medium md:text-14-medium text-center text-gray-500">
              {date} / {startTime} - {endTime} ({headCount}명)
            </p>
          </div>

          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <div className="flex justify-center gap-1.5">
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
                        className="md:h-10.5 md:w-10.5"
                      />
                    ) : (
                      <StarOff
                        width={36}
                        height={36}
                        className="md:h-10.5 md:w-10.5"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <TextArea
            label="소중한 경험을 들려주세요"
            placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
            textCount
            textareaClassName="h-44.75"
            {...register("content", { required: "리뷰를 입력해주세요" })}
          />
          {errors.content && (
            <p className="text-12 text-red-500">{errors.content.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="mainBlue"
          height="custom"
          className="h-10.25 w-full rounded-xl md:h-13.5"
        >
          작성하기
        </Button>
      </form>
    </Modal>
  );
};

export default ReviewSubmitModal;
