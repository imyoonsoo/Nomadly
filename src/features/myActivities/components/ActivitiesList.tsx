"use client";

import { useMemo, useState } from "react";
import { ActivitiesProps } from "@/features/myActivities/type";

import SortDropdown from "./SortDropdown";
import ActivityBanner from "./ActivityBanner";
import EmptyCardList from "./EmptyCardList";
import CardList from "./CardList";

interface ActivitiesListProps {
  initialCards?: ActivitiesProps[];
}

const ActivitiesList = ({ initialCards }: ActivitiesListProps) => {
  const activityCount = initialCards.length;
  const [currentSort, setCurrentSort] = useState<string | number>("latest");

  const sortedList = useMemo(() => {
    const cardList = [...initialCards];

    if (currentSort === "price_desc") {
      return cardList.sort((a, b) => b.price - a.price);
    } else if (currentSort === "price_asc") {
      return cardList.sort((a, b) => a.price - b.price);
    } else if (currentSort === "review") {
      return cardList.sort((a, b) => b.reviewCount - a.reviewCount);
    } else {
      return cardList.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
  }, [initialCards, currentSort]);

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
