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
  cursorId: number;
  totalCount: number;
  activities: ActivitiesProps[];
}

// Todo: activity 타입 논의 후 분리
interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

export interface UpdateActivityRequest {
  title: string;
  category: string;
  description: string;
  price: number;
  bannerImageUrl: string;
  subImagesIdsToRemove: number[];
  subImagesUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: Schedule[];
}

export interface ResponseTimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

export interface ResponseSchedule {
  times: ResponseTimeSlot[];
  date: string;
}

export interface ResponseSubImages {
  id: number;
  imageUrl: string;
}

export interface UpdateActivityResponse {
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
  subImages: ResponseSubImages[];
  schedules: ResponseSchedule[];
}
