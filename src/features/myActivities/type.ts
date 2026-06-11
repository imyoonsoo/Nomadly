export interface ActivitiesProps {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetMyActivitiesParams {
  cursorId?: number;
  size?: number;
}

export interface GetMyActivitiesResponse {
  cursorId: number | null;
  totalCount: number;
  activities: ActivitiesProps[];
}
