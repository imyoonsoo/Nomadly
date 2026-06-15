import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import FormController from "@/components/Form/FormController";
import SelectDropdown from "@/components/SelectDropdown/SelectDropdown";

interface FormSelectDropdownProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  options: readonly {
    value: number | string;
    label: string;
  }[];
  placeholder?: string;
  fieldLabel?: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

const FormSelectDropdown = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  control,
  name,
  rules,
  ...props
}: FormSelectDropdownProps<TFieldValues, TName>) => {
  return (
    <FormController
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <SelectDropdown
          {...props}
          selectedValue={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
};

export default FormSelectDropdown;
