interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

export interface ActivityFormValues {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number | string;
  schedules: Schedule[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export interface CreateActivityRequest {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: Schedule[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

export interface ActivityDetailSchedule {
  times: TimeSlot[];
  date: string;
}

export interface ActivityDetailSubImage {
  id: number;
  imageUrl: string;
}

export interface CreateActivityResponse {
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
  subImages: ActivityDetailSubImage[];
  schedules: ActivityDetailSchedule[];
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

export type UpdateActivityResponse = CreateActivityResponse;
