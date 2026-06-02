"use client";

import { useState } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";

import MultiImageInput from "@/components/ImageInput/MultiImageInput";
import TextArea from "@/components/Input/TextArea";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";

import AddressSearchButton from "./_components/AddressSearchButton/AddressSearchButton";
import DatePicker from "./_components/DatePicker";
import SelectDropdown from "./_components/SelectDropdown";
import TimePicker from "./_components/TimePicker";

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
  } = useForm<ActivityFormValues>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      address: "",
      price: "",
      schedules: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
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

    append({
      date: currentDate,
      startTime: currentStartTime,
      endTime: currentEndTime,
    });

    setCurrentDate("");
    setCurrentStartTime("");
    setCurrentEndTime("");
  };

  const onSubmit: SubmitHandler<ActivityFormValues> = (data) => {
    if (!data.bannerImageUrl) {
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("price", String(data.price));
    formData.append("schedules", JSON.stringify(data.schedules));

    formData.append("bannerImage", data.bannerImageUrl);

    data.subImageUrls.forEach((file) => {
      formData.append("subImages", file);
    });

    // axios.post('/api/activity', formData) ... 형태로 서버에 전송!
    console.log("서버로 보낼 최종 FormData 구성 완료!");
  };

  return (
    <div className="w-full lg:px-[150px]">
      <h1 className="py-5 text-18-bold text-gray-950">내 체험 등록</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center gap-6 md:gap-7.5"
      >
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
            <div className="w-full flex flex-col gap-2.5 md:flex-row md:items-center md:gap-3.5">
              <div className="w-full">
                <label className="text-16-medium mb-2.5 block">날짜</label>
                <DatePicker value={currentDate} onChange={setCurrentDate} />
              </div>

              <div className="w-full flex items-center gap-3.5">
                <div className="w-full flex-1">
                  <TimePicker
                    value={currentStartTime}
                    onChange={(val) => setCurrentStartTime(String(val))}
                    label={<span className="hidden md:block">시작 시간</span>}
                  />
                </div>

                <div className="w-2 h-0.5 mt-3 md:mt-8 bg-gray-800"></div>

                <div className="w-full flex-1">
                  <TimePicker
                    value={currentEndTime}
                    onChange={(val) => setCurrentEndTime(String(val))}
                    label={<span className="hidden md:block">종료 시간</span>}
                    minTime={currentStartTime}
                  />
                </div>

                <div className="mt-2.5 md:mt-8">
                  <Button
                    variant="mainBlue"
                    type="button"
                    onClick={handleAddSchedule}
                    icon={<PlusIcon width={24} height={24} />}
                    iconJustify="center"
                    className="w-10.5 h-10.5 rounded-full hover:brightness-90 transition"
                  />
                </div>
              </div>
            </div>

            {fields.length > 0 && (
              <div className="w-full h-px bg-gray-100"></div>
            )}

            {/* 추가된 예약 시간대 */}
            <div className="flex flex-col gap-5">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="w-full flex flex-col gap-2.5 md:flex-row md:items-center md:gap-3.5"
                >
                  <Controller
                    control={control}
                    name={`schedules.${index}.date`}
                    render={({ field: dateField }) => (
                      <DatePicker
                        value={dateField.value}
                        onChange={dateField.onChange}
                      />
                    )}
                  />
                  <div className="w-full flex items-center gap-3.5">
                    <div className="w-full flex-1">
                      <Controller
                        control={control}
                        name={`schedules.${index}.startTime`}
                        render={({ field: startField }) => (
                          <TimePicker
                            value={startField.value}
                            onChange={startField.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="w-2 h-0.5 bg-gray-800"></div>

                    <div className="w-full flex-1">
                      <Controller
                        control={control}
                        name={`schedules.${index}.endTime`}
                        render={({ field: endField }) => (
                          <TimePicker
                            value={endField.value}
                            onChange={endField.onChange}
                          />
                        )}
                      />
                    </div>

                    <div>
                      <Button
                        variant="onlyGray"
                        type="button"
                        onClick={() => remove(index)}
                        icon={<MinusIcon width={24} height={24} />}
                        iconJustify="center"
                        className="w-10.5 h-10.5 rounded-full hover:bg-gray-100 transition"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Controller
          control={control}
          name="bannerImageUrl"
          render={({ field }) => (
            <MultiImageInput
              name="bannerImageUrl"
              label="배너 이미지 등록"
              maxCount={1}
              onChange={(e) => {
                const files = e.target.files;
                const targetFile = files && files.length > 0 ? files[0] : null;
                // 오직 훅 폼에만 파일 넘겨주기!
                field.onChange(targetFile);
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="subImageUrls"
          render={({ field }) => (
            <MultiImageInput
              name="subImageUrls"
              label="소개 이미지 등록"
              maxCount={4}
              onChange={(e) => {
                const fileList = e.target.files
                  ? Array.from(e.target.files)
                  : [];
                // 오직 훅 폼에만 파일 배열 넘겨주기!
                field.onChange(fileList);
              }}
            />
          )}
        />

        <Button
          variant="mainBlue"
          height="h50"
          type="submit"
          className="w-full md:w-[320px] md:mx-auto hover:brightness-90"
        >
          등록하기
        </Button>
      </form>
    </div>
  );
};

export default CreateActivityForm;
