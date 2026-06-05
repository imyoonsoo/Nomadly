"use client";

import { useForm } from "react-hook-form";
import { ProfileEditFormValues } from "./type";
import TextInput from "@/components/Input/TextInput";
import ProfileImageInput from "@/components/ImageInput/ProfileImageInput";
import Button from "@/components/Button/Button";
import mockDataList from "@/features/mypage/mock";

const ProfileEditForm = () => {
  const user = mockDataList[0];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<ProfileEditFormValues>({
    mode: "onBlur",
    defaultValues: {
      nickname: user.nickname,
      email: user.email,
      password: "",
      passwordValidation: "",
    },
  });

  const password = watch("password");

  const editProfile = (data: ProfileEditFormValues) => {
    const updatedData: { nickname?: string; password?: string } = {};

    if (dirtyFields.nickname) {
      updatedData.nickname = data.nickname;
    }
    if (data.password) {
      updatedData.password = data.password;
    }

    if (Object.keys(updatedData).length === 0) {
      console.log("변경된 내용이 없습니다.");
      return;
    }

    // TO DO: 추후 내 정보 수정 API 연동 단계에서 추가 로직 작성예정
    console.log(updatedData);
    alert(JSON.stringify(updatedData));
  };

  return (
    <div className="w-full lg:w-160 sm:w-[327px] md:w-119 mx-auto flex flex-col items-center gap-6 px-4">
      <div className="flex flex-col gap-1 self-stretch py-2.5">
        <h2 className="text-lg font-bold text-gray-950 tracking-[-0.45px]">
          내 정보
        </h2>
        <p className="text-sm font-medium text-gray-500 tracking-[-0.35px]">
          닉네임과 비밀번호를 수정하실 수 있습니다.
        </p>
      </div>

      {/* 프로필이미지 + 연필 아이콘버튼 */}
      <ProfileImageInput name="profileImage" label="프로필" />

      {/* 마이페이지 - 내정보 변경폼  */}
      <form
        onSubmit={handleSubmit(editProfile)}
        className="flex flex-col items-center gap-6 self-stretch"
      >
        {/* 닉네임 */}
        <TextInput
          label="닉네임"
          placeholder={user.nickname}
          className="self-stretch"
          errorMessage={errors.nickname?.message}
          {...register("nickname", {
            required: "변경을 원하는 닉네임으로 입력해 주세요!",
            maxLength: {
              value: 12,
              message: "최대 12자 글자 이하로 닉네임 설정 가능합니다.",
            },
          })}
        />

        {/* Mypage에서 닉네임, 비밀번호만 수정 가능하므로 disabled 처리 */}
        <TextInput
          label="이메일"
          placeholder={user.email}
          disabled
          className="self-stretch disabled:cursor-not-allowed"
          {...register("email")}
        />

        {/* 새 비밀번호 입력 */}
        <TextInput
          label="새 비밀번호"
          type="password"
          placeholder="8자 이상 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.password?.message}
          {...register("password", {
            validate: (value) =>
              !value || value.length >= 8 || "8자 이상 입력해 주세요",
          })}
        />

        {/* 새 비밀번호 확인 */}
        <TextInput
          label="새 비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.passwordValidation?.message}
          {...register("passwordValidation", {
            validate: (value) => {
              if (!password) return true;
              return value === password || "비밀번호가 일치하지 않습니다";
            },
          })}
        />

        {/* 저장하기 버튼 */}
        <div className="px-6">
          <Button
            type="submit"
            variant="mainBlue"
            height="47md"
            disabled={!isValid || !isDirty}
            className="w-full sm:w-auto"
          >
            변경사항 저장하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
