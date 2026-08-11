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
import { buildKakaoAuthorizeUrl } from "../kakao/redirectUri";
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
    <div className="flex w-full flex-col items-center gap-6 self-stretch">
      <form
        onSubmit={handleSubmit(handleLoginSubmit)}
        className="flex w-full flex-col items-center gap-6 self-stretch"
      >
        <TextInput
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          className="self-stretch"
          errorMessage={errors.email?.message}
          {...register("email", {
            required: "올바른 이메일 형식으로 작성해주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식으로 작성해주세요.",
            },
          })}
        />

        <TextInput
          label="비밀번호"
          type="password"
          placeholder="8자 이상 입력해주세요"
          className="self-stretch"
          errorMessage={errors.password?.message}
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "8자 이상 입력해주세요.",
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
          Nomadly 로그인하기
        </Button>
      </form>

      <div className="flex w-full flex-col items-center gap-5 self-stretch md:gap-7.5">
        <div className="flex w-full items-center gap-4 self-stretch">
          <hr className="flex-1 border-gray-100" />
          <span className="text-center text-base font-medium tracking-[-0.4px] text-[#79747E]">
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
            window.location.href = buildKakaoAuthorizeUrl("login");
          }}
        >
          카카오 간편로그인
        </Button>

        <p className="text-center text-sm font-medium tracking-[-0.4px] text-gray-400 md:text-base">
          Nomadly 회원이 아니신가요?{" "}
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
