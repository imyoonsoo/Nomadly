"use client";

import { useEffect, useState } from "react";
import { ReservationStatus } from "@/features/reservation-status/type";
import ReservationStatusTab from "@/features/reservation-status/components/modal/ReservationStatusTab";
import ReservationScheduleSelect from "@/features/reservation-status/components/modal/ReservationScheduleSelect";
import ReservationCard from "@/features/reservation-status/components/modal/ReservationCard";
import { Delete } from "@/constants/icons";
import { formatKoreanDate } from "@/features/reservation-status/utils";
import {
  useReservations,
  useReservedSchedule,
  useUpdateReservationStatus,
} from "@/features/reservation-status/hooks/useReservationStatus";

interface ReservationModalContentProps {
  selectedDate: string;
  activityId: number;
  onClose: () => void;
  isFullPage?: boolean;
}

const ReservationModalContent = ({
  selectedDate,
  activityId,
  onClose,
  isFullPage = false,
}: ReservationModalContentProps) => {
  const [selectedStatus, setSelectedStatus] =
    useState<ReservationStatus>("pending");

  const [selectedScheduleId, setSelectedScheduleId] = useState(0);
  const [isTablet, setIsTablet] = useState(false);

  const {
    data: schedules = [],
    isLoading: isSchedulesLoading,
    isError: isSchedulesError,
  } = useReservedSchedule(activityId, selectedDate);

  useEffect(() => {
    setSelectedScheduleId(schedules[0]?.scheduleId ?? 0);
    setSelectedStatus("pending");
  }, [schedules]);

  const selectedSchedule = schedules.find(
    (schedule) => schedule.scheduleId === selectedScheduleId,
  );

  const {
    data: reservationsData,
    isLoading: isReservationsLoading,
    isError: isReservationsError,
  } = useReservations(activityId, selectedScheduleId, selectedStatus);

  const updateReservationStatusMutation = useUpdateReservationStatus();

  const reservations = reservationsData?.reservations ?? [];

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1280);
    };

    checkTablet();
    window.addEventListener("resize", checkTablet);

    return () => {
      window.removeEventListener("resize", checkTablet);
    };
  }, []);

  const loadSize = isFullPage || isTablet ? 3 : 2;
  const [visibleCount, setVisibleCount] = useState(loadSize);

  useEffect(() => {
    setVisibleCount(loadSize);
  }, [selectedDate, selectedScheduleId, selectedStatus, loadSize]);

  const visibleReservations = reservations.slice(0, visibleCount);
  const hasMore = visibleCount < reservations.length;

  const handleScrollReservationList = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    const isBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 10;

    if (!isBottom || !hasMore) {
      return;
    }

    setVisibleCount((prev) => Math.min(prev + loadSize, reservations.length));
  };

  const handleApprove = (reservationId: number) => {
    updateReservationStatusMutation.mutate({
      activityId,
      reservationId,
      status: "confirmed",
    });
  };

  const handleDecline = (reservationId: number) => {
    updateReservationStatusMutation.mutate({
      activityId,
      reservationId,
      status: "declined",
    });
  };

  const header = (
    <div className="flex items-center justify-between">
      <h2 className="text-20-bold text-black">
        {formatKoreanDate(selectedDate)}
      </h2>

      <button type="button" onClick={onClose}>
        <Delete className="h-6 w-6 hover:translate-y-0.5" />
      </button>
    </div>
  );

  if (isSchedulesLoading) {
    return (
      <>
        {header}

        <div className="text-14-medium mt-6 text-gray-400">
          예약 시간을 불러오는 중...
        </div>
      </>
    );
  }

  if (isSchedulesError) {
    return (
      <>
        {header}

        <div className="text-14-medium mt-6 text-red-500">
          예약 시간을 불러오지 못했습니다.
        </div>
      </>
    );
  }

  let reservationContent;

  if (isReservationsLoading) {
    reservationContent = (
      <div className="text-14-medium text-gray-400">
        예약 내역을 불러오는 중...
      </div>
    );
  } else if (isReservationsError) {
    reservationContent = (
      <div className="text-14-medium text-gray-400">
        예약 내역을 불러오지 못했습니다.
      </div>
    );
  } else {
    reservationContent = (
      <div
        onScroll={handleScrollReservationList}
        className={`scrollbar-hide h-60 overflow-y-auto pr-1 md:h-[min(350px,calc(85vh-280px))] xl:h-[230px] ${
          isFullPage
            ? "h-[calc(100vh-300px)] md:h-[calc(100vh-320px)] xl:h-[230px]"
            : ""
        } `}
      >
        <div className="flex flex-col gap-3">
          {visibleReservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              status={selectedStatus}
              onApprove={handleApprove}
              onDecline={handleDecline}
            />
          ))}
        </div>

        {hasMore && (
          <div className="text-10-medium md:text-14-medium py-3 text-center text-gray-400">
            더 불러오는 중...
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {header}

      <ReservationStatusTab
        selectedStatus={selectedStatus}
        onChangeStatus={setSelectedStatus}
        count={
          selectedSchedule?.count ?? {
            pending: 0,
            confirmed: 0,
            declined: 0,
          }
        }
      />

      <div className="mt-6">
        <p className="text-16-bold mb-3 text-black">예약 시간</p>

        <ReservationScheduleSelect
          schedules={schedules}
          selectedScheduleId={selectedScheduleId}
          onChangeScheduleId={setSelectedScheduleId}
        />
      </div>

      <div className="mt-6">
        <p className="text-16-bold mb-3 text-black">예약 내역</p>

        {reservationContent}
      </div>
    </>
  );
};

export default ReservationModalContent;
