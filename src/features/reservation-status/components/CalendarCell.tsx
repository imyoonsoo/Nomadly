import { ReservationDashboardItem } from "@/features/reservation-status/type";
import { formatDateKey } from "@/features/reservation-status/utils";
import ReservationStatusBadge from "@/features/reservation-status/components/ReservationStatusBadge";

interface CalendarCellProps {
  date: Date;
  currentMonth: number;
  reservation?: ReservationDashboardItem;
  onClickDate: (date: string) => void;
}

const CalendarCell = ({
  date,
  currentMonth,
  reservation,
  onClickDate,
}: CalendarCellProps) => {
  const dateKey = formatDateKey(date);
  const todayKey = formatDateKey(new Date());

  const isCurrentMonth = date.getMonth() === currentMonth;
  const isToday = dateKey === todayKey;
  const hasReservation = !!reservation;

  return (
    <button
      type="button"
      onClick={() => onClickDate(dateKey)}
      className={`hover:bg-primary-100 flex h-26 w-full flex-col items-center border-b border-gray-100 px-1 transition md:h-31 md:px-3 ${
        isToday ? "pt-1 md:pt-3" : "pt-2 pb-1 md:pt-4 md:pb-2"
      }`}
    >
      <div className="flex items-start justify-start pt-0.5">
        <span
          className={`flex items-center justify-center leading-none ${
            isToday
              ? "bg-primary-500 text-12-bold md:text-16-bold h-7 w-7 rounded-full text-white"
              : isCurrentMonth
                ? "text-12-medium md:text-16-medium text-gray-800"
                : "text-12-medium md:text-16-medium text-gray-300"
          }`}
        >
          {date.getDate()}
        </span>

        {hasReservation && (
          <span className="absolute mt-0.5 ml-5 h-1 w-1 rounded-full bg-red-500 md:h-1.5 md:w-1.5" />
        )}
      </div>

      {reservation && (
        <div className="mt-2 flex w-full flex-col items-start gap-1">
          <ReservationStatusBadge
            label="완료"
            count={reservation.reservations.completed}
            color="gray"
          />
          <ReservationStatusBadge
            label="예약"
            count={reservation.reservations.pending}
            color="blue"
          />
          <ReservationStatusBadge
            label="승인"
            count={reservation.reservations.confirmed}
            color="yellow"
          />
        </div>
      )}
    </button>
  );
};

export default CalendarCell;
