import { useRef, useState, useMemo, useEffect } from "react";
import {
  formatDateKey,
  formatDisplayDate,
  getTodayTimestamp,
  getYearAndMonthFromTimestamp,
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
    if (value) {
      const timestamp = new Date(value).getTime();
      if (!isNaN(timestamp)) {
        setSelectedTimestamp(timestamp);
        setSelectedYearAndMonth(getYearAndMonthFromTimestamp(timestamp));
      }
    }
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

  return (
    <div ref={containerRef} className="w-full relative">
      <div
        onClick={() => setIsCalendarOpen((prev) => !prev)}
        className="h-13.5 border-2 border-gray-100 rounded-2xl shadow-[0_2px_6px_0_rgba(0,0,0,0.02)] flex items-center justify-between px-5 bg-white cursor-pointer"
      >
        <input
          type="text"
          placeholder="yy/mm/dd"
          value={value ? formatDisplayDate(value) : ""}
          readOnly
          className="w-full outline-none text-16-medium text-gray-950 placeholder-gray-400 bg-transparent cursor-pointer"
        />
        <div className="w-6 h-6 flex items-center justify-center shrink-0">
          <CalendarIcon
            width={24}
            height={24}
            className={value ? "text-gray-950" : "text-gray-400"}
          />
        </div>
      </div>

      {isCalendarOpen && (
        <div className="absolute top-full right-0 mt-2 z-20 w-100 bg-white border border-gray-100 rounded-2xl shadow-2xl p-5">
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
