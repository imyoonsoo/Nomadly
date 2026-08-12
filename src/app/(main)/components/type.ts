export type CardItem = {
  id: number;
  title: string;
  description?: string;
  category: string;
  price: number;
  bannerImageUrl: string;
  link: string;
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  isBookmarked?: boolean;
};

export type CardListProps = {
  items: CardItem[];
  keyword?: string;
  isLoading?: boolean; // 로딩 중 스켈레톤 표시 판단용
};

export type ActivitiesCardProps = CardItem & {
  keyword?: string;
  onToggleBookmark?: (id: number) => void;
};
