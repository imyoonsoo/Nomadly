"use client";
import { useState } from "react";
import FilterButton from "@/components/FilterButton/FilterButton";
import ReservedCard from "./ReservedCard";
import { useQuery } from "@tanstack/react-query";
import { myReservationsQuery } from "@/features/reservations/queries";
import { useRouter } from "next/navigation";
import EmpytyIcon from "@/assets/images/empty.svg";
import Button from "@/components/Button/Button";

const FILTERS = [
  "예약 대기",
  "예약 취소",
  "예약 완료",
  "예약 거절",
  "체험 완료",
];

const FILTER_STATUS_MAP: Record<string, string> = {
  "예약 대기": "pending",
  "예약 취소": "canceled",
  "예약 완료": "confirmed",
  "예약 거절": "declined",
  "체험 완료": "completed",
};

const ReservedCardList = () => {
  const router = useRouter();

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

  if (!data?.reservations?.length) {
    return (
      <div className="w-[100%] h-[100%] mt-[10px] flex flex-col gap-[30px] justify-center items-center">
        <div>
          <EmpytyIcon width={180} height={203} />
          <p>아직 예약된 체험이 없어요</p>
        </div>
        <Button
          variant="mainBlue"
          height="custom"
          className="w-[182px] h-[54px] rounded-[16px] text-16-bold"
          onClick={() => router.push("/")}
        >
          둘러보기
        </Button>
      </div>
    );
  }

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
