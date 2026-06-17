export interface GetActivityReviewsParams {
  activityId: number;
  page?: number;
  size?: number;
}

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

export interface GetActivityDetailParams {
  activityId: number;
}

export interface CreateActivityReservationParams {
  activityId: number;
  scheduleId: number;
  headCount: number;
}

export interface CreateActivityReservationRequest {
  scheduleId: number;
  headCount: number;
}

export interface CreateActivityReservationResponse {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: "pending" | "confirmed" | "declined";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface AvailableActivitiesReservationParams {
  activityId: number;
  year: string;
  month: string;
}

export type AvailableActivitiesReservationResponse =
  AvailableActivitiesReservation[];

export interface AvailableActivitiesReservation {
  date: string;
  times: Time[];
}

export interface Time {
  endTime: string;
  startTime: string;
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
