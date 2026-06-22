"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ValidationLoginFormFields } from "../type";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";
import SuccessModal from "@/components/Modal/SuccessModal";
import { loginAction } from "../actions/loginAction";
import { useSetUserSession } from "@/hooks/useUserSession";

const ValidationLoginForm = () => {
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();
  const setUserSession = useSetUserSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ValidationLoginFormFields>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginAction,
    onSuccess: (result) => {
      if (result.success) {
        setUserSession({ userId: result.userId });
        router.push("/");
        return;
      }

      setModalMessage(result.error ?? "로그인에 실패했습니다.");
    },
  });

  const handleLoginSubmit = (authData: ValidationLoginFormFields) => {
    loginMutation.mutate(authData);
  };

  return (
    <div className="w-full flex flex-col items-center self-stretch gap-6">
      <form
        onSubmit={handleSubmit(handleLoginSubmit)}
        className="w-full flex flex-col items-center gap-6 self-stretch"
      >
        <TextInput
          label="이메일"
          type="email"
          placeholder="이메일을 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.email?.message}
          {...register("email", {
            required: "올바른 이메일 형식으로 작성해 주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식으로 작성해 주세요.",
            },
          })}
        />

        <TextInput
          label="비밀번호"
          type="password"
          placeholder="8자 이상 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.password?.message}
          {...register("password", {
            required: "비밀번호를 입력해 주세요.",
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },
          })}
        />

        <Button
          type="submit"
          variant="mainBlue"
          height="54lg"
          disabled={!isValid || loginMutation.isPending}
          className="self-stretch"
        >
          로그인하기
        </Button>
      </form>

      <div className="w-full flex flex-col gap-5 md:gap-7.5 items-center self-stretch">
        <div className=" w-full flex items-center gap-4 self-stretch">
          <hr className="flex-1 border-gray-100" />
          <span className="text-[#79747E] text-center text-base font-medium tracking-[-0.4px]">
            OR
          </span>
          <hr className="flex-1 border-gray-100" />
        </div>

        <Button
          type="button"
          variant="easyKakao"
          height="54lg"
          className="self-stretch"
          onClick={() => {
            const EASYAUTH_KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=login`;
            window.location.href = EASYAUTH_KAKAO_URL;
          }}
        >
          카카오 간편로그인
        </Button>

        <p className="text-gray-400 text-center text-sm md:text-base font-medium tracking-[-0.4px]">
          회원이 아니신가요?{" "}
          <Link href="/signup" className="underline">
            <b className="text-gray-500">회원가입하기</b>
          </Link>
        </p>
      </div>

      <SuccessModal
        isOpen={!!modalMessage}
        onClose={() => setModalMessage("")}
        message={modalMessage}
      />
    </div>
  );
};

export default ValidationLoginForm;
