import { ActivitiesProps } from "./type";

export const getSortedActivities = (
  activities: ActivitiesProps[],
  sortType: string | number,
) => {
  const cardList = [...activities];

  if (sortType === "price_desc") {
    return cardList.sort((a, b) => b.price - a.price);
  } else if (sortType === "price_asc") {
    return cardList.sort((a, b) => a.price - b.price);
  } else if (sortType === "review") {
    return cardList.sort((a, b) => b.reviewCount - a.reviewCount);
  } else {
    return cardList.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
};
