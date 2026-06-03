import { useEffect, useRef, useState } from "react";
import PrevIcon from "@/assets/icons/alt-arrow-left.svg";
import NextIcon from "@/assets/icons/alt-arrow-right.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";
import { DAYS, MONTH_NAMES_EN } from "../constants";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const [currentYear, setCurrentYear] = useState(todayYear);
  const [currentMonth, setCurrentMonth] = useState(todayMonth);

  const generateCalendarDays = () => {
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    const daysArray = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
      daysArray.push(i);
    }
    return daysArray;
  };

  const days = generateCalendarDays();

  const handlePrevMonth = () => {
    if (currentYear === todayYear && currentMonth === todayMonth) {
      return;
    }

    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const formattedYear = String(currentYear).slice(-2);

    onChange(`${formattedYear}/${formattedMonth}/${formattedDay}`);
    setIsCalendarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPrevDisabled =
    currentYear === todayYear && currentMonth === todayMonth;

  return (
    <div ref={containerRef} className="w-full relative">
      <div
        onClick={() => setIsCalendarOpen((prev) => !prev)}
        className="h-13.5 border-2 border-gray-100 rounded-2xl shadow-[0_2px_6px_0_rgba(0,0,0,0.02)] flex items-center justify-between px-5 bg-white cursor-pointer"
      >
        <input
          type="text"
          placeholder="yy/mm/dd"
          value={value ?? ""}
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
        <div className="absolute top-full right-0 mt-2 z-20 w-[320px] md:w-full bg-white px-5 py-7 border border-gray-100 rounded-2xl shadow-2xl select-none">
          {/* 날짜 이동 */}
          <div className="flex justify-between items-center mb-5 px-2">
            <span className="text-16-bold text-gray-950 tracking-wide">
              {MONTH_NAMES_EN[currentMonth]} {currentYear}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={isPrevDisabled}
                onClick={handlePrevMonth}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition
                ${
                  isPrevDisabled
                    ? "text-gray-200 cursor-not-allowed bg-gray-50 opacity-80 border-gray-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                }`}
              >
                <PrevIcon width={20} height={20} />
              </button>

              <button
                type="button"
                onClick={handleNextMonth}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition hover:bg-gray-50 hover:text-gray-950"
              >
                <NextIcon width={20} height={20} />
              </button>
            </div>
          </div>

          {/* 요일 */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {DAYS.map((day, index) => (
              <span
                key={`${day}-${index}`}
                className={`text-14-medium ${index === 0 ? "text-red-500" : index === 6 ? "text-primary-500" : "text-gray-500"}`}
              >
                {day}
              </span>
            ))}
          </div>

          {/* 달력 */}
          <div className="grid grid-cols-7 gap-2 place-items-center text-center">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} />;
              }

              const formattedCurrent = `${String(currentYear).slice(-2)}/${String(currentMonth + 1).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
              const isSelected = value === formattedCurrent;

              const isPastDay =
                currentYear < todayYear ||
                (currentYear === todayYear && currentMonth < todayMonth) ||
                (currentYear === todayYear &&
                  currentMonth === todayMonth &&
                  day < todayDate);

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  disabled={isPastDay}
                  onClick={() => handleDateClick(day)}
                  className={`w-10 h-10 text-14-medium text-center flex items-center justify-center rounded-xl transition-all
                    ${
                      isSelected
                        ? "bg-primary-500 text-white font-bold"
                        : isPastDay
                          ? "text-gray-200 cursor-not-allowed"
                          : "text-gray-900 hover:bg-gray-100"
                    }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
