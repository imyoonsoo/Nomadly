"use client";
import { useState } from "react";
import FilterButton from "@/components/FilterButton/FilterButton";
import ReservedCard from "./ReservedCard";
import { useQuery } from "@tanstack/react-query";
import { myReservationsQuery } from "@/features/reservations/queries";

const FILTERS = [
  "예약 완료",
  "예약 취소",
  "예약 승인",
  "예약 거절",
  "체험 완료",
];

const FILTER_STATUS_MAP: Record<string, string> = {
  "예약 완료": "pending",
  "예약 취소": "canceled",
  "예약 승인": "confirm",
  "예약 거절": "declined",
  "체험 완료": "completed",
};

const ReservedCardList = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const activeStatus = activeFilter
    ? FILTER_STATUS_MAP[activeFilter]
    : undefined;

  const { data, isLoading } = useQuery(
    myReservationsQuery({ size: 10, status: activeStatus }),
  );

  const handleFilterButtonClick = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  const reservations = data?.reservations ?? [];

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex gap-[8px] overflow-x-auto scrollbar-hide">
        {FILTERS.map((filter) => (
          <FilterButton
            key={filter}
            isActive={activeFilter === filter}
            onClick={() => handleFilterButtonClick(filter)}
          >
            {filter}
          </FilterButton>
        ))}
      </div>
      <div className="flex flex-col gap-[30px]">
        {reservations.map((reservation) => (
          <ReservedCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
};

export default ReservedCardList;
