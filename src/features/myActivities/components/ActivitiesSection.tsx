"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { myActivitiesInfiniteQuery } from "@/features/myActivities/queries";
import { getSortedActivities } from "../utils";

import SortDropdown from "./SortDropdown";
import ActivityBanner from "./ActivityBanner";
import ActivitiesList from "./ActivitiesList";
import EmptyCardList from "./EmptyCardList";

const ActivitiesSection = () => {
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

  if (isError) {
    return <EmptyCardList message="체험 목록을 불러오지 못했어요" />;
  }

  const cards = data?.pages.flatMap((page) => page.activities) ?? [];
  const sortedActivities = getSortedActivities(cards, currentSort);
  const totalCount = data?.pages[0]?.totalCount ?? 0;
  return (
    <>
      <SortDropdown currentSort={currentSort} onChange={setCurrentSort} />

      <ActivityBanner count={totalCount} isLoading={isLoading} />

      <ActivitiesList
        isLoading={isLoading}
        totalCount={totalCount}
        sortedActivities={sortedActivities}
        targetRef={targetRef}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
};

export default ActivitiesSection;
