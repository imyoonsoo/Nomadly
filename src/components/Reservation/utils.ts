import type { YearAndMonth } from "./type";

export const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export const normalizeTimestamp = (date: Date) => {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate.getTime();
};

export const getTodayTimestamp = () => {
  return normalizeTimestamp(new Date());
};

export const formatDateKey = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const isToday = (timestamp: number) => {
  return timestamp === getTodayTimestamp();
};

export const isCurrentMonth = (timestamp: number, month: number) => {
  return new Date(timestamp).getMonth() === month;
};

export const getTimestampListForCalendar = (
  selectedYear: number,
  selectedMonth: number,
) => {
  const firstDayDate = new Date(selectedYear, selectedMonth, 1);
  const lastDayDate = new Date(selectedYear, selectedMonth + 1, 0);
  const endDay = lastDayDate.getDate();

  const dayOfStartDay = firstDayDate.getDay();
  const dayOfEndDay = lastDayDate.getDay();

  const numOfDaysFromPreviousMonth = dayOfStartDay;
  const numOfDaysFromNextMonth = 6 - dayOfEndDay;

  const timestampsFromPreviousMonth = Array.from(
    { length: numOfDaysFromPreviousMonth },
    (_, index) =>
      normalizeTimestamp(
        new Date(
          selectedYear,
          selectedMonth,
          -numOfDaysFromPreviousMonth + index + 1,
        ),
      ),
  );

  const timestampsForCurrentMonth = Array.from({ length: endDay }, (_, index) =>
    normalizeTimestamp(new Date(selectedYear, selectedMonth, index + 1)),
  );

  const timestampsFromNextMonth = Array.from(
    { length: numOfDaysFromNextMonth },
    (_, index) =>
      normalizeTimestamp(new Date(selectedYear, selectedMonth + 1, index + 1)),
  );

  return [
    ...timestampsFromPreviousMonth,
    ...timestampsForCurrentMonth,
    ...timestampsFromNextMonth,
  ];
};

export const getYearAndMonthFromTimestamp = (
  timestamp: number,
): YearAndMonth => {
  const date = new Date(timestamp);

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
  };
};

export const parseDateKey = (dateKey: string) => {
  const [year, month, day] = dateKey.split("-").map(Number);

  return normalizeTimestamp(new Date(year, month - 1, day));
};

export const getSelectableDateKeys = (dateKeys: string[]) => {
  const todayTimestamp = getTodayTimestamp();

  return new Set(
    dateKeys.filter((dateKey) => parseDateKey(dateKey) >= todayTimestamp),
  );
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ko-KR").format(price);
};

export const formatDisplayDate = (dateKey: string) => {
  const [year, month, day] = dateKey.split("-");

  return `${year}/${month}/${day}`;
};
