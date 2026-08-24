import {
  ReservationCardItem,
  ReservationStatus,
} from "@/features/reservation-status/type";
import ReservationStateBadge from "@/features/reservation-status/components/modal/ReservationStateBadge";

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
    <div className="flex cursor-default items-center justify-between rounded-xl border border-gray-200 p-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-14-bold xl:text-16-bold text-gray-500">
            닉네임
          </span>
          <span className="text-14-medium xl:text-16-medium text-black">
            {reservation.nickname}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-5.5">
          <span className="text-14-bold xl:text-16-bold text-gray-500">
            인원
          </span>
          <span className="text-14-medium xl:text-16-medium text-black">
            {reservation.headCount}명
          </span>
        </div>
      </div>

      {status === "pending" ? (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onApprove?.(reservation.id)}
            className="text-14-medium h-8 rounded-lg border border-gray-50 px-3 text-gray-600"
          >
            승인하기
          </button>
          <button
            type="button"
            onClick={() => onDecline?.(reservation.id)}
            className="text-14-medium h-8 rounded-lg border-none bg-gray-50 px-3 text-gray-600"
          >
            거절하기
          </button>
        </div>
      ) : (
        <ReservationStateBadge status={status} className="self-center" />
      )}
    </div>
  );
};

export default ReservationCard;
