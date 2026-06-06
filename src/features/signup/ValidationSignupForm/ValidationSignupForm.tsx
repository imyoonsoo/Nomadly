"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ValidationSignupFormInputfields } from "./type";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";
import { LogoPcTablet, LogoMobile } from "@/constants/images";
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

  // react-hook-form의 watch로 비밀번호 실시간값 알아냄
  const password = watch("password");
  const globalnomadSignup = async (data: ValidationSignupFormInputfields) => {
    try {
      const { passwordValidation, ...SignupData } = data;
      alert(SignupData);
      setIsSignupSucceed(true);
    } catch (error) {
      if (error instanceof Error) {
        // Todo: 에러코드 400(올바른 이메일 형식), 409(중복된 이메일) 로직 axios로 작성하기
        setErrorMessage(error.message);
      } else {
        setErrorMessage("에러 발생");
      }
    }
  };

  // 이메일 중복확인 핸들러함수
  const handleEmailDuplicationCheckonClick = () => {
    // Todo: 스웨거 API 분석해서 axios 중복확인 내부 로직 작성하기
    alert("이메일이 중복되었습니다.");
  };

  return (
    <div className="w-full md:w-160 lg:w-160 mx-auto flex flex-col items-center gap-6 md:gap-7.5 px-6 md:px-0">
      {/* 로고 클릭: / 이동 */}
      <Link
        href="/"
        aria-label="GlobalNoamd 메인"
        className="flex flex-col items-center gap-6"
      >
        {/* 데스크탑/태블릿: 텍스트+이미지 */}
        <LogoPcTablet
          className="hidden md:block w-63.75 h-50"
          aria-hidden="true"
        />
        {/* 모바일 메인로고: 이미지만 */}
        <LogoMobile className="block md:hidden w-36 h-36" aria-hidden="true" />
      </Link>
      <form
        onSubmit={handleSubmit(globalnomadSignup)}
        className="flex flex-col items-center gap-6 self-stretch"
      >
        {/* 유효성검사: 이메일, 중복확인 */}
        <div className="relative w-full">
          <TextInput
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요"
            className="self-stretch"
            errorMessage={errors.email?.message}
            {...register("email", {
              required: "이메일을 입력해 주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "올바른 이메일 형식으로 입력해 주세요.",
              },
            })}
          />
          <Button
            type="button"
            variant="onlyGray"
            height="custom"
            onClick={handleEmailDuplicationCheckonClick}
            className="bg-gray-900 text-white absolute right-5 bottom-3.25 w-20 h-7.5 md:w-25 text-s rounded-lg z-10 whitespace-nowrap"
          >
            중복확인
          </Button>
        </div>

        <TextInput
          label="닉네임 설정"
          placeholder="닉네임을 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.nickname?.message}
          {...register("nickname", {
            required: "닉네임을 입력해 주세요.",
            maxLength: {
              value: 12,
              message: "12글자 아래로 입력해 주세요.",
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
            required: "비밀번호를 입력해 주세요.",
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
            required: "비밀번호를 한 번 더 입력해 주세요.",
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
        <hr className="flex-1 border-gray-200" />
        <span className="text-sm text-gray-500">SNS 계정으로 회원가입하기</span>
        <hr className="flex-1 border-gray-200" />
      </div>

      {/* 카카오 간편 회원가입하기 */}
      <Button
        type="button"
        variant="kakao"
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
        message="🎉GlobalNomad 회원가입이 완료되었습니다!\n확인 버튼 클릭 시 로그인 화면으로 이동합니다."
      />

      {/* alert 모달 */}
      <SuccessModal
        isOpen={!!errorMessage}
        onClose={() => setErrorMessage("")}
        message={errorMessage}
      />
    </div>
  );
};

export default ValidationSignupForm;
