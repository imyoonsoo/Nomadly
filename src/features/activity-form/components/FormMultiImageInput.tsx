"use client";

import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { MultiImageInputProps } from "@/components/ImageInput/type";
import FormController from "@/components/Form/FormController";
import MultiImageInput from "@/components/ImageInput/MultiImageInput";

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
      render={({ field }) => (
        <MultiImageInput
          {...props}
          name={name}
          defaultImages={
            typeof field.value === "string" && field.value
              ? [field.value]
              : Array.isArray(field.value)
                ? field.value.filter(
                    (image: File | string) =>
                      typeof image === "string" && image,
                  )
                : []
          }
          onChange={(files, existingUrls) => {
            if (props.maxCount === 1) {
              field.onChange(files[0] || existingUrls[0] || null);
              return;
            }
            field.onChange([...existingUrls, ...files]);
          }}
        />
      )}
    />
  );
};

export default FormMultiImageInput;
