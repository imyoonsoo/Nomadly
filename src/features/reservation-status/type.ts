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
}

export interface ReservationCardPage {
  cursorId: number | null;
  totalCount: number;
  reservations: ReservationCardItem[];
}
