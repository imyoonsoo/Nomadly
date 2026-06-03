import { ReactElement } from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface FormControllerProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsData" | "setValueAs" | "disabled"
  >;
  render: (
    field: ControllerRenderProps<TFieldValues, TName>,
    fieldState: ControllerFieldState,
  ) => ReactElement;
}

const FormController = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  control,
  name,
  rules,
  render,
}: FormControllerProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => render(field, fieldState)}
    />
  );
};

export default FormController;
