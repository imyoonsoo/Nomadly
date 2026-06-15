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
      className={`flex flex-col items-center h-[104px] md:h-31 w-full border-b border-gray-100 px-1 md:px-3 transition hover:bg-primary-100 ${
        isToday ? "pt-1 md:pt-3" : "pt-2 md:pt-4 pb-1 md:pb-2"
      }`}
    >
      <div className="flex items-start justify-start pt-0.5">
        <span
          className={`flex items-center justify-center leading-none ${
            isToday
              ? "w-7 h-7 rounded-full bg-primary-500 text-white text-12-bold md:text-16-bold"
              : isCurrentMonth
                ? "text-gray-800 text-12-medium md:text-16-medium"
                : "text-gray-300 text-12-medium md:text-16-medium"
          }`}
        >
          {date.getDate()}
        </span>

        {hasReservation && (
          <span className="absolute ml-5 mt-0.5 h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-red-500" />
        )}
      </div>

      {reservation && (
        <div className="mt-2 flex flex-col w-full items-start gap-1">
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
