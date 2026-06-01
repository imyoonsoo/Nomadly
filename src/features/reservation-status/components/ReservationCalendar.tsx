"use client";

import { useMemo, useState } from "react";
import { ReservationDashboardItem } from "../type";
import { formatDateKey, getCalendarDates } from "../utils";
import { AltLeft } from "@/constants/icons";
import { AltRight } from "@/constants/icons";
import CalendarCell from "./CalendarCell";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

interface ReservationCalendarProps {
  reservations: ReservationDashboardItem[];
  onClickDate: (date: string) => void;
}

const ReservationCalendar = ({
  reservations,
  onClickDate,
}: ReservationCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1));

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

  return (
    <div className="w-full max-w-[640px] overflow-hidden rounded-[24px] bg-white md:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-center h-11 gap-8 px-7 mb-2 md:mt-5 md:mb-[30px]">
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
