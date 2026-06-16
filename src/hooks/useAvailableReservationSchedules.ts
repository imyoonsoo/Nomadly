"use client";

import { useEffect, useState } from "react";
import type { AvailableActivitiesReservationResponse } from "@/features/activities/type";
import { getAvailableReservationSchedules } from "@/features/activities/api/client-api";
import type { YearAndMonth } from "../components/Reservation/type";
import { showToast } from "@/lib/utils/toast";
import { getApiErrorMessage } from "@/lib/utils/getApiErrorMessage";

const useAvailableReservationSchedules = (
  activityId: number,
  selectedYearAndMonth: YearAndMonth,
) => {
  const [availableSchedules, setAvailableSchedules] =
    useState<AvailableActivitiesReservationResponse>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const fetchSchedules = async () => {
      setIsLoading(true);

      const params = {
        activityId,
        year: String(selectedYearAndMonth.year),
        month: String(selectedYearAndMonth.month + 1).padStart(2, "0"),
      };

      try {
        const data = await getAvailableReservationSchedules(params);

        if (!isCancelled) {
          setAvailableSchedules(data);
          setIsLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setAvailableSchedules([]);
          setIsLoading(false);
          showToast.error(
            getApiErrorMessage(error, "일정 데이터를 불러오는데 실패했습니다."),
          );
        }
      }
    };

    fetchSchedules();

    return () => {
      isCancelled = true;
    };
  }, [activityId, selectedYearAndMonth.year, selectedYearAndMonth.month]);

  return { availableSchedules, isLoading };
};

export default useAvailableReservationSchedules;
