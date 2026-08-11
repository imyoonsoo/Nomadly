"use client";

import { AltLeft, AltRight } from "@/constants/icons";
import type { CalendarProps } from "./type";
import {
  formatDateKey,
  getTimestampListForCalendar,
  getTodayTimestamp,
  getYearAndMonthFromTimestamp,
  isCurrentMonth,
  isToday,
  WEEK_DAYS,
} from "./utils";

const Calendar = ({
  selectedTimestamp,
  selectedYearAndMonth,
  selectableDateKeys,
  onSelectTimestamp,
  onChangeYearAndMonth,
}: CalendarProps) => {
  const calendarTimestamps = getTimestampListForCalendar(
    selectedYearAndMonth.year,
    selectedYearAndMonth.month,
  );

  const handlePrevMonthButtonClick = () => {
    if (selectedYearAndMonth.month === 0) {
      onChangeYearAndMonth({
        year: selectedYearAndMonth.year - 1,
        month: 11,
      });
      return;
    }

    onChangeYearAndMonth({
      year: selectedYearAndMonth.year,
      month: selectedYearAndMonth.month - 1,
    });
  };

  const handleNextMonthButtonClick = () => {
    if (selectedYearAndMonth.month === 11) {
      onChangeYearAndMonth({
        year: selectedYearAndMonth.year + 1,
        month: 0,
      });
      return;
    }

    onChangeYearAndMonth({
      year: selectedYearAndMonth.year,
      month: selectedYearAndMonth.month + 1,
    });
  };

  const monthLabel = new Date(
    selectedYearAndMonth.year,
    selectedYearAndMonth.month,
    1,
  ).toLocaleString("en-US", { month: "long" });

  const handleTodayButtonClick = () => {
    const today = getTodayTimestamp();
    onChangeYearAndMonth(getYearAndMonthFromTimestamp(today));
    onSelectTimestamp(today);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex min-h-9 items-center justify-center">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="이전 달"
            onClick={handlePrevMonthButtonClick}
            className="flex h-6 w-6 items-center justify-center"
          >
            <AltLeft className="h-full w-full" />
          </button>

          <p className="text-16-medium text-gray-950">
            {monthLabel} {selectedYearAndMonth.year}
          </p>

          <button
            type="button"
            aria-label="다음 달"
            onClick={handleNextMonthButtonClick}
            className="flex h-6 w-6 items-center justify-center"
          >
            <AltRight className="h-full w-full" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleTodayButtonClick}
          className="border-primary-500 text-13-bold text-primary-500 hover:bg-primary-100 absolute right-0 h-9 rounded-xl border px-4 transition"
        >
          오늘
        </button>
      </div>

      <div className="gap-x-1.17 grid grid-cols-7 gap-y-2">
        {WEEK_DAYS.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className="text-16-medium flex h-11.5 w-11.5 items-center justify-center text-center font-semibold text-gray-800"
          >
            {day}
          </div>
        ))}

        {calendarTimestamps.map((timestamp) => {
          const dateKey = formatDateKey(timestamp);
          const isSelected = timestamp === selectedTimestamp;
          const isTodayDate = isToday(timestamp);
          const isCurrentMonthDate = isCurrentMonth(
            timestamp,
            selectedYearAndMonth.month,
          );
          const isSelectable = selectableDateKeys.has(dateKey);
          const dayNumber = new Date(timestamp).getDate();

          return (
            <button
              key={timestamp}
              type="button"
              disabled={!isSelectable}
              onClick={() => {
                onSelectTimestamp(timestamp);
              }}
              className={`text-16-medium mx-auto flex h-11.5 w-11.5 items-center justify-center rounded-full transition ${
                isSelected
                  ? "bg-primary-500 text-white"
                  : isTodayDate
                    ? "bg-primary-100 text-primary-500"
                    : isCurrentMonthDate
                      ? isSelectable
                        ? "text-gray-950 hover:bg-gray-50"
                        : "cursor-not-allowed text-gray-300"
                      : "cursor-not-allowed text-gray-300"
              }`}
            >
              {dayNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
