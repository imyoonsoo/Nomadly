"use client";

import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import TextArea from "@/components/Input/TextArea";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";

import FormSelectDropdown from "./_components/FormSelectDropdown";
import FormMultiImageInput from "./_components/FormMultiImageInput";
import AddressSearchButton from "./_components/AddressSearchButton/AddressSearchButton";
import ScheduleSection from "./_components/ScheduleSection";

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}
export interface ActivityFormValues {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number | string;
  schedules: Schedule[];
  bannerImageUrl: File | null;
  subImageUrls: File[];
}

const categoryOptions = [
  { value: "문화·예술", label: "문화·예술" },
  { value: "식음료", label: "식음료" },
  { value: "스포츠", label: "스포츠" },
  { value: "투어", label: "투어" },
  { value: "관광", label: "관광" },
];

const CreateActivityForm = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { isValid },
  } = useForm<ActivityFormValues>({
    mode: "onChange",
    defaultValues: {
      title: "",
      category: "",
      description: "",
      address: "",
      price: "",
      schedules: [],
    },
  });

  const [hasScheduleDuplicate, setHasScheduleDuplicate] = useState(false);

  const onSubmit: SubmitHandler<ActivityFormValues> = (data) => {
    if (!data.bannerImageUrl) {
      return;
    }

    console.log("기본 텍스트 및 배열 데이터:", {
      title: data.title,
      category: data.category,
      description: data.description,
      address: data.address,
      price: data.price,
      schedules: data.schedules,
    });
    console.log("배너 이미지 파일:", data.bannerImageUrl);
    console.log("소개 이미지 파일 배열:", data.subImageUrls);
  };

  // Todo: 페이지 이탈 확인 로직

  return (
    <div className="w-full mb-12 lg:px-[150px]">
      <h1 className="py-5 text-18-bold text-gray-950">📍 내 체험 등록</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center gap-6 md:gap-7.5"
      >
        <TextInput
          {...register("title", { required: true })}
          label="제목"
          placeholder="제목을 입력해 주세요"
        />

        <FormSelectDropdown
          control={control}
          name="category"
          options={categoryOptions}
          placeholder="카테고리를 선택해주세요"
          fieldLabel="카테고리"
          rules={{ required: true }}
        />

        <TextArea
          {...register("description", { required: true })}
          label="설명"
          placeholder="체험에 대한 설명을 입력해 주세요"
          textareaClassName="h-[140px] md:h-[200px]"
        />

        <Controller
          control={control}
          name="price"
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <TextInput
              name="price"
              value={field.value?.toLocaleString() ?? ""}
              onChange={(e) => {
                const raw = e.target.value.replaceAll(",", "");

                if (!/^\d*$/.test(raw)) {
                  setError("price", {
                    type: "validate",
                    message: "숫자만 입력해 주세요.",
                  });
                  return;
                }
                clearErrors("price");

                field.onChange(raw === "" ? undefined : Number(raw));
              }}
              label="가격"
              placeholder="체험 금액을 입력해 주세요"
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <div className="flex items-end gap-3">
          <TextInput
            {...register("address", { required: true })}
            label="주소"
            placeholder="주소를 입력해 주세요"
            className="flex-1"
            value={watch("address")}
            disabled
          />
          <AddressSearchButton
            onSelect={(address) => {
              setValue("address", address, { shouldValidate: true });
            }}
          />
        </div>

        <ScheduleSection
          control={control}
          onDuplicateChange={setHasScheduleDuplicate}
        />

        <FormMultiImageInput
          control={control}
          name="bannerImageUrl"
          label="배너 이미지 등록"
          maxCount={1}
          rules={{ required: true }}
        />

        <FormMultiImageInput
          control={control}
          name="subImageUrls"
          label="소개 이미지 등록"
          maxCount={4}
        />

        <Button
          variant="mainBlue"
          height="47md"
          type="submit"
          className="w-full md:w-60 md:mx-auto hover:brightness-90"
          disabled={!isValid || hasScheduleDuplicate}
        >
          등록하기
        </Button>
      </form>
    </div>
  );
};

export default CreateActivityForm;
