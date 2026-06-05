export interface ActivityReviewsResponse {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

export interface Review {
  id: number;
  user: ReviewUser;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewUser {
  profileImageUrl?: string;
  nickname: string;
  id: number;
}

export interface ActivityDetailResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: ActivityImage[];
  schedules: ActivitySchedule[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityImage {
  id: number;
  imageUrl: string;
}

export interface ActivitySchedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}
