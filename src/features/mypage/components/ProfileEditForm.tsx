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
import { showToast } from "@/lib/utils/toast";

// [추가/수정] switch-case로 상태코드를 받아 에러메시지로 변환하는 함수
const getErrorMessage = (message: string): string => {
  switch (message) {
    case "400":
      return "입력하신 내용이 올바른지 확인해 주세요.";
    case "401":
      return "로그인 후 다시 시도해 주세요.";
    case "404":
      return "사용자 정보가 존재하지 않습니다.";
    default:
      return "오류가 발생했어요. 잠시 후 다시 시도해 주세요.";
  }
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
    formState: { errors, isValid, isDirty, dirtyFields },
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

  const onSubmitProfileChanges = async (data: ProfileEditFormValues) => {
    try {
      if (data.newPassword && data.newPassword !== data.newPasswordConfirm) {
        showToast.error("새 비밀번호가 일치하지 않습니다.");
        return;
      }

      // 빈 객체에 내 정보 수정사항 저장
      const updatedProfile: MyProfileRequestBody = {};

      // 닉네임 변경 시
      if (dirtyFields.nickname) {
        updatedProfile.nickname = data.nickname;
      }

      // 비밀번호 변경 시
      if (data.newPassword) {
        updatedProfile.newPassword = data.newPassword;
      }

      // 프로필 이미지 변경 시
      if (selectedImage) {
        const imageResponse = await uploadProfileImage(selectedImage);
        updatedProfile.profileImageUrl = imageResponse.profileImageUrl;
      }

      // 변경사항 X ➝ 조기 리턴
      if (Object.keys(updatedProfile).length === 0) {
        showToast("수정 사항이 없습니다.");
        return;
      }

      // 변경사항 O ➝ 프로필 업데이트 API 호출
      updateProfile(updatedProfile, {
        onSuccess: () => {
          // 변경에 따른 토스트메시지 다르게 보이게
          const changedItems: string[] = [];
          if (updatedProfile.nickname) {
            changedItems.push("닉네임");
          }
          if (updatedProfile.newPassword) {
            changedItems.push("비밀번호");
          }
          if (updatedProfile.profileImageUrl) {
            changedItems.push("프로필이미지");
          }

          // 변경사항: 1개
          if (changedItems.length === 1) {
            showToast.success(`${changedItems[0]} 변경이 완료되었습니다.`);
          }
          // [수정] 변경사항: 1개 이상
          else {
            showToast.success(
              `${changedItems.join(", ")} 변경이 완료되었습니다.`,
            );
          }
        },
        onError: (error) => {
          showToast.error(getErrorMessage(error.message));
        },
      });
    } catch (error) {
      showToast.error(
        error instanceof Error
          ? getErrorMessage(error.message)
          : "프로필 수정 중 오류가 발생했습니다",
      );
    }
  };

  // [수정]
  if (isLoading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-center text-xl text-gray-950 font-medium">
        내 정보 로딩 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-xl text-red-600 font-medium">
        {getErrorMessage(error.message)}
      </div>
    );
  }

  return (
    <div className="w-full lg:w-160 sm:w-81.75 md:w-119 mx-auto flex flex-col items-center gap-6 px-4">
      <div className="flex flex-col gap-1 self-stretch py-2.5">
        <h2 className="text-lg font-bold text-gray-950 tracking-[-0.45px]">
          내 정보
        </h2>
        <p className="text-sm font-medium text-gray-500 tracking-[-0.35px]">
          닉네임과 비밀번호를 수정하실 수 있습니다.
        </p>
      </div>

      <ProfileImageInput
        name="profileImage"
        label="프로필"
        onFileSelect={(file) => {
          setSelectedImage(file);
        }}
      />

      <form
        onSubmit={handleSubmit(onSubmitProfileChanges)}
        className="flex flex-col items-center gap-6 self-stretch"
      >
        <TextInput
          label="닉네임"
          placeholder="새로운 닉네임을 10자 이하로 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.nickname?.message}
          {...register("nickname", {
            required: "닉네임을 입력해 주세요.",
            maxLength: {
              value: 10,
              message: "닉네임은 10자 이하로 입력해 주세요.",
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
          placeholder="8자 이상 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.newPassword?.message}
          {...register("newPassword", {
            validate: (value) => {
              if (!value) {
                return true;
              }
              if (value.length < 8) {
                return "8자 이상 입력해 주세요.";
              }
              if (
                !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~\-])\S+$/.test(
                  value,
                )
              ) {
                return "영문, 숫자, 특수문자를 각각 1자 이상 조합해 입력해 주세요.";
              }
              return true;
            },
          })}
        />

        <TextInput
          label="새 비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.newPasswordConfirm?.message}
          {...register("newPasswordConfirm", {
            validate: (value) => {
              if (!newPassword) {
                return true;
              }
              return value === newPassword || "비밀번호가 일치하지 않습니다";
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
