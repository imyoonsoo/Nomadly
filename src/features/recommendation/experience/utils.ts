import {
  Category,
  RecommendationResult,
} from "@/features/recommendation/experience/type";
import { QUESTIONS } from "@/features/recommendation/experience/constants/questions";

export const CATEGORY_LIST: Category[] = [
  "문화예술",
  "식음료",
  "스포츠",
  "투어",
  "관광",
  "웰빙",
];

export const getRecommendationResult = (
  selectedAnswers: number[],
): RecommendationResult[] => {
  const scores = CATEGORY_LIST.reduce(
    (acc, category) => {
      acc[category] = 0;
      return acc;
    },
    {} as Record<Category, number>,
  );

  selectedAnswers.forEach((answerIndex, questionIndex) => {
    if (answerIndex < 0) return;

    const option = QUESTIONS[questionIndex].options[answerIndex];

    Object.entries(option.scores).forEach(([category, score]) => {
      scores[category as Category] += score ?? 0;
    });
  });

  return Object.entries(scores)
    .map(([category, score]) => ({
      category: category as Category,
      score,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};
