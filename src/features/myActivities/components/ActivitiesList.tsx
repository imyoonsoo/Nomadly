import { RefObject } from "react";

import { ActivitiesProps } from "../type";
import CardList from "./CardList";
import CardListSkeleton from "./CardListSkeleton";
import EmptyCardList from "./EmptyCardList";

interface ActivitiesListProps {
  isLoading: boolean;
  totalCount: number;
  sortedActivities: ActivitiesProps[];
  targetRef: RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
}

const ActivitiesList = ({
  isLoading,
  totalCount,
  sortedActivities,
  targetRef,
  isFetchingNextPage,
}: ActivitiesListProps) => {
  if (isLoading) {
    return <CardListSkeleton />;
  }

  if (totalCount === 0) {
    return <EmptyCardList />;
  }

  return (
    <>
      <CardList cards={sortedActivities} />

      <div ref={targetRef} className="h-10" />

      {isFetchingNextPage && (
        <div className="py-6 text-center text-gray-500">
          더 불러오는 중입니다...
        </div>
      )}
    </>
  );
};

export default ActivitiesList;
