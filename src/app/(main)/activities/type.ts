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
  profileImageUrl: string;
  nickname: string;
  id: number;
}
