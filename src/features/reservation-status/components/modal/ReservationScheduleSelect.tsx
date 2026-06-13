import { ReservedScheduleItem } from "@/features/reservation-status/type";
import SelectDropdown from "@/components/SelectDropdown/SelectDropdown";

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
    <SelectDropdown
      options={scheduleOptions}
      selectedValue={selectedScheduleId}
      onChange={(value) => onChangeScheduleId(Number(value))}
    />
  );
};

export default ReservationScheduleSelect;
