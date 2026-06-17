"use client";

import Button from "@/components/Button/Button";
import StateBadge from "@/components/StateBadge/StateBadge";
import Image from "next/image";
import ReviewSubmitModal from "./ReviewSubmitModal";
import { useState } from "react";
import WarningModal from "@/components/Modal/WarningModal";
import type { Reservation } from "@/features/reservations/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  activityDetailQuery,
  cancelReservationMutation,
  submitReviewMutation,
} from "../queries";
import EditReservationModal from "./EditReservationModal";
import { showToast } from "@/lib/utils/toast";

export interface ReservedCardProps {
  reservation: Reservation;
}

const ReservedCard = ({ reservation }: ReservedCardProps) => {
  const {
    id,
    date,
    activity,
    status,
    startTime,
    endTime,
    totalPrice,
    headCount,
    reviewSubmitted,
  } = reservation;

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: cancelReservation } = useMutation({
    ...cancelReservationMutation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reservations"] });
    },
  });

  const { mutate: submitReview } = useMutation({
    ...submitReviewMutation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reservations"] });
      setIsReviewModalOpen(false);
    },
  });

  const { data: activityDetail } = useQuery({
    ...activityDetailQuery(activity.id),
    enabled: isEditModalOpen,
  });

  const handleReviewModalButtonClick = () => {
    setIsReviewModalOpen(true);
  };
  const handleWarningModalButtonClick = () => {
    setIsWarningModalOpen(true);
  };
  const handleEditReservationButtonClick = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="pt-5 flex flex-col gap-3">
        <p className="text-16-bold text-gray-800 lg:text-18-bold">{date}</p>
        <div className="relative rounded-4xl h-34  w-full lg:w-[90%] lg:max-w-[640px] lg:h-45 overflow-hidden shadow-[0_4px_24px_rgba(156,180,202,0.3)]">
          <div className="flex flex-col justify-between relative z-10 w-[70%] h-full p-5 rounded-4xl bg-white lg:px-10 lg:py-[30px]">
            <StateBadge status={status} />
            <div className="flex flex-col">
              <h1 className="text-14-bold text-gray-950 lg:text-18-bold">
                {activity.title}
              </h1>
              <p className="text-13-medium text-gray-500 lg:text-16-medium">
                {startTime} - {endTime}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-16-bold text-gray-950 lg:text-18-bold">
                {totalPrice.toLocaleString()}
                <span className="text-14-medium text-gray-400 lg:text-16-medium">
                  / {headCount}명
                </span>
              </p>
              {status === "pending" && (
                <div className="hidden lg:flex gap-2 ">
                  <Button
                    variant="whitenGray"
                    height="h29"
                    className="px-[10px] py-[6px] !border"
                    onClick={handleEditReservationButtonClick}
                  >
                    예약 변경
                  </Button>
                  <Button
                    variant="onlyGray"
                    height="custom"
                    className="h-[29px] px-[10px] py-[6px] rounded-lg text-14-medium !text-gray-600"
                    onClick={handleWarningModalButtonClick}
                  >
                    예약 취소
                  </Button>
                </div>
              )}
              {status === "completed" && (
                <Button
                  variant="mainBlue"
                  height="custom"
                  className="hidden lg:block h-[29px] px-[10px] rounded-lg text-14-medium"
                  onClick={
                    reviewSubmitted
                      ? () => showToast.error("이미 후기를 작성했습니다.")
                      : handleReviewModalButtonClick
                  }
                >
                  후기 작성
                </Button>
              )}
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-[40%] overflow-hidden">
            <Image
              src={activity.bannerImageUrl}
              fill
              alt="액티비티 사진"
              className="object-cover"
            />
          </div>
        </div>
        {status === "pending" && (
          <div className="flex w-full gap-3 lg:hidden">
            <Button
              variant="whitenGray"
              height="custom"
              className="flex-1 h-[37px] rounded-lg p-[10px]"
              onClick={handleEditReservationButtonClick}
            >
              예약 변경
            </Button>
            <Button
              variant="onlyGray"
              height="custom"
              className="flex-1 h-[37px] rounded-lg p-[10px]"
              onClick={handleWarningModalButtonClick}
            >
              예약 취소
            </Button>
          </div>
        )}
        {status === "completed" && (
          <Button
            variant="mainBlue"
            height="custom"
            className="lg:hidden sm:block md:block w-full h-[37px] px-[10px] rounded-lg"
            onClick={
              reviewSubmitted
                ? () => showToast.error("이미 후기를 작성했습니다.")
                : handleReviewModalButtonClick
            }
          >
            후기 작성
          </Button>
        )}
      </div>
      <ReviewSubmitModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title={activity.title}
        date={date}
        startTime={startTime}
        endTime={endTime}
        headCount={headCount}
        onSubmit={(data) => submitReview(data)}
      />
      <WarningModal
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        onConfirm={() => {
          cancelReservation();
          setIsWarningModalOpen(false);
        }}
        message="예약을 취소하시겠어요?"
        buttonTextRight="취소하기"
      />
      <EditReservationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        reservationId={id}
        activityDetail={activityDetail}
      />
    </>
  );
};

export default ReservedCard;
