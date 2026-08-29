"use client";
import { useState } from "react";
import FilterButton from "@/components/FilterButton/FilterButton";
import ReservedCard from "./ReservedCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { myReservationsInfiniteQuery } from "@/features/reservations/queries";
import { useRouter } from "next/navigation";
import EmptyIcon from "@/assets/images/empty.svg";
import Button from "@/components/Button/Button";
import type { Reservation } from "../types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import ReservedCardListSkeleton, {
  ReservedCardSkeleton,
} from "./ReservedCardListSkeleton";

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

const sortReservations = (reservations: Reservation[]) => {
  const sortedReservations = [...reservations].sort(
    (a, b) =>
      Number(a.date.split("-").join("")) - Number(b.date.split("-").join("")),
  );
  return sortedReservations;
};

const ReservedCardList = () => {
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const activeStatus = activeFilter
    ? FILTER_STATUS_MAP[activeFilter]
    : undefined;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      ...myReservationsInfiniteQuery({ size: 10, status: activeStatus }),
      retry: 1,
    });

  const { targetRef } = useInfiniteScroll({
    onIntersect: fetchNextPage,
    hasNextPage: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const handleFilterButtonClick = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  if (isLoading) {
    return <ReservedCardListSkeleton />;
  }

  const reservations = sortReservations(
    data?.pages.flatMap((page) => page.reservations) ?? [],
  );

  if (!activeFilter && !reservations?.length) {
    return (
      <div className="mt-2.5 flex h-full w-full flex-col items-center justify-center gap-7.5">
        <div>
          <EmptyIcon width={180} height={203} />
          <p>아직 예약된 체험이 없어요</p>
        </div>
        <Button
          variant="mainBlue"
          height="custom"
          className="text-16-bold h-13.5 w-45.5 rounded-2xl"
          onClick={() => router.push("/")}
        >
          둘러보기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7.5">
      <div className="scrollbar-hide flex gap-2 overflow-x-auto">
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
      <div className="flex flex-col gap-7.5">
        {reservations.map((reservation) => (
          <ReservedCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
      <div ref={targetRef} />
      {isFetchingNextPage && <ReservedCardSkeleton />}
    </div>
  );
};

export default ReservedCardList;
