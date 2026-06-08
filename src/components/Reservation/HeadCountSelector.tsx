"use client";

import Button from "@/components/Button/Button";
import { Back, Minus, Plus } from "@/constants/icons";
import type { HeadCountSelectorProps } from "./type";

const MIN_HEAD_COUNT = 1;
const MAX_HEAD_COUNT = 10;

const HeadCountSelector = ({
  headCount,
  onHeadCountChange,
  onConfirm,
  onBackButtonClick,
  className,
}: HeadCountSelectorProps) => {
  const handleDecreaseHeadCount = () => {
    onHeadCountChange(Math.max(MIN_HEAD_COUNT, headCount - 1));
  };

  const handleIncreaseHeadCount = () => {
    onHeadCountChange(Math.min(MAX_HEAD_COUNT, headCount + 1));
  };

  const handleConfirmClick = () => {
    onConfirm?.(headCount);
  };

  return (
    <div className={`flex w-full flex-col gap-5 ${className ?? ""}`}>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onBackButtonClick}
          className="flex items-center gap-2 text-18-bold text-gray-950"
        >
          <Back className="h-6 w-6" />
          인원
        </button>
        <span className="text-16-medium text-gray-600">
          예약할 인원을 선택해주세요.
        </span>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-16-bold text-gray-950">참여 인원 수</h3>
        <div className="flex items-center justify-between rounded-xl border border-gray-100 px-2.5">
          <button
            type="button"
            aria-label="인원 감소"
            disabled={headCount <= MIN_HEAD_COUNT}
            onClick={handleDecreaseHeadCount}
            className="flex h-10 w-10 items-center justify-center disabled:opacity-40"
          >
            <Minus className="h-5 w-5" />
          </button>
          <span className="flex h-10 w-10 items-center justify-center text-center text-16-bold text-gray-800">
            {headCount}
          </span>
          <button
            type="button"
            aria-label="인원 증가"
            disabled={headCount >= MAX_HEAD_COUNT}
            onClick={handleIncreaseHeadCount}
            className="flex h-10 w-10 items-center justify-center disabled:opacity-40"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Button
        type="button"
        variant="mainBlue"
        height="h50"
        onClick={handleConfirmClick}
      >
        확인
      </Button>
    </div>
  );
};

export default HeadCountSelector;
