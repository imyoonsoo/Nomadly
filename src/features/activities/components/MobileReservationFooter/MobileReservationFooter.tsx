"use client";

import { useState } from "react";
import Button from "@/components/Button/Button";
import HeadCountSelector from "@/components/Reservation/HeadCountSelector";
import Reservation from "@/components/Reservation/Reservation";
import ReservationSlideUpModal from "@/components/Reservation/ReservationSlideUpModal";
import type { SelectedSchedule } from "@/components/Reservation/type";
import { formatDisplayDate, formatPrice } from "@/components/Reservation/utils";
import { createActivityReservation } from "@/features/activities/api/client-api";

interface MobileReservationFooterProps {
  activityId: number;
  price: number;
}

const MobileReservationFooter = ({
  activityId,
  price,
}: MobileReservationFooterProps) => {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isHeadCountModalOpen, setIsHeadCountModalOpen] = useState(false);
  const [pendingSchedule, setPendingSchedule] =
    useState<SelectedSchedule | null>(null);
  const [selectedSchedule, setSelectedSchedule] =
    useState<SelectedSchedule | null>(null);
  const [headCount, setHeadCount] = useState(1);

  const isReservationReady = selectedSchedule !== null;

  const handleOpenDateModal = () => {
    setIsDateModalOpen(true);
  };

  const handleCloseDateModal = () => {
    setIsDateModalOpen(false);
  };

  const handleCloseHeadCountModal = () => {
    setIsHeadCountModalOpen(false);
    setPendingSchedule(null);
  };

  const handleBackFromHeadCount = () => {
    setIsHeadCountModalOpen(false);
    setIsDateModalOpen(true);
  };

  const handleScheduleSelect = (schedule: SelectedSchedule) => {
    setPendingSchedule(schedule);
    setIsDateModalOpen(false);
    setIsHeadCountModalOpen(true);
  };

  const handleHeadCountConfirm = (count: number) => {
    if (!pendingSchedule) {
      return;
    }

    setSelectedSchedule(pendingSchedule);
    setHeadCount(count);
    setPendingSchedule(null);
    setIsHeadCountModalOpen(false);
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
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col gap-3 border-t border-gray-300 bg-white px-6 py-4.5 md:hidden">
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
            onClick={handleOpenDateModal}
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

      <ReservationSlideUpModal
        isOpen={isDateModalOpen}
        onClose={handleCloseDateModal}
      >
        <Reservation
          activityId={activityId}
          price={price}
          className="rounded-none border-0 p-0"
          showPrice={false}
          showHeadCount={false}
          showTotalPrice={false}
          submitLabel="확인"
          defaultSelectedSchedule={pendingSchedule ?? selectedSchedule}
          onScheduleSelect={handleScheduleSelect}
        />
      </ReservationSlideUpModal>

      <ReservationSlideUpModal
        isOpen={isHeadCountModalOpen}
        onClose={handleCloseHeadCountModal}
      >
        <HeadCountSelector
          headCount={headCount}
          onHeadCountChange={setHeadCount}
          onConfirm={handleHeadCountConfirm}
          onBackButtonClick={handleBackFromHeadCount}
        />
      </ReservationSlideUpModal>
    </>
  );
};

export default MobileReservationFooter;
