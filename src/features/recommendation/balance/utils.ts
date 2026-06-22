import { BALANCE_QUESTIONS } from "./questions";
import { BalanceCategory, BalanceResultItem } from "./type";

const CATEGORY_LIST: BalanceCategory[] = [
  "문화예술",
  "식음료",
  "스포츠",
  "투어",
  "관광",
  "웰빙",
];

export const getBalanceResult = (
  selectedCategories: BalanceCategory[],
): BalanceResultItem[] => {
  const counts = CATEGORY_LIST.reduce(
    (acc, category) => {
      acc[category] = 0;
      return acc;
    },
    {} as Record<BalanceCategory, number>,
  );

  selectedCategories.forEach((category) => {
    counts[category] += 1;
  });

  return Object.entries(counts)
    .map(([category, count]) => ({
      category: category as BalanceCategory,
      count,
      percent: Math.round((count / BALANCE_QUESTIONS.length) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .filter((item) => item.count > 0);
};
