import type { StaticImageData } from "next/image";

export type CardItem = {
  id: number;
  title?: string;
  description?: string;
  category?: string;
  price: number;
  imageUrl: StaticImageData;
  link: string;
  reviewCount: number;
};

export type CardListProps = {
  items: CardItem[];
};
