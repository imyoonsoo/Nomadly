"use client";

import MultiImageInput from "@/components/ImageInput/MultiImageInput";
import TextArea from "@/components/Input/TextArea";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";
import AddressSearchButton from "./_components/AddressSearchButton/AddressSearchButton";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import DatePicker from "./_components/DatePicker";
import SelectDropdown from "./_components/SelectDropdown";
import TimePicker from "./_components/TimePicker";
import { useState } from "react";
import PlusIcon from "@/assets/icons/plus.svg";
import MinusIcon from "@/assets/icons/minus.svg";

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}
interface ActivityFormValues {
  title: string;
  category: string;
  description: string;
  address: string;
  price: string;
  schedules: Schedule[];
  bannerImageUrl: string;
  subImageUrls: string[];
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
  } = useForm<ActivityFormValues>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      address: "",
      price: "",
      schedules: [],
      bannerImageUrl: "",
      subImageUrls: [],
    },
  });

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  const [currentDate, setCurrentDate] = useState("");
  const [currentStartTime, setCurrentStartTime] = useState("");
  const [currentEndTime, setCurrentEndTime] = useState("");

  const handleAddSchedule = () => {
    if (!currentDate || !currentStartTime || !currentEndTime) {
      // Todo: toast 알림
      alert("날짜와 시간을 모두 입력해주세요");
      return;
    }

    prepend({
      date: currentDate,
      startTime: currentStartTime,
      endTime: currentEndTime,
    });

    setCurrentDate("");
    setCurrentStartTime("");
    setCurrentEndTime("");
  };

  return (
    <div className="w-full lg:px-[150px]">
      <h1 className="py-5 text-18-bold text-gray-950">내 체험 등록</h1>
      <form className="w-full flex flex-col justify-center gap-6 md:gap-7.5">
        <TextInput
          {...register("title")}
          label="제목"
          placeholder="제목을 입력해 주세요"
        />

        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <SelectDropdown
              selectedValue={field.value}
              options={categoryOptions}
              onChange={field.onChange}
              placeholder="카테고리를 선택해주세요"
              fieldLabel="카테고리"
            />
          )}
        />

        <TextArea
          {...register("description")}
          label="설명"
          placeholder="체험에 대한 설명을 입력해 주세요"
          textareaClassName="h-[140px] md:h-[200px]"
        />

        <Controller
          control={control}
          name="price"
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
            {...register("address")}
            label="주소"
            placeholder="주소를 입력해 주세요"
            className="flex-1"
            value={watch("address")}
            disabled
          />
          <AddressSearchButton
            onSelect={(address) => {
              setValue("address", address);
            }}
          />
        </div>

        <div className="w-full">
          <p className="text-16-medium mb-2.5 block">예약 가능한 시간대</p>

          <div className="flex flex-col gap-5">
            <div className="w-full flex items-center gap-3.5">
              <div className="flex-2">
                <label className="text-16-medium mb-2.5 block">날짜</label>
                <DatePicker value={currentDate} onChange={setCurrentDate} />
              </div>

              <div className="flex-1">
                <TimePicker
                  value={currentStartTime}
                  onChange={
                    currentStartTime
                      ? (val) => setCurrentStartTime(String(val))
                      : setCurrentStartTime
                  }
                  label="시작 시간"
                />
              </div>

              <div className="w-2 h-0.5 mt-8 bg-gray-800"></div>

              <div className="flex-1">
                <TimePicker
                  value={currentEndTime}
                  onChange={
                    currentEndTime
                      ? (val) => setCurrentEndTime(String(val))
                      : setCurrentEndTime
                  }
                  label="종료 시간"
                  minTime={currentStartTime}
                />
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleAddSchedule}
                  className="w-10.5 h-10.5 flex items-center justify-center bg-primary-500 text-white rounded-full hover:brightness-90 transition"
                >
                  <PlusIcon width={24} height={24} />
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100 "></div>

            {/* 추가된 예약 시간대 */}
            <div className="flex flex-col gap-5">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="w-full flex items-center gap-3.5"
                >
                  <div className="flex-2">
                    <div className="h-13.5 border border-gray-200 rounded-2xl flex items-center px-5 bg-gray-50 text-gray-500 text-16-medium">
                      {field.date}
                    </div>
                  </div>

                  <div className="flex-1">
                    <Controller
                      control={control}
                      name={`schedules.${index}.startTime`}
                      render={({ field }) => (
                        <TimePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>

                  <div className="w-2 h-0.5 bg-gray-800"></div>

                  <div className="flex-1">
                    <Controller
                      control={control}
                      name={`schedules.${index}.endTime`}
                      render={({ field }) => (
                        <TimePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="w-10.5 h-10.5 flex items-center justify-center bg-gray-50 text-black rounded-full hover:bg-gray-100 transition"
                    >
                      <MinusIcon width={24} height={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <MultiImageInput
          name="bannerImageUrl"
          label="배너 이미지 등록"
          maxCount={1}
        />
        <MultiImageInput name="subImages" label="소개 이미지 등록" />

        <Button>등록하기</Button>
      </form>
    </div>
  );
};

export default CreateActivityForm;
