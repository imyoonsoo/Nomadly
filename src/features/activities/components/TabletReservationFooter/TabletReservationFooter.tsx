"use client";

import { useState } from "react";
import Button from "@/components/Button/Button";
import ReservationSlideUpModal from "@/components/Reservation/ReservationSlideUpModal";
import TabletReservationPicker from "@/components/Reservation/TabletReservationPicker";
import type { SelectedSchedule } from "@/components/Reservation/type";
import { formatDisplayDate, formatPrice } from "@/components/Reservation/utils";
import { createActivityReservation } from "@/features/activities/api/client-api";

interface TabletReservationFooterProps {
  activityId: number;
  price: number;
}

const TabletReservationFooter = ({
  activityId,
  price,
}: TabletReservationFooterProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] =
    useState<SelectedSchedule | null>(null);
  const [headCount, setHeadCount] = useState(1);

  const isReservationReady = selectedSchedule !== null;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = ({
    schedule,
    headCount: confirmedHeadCount,
  }: {
    schedule: SelectedSchedule;
    headCount: number;
  }) => {
    setSelectedSchedule(schedule);
    setHeadCount(confirmedHeadCount);
    setIsModalOpen(false);
  };

  const handleReserveClick = () => {
    if (!selectedSchedule) {
      return;
    }

    createActivityReservation({
      activityId,
      scheduleId: selectedSchedule.scheduleId,
      headCount,
    });
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 hidden flex-col gap-3 border-t border-gray-300 bg-white px-6 py-4.5 md:flex lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-18-bold text-gray-950">
              ₩ {formatPrice(price * headCount)}
            </span>
            <span className="text-16-medium text-gray-600">
              / {headCount}명
            </span>
          </div>
          <button
            type="button"
            onClick={handleOpenModal}
            className="text-16-bold text-primary-500 border-b-2 border-primary-500"
          >
            {selectedSchedule
              ? `${formatDisplayDate(selectedSchedule.date)} ${selectedSchedule.startTime} ~ ${selectedSchedule.endTime}`
              : "날짜 선택하기"}
          </button>
        </div>
        <Button
          type="button"
          variant="mainBlue"
          height="h50"
          disabled={!isReservationReady}
          onClick={handleReserveClick}
        >
          예약하기
        </Button>
      </div>

      <ReservationSlideUpModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TabletReservationPicker
          activityId={activityId}
          defaultSelectedSchedule={selectedSchedule}
          defaultHeadCount={headCount}
          onConfirm={handleConfirm}
        />
      </ReservationSlideUpModal>
    </>
  );
};

export default TabletReservationFooter;
