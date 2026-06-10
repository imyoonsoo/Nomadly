import type { StaticImageData } from "next/image";

export type CardItem = {
  id: number;
  title: string;
  description?: string;
  category: string;
  price: number;
  bannerImageUrl: StaticImageData;
  link: string;
  reviewCount: number;
  rating: number;
};

export type CardListProps = {
  items: CardItem[];
  keyword?: string;
};
