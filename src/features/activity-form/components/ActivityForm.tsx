"use client";

import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import type { ActivityFormValues } from "@/features/activity-form/types";
import { CATEGORY_OPTIONS } from "@/features/activity-form/constants";

import TextArea from "@/components/Input/TextArea";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";

import FormSelectDropdown from "./FormSelectDropdown";
import FormMultiImageInput from "./FormMultiImageInput";
import FormPriceInput from "./FormPriceInput";
import AddressSearchButton from "./AddressSearchButton";
import ScheduleSection from "./ScheduleSection";

interface ActivityFormProps {
  mode: "create" | "edit";
  defaultValues?: ActivityFormValues;
}

const ActivityForm = ({ mode, defaultValues }: ActivityFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ActivityFormValues>({
    mode: "onChange",
    defaultValues: {
      title: defaultValues?.title ?? "",
      category: defaultValues?.category ?? "",
      description: defaultValues?.description ?? "",
      address: defaultValues?.address ?? "",
      price: defaultValues?.price ?? "",
      schedules: defaultValues?.schedules ?? [],
      bannerImageUrl: defaultValues?.bannerImageUrl ?? "",
      subImageUrls: defaultValues?.subImageUrls ?? [],
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
      <h1 className="py-5 text-18-bold text-gray-950">
        {mode === "create" ? "📍내 체험 등록" : "📍내 체험 수정"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center gap-6 md:gap-7.5"
      >
        <TextInput
          {...register("title", { required: "제목을 입력해 주세요" })}
          label="제목"
          placeholder="제목을 입력해 주세요"
          errorMessage={errors.title?.message}
        />

        <FormSelectDropdown
          control={control}
          name="category"
          options={CATEGORY_OPTIONS}
          placeholder="카테고리를 선택해주세요"
          fieldLabel="카테고리"
          rules={{ required: true }}
        />

        <TextArea
          {...register("description", {
            required: "체험에 대한 설명을 입력해 주세요",
          })}
          label="설명"
          placeholder="체험에 대한 설명을 입력해 주세요"
          textareaClassName="h-[140px] md:h-[200px]"
          errorMessage={errors.description?.message}
        />

        <FormPriceInput control={control} />

        <div className="flex items-end gap-3">
          <TextInput
            {...register("address", { required: "주소를 입력해 주세요" })}
            label="주소"
            placeholder="주소를 입력해 주세요"
            className="flex-1"
            value={watch("address")}
            disabled
            errorMessage={errors.address?.message}
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
          {mode === "create" ? "등록하기" : "수정하기"}
        </Button>
      </form>
    </div>
  );
};

export default ActivityForm;
