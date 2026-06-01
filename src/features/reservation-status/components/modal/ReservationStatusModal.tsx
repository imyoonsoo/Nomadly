import MobileReservationStatusModal from "./MobileReservationStatusModal";
import PcReservationStatusModal from "./PcReservationStatusModal";

interface ReservationStatusModalProps {
  open: boolean;
  selectedDate: string | null;
  onClose: () => void;
}

const ReservationStatusModal = ({
  open,
  selectedDate,
  onClose,
}: ReservationStatusModalProps) => {
  if (!open || !selectedDate) return null;

  return (
    <>
      <PcReservationStatusModal selectedDate={selectedDate} onClose={onClose} />

      <MobileReservationStatusModal
        selectedDate={selectedDate}
        onClose={onClose}
      />
    </>
  );
};

export default ReservationStatusModal;
