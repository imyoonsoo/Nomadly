"use client";

import { useEffect, useState } from "react";
import type { AvailableActivitiesReservationResponse } from "@/features/activities/type";
import { getAvailableReservationSchedules } from "@/features/activities/api/client-api";
import type { YearAndMonth } from "../components/Reservation/type";

export const useAvailableReservationSchedules = (
  activityId: number,
  selectedYearAndMonth: YearAndMonth,
) => {
  const [availableSchedules, setAvailableSchedules] =
    useState<AvailableActivitiesReservationResponse>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchSchedules = async () => {
      setIsLoading(true);

      const params = {
        activityId,
        year: String(selectedYearAndMonth.year),
        month: String(selectedYearAndMonth.month + 1).padStart(2, "0"),
      };

      console.log("[available-schedule] 요청:", params);

      try {
        const data = await getAvailableReservationSchedules(params);

        console.log("[available-schedule] 응답:", data);

        if (!cancelled) {
          setAvailableSchedules(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("[available-schedule] 실패:", error);

        if (!cancelled) {
          setAvailableSchedules([]);
          setIsLoading(false);
        }
      }
    };

    fetchSchedules();

    return () => {
      cancelled = true;
    };
  }, [activityId, selectedYearAndMonth.year, selectedYearAndMonth.month]);

  return { availableSchedules, isLoading };
};
