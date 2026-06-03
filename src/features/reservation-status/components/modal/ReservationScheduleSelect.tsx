import { ReservedScheduleItem } from "@/features/reservation-status/type";
import ReservationDropdown from "@/features/reservation-status/components/ReservationDropdown";

interface ReservationScheduleSelectProps {
  schedules: ReservedScheduleItem[];
  selectedScheduleId: number;
  onChangeScheduleId: (scheduleId: number) => void;
}

const ReservationScheduleSelect = ({
  schedules,
  selectedScheduleId,
  onChangeScheduleId,
}: ReservationScheduleSelectProps) => {
  const scheduleOptions = schedules.map((schedule) => ({
    value: schedule.scheduleId,
    label: `${schedule.startTime} - ${schedule.endTime}`,
  }));

  return (
    <ReservationDropdown
      options={scheduleOptions}
      selectedValue={selectedScheduleId}
      onChange={onChangeScheduleId}
    />
  );
};

export default ReservationScheduleSelect;
