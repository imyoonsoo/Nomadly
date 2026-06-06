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
  "예약 완료": "confirmed",
  "예약 취소": "canceled",
  "예약 승인": "pending",
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

  // const mockReservations: ReservedCardProps[] = [
  //   {
  //     date: "2023.02.14",
  //     title: "함께 배우면 즐거운 스트릿 댄스",
  //     status: "confirmed",
  //     startTime: "11:00",
  //     endTime: "12:30",
  //     totalPrice: 10000,
  //     headCount: 10,
  //   },
  //   {
  //     date: "2023.02.11",
  //     title: "내 강아지 인생 사진 찍어주기",
  //     status: "canceled",
  //     startTime: "13:00",
  //     endTime: "14:0",
  //     totalPrice: 35000,
  //     headCount: 10,
  //   },
  //   {
  //     date: "2023.01.31",
  //     title: "이색 앵무새와 친구 되기",
  //     status: "declined",
  //     startTime: "10:00",
  //     endTime: "12:00",
  //     totalPrice: 60000,
  //     headCount: 3,
  //   },
  //   {
  //     date: "2023.01.14",
  //     title: "발리 코끼리 목욕 체험",
  //     status: "completed",
  //     startTime: "16:00",
  //     endTime: "17:30",
  //     totalPrice: 40000,
  //     headCount: 2,
  //   },
  //   {
  //     date: "2023.01.10",
  //     title: "열기구 페스티벌",
  //     status: "pending",
  //     startTime: "10:00",
  //     endTime: "12:30",
  //     totalPrice: 70000,
  //     headCount: 2,
  //   },
  // ];

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
