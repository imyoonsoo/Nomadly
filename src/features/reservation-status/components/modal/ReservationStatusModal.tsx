import MobileReservationStatusModal from "@/features/reservation-status/components/modal/MobileReservationStatusModal";
import PcReservationStatusModal from "@/features/reservation-status/components/modal/PcReservationStatusModal";

interface ReservationStatusModalProps {
  open: boolean;
  activityId: number;
  selectedDate: string | null;
  onClose: () => void;
}

const ReservationStatusModal = ({
  open,
  activityId,
  selectedDate,
  onClose,
}: ReservationStatusModalProps) => {
  if (!open || !selectedDate) {
    return null;
  }

  return (
    <>
      <PcReservationStatusModal
        activityId={activityId}
        selectedDate={selectedDate}
        onClose={onClose}
      />

      <MobileReservationStatusModal
        activityId={activityId}
        selectedDate={selectedDate}
        onClose={onClose}
      />
    </>
  );
};

export default ReservationStatusModal;
