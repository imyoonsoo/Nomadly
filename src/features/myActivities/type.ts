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
  totalCount?: number;
}

export interface GetMyActivitiesResponse {
  cursorId: number;
  totalCount: number;
  activities: ActivitiesProps[];
}
