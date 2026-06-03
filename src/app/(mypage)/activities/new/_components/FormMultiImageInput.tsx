"use client";

import FormController from "@/components/Form/FormController";
import MultiImageInput from "@/components/ImageInput/MultiImageInput";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { MultiImageInputProps } from "@/components/ImageInput/type";
import { ChangeEvent } from "react";

interface FormMultiImageInputProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> extends Omit<MultiImageInputProps, "name"> {
  control: Control<TFieldValues>;
  name: TName;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

const FormMultiImageInput = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  control,
  name,
  rules,
  ...props
}: FormMultiImageInputProps<TFieldValues, TName>) => {
  return (
    <FormController
      control={control}
      name={name}
      rules={rules}
      render={(field) => (
        <MultiImageInput
          {...props}
          name={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (props.maxCount === 1) {
              field.onChange(files && files.length > 0 ? files[0] : null);
            } else {
              field.onChange(files ? Array.from(files) : []);
            }
          }}
        />
      )}
    />
  );
};

export default FormMultiImageInput;
