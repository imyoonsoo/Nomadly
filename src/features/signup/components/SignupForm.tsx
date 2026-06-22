"use client";

import axios from "axios";
import useSignup from "../hooks/useSignup";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";
import SuccessModal from "@/components/Modal/SuccessModal";
import { SignupFormValues } from "../type";

const SignupForm = () => {
  const { mutate } = useSignup();
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState("");
  const [isSignupSucceed, setIsSignupSucceed] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
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

  const password = watch("password");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const postSignup = (data: SignupFormValues) => {
    const { passwordConfirm, ...signupData } = data;
    mutate(signupData, {
      // On Success 시 모달에서 로그인으로 이동
      onSuccess: () => {
        setIsSignupSucceed(true);
        timerRef.current = setTimeout(startLogin, 3000); // timeRef에 ID 저장
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
              error.response?.data?.message ??
                "서버 통신 문제로 회원가입에 실패했습니다. 잠시 후 시도해 주세요.",
            );
          }
        } else {
          setAlertMessage(
            "알 수 없는 문제로 회원가입에 실패했습니다. 잠시 후 시도해 주세요.",
          );
        }
      },
    });
  };

  const startLogin = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsSignupSucceed(false);
    router.push("/login");
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // [추가] 회원가입 요구사항 이용약관 체크박스 (디자인은 논의하기로)
  const [agreedTerms, setAgreedTerms] = useState(false);
  return (
    <>
      <form
        onSubmit={handleSubmit(postSignup)}
        className="flex flex-col items-center gap-6 self-stretch"
      >
        {/* 이메일 입력 */}
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
              message: "잘못된 이메일 형식입니다.",
            },
          })}
        />

        {/* 닉네임 입력 */}
        <TextInput
          label="닉네임"
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

        {/* 비밀번호 입력 */}
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
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~\-])\S+$/,
              message:
                "영문, 숫자, 특수문자를 각각 1자 이상 조합해 입력해 주세요.",
            },
          })}
        />

        {/* 비밀번호 확인 */}
        <TextInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.passwordConfirm?.message}
          {...register("passwordConfirm", {
            required: "비밀번호를 한 번 더 입력해 주세요.",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
        />

        {/* 추가: GlobalNomad 이용약관동의서 */}
        <label className="flex items-center gap-2 self-stretch text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreedTerms}
            onChange={(e) => setAgreedTerms(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span>이용약관 및 개인정보 수집에 동의합니다.</span>
        </label>

        {/* 회원가입하기 버튼 */}
        <Button
          type="submit"
          variant="mainBlue"
          height="54lg"
          disabled={!(isValid && agreedTerms)}
          className="self-stretch shadow-md disabled:shadow-none transition-all font-bold text-base"
        >
          GlobalNomad 회원가입하기
        </Button>
      </form>

      {/* 구분선 */}
      <div className="flex items-center gap-4 self-stretch">
        <hr className="flex-1 border-gray-100" />
        <span className="text-[#79747E] text-center text-base font-medium tracking-[-0.4px]">
          SNS 계정으로 회원가입하기
        </span>
        <hr className="flex-1 border-gray-100" />
      </div>

      {/* 카카오 회원가입 */}
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

      {/* 로그인하기 underline글 로그인페이지로 이동 */}
      <p className="text-gray-400 text-center text-sm font-medium tracking-[-0.4px]">
        회원이신가요?{" "}
        <Link href="/login" className="underline">
          <b>로그인하기</b>
        </Link>
      </p>

      {/* 회원가입 성공 모달 */}
      <SuccessModal
        isOpen={isSignupSucceed}
        onClose={startLogin}
        message={
          "회원가입이 완료되었습니다! 로그인 후 GlobalNomad와 함께 떠나보세요."
        }
      />

      {/* 회원가입 에러 모달 */}
      <SuccessModal
        isOpen={!!alertMessage}
        onClose={() => setAlertMessage("")}
        message={alertMessage}
      />
    </>
  );
};

export default SignupForm;
