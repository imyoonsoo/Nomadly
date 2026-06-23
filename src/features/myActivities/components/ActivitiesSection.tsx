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
import CardListSkeleton from "./CardListSkeleton";
import Skeleton from "@/components/Skeleton/Skeleton";
import NotFoundImage from "@/assets/images/empty-notFound.svg";

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

  if (isLoading) {
    return (
      <>
        <Skeleton className="w-30 h-13.5 md:w-36 mr-auto mb-5 rounded-2xl" />
        <ActivityBanner count={0} isLoading />
        <CardListSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <EmptyCardList
        message="체험 목록을 불러오지 못했어요"
        image={<NotFoundImage className="w-45.5 h-45.5" />}
      />
    );
  }

  const cards = data?.pages.flatMap((page) => page.activities) ?? [];
  const sortedActivities = getSortedActivities(cards, currentSort);
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  if (totalCount === 0) {
    return <EmptyCardList />;
  }

  return (
    <>
      <SortDropdown currentSort={currentSort} onChange={setCurrentSort} />

      <ActivityBanner count={totalCount} />

      <ActivitiesList
        sortedActivities={sortedActivities}
        targetRef={targetRef}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
};

export default ActivitiesSection;
