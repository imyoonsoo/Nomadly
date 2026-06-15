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

  const password = watch("password");

  const signUpGlobalNomad = async (data: ValidationSignupFormInputfields) => {
    try {
      const { passwordValidation, ...signupData } = data;
      console.log(signupData);
      setIsSignupSucceed(true);
    } catch (error) {
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

  return (
    <>
      <form
        onSubmit={handleSubmit(signUpGlobalNomad)}
        className="flex flex-col items-center gap-6 self-stretch"
      >
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
              message: "10자 이하로 작성해 주세요.",
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
            required: "비밀번호를 입력해 주새요.",
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },
          })}
        />

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

      <div className="w-full flex flex-col gap-5 md:gap-7.5 items-center">
        <div className="flex items-center gap-4 self-stretch">
          <hr className="flex-1 border-gray-100" />
          <span className="text-[#79747E] text-center text-base font-medium tracking-[-0.4px]">
            SNS 계정으로 가입하기
          </span>
          <hr className="flex-1 border-gray-100" />
        </div>

        <Button
          type="button"
          variant="easyKakao"
          height="54lg"
          className="self-stretch "
          onClick={() => {
            const EASYAUTH_KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=signup`;
            window.location.href = EASYAUTH_KAKAO_URL;
          }}
        >
          카카오 회원가입
        </Button>

        <p className="text-gray-400 text-center text-sm font-medium tracking-[-0.4px]">
          회원이신가요?{" "}
          <Link href="/login" className="underline">
            <b>로그인하기</b>
          </Link>
        </p>
      </div>

      <SuccessModal
        isOpen={isSignupSucceed}
        onClose={() => {
          setIsSignupSucceed(false);
          router.push("/login");
        }}
        message={
          "회원가입이 완료되었습니다! 로그인 후 GlobalNomad와 함께 떠나보세요."
        }
      />

      <SuccessModal
        isOpen={!!errorMessage}
        onClose={() => setErrorMessage("")}
        message={errorMessage}
      />
    </>
  );
};

export default ValidationSignupForm;
