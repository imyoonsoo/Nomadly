export type ReservationStatus = "declined" | "pending" | "confirmed";

export interface ReservationDashboardItem {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

export interface ReservedScheduleItem {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

export interface ReservationCardItem {
  id: number;
  nickname: string;
  headCount: number;
  activityId: number;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationCardPage {
  cursorId: number | null;
  totalCount: number;
  reservations: ReservationCardItem[];
}

export interface MyActivityItem {
  id: number;
  title: string;
}

export interface MyActivitiesResponse {
  cursorId: number;
  totalCount: number;
  activities: MyActivityItem[];
}
