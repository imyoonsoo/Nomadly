"use client";

import { useState } from "react";
import Reservation from "@/components/Reservation/Reservation";
import SuccessModal from "@/components/Modal/SuccessModal";
import { createActivityReservation } from "@/features/activities/api/client-api";
import type { ActivityDetailResponse } from "@/features/activities/type";
import { showToast } from "@/lib/utils/toast";
import { getApiErrorMessage } from "@/lib/utils/getApiErrorMessage";

type ReservationSectionProps = Pick<ActivityDetailResponse, "price"> & {
  activityId: number;
};

const ReservationSection = ({ activityId, price }: ReservationSectionProps) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleReserve = async ({
    scheduleId,
    headCount,
  }: {
    scheduleId: number;
    headCount: number;
  }) => {
    try {
      await createActivityReservation({ activityId, scheduleId, headCount });
      setIsSuccessModalOpen(true);
    } catch (error) {
      showToast.error(getApiErrorMessage(error, "예약에 실패했습니다."));
      throw error;
    }
  };

  return (
    <>
      <Reservation
        activityId={activityId}
        price={price}
        onReserve={handleReserve}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message="예약이 완료되었습니다."
      />
    </>
  );
};

export default ReservationSection;
