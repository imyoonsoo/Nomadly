import type { ActivitySchedule } from "@/app/(main)/activities/type";

export interface YearAndMonth {
  year: number;
  month: number;
}

export interface ReservationProps {
  price: number;
  schedules: ActivitySchedule[];
  onReserve?: (payload: { scheduleId: number; headCount: number }) => void;
}

export interface CalendarProps {
  selectedTimestamp: number;
  selectedYearAndMonth: YearAndMonth;
  selectableDateKeys: Set<string>;
  onSelectTimestamp: (timestamp: number) => void;
  onChangeYearAndMonth: (yearAndMonth: YearAndMonth) => void;
}
