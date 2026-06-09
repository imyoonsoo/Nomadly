import Reservation from "@/components/Reservation/Reservation";
import type { ActivityDetailResponse } from "@/app/(main)/activities/type";

type ReservationSectionProps = Pick<
  ActivityDetailResponse,
  "price" | "schedules"
>;

const ReservationSection = ({ price, schedules }: ReservationSectionProps) => {
  return <Reservation price={price} schedules={schedules} />;
};

export default ReservationSection;
