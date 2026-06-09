"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ValidationSignupFormInputfields } from "./type";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";
import SuccessModal from "@/components/Modal/SuccessModal";

const ValidationSignupForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignupSucceed, setIsSignupSucceed] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ValidationSignupFormInputfields>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordValidation: "",
    },
  });

  // watch로 비밀번호, 이메일 실시간 감지
  const password = watch("password");
  const email = watch("email");
  const isEmailValid = email && !errors.email;

  const postSignup = async (data: ValidationSignupFormInputfields) => {
    try {
      // 상태코드: 201 ➝ 성공
      const { passwordValidation, ...signupData } = data;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
        signupData,
      );
      setIsSignupSucceed(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        // 상태코드: 409 ➝ 이메일 중복
        if (statusCode === 409) {
          setErrorMessage("이미 사용 중인 이메일입니다.");
        } else {
          // 상태코드: 409 외
          setErrorMessage(
            error.message ||
              "에러 발생으로 회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.",
          );
        }
      } else {
        // 그 외 에러
        setErrorMessage(
          "에러 발생으로 회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
      }
    }
  };

  // 이메일 중복확인 핸들러함수
  const handleEmailDuplicationCheckonClick = () => {};

  return (
    <>
      <form
        onSubmit={handleSubmit(postSignup)}
        className="flex flex-col items-center gap-6 self-stretch"
      >
        {/* 유효성검사: 이메일, 중복확인 버튼 */}
        <div className="relative w-full">
          <TextInput
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요"
            className="self-stretch"
            errorMessage={errors.email?.message}
            {...register("email", {
              required: "올바른 이메일 형식으로 입력해 주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "올바른 이메일 형식으로 입력해 주세요.",
              },
            })}
          />
          {isEmailValid && (
            <Button
              type="button"
              height="custom"
              onClick={handleEmailDuplicationCheckonClick}
              className="bg-[#4dabf7] text-white absolute right-5 top-11.5 w-19 h-7.5 md:w-21.25 text-s rounded-lg z-10 whitespace-nowrap
  active:bg-[#1c9af0]
  disabled:bg-[#bce0fb] disabled:text-white/70 disabled:cursor-not-allowed"
            >
              중복확인
            </Button>
          )}
        </div>

        <TextInput
          label="닉네임 설정"
          placeholder="닉네임을 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.nickname?.message}
          {...register("nickname", {
            required: "열 자 이하로 작성해 주세요.",
            maxLength: {
              value: 10,
              message: "열 자 이하로 작성해 주세요.",
            },
          })}
        />

        <TextInput
          label="비밀번호 설정"
          type="password"
          placeholder="8자 이상 입력해 주세요"
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

        {/* 유효성검사: 비밀번호 확인 */}
        <TextInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.passwordValidation?.message}
          {...register("passwordValidation", {
            required: "비밀번호가 일치하지 않습니다.",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
        />

        {/* 모든 인풋이 유효해야 회원가입하기 버튼 활성화 */}
        <Button
          type="submit"
          variant="mainBlue"
          height="54lg"
          disabled={!isValid}
          className="self-stretch"
        >
          GlobalNomad 회원가입하기
        </Button>
      </form>

      {/* 디바이더 */}
      <div className="flex items-center gap-4 self-stretch">
        <hr className="flex-1 border-gray-100" />
        <span className="text-base font-medium tracking-[-0.4px] text-[#79747E]">
          SNS 계정으로 회원가입하기
        </span>
        <hr className="flex-1 border-gray-100" />
      </div>

      {/* 카카오 간편 회원가입하기 */}
      <Button
        type="button"
        variant="easyKakao"
        height="54lg"
        className="self-stretch"
        onClick={() => {
          // Todo: 카카오 회원가입하기 로직
          const EASYAUTH_KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
          window.location.href = EASYAUTH_KAKAO_URL;
        }}
      >
        카카오 간편 회원가입
      </Button>

      {/* 회원이신가요?로그인하기 바닥글 */}
      <p className="text-sm text-gray-500">
        회원이신가요?{" "}
        <Link href="/login" className="underline">
          로그인하기
        </Link>
      </p>

      {/* 회원가입 완료 이후 가입성공 모달 오픈 */}
      <SuccessModal
        isOpen={isSignupSucceed}
        onClose={() => {
          setIsSignupSucceed(false);
          router.push("/login");
        }}
        message={"GlobalNomad 회원가입이 완료되었습니다!"}
      />
      {/* alert 모달 */}
      <SuccessModal
        isOpen={!!errorMessage}
        onClose={() => setErrorMessage("")}
        message={errorMessage}
      />
    </>
  );
};

export default ValidationSignupForm;
