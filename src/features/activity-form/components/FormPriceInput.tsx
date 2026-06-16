import { useState } from "react";
import { Control } from "react-hook-form";
import type { ActivityFormValues } from "@/features/activity-form/types";

import TextInput from "@/components/Input/TextInput";
import FormController from "@/components/Form/FormController";

interface FormPriceInputProps {
  control: Control<ActivityFormValues>;
}

const FormPriceInput = ({ control }: FormPriceInputProps) => {
  const [inputErrorMessage, setInputErrorMessage] = useState("");

  return (
    <FormController
      control={control}
      name="price"
      rules={{ required: "가격을 입력해 주세요." }}
      render={({ field, fieldState }) => (
        <TextInput
          name="price"
          value={field.value?.toLocaleString() ?? ""}
          onChange={(e) => {
            const raw = e.target.value.replaceAll(",", "");

            if (!/^\d*$/.test(raw)) {
              setInputErrorMessage("숫자만 입력해주세요.");
              return;
            }
            setInputErrorMessage("");

            field.onChange(raw === "" ? undefined : Number(raw));
          }}
          label="가격"
          placeholder="체험 금액을 입력해 주세요"
          errorMessage={inputErrorMessage || fieldState.error?.message}
          labelClassName="text-16-bold"
        />
      )}
    />
  );
};

export default FormPriceInput;
