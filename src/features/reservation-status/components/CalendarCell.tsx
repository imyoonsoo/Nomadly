import { ReservationDashboardItem } from "../type";
import { formatDateKey } from "../utils";
import ReservationStatusBadge from "./ReservationStatusBadge";

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
  const isCurrentMonth = date.getMonth() === currentMonth;
  const hasReservation = !!reservation;

  return (
    <button
      type="button"
      onClick={() => onClickDate(dateKey)}
      className="flex flex-col items-center h-[104px] md:h-31 w-full border-b border-gray-100 px-1 md:px-3 pt-2 md:pt-4 transition hover:bg-primary-100"
    >
      <div className="flex items-start justify-start pt-0.5">
        <span
          className={`text-12-medium md:text-16-medium leading-none ${
            isCurrentMonth ? "text-gray-800" : "text-gray-300"
          }`}
        >
          {date.getDate()}
        </span>

        {hasReservation && (
          <span className="absolute ml-5 mt-0.5 h-1 w-1 md:h-[6px] md:w-[6px] rounded-full bg-red-500" />
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
