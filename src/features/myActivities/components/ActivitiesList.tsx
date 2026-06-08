"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { myActivitiesQuery } from "@/features/myActivities/queries";
import { getSortedActivities } from "../utils";

import SortDropdown from "./SortDropdown";
import ActivityBanner from "./ActivityBanner";
import EmptyCardList from "./EmptyCardList";
import CardList from "./CardList";

const ActivitiesList = () => {
  const [currentSort, setCurrentSort] = useState<string | number>("latest");
  const { data, isLoading } = useQuery({
    ...myActivitiesQuery({
      size: 10,
    }),
  });

  if (isLoading) return <div>로딩 중입니다...</div>;
  const cards = data?.activities || [];

  const activityCount = cards.length;
  const sortedList = getSortedActivities(cards, currentSort);

  return (
    <>
      <SortDropdown currentSort={currentSort} onChange={setCurrentSort} />

      <ActivityBanner count={activityCount} />

      {activityCount === 0 ? (
        <EmptyCardList />
      ) : (
        <CardList cards={sortedList} />
      )}
    </>
  );
};

export default ActivitiesList;
