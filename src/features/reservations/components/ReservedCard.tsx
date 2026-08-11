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
      <div className="flex flex-col gap-3 pt-5 md:w-[90%] lg:w-full">
        <p className="text-16-bold lg:text-18-bold text-gray-800">{date}</p>
        <div className="relative h-34 w-full overflow-hidden rounded-4xl shadow-[0_4px_24px_rgba(156,180,202,0.3)] lg:h-45 lg:max-w-[640px]">
          <div className="relative z-10 flex h-full w-[70%] flex-col justify-between rounded-4xl bg-white p-5 lg:px-10 lg:py-[30px]">
            <StateBadge status={status} />
            <div className="flex flex-col">
              <h1 className="text-14-bold lg:text-18-bold text-gray-950">
                {activity.title}
              </h1>
              <p className="text-13-medium lg:text-16-medium text-gray-500">
                {startTime} - {endTime}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-16-bold lg:text-18-bold text-gray-950">
                {totalPrice.toLocaleString()}
                <span className="text-14-medium lg:text-16-medium text-gray-400">
                  / {headCount}명
                </span>
              </p>
              {status === "pending" && (
                <div className="hidden gap-2 lg:flex">
                  <Button
                    variant="whitenGray"
                    height="h29"
                    className="!border px-[10px] py-[6px]"
                    onClick={handleEditReservationButtonClick}
                  >
                    예약 변경
                  </Button>
                  <Button
                    variant="onlyGray"
                    height="custom"
                    className="text-14-medium h-[29px] rounded-lg px-[10px] py-[6px] !text-gray-600"
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
                  className="text-14-medium hidden h-[29px] rounded-lg px-[10px] lg:block"
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
          <div className="absolute top-0 right-0 h-full w-[40%] overflow-hidden">
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
              className="h-[37px] flex-1 rounded-lg p-[10px]"
              onClick={handleEditReservationButtonClick}
            >
              예약 변경
            </Button>
            <Button
              variant="onlyGray"
              height="custom"
              className="h-[37px] flex-1 rounded-lg p-[10px]"
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
            className="h-[37px] w-full rounded-lg px-[10px] sm:block md:block lg:hidden"
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
