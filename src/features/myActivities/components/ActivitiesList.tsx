"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { myActivitiesInfiniteQuery } from "@/features/myActivities/queries";
import { getSortedActivities } from "../utils";

import SortDropdown from "./SortDropdown";
import ActivityBanner from "./ActivityBanner";
import EmptyCardList from "./EmptyCardList";
import CardList from "./CardList";
import { showToast } from "@/lib/utils/toast";

const ActivitiesList = () => {
  const [currentSort, setCurrentSort] = useState<string | number>("latest");
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    myActivitiesInfiniteQuery({
      size: 10,
    }),
  );

  const { targetRef } = useInfiniteScroll({
    onIntersect: fetchNextPage,
    hasNextPage: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  // Todo: 스켈레톤 적용
  if (isLoading) {
    return showToast("로딩중");
  }

  if (isError) {
    return <EmptyCardList message="체험 목록을 불러오지 못했어요" />;
  }

  const cards = data?.pages.flatMap((page) => page.activities) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;
  const sortedList = getSortedActivities(cards, currentSort);

  return (
    <>
      <SortDropdown currentSort={currentSort} onChange={setCurrentSort} />

      <ActivityBanner count={totalCount} />

      {totalCount === 0 ? (
        <EmptyCardList />
      ) : (
        <>
          <CardList cards={sortedList} />

          <div ref={targetRef} className="h-10" />

          {isFetchingNextPage && (
            <div className="py-6 text-center text-gray-500">
              더 불러오는 중입니다...
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ActivitiesList;
