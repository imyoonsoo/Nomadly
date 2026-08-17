import { ActivitySummary } from "@/features/activities/type";

export type CardItem = ActivitySummary & {
  isBookmarked?: boolean;
};

export interface CardListProps {
  items: CardItem[];
  keyword?: string;
  isLoading?: boolean; // 로딩 중 스켈레톤 표시 판단용
}

export type ActivitiesCardProps = CardItem & {
  keyword?: string;
  onToggleBookmark?: (id: number) => void;
};
