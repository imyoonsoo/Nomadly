import Modal from "@/components/Modal/Modal";
import type { EditReservationModalProps } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editReservationsMutation } from "../queries";
import Reservation from "@/components/Reservation/Reservation";

const EditReservationModal = ({
  isOpen,
  onClose,
  reservationId,
  activityDetail,
}: EditReservationModalProps) => {
  const queryClient = useQueryClient();

  const { mutate: editReservation } = useMutation({
    ...editReservationsMutation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reservations"] });
      onClose();
    },
  });

  if (!activityDetail) return null;

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      className="scrollbar-hide"
    >
      <Reservation
        price={activityDetail.price}
        schedules={activityDetail.schedules}
        submitLabel="예약 변경"
        onReserve={editReservation}
      />
    </Modal>
  );
};

export default EditReservationModal;
