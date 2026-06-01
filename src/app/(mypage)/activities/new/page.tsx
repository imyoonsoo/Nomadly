"use client";

import MultiImageInput from "@/components/ImageInput/MultiImageInput";
import TextArea from "@/components/Input/TextArea";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";
import AddressSearchButton from "./_components/AddressSearchButton/AddressSearchButton";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "./_components/DatePicker";
import SelectDropdown from "./_components/SelectDropdown";

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
  const { register, control, handleSubmit, setValue, watch } =
    useForm<ActivityFormValues>({
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
              label="카테고리"
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
          render={({ field }) => (
            <TextInput
              name="price"
              value={field.value?.toLocaleString() ?? ""}
              onChange={(e) => {
                const raw = e.target.value.replaceAll(",", "");

                if (!/^\d*$/.test(raw)) return;

                field.onChange(raw === "" ? undefined : Number(raw));
              }}
              label="가격"
              placeholder="체험 금액을 입력해 주세요"
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
        <div>
          <p className="text-16-medium mb-[10px] block">예약 가능한 시간대</p>
          <DatePicker />
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
