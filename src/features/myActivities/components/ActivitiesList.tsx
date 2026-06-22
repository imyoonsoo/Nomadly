import { RefObject } from "react";

import { ActivitiesProps } from "../type";
import CardList from "./CardList";

interface ActivitiesListProps {
  sortedActivities: ActivitiesProps[];
  targetRef: RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
}

const ActivitiesList = ({
  sortedActivities,
  targetRef,
  isFetchingNextPage,
}: ActivitiesListProps) => {
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
