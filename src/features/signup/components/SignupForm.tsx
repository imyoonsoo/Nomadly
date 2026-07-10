"use client";

import axios from "axios";
import useSignup from "../hooks/useSignup";
import { useForm, useWatch } from "react-hook-form";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";
import SuccessModal from "@/components/Modal/SuccessModal";
import { SignupFormValues } from "../type";

const DEFAULT_SIGNUP_ERROR_MESSAGE =
  "회원가입에 실패했습니다. 잠시 후 시도해주세요.";

const SignupForm = () => {
  const { mutate } = useSignup();
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState("");
  const [isSignupSucceed, setIsSignupSucceed] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const password = useWatch({ control, name: "password" }) || "";
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 3천 페이지 떠날 시 ref에 타이머 ID 저장

  // 렌더링마다 새 함수가 생기면 아래 useEffect가 계속 재실행되므로 useCallback으로 고정
  const startLogin = useCallback(() => {
    setIsSignupSucceed(false);
    router.push("/login");
  }, [router]);

  // 회원가입 성공 후 startLogin 함수 실행되어 로그인 페이지로 이동
  // onSuccess 안에 직접 쓰면 에러가 나서 useEffect로 분리
  useEffect(() => {
    if (!isSignupSucceed) {
      return;
    }
    timerRef.current = setTimeout(startLogin, 3000);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isSignupSucceed, startLogin]);

  // useCallback 없이 쓰면 에러가 나서 감싸줌
  const handleSignupFormSubmit = useCallback(
    (data: SignupFormValues) => {
      const signupData = {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      };
      mutate(signupData, {
        onSuccess: () => {
          setIsSignupSucceed(true);
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const statusCode = error.response?.status;
            if (statusCode === 409) {
              setError("email", {
                message: "이미 사용 중인 이메일입니다.",
              });
            } else {
              setAlertMessage(
                error.response?.data?.message ?? DEFAULT_SIGNUP_ERROR_MESSAGE,
              );
            }
          } else {
            setAlertMessage(DEFAULT_SIGNUP_ERROR_MESSAGE);
          }
        },
      });
    },
    [mutate, setError],
  );

  const [isAgreedTerms, setIsAgreedTerms] = useState(false);
  return (
    <div className="w-full flex flex-col items-center gap-6 self-stretch">
      <form
        onSubmit={handleSubmit(handleSignupFormSubmit)}
        className="w-full flex flex-col items-center gap-6 self-stretch"
      >
        <TextInput
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          className="self-stretch"
          errorMessage={errors.email?.message}
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "잘못된 이메일 형식입니다.",
            },
          })}
        />

        <TextInput
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
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
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~\-])\S+$/,
              message: "영문, 숫자, 특수문자 각 1자 이상 조합해 입력해주세요.",
            },
          })}
        />

        <TextInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          className="self-stretch"
          errorMessage={errors.passwordConfirm?.message}
          {...register("passwordConfirm", {
            required: "비밀번호를 한 번 더 입력해주세요.",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
        />

        <label className="flex items-center gap-2 self-stretch text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAgreedTerms}
            onChange={(e) => setIsAgreedTerms(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-primary-700 font-medium text-sm">
            이용약관 및 개인정보 수집에 동의합니다.
          </span>
        </label>

        <Button
          type="submit"
          variant="mainBlue"
          height="54lg"
          disabled={!(isValid && isAgreedTerms)}
          className="self-stretch shadow-md disabled:shadow-none transition-all font-bold text-base"
        >
          Nomadly 회원가입하기
        </Button>
      </form>

      <div className="flex items-center gap-4 self-stretch w-full">
        <hr className="flex-1 border-gray-100" />
        <span className="text-gray-560 text-center text-sm md:text-base font-medium tracking-[-0.4px] shrink-0">
          SNS 계정으로 회원가입하기
        </span>
        <hr className="flex-1 border-gray-100" />
      </div>

      <Button
        type="button"
        variant="easyKakao"
        height="54lg"
        className="self-stretch"
        onClick={() => {
          const QAuth_KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=signup`;
          window.location.href = QAuth_KAKAO_URL;
        }}
      >
        카카오 회원가입
      </Button>

      <p className="text-gray-400 text-center text-sm md:text-base font-medium tracking-[-0.4px]">
        Nomadly 회원이신가요?{" "}
        <Link href="/login" className="underline">
          <b className="text-gray-500">로그인하기</b>
        </Link>
      </p>

      <SuccessModal
        isOpen={isSignupSucceed}
        onClose={startLogin}
        message={
          "회원가입 완료되었습니다! 로그인 후 Nomadly와 함께 떠나보세요."
        }
      />
      <SuccessModal
        isOpen={!!alertMessage}
        onClose={() => setAlertMessage("")}
        message={alertMessage}
      />
    </div>
  );
};

export default SignupForm;
