import { useRef, useState, useMemo, useEffect } from "react";
import {
  formatDateKey,
  formatDisplayDate,
  getTodayTimestamp,
  getYearAndMonthFromTimestamp,
  parseDateKey,
} from "@/components/Reservation/utils";
import { Calendar as CalendarIcon } from "@/constants/icons";
import Calendar from "@/components/Reservation/Calendar";
import { YearAndMonth } from "@/components/Reservation/type";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const todayTimestamp = getTodayTimestamp();
  const [selectedTimestamp, setSelectedTimestamp] = useState(todayTimestamp);

  const [selectedYearAndMonth, setSelectedYearAndMonth] = useState(
    getYearAndMonthFromTimestamp(todayTimestamp),
  );

  useEffect(() => {
    if (!value) {
      return;
    }

    const timestamp = parseDateKey(value);

    setSelectedTimestamp(timestamp);
    setSelectedYearAndMonth(getYearAndMonthFromTimestamp(timestamp));
  }, [value]);

  const selectableDateKeys = useMemo(() => {
    const dates = new Set<string>();

    const today = new Date();

    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      dates.add(formatDateKey(date.getTime()));
    }

    return dates;
  }, []);

  const handleSelectTimestamp = (timestamp: number) => {
    setSelectedTimestamp(timestamp);
    onChange(formatDateKey(timestamp));
    setIsCalendarOpen(false);
  };

  const handleChangeYearAndMonth = (next: YearAndMonth) => {
    const today = new Date();

    const isPastMonth =
      next.year < today.getFullYear() ||
      (next.year === today.getFullYear() && next.month < today.getMonth());

    if (isPastMonth) {
      return;
    }

    setSelectedYearAndMonth(next);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        onClick={() => setIsCalendarOpen((prev) => !prev)}
        className="flex h-13.5 cursor-pointer items-center justify-between rounded-2xl border-2 border-gray-100 bg-white px-5 shadow-[0_2px_6px_0_rgba(0,0,0,0.02)]"
      >
        <input
          type="text"
          placeholder="yy/mm/dd"
          value={value ? formatDisplayDate(value) : ""}
          readOnly
          className="text-16-medium w-full cursor-pointer bg-transparent text-gray-950 placeholder-gray-400 outline-none"
        />
        <div className="flex h-6 w-6 shrink-0 items-center justify-center">
          <CalendarIcon
            width={24}
            height={24}
            className={value ? "text-gray-950" : "text-gray-400"}
          />
        </div>
      </div>

      {isCalendarOpen && (
        <div className="absolute top-full right-0 z-20 mt-2 w-100 rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl">
          <Calendar
            selectedTimestamp={selectedTimestamp}
            selectedYearAndMonth={selectedYearAndMonth}
            selectableDateKeys={selectableDateKeys}
            onSelectTimestamp={handleSelectTimestamp}
            onChangeYearAndMonth={handleChangeYearAndMonth}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
