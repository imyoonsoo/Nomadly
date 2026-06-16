"use client";

import Reservation from "@/components/Reservation/Reservation";
import { createActivityReservation } from "@/features/activities/api/client-api";
import type { ActivityDetailResponse } from "@/features/activities/type";

type ReservationSectionProps = Pick<ActivityDetailResponse, "price"> & {
  activityId: number;
};

const ReservationSection = ({ activityId, price }: ReservationSectionProps) => {
  const handleReserve = ({
    scheduleId,
    headCount,
  }: {
    scheduleId: number;
    headCount: number;
  }) => {
    createActivityReservation({ activityId, scheduleId, headCount });
  };

  return (
    <Reservation
      activityId={activityId}
      price={price}
      onReserve={handleReserve}
    />
  );
};

export default ReservationSection;
