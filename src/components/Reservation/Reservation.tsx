"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button/Button";
import { Minus, Plus } from "@/constants/icons";
import Calendar from "./Calendar";
import type { ReservationProps } from "./type";
import {
  formatDateKey,
  formatPrice,
  getSelectableDateKeys,
  getTodayTimestamp,
  getYearAndMonthFromTimestamp,
  parseDateKey,
} from "./utils";

const MIN_HEAD_COUNT = 1;
const MAX_HEAD_COUNT = 10;

const Reservation = ({ price, schedules, onReserve }: ReservationProps) => {
  const todayTimestamp = getTodayTimestamp();
  const selectableDateKeys = useMemo(
    () => getSelectableDateKeys(schedules),
    [schedules],
  );

  const initialTimestamp = useMemo(() => {
    const firstAvailableDateKey = Array.from(selectableDateKeys).sort()[0];

    if (!firstAvailableDateKey) {
      return todayTimestamp;
    }

    return parseDateKey(firstAvailableDateKey);
  }, [selectableDateKeys, todayTimestamp]);

  const [selectedTimestamp, setSelectedTimestamp] = useState(initialTimestamp);
  const [selectedYearAndMonth, setSelectedYearAndMonth] = useState(() =>
    getYearAndMonthFromTimestamp(initialTimestamp),
  );
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );
  const [headCount, setHeadCount] = useState(MIN_HEAD_COUNT);

  const selectedDateKey = formatDateKey(selectedTimestamp);

  const availableSchedules = useMemo(
    () => schedules.filter((schedule) => schedule.date === selectedDateKey),
    [schedules, selectedDateKey],
  );

  useEffect(() => {
    setSelectedYearAndMonth(getYearAndMonthFromTimestamp(selectedTimestamp));
  }, [selectedTimestamp]);

  useEffect(() => {
    if (availableSchedules.length === 0) {
      setSelectedScheduleId(null);
      return;
    }

    if (
      selectedScheduleId !== null &&
      !availableSchedules.some((schedule) => schedule.id === selectedScheduleId)
    ) {
      setSelectedScheduleId(null);
    }
  }, [availableSchedules, selectedScheduleId]);

  const totalPrice = price * headCount;
  const isReservable = selectedScheduleId !== null;

  const handleSelectTimestamp = (timestamp: number) => {
    setSelectedTimestamp(timestamp);
    setSelectedScheduleId(null);
  };

  const handleDecreaseHeadCount = () => {
    setHeadCount((prev) => Math.max(MIN_HEAD_COUNT, prev - 1));
  };

  const handleIncreaseHeadCount = () => {
    setHeadCount((prev) => Math.min(MAX_HEAD_COUNT, prev + 1));
  };

  const handleReserveClick = () => {
    if (!selectedScheduleId) {
      return;
    }

    onReserve?.({ scheduleId: selectedScheduleId, headCount });
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-7.5">
      <p className="flex gap-1.25 items-center text-24-bold text-gray-950">
        ₩ {formatPrice(price)}
        <span className="text-20-medium text-gray-600">/ 인</span>
      </p>

      <div className="flex flex-col gap-2">
        <h3 className="text-16-bold text-gray-950">날짜</h3>
        <Calendar
          selectedTimestamp={selectedTimestamp}
          selectedYearAndMonth={selectedYearAndMonth}
          selectableDateKeys={selectableDateKeys}
          onSelectTimestamp={handleSelectTimestamp}
          onChangeYearAndMonth={setSelectedYearAndMonth}
        />
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-16-bold text-gray-950">참여 인원 수</h3>
        <div className="flex items-center justify-between rounded-3xl border border-gray-100 px-2.25">
          <button
            type="button"
            aria-label="인원 감소"
            disabled={headCount <= MIN_HEAD_COUNT}
            onClick={handleDecreaseHeadCount}
            className="flex h-10 w-10 items-center justify-center disabled:opacity-40"
          >
            <Minus className="h-5 w-5" />
          </button>
          <span className="flex h-10 w-10 items-center justify-center text-center text-16-bold text-gray-800">
            {headCount}
          </span>
          <button
            type="button"
            aria-label="인원 증가"
            disabled={headCount >= MAX_HEAD_COUNT}
            onClick={handleIncreaseHeadCount}
            className="flex h-10 w-10 items-center justify-center disabled:opacity-40"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 pb-2.25">
        <h3 className="text-16-bold text-gray-950">예약 가능한 시간</h3>
        <div className="flex flex-col gap-3">
          {availableSchedules.map((schedule) => (
            <button
              key={schedule.id}
              type="button"
              onClick={() => setSelectedScheduleId(schedule.id)}
              className={`rounded-xl border px-3 py-4 text-16-medium transition ${
                selectedScheduleId === schedule.id
                  ? "ring-2 ring-inset ring-primary-500 border-primary-500 bg-primary-100 text-primary-500"
                  : "border-gray-300 bg-white text-gray-900 hover:border-primary-500"
              }`}
            >
              {schedule.startTime} ~ {schedule.endTime}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-5 pb-2.5">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-20-medium text-gray-600">총 합계</span>
          <span className="text-20-bold text-gray-950">
            ₩ {formatPrice(totalPrice)}
          </span>
        </div>
        <Button
          type="button"
          variant="mainBlue"
          height="h50"
          disabled={!isReservable}
          onClick={handleReserveClick}
        >
          예약하기
        </Button>
      </div>
    </div>
  );
};

export default Reservation;
