import { ReactNode } from "react";
import SelectDropdown from "./SelectDropdown";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string | ReactNode;
  minTime?: string;
}

const timeOptions = Array.from({ length: 24 }, (_, hour) => {
  const time = `${hour.toString().padStart(2, "0")}:00`;

  return {
    value: time,
    label: time,
  };
});

const TimePicker = ({ value, onChange, label, minTime }: TimePickerProps) => {
  const options = minTime
    ? timeOptions.filter((option) => option.value > minTime)
    : timeOptions;

  return (
    <SelectDropdown
      options={options}
      selectedValue={value}
      onChange={(value) => onChange(String(value))}
      placeholder="00:00"
      fieldLabel={label}
    />
  );
};

export default TimePicker;
