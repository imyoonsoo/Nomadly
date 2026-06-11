export interface SelectOption {
  value: number | string;
  label: string;
}

export interface SelectDropdownProps {
  options: readonly SelectOption[];
  selectedValue: number | string;
  onChange: (value: number | string) => void;
  placeholder?: string;
  fieldLabel?: string | React.ReactNode;
}
