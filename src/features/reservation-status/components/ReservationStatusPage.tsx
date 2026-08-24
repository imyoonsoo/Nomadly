"use client";

import { useEffect, useState } from "react";
import ReservationCalendar from "@/features/reservation-status/components/ReservationCalendar";
import EmptyReservationStatus from "@/features/reservation-status/components//EmptyReservationStatus";
import ReservationStatusModal from "@/features/reservation-status/components/modal/ReservationStatusModal";
import {
  useMyActivities,
  useReservationDashboard,
} from "@/features/reservation-status/hooks/useReservationStatus";
import SelectDropdown from "@/components/SelectDropdown/SelectDropdown";
import Error from "@/assets/images/empty-notFound.svg";
import Loading from "@/assets/images/empty-loading.svg";

const ReservationStatusPage = () => {
  const today = new Date();

  const [calendarYear, setCalendarYear] = useState(String(today.getFullYear()));
  const [calendarMonth, setCalendarMonth] = useState(
    String(today.getMonth() + 1).padStart(2, "0"),
  );

  const [selectedActivityId, setSelectedActivityId] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const {
    data: activitiesData,
    isLoading: isActivitiesLoading,
    isError: isActivitiesError,
  } = useMyActivities();

  const activities = activitiesData?.activities ?? [];

  useEffect(() => {
    if (activities.length > 0 && selectedActivityId === 0) {
      setSelectedActivityId(activities[0].id);
    }
  }, [activities, selectedActivityId]);

  const {
    data: reservationDashboardData,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
  } = useReservationDashboard(selectedActivityId, calendarYear, calendarMonth);

  const activityOptions = activities.map((activity) => ({
    value: activity.id,
    label: activity.title,
  }));

  const hasActivities = activities.length > 0;

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  if (isActivitiesLoading) {
    return (
      <EmptyReservationStatus
        image={<Loading className="h-45.5 w-45.5" />}
        message="불러오는 중..."
      />
    );
  }

  if (isActivitiesError) {
    return (
      <EmptyReservationStatus
        image={<Error className="h-45.5 w-45.5" />}
        message="체험 목록을 불러오지 못했습니다."
      />
    );
  }

  const hasDashboardData = reservationDashboardData !== undefined;

  let dashboardContent;

  if (isDashboardLoading && !hasDashboardData) {
    dashboardContent = (
      <EmptyReservationStatus
        image={<Loading className="h-45.5 w-45.5" />}
        message="예약 현황을 불러오는 중..."
      />
    );
  } else if (isDashboardError) {
    dashboardContent = (
      <EmptyReservationStatus
        image={<Error className="h-45.5 w-45.5" />}
        message="예약 현황을 불러오지 못했습니다."
      />
    );
  } else {
    dashboardContent = (
      <ReservationCalendar
        reservations={reservationDashboardData ?? []}
        onClickDate={handleDateClick}
        onChangeMonth={({ year, month }) => {
          setCalendarYear(year);
          setCalendarMonth(month);
        }}
      />
    );
  }

  return (
    <section className="w-full max-w-200">
      {!hasActivities ? (
        <EmptyReservationStatus message="아직 등록한 체험이 없어요" />
      ) : (
        <>
          <div className="max-w-160 pb-4.5 md:pb-6 xl:pb-7.5">
            <SelectDropdown
              options={activityOptions}
              selectedValue={selectedActivityId}
              onChange={(value) => setSelectedActivityId(Number(value))}
            />
          </div>

          {dashboardContent}

          <ReservationStatusModal
            open={!!selectedDate}
            activityId={selectedActivityId}
            selectedDate={selectedDate}
            onClose={() => setSelectedDate(null)}
          />
        </>
      )}
    </section>
  );
};

export default ReservationStatusPage;
