"use client";

import { useEffect, useMemo, useState } from "react";
import { ReservationDashboardItem } from "@/features/reservation-status/type";
import {
  formatDateKey,
  getCalendarDates,
} from "@/features/reservation-status/utils";
import { AltLeft } from "@/constants/icons";
import { AltRight } from "@/constants/icons";
import CalendarCell from "@/features/reservation-status/components/CalendarCell";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

interface ReservationCalendarProps {
  reservations: ReservationDashboardItem[];
  onClickDate: (date: string) => void;
  onChangeMonth: (value: { year: string; month: string }) => void;
}

const ReservationCalendar = ({
  reservations,
  onClickDate,
  onChangeMonth,
}: ReservationCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDates = useMemo(
    () => getCalendarDates(year, month),
    [year, month],
  );

  const reservationMap = useMemo(() => {
    return new Map(reservations.map((item) => [item.date, item]));
  }, [reservations]);

  const handlePrevMonthButtonClick = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonthButtonClick = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  useEffect(() => {
    onChangeMonth({
      year: String(year),
      month: String(month + 1).padStart(2, "0"),
    });
  }, [year, month, onChangeMonth]);

  const handleTodayButtonClick = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  return (
    <div className="w-full max-w-[640px] overflow-hidden rounded-3xl bg-white md:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="relative flex items-center justify-center h-11 px-7 mb-2 md:mt-5 md:mb-[30px]">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={handlePrevMonthButtonClick}
            className="w-6 h-6 hover:-translate-y-px"
          >
            <AltLeft className="w-full h-full" />
          </button>

          <h2 className="text-16-bold md:text-20-bold text-black">
            {year}년 {month + 1}월
          </h2>

          <button
            type="button"
            onClick={handleNextMonthButtonClick}
            className="w-6 h-6 hover:-translate-y-px"
          >
            <AltRight className="w-full h-full" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleTodayButtonClick}
          className="absolute right-5 md:right-7 h-9 rounded-xl border border-primary-500 px-4 text-13-bold text-primary-500 transition hover:bg-primary-100"
        >
          오늘
        </button>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-200">
        {WEEK_DAYS.map((day, i) => (
          <div
            key={`${day}-${i}`}
            className="h-11 md:h-[55px] md:pb-3 text-center text-13-bold md:text-16-bold text-gray-900 leading-10"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarDates.map((date) => {
          const dateKey = formatDateKey(date);

          return (
            <CalendarCell
              key={dateKey}
              date={date}
              currentMonth={month}
              reservation={reservationMap.get(dateKey)}
              onClickDate={onClickDate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ReservationCalendar;
