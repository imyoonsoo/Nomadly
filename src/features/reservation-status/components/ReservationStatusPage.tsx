"use client";

import { useMemo, useState } from "react";
import {
  mockActivities,
  mockReservationDashboardByActivityId,
} from "@/features/reservation-status/mock";
import ReservationCalendar from "@/features/reservation-status/components/ReservationCalendar";
import EmptyReservationStatus from "@/features/reservation-status/components/modal/EmptyReservationStatus";
import ReservationStatusModal from "@/features/reservation-status/components/modal/ReservationStatusModal";
import ReservationDropdown from "@/features/reservation-status/components/ReservationDropdown";

const ReservationStatusPage = () => {
  const acitivitiOptions = mockActivities.map((activity) => ({
    value: activity.id,
    label: activity.title,
  }));

  const [selectedActivityId, setSelectedActivityId] = useState(
    mockActivities[0].id ?? 0,
  );

  const selectedReservations = useMemo(() => {
    return mockReservationDashboardByActivityId[selectedActivityId] ?? [];
  }, [selectedActivityId]);

  const hasActivities = mockActivities.length > 0;

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <section className="w-full max-w-[800px]">
      <h1 className="text-18-bold font-bold">예약 현황</h1>

      <p className="mt-2 text-14-medium text-gray-500">
        내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
      </p>

      {!hasActivities ? (
        <EmptyReservationStatus />
      ) : (
        <>
          <div className="py-[18px] md:py-6 xl:py-[30px]">
            <ReservationDropdown
              options={acitivitiOptions}
              selectedValue={selectedActivityId}
              onChange={setSelectedActivityId}
            />
          </div>

          <ReservationCalendar
            reservations={selectedReservations}
            onClickDate={handleDateClick}
          />

          <ReservationStatusModal
            open={!!selectedDate}
            selectedDate={selectedDate}
            onClose={() => setSelectedDate(null)}
          />
        </>
      )}
    </section>
  );
};

export default ReservationStatusPage;
