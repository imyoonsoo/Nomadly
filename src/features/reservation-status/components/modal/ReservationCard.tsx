import StateBadge from "@/components/StateBadge/StateBadge";
import {
  ReservationCardItem,
  ReservationStatus,
} from "@/features/reservation-status/type";

interface ReservationCardProps {
  reservation: ReservationCardItem;
  status: ReservationStatus;
  onApprove?: (reservationId: number) => void;
  onDecline?: (reservationId: number) => void;
}

const ReservationCard = ({
  reservation,
  status,
  onApprove,
  onDecline,
}: ReservationCardProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4 cursor-default">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-14-bold xl:text-16-bold">
            닉네임
          </span>
          <span className="text-black text-14-medium xl:text-16-medium">
            {reservation.nickname}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-[22px]">
          <span className="text-gray-500 text-14-bold xl:text-16-bold">
            인원
          </span>
          <span className="text-black text-14-medium xl:text-16-medium">
            {reservation.headCount}명
          </span>
        </div>
      </div>

      {status === "pending" ? (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onApprove?.(reservation.id)}
            className="h-8 rounded-lg border border-gray-50 px-3 text-14-medium text-gray-600"
          >
            승인하기
          </button>
          <button
            type="button"
            onClick={() => onDecline?.(reservation.id)}
            className="h-8 rounded-lg border-none bg-gray-50 px-3 text-14-medium text-gray-600"
          >
            거절하기
          </button>
        </div>
      ) : (
        <StateBadge
          status={status === "confirmed" ? "pending" : "declined"}
          className="self-center"
        />
      )}
    </div>
  );
};

export default ReservationCard;
