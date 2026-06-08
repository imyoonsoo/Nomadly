"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ValidationLoginFormFields } from "./type";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";
import SuccessModal from "@/components/Modal/SuccessModal";

const ValidationLoginForm = () => {
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ValidationLoginFormFields>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const globalnomadLogin = async (authData: ValidationLoginFormFields) => {
    try {
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        // Todo: 에러코드 400(올바른 이메일 형식), 409(중복된 이메일) 로직 axios로 작성하기
        setModalMessage(error.message || "비밀번호가 일치하지 않습니다.");
      } else {
        setModalMessage("알 수 없는 에러 발생");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(globalnomadLogin)}
        className="flex flex-col items-center gap-6 self-stretch"
      >
        {/* 유효성검사: 이메일 */}
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

        {/* 유효성검사: 비밀번호 */}
        <TextInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.password?.message}
          {...register("password", {
            required: "8자 이상 입력해 주세요.",
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },
          })}
        />

        {/* 로그인하기 */}
        <Button
          type="submit"
          variant="mainBlue"
          height="54lg"
          disabled={!isValid}
          className="self-stretch"
        >
          로그인하기
        </Button>
      </form>

      <div className="flex items-center gap-4 self-stretch">
        <hr className="flex-1 border-gray-200" />
        <span className="text-sm text-gray-500">or</span>
        <hr className="flex-1 border-gray-200" />
      </div>

      {/* 카카오 간편로그인 */}
      <Button
        type="button"
        variant="easyKakao"
        height="54lg"
        className="self-stretch"
        onClick={() => {
          const EASYAUTH_KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
          window.location.href = EASYAUTH_KAKAO_URL;
        }}
      >
        카카오 간편로그인
      </Button>

      {/* 회원가입하기 */}
      <p className="text-sm text-gray-500">
        회원이 아니신가요?{" "}
        <Link href="/signup" className="underline">
          회원가입하기
        </Link>
      </p>

      {/* alert 모달창 */}
      <SuccessModal
        isOpen={!!modalMessage}
        onClose={() => setModalMessage("")}
        message={modalMessage}
      />
    </>
  );
};

export default ValidationLoginForm;
