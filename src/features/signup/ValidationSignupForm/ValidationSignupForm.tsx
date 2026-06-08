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

  // react-hook-form의 watch로 비밀번호 실시간값 알아냄
  const password = watch("password");
  const signUpGlobalNomad = async (data: ValidationSignupFormInputfields) => {
    try {
      const { passwordValidation, ...signupData } = data;
      console.log(signupData);
      setIsSignupSucceed(true);
    } catch (error) {
      // InProcess: ai코드리뷰 반영하여 axios로 400(올바른 이메일 형식), 409(중복된 이메일) 분기시킴
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 409) {
          setErrorMessage("이미 사용 중인 이메일입니다.");
        } else if (status === 400) {
          setErrorMessage("올바른 이메일 형식이 아닙니다.");
        } else {
          setErrorMessage("회원가입에 실패했습니다.");
        }
      } else {
        setErrorMessage("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  // 이메일 중복확인 핸들러함수
  const handleEmailDuplicationCheckonClick = () => {
    // Todo: 스웨거 API 분석해서 axios 중복확인 내부 로직 작성하기
    console.log("이메일이 중복되었습니다.");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(signUpGlobalNomad)}
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
              required: "올바른 이메일 형식으로 입력해 주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "올바른 이메일 형식으로 입력해 주세요.",
              },
            })}
          />
          <Button
            type="button"
            height="custom"
            onClick={handleEmailDuplicationCheckonClick}
            className="bg-[#0055DA] text-white absolute font-medium right-5 top-11.5 w-20 h-7.5 md:w-23 text-s rounded-lg z-10 whitespace-nowrap active:bg-[#0044B0]"
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
        message={"GlobalNomad 회원가입 완료되었습니다!"}
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
