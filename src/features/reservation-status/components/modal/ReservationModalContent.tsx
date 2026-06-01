"use client";

import { useEffect, useMemo, useState } from "react";
import { ReservationStatus, ReservationCardItem } from "../../type";
import {
  mockReservationByScheduleId,
  mockReservedScheduleByDate,
} from "../../mock";
import ReservationStatusTab from "./ReservationStatusTab";
import ReservationScheduleSelect from "./ReservationScheduleSelect";
import ReservationCard from "./ReservationCard";
import { Delete } from "@/constants/icons";
import { formatKoreanDate } from "../../utils";

interface ReservationModalContentProps {
  selectedDate: string;
  onClose: () => void;
  isFullPage?: boolean;
}

const ReservationModalContent = ({
  selectedDate,
  onClose,
  isFullPage = false,
}: ReservationModalContentProps) => {
  const [selectedStatus, setSelectedStatus] =
    useState<ReservationStatus>("pending");

  const schedules = useMemo(() => {
    return mockReservedScheduleByDate[selectedDate] ?? [];
  }, [selectedDate]);

  const [selectedScheduleId, setSelectedScheduleId] = useState(0);

  useEffect(() => {
    setSelectedScheduleId(schedules[0]?.scheduleId ?? 0);
    setSelectedStatus("pending");
  }, [schedules]);

  const selectedSchedule = schedules.find(
    (schedule) => schedule.scheduleId === selectedScheduleId,
  );

  const [localReservations, setLocalReservations] = useState<
    Record<ReservationStatus, ReservationCardItem[]>
  >({
    pending: [],
    confirmed: [],
    declined: [],
  });

  useEffect(() => {
    const reservationData = mockReservationByScheduleId[selectedScheduleId] ?? {
      pending: [],
      confirmed: [],
      declined: [],
    };

    setLocalReservations({
      pending: [...reservationData.pending],
      confirmed: [...reservationData.confirmed],
      declined: [...reservationData.declined],
    });
  }, [selectedScheduleId]);

  const reservations = localReservations[selectedStatus] ?? [];

  const [isTablet, setIsTablet] = useState(false);

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

    if (!isBottom || !hasMore) return;

    setVisibleCount((prev) => Math.min(prev + loadSize, reservations.length));
  };

  const handleApprove = (reservationId: number) => {
    setLocalReservations((prev) => {
      const target = prev.pending.find((item) => item.id === reservationId);
      if (!target) {
        return prev;
      }

      return {
        pending: prev.pending.filter((item) => item.id !== reservationId),
        confirmed: [...prev.confirmed, target],
        declined: prev.declined,
      };
    });
  };

  const handleDecline = (reservationId: number) => {
    setLocalReservations((prev) => {
      const target = prev.pending.find((item) => item.id === reservationId);
      if (!target) {
        return prev;
      }

      return {
        pending: prev.pending.filter((item) => item.id !== reservationId),
        confirmed: prev.confirmed,
        declined: [...prev.declined, target],
      };
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-20-bold text-black">
          {formatKoreanDate(selectedDate)}
        </h2>

        <button type="button" onClick={onClose}>
          <Delete className="w-6 h-6 hover:translate-y-0.5" />
        </button>
      </div>

      {selectedSchedule && (
        <ReservationStatusTab
          selectedStatus={selectedStatus}
          onChangeStatus={setSelectedStatus}
          count={{
            pending: localReservations.pending.length,
            confirmed: localReservations.confirmed.length,
            declined: localReservations.declined.length,
          }}
        />
      )}

      <div className="mt-6">
        <p className="mb-3 text-16-bold text-black">예약 시간</p>

        <ReservationScheduleSelect
          schedules={schedules}
          selectedScheduleId={selectedScheduleId}
          onChangeScheduleId={setSelectedScheduleId}
        />
      </div>

      <div className="mt-6">
        <p className="mb-3 text-16-bold text-black">예약 내역</p>

        <div
          onScroll={handleScrollReservationList}
          className={`
            scrollbar-hide overflow-y-auto pr-1
            h-[240px]
            md:h-[min(350px,calc(85vh-280px))]
            xl:h-[230px]
            ${isFullPage ? "h-[calc(100vh-300px)] md:h-[calc(100vh-320px) xl:h-[230px]" : ""}  
          `}
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
            <div className="py-3 text-center text-10-medium md:text-14-medium text-gray-400">
              더 불러오는 중...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReservationModalContent;
