"use client";

import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { useLeaveBlocker } from "../hooks/useLeaveBlocker";

interface ActivityFormProps {
  mode: "create" | "edit";
  defaultValues?: ActivityFormValues;
}

const ActivityForm = ({ mode, defaultValues }: ActivityFormProps) => {
  const router = useRouter();
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty, isSubmitSuccessful },
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

  useLeaveBlocker({
    isDirty: isDirty && !isSubmitSuccessful,
    onBlock: (targetUrl) => {
      setPendingUrl(targetUrl);
      setIsWarningOpen(true);
    },
  });

  const handleConfirmLeave = () => {
    setIsWarningOpen(false);

    if (pendingUrl === "back") {
      router.back();
    } else if (pendingUrl) {
      router.back();

      setTimeout(() => {
        router.push(pendingUrl);
      }, 50);
    }

    setPendingUrl(null);
  };

  const handleCancelLeave = () => {
    setIsWarningOpen(false);
    setPendingUrl(null);
  };

  const handleSuccessConfirm = () => {
    setIsSuccessOpen(false);
    router.back();
  };

  const onSubmit: SubmitHandler<ActivityFormValues> = (data) => {
    if (!data.bannerImageUrl) {
      return;
    }

    console.log("데이터 제출 성공:", {
      title: data.title,
      category: data.category,
      description: data.description,
      address: data.address,
      price: data.price,
      schedules: data.schedules,
      bannerImageUrl: data.bannerImageUrl,
      subImageUrls: data.subImageUrls,
    });

    setIsSuccessOpen(true);
    router.back();
  };

  // Todo: 페이지 이탈 확인 로직
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;

      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

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

      {/* Todo: 공통모달로 변경 작업 */}
      {isWarningOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-18-bold text-gray-950 mb-2">
              변경사항 저장 안 됨
            </h3>
            <p className="text-14-medium text-gray-500 mb-6">
              지금 페이지를 나가하시면 작성 중인 변경사항이 모두 삭제됩니다.
              정말 나가시겠습니까?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleCancelLeave}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 text-14-medium rounded-xl hover:bg-gray-200 transition"
              >
                아니오 (계속 수정)
              </button>
              <button
                type="button"
                onClick={handleConfirmLeave}
                className="px-4 py-2.5 bg-red-500 text-white text-14-medium rounded-xl hover:bg-red-600 transition"
              >
                예 (나가기)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. 등록/수정 완료 알림 모달 */}
      {isSuccessOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full mx-4 shadow-xl text-center">
            <h3 className="text-18-bold text-gray-950 mb-2">완료</h3>
            <p className="text-14-medium text-gray-500 mb-6">
              체험 {mode === "create" ? "등록" : "수정"}이 성공적으로
              완료되었습니다!
            </p>
            <button
              type="button"
              onClick={handleSuccessConfirm}
              className="w-full py-2.5 bg-gray-950 text-white text-14-medium rounded-xl hover:bg-gray-800 transition"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityForm;
