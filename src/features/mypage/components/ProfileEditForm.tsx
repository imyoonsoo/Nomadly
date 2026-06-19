"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { ProfileEditFormValues, MyProfileRequestBody } from "../type";
import useGetProfile from "../hooks/useGetProfile";
import useUpdateProfile from "../hooks/useUpdateProfile";
import useUploadProfileImage from "../hooks/useUploadProfileImage";
import TextInput from "@/components/Input/TextInput";
import ProfileImageInput from "@/components/ImageInput/ProfileImageInput";
import Button from "@/components/Button/Button";
import Title from "@/app/(mypage)/_components/Title";
import { showToast } from "@/lib/utils/toast";

// [리팩토링] 상태코드에 따른 에러메시지 처리 switch-case -> 객체
const DEFAULT_ERR_MESSAGE = "오류가 발생했어요. 잠시 후 다시 시도해 주세요."; // 에러토스트 통일 위해 추가

const STATUS_MESSAGES: Record<string, string> = {
  "400": "입력한 내용이 올바른지 확인해주세요.",
  "401": "로그인 후 다시 시도해주세요.",
  "404": "사용자 정보가 존재하지 않습니다.",
};

const ProfileEditForm = () => {
  const { data: user, isLoading, isError, error } = useGetProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { mutateAsync: uploadProfileImage } = useUploadProfileImage();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ProfileEditFormValues>({
    mode: "onBlur",
    defaultValues: {
      nickname: "",
      email: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname,
        email: user.email,
        newPassword: "",
        newPasswordConfirm: "",
      });
    }
  }, [user, reset]); // 유저 데이터가 캐싱되거나 새롭게 들어올 때마다 실행

  const newPassword = watch("newPassword");

  const handleProfileSubmit = async (data: ProfileEditFormValues) => {
    try {
      if (data.newPassword && data.newPassword !== data.newPasswordConfirm) {
        showToast.error("비밀번호가 일치하지 않습니다.");
        return;
      }

      // MyProfileRequestBody에 내 정보 변경사항 추가
      const updatedProfile: MyProfileRequestBody = {};

      // 닉네임 변경 시 업데이트
      if (dirtyFields.nickname) {
        updatedProfile.nickname = data.nickname;
      }

      // 비밀번호 변경 시 업데이트
      if (data.newPassword) {
        updatedProfile.newPassword = data.newPassword;
      }

      // 프로필 변경 시 업데이트
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        const imageResponse = await uploadProfileImage(formData);
        updatedProfile.profileImageUrl = imageResponse.profileImageUrl;
      }

      // 변경사항 X ➝ 조기 리턴
      if (Object.keys(updatedProfile).length === 0) {
        showToast("변경사항이 없습니다.");
        return;
      }

      // 변경사항 O ➝ 프로필 수정/변경 API 호출
      updateProfile(updatedProfile, {
        onSuccess: () => {
          // 각 변경사항마다 토스트 다르게 띄워지도록
          const changedItems: string[] = [];
          if (updatedProfile.nickname) {
            changedItems.push("닉네임");
          }
          if (updatedProfile.newPassword) {
            changedItems.push("비밀번호");
          }
          if (updatedProfile.profileImageUrl) {
            changedItems.push("프로필");
          }

          // 변경사항: 1개
          if (changedItems.length === 1) {
            showToast.success(`${changedItems[0]} 변경이 완료되었습니다.`);
          }
          // 변경사항: 1개 이상 -> ,로 이어 토스트에 표시
          else {
            showToast.success(
              `${changedItems.join(", ")} 변경이 완료되었습니다.`,
            );
          }
        },
        onError: (error) => {
          showToast.error(
            STATUS_MESSAGES[error.message] ?? DEFAULT_ERR_MESSAGE,
          );
        },
      });
    } catch (error) {
      showToast.error(
        error instanceof Error
          ? (STATUS_MESSAGES[error.message] ?? DEFAULT_ERR_MESSAGE)
          : DEFAULT_ERR_MESSAGE,
      );
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-center text-lg md:text-xl text-gray-950 font-medium">
        내 정보 로딩 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-lg md:text-xl text-red-600 font-medium">
        {STATUS_MESSAGES[error.message] ?? DEFAULT_ERR_MESSAGE}
      </div>
    );
  }

  return (
    <div className="w-full lg:w-160 sm:w-81.75 md:w-119 mx-auto flex flex-col items-center gap-6 px-4">
      <div className="self-stretch">
        <Title
          title="내 정보"
          description="닉네임과 비밀번호를 수정하실 수 있습니다."
        />
      </div>

      <ProfileImageInput
        name="profileImage"
        label="프로필"
        onFileSelect={(file) => {
          setSelectedImage(file);
        }}
        defaultImage={user.profileImageUrl}
      />

      <form
        onSubmit={handleSubmit(handleProfileSubmit)}
        className="flex flex-col items-center gap-6 self-stretch"
      >
        <TextInput
          label="닉네임"
          placeholder="새로운 닉네임을 10자 이하로 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.nickname?.message}
          {...register("nickname", {
            required: "닉네임을 입력해주세요.",
            maxLength: {
              value: 10,
              message: "닉네임은 10자 이하로 입력해주세요.",
            },
          })}
        />

        <TextInput
          label="이메일"
          disabled
          className="self-stretch disabled:cursor-not-allowed"
          {...register("email")}
        />

        <TextInput
          label="새 비밀번호"
          type="password"
          placeholder="8자 이상 입력해주세요"
          className="self-stretch"
          errorMessage={errors.newPassword?.message}
          {...register("newPassword", {
            validate: (value) => {
              if (!value) {
                return true;
              }
              if (value.length < 8) {
                return "8자 이상 입력해주세요.";
              }
              if (
                !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~\-])\S+$/.test(
                  value,
                )
              ) {
                return "영문, 숫자, 특수문자 각 1자 이상 조합해 입력해주세요.";
              }
              return true;
            },
          })}
        />

        <TextInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          className="self-stretch"
          errorMessage={errors.newPasswordConfirm?.message}
          {...register("newPasswordConfirm", {
            validate: (value) => {
              if (!newPassword) {
                return true;
              }
              return value === newPassword || "비밀번호가 일치하지 않습니다.";
            },
          })}
        />

        <div className="px-6">
          <Button
            type="submit"
            variant="mainBlue"
            height="47md"
            disabled={isPending || !isValid}
            className="w-full sm:w-auto"
          >
            {isPending ? "변경사항 저장 중..." : "변경사항 저장하기"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
