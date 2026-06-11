"use client";

import Reservation from "@/components/Reservation/Reservation";
import { createActivityReservation } from "@/features/activities/api/client-api";
import type { ActivityDetailResponse } from "@/app/(main)/activities/type";

type ReservationSectionProps = Pick<
  ActivityDetailResponse,
  "price" | "schedules"
> & {
  activityId: number;
};

const ReservationSection = ({
  activityId,
  price,
  schedules,
}: ReservationSectionProps) => {
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
    <Reservation price={price} schedules={schedules} onReserve={handleReserve} />
  );
};

export default ReservationSection;
