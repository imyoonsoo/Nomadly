import type { ActivityDetailResponse } from "@/app/(main)/activities/type";

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

export interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetMyReservationsParams {
  cursorId?: number;
  size?: number;
  status?: string;
}

export interface EditMyReservationsParams {
  scheduleId: number;
  headCount: number;
}

export interface SubmitReviewParams {
  rating: number;
  content: string;
}

export interface GetMyReservationsResponse {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}

export type CancelReservationResponse = Omit<Reservation, "activity"> & {
  activityId: number;
};

export interface SubmitReviewResponse {
  updatedAt: string;
  createdAt: string;
  content: string;
  rating: number;
  userId: number;
  activityId: number;
  teamId: string;
  id: number;
}

export interface EditReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservationId: number;
  activityDetail: ActivityDetailResponse | undefined;
}
