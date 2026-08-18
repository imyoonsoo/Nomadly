import { ActivitySummary } from "@/features/activities/type";

export type CardItem = ActivitySummary;

export interface CardListProps {
  items: CardItem[];
  keyword?: string;
  isLoading?: boolean; // 로딩 중 스켈레톤 표시 판단용
}

export interface ActivitiesCardProps extends CardItem {
  keyword?: string;
}
