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
};

export type ActivitiesCardProps = CardItem & {
  keyword?: string;
  onToggleBookmark?: (id: number) => void;
};
