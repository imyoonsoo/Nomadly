"use client";

import axios from "axios";
import { useSignup } from "../hooks/useSignup";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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

  const postSignup = (data: SignupFormValues) => {
    const { passwordConfirm, ...signupData } = data;
    mutate(signupData, {
      onSuccess: () => {
        setIsSignupSucceed(true);
        setTimeout(startLogin, 3000);
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
    setIsSignupSucceed(false);
    router.push("/login");
  };

  // 추가: GlobalNomad 이용약관동의서 체크박스들
  const [checkAll, setCheckAll] = useState(false);
  const [checkService, setCheckService] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);

  // 추가: 이용약관 전체동의 핸들러
  const handleAllAgreements = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    setCheckService(isChecked);
    setCheckPrivacy(isChecked);
  };

  // 추가: 이용약관 서비스/개인 정보 동의에 따른 전체동의 토글
  useEffect(() => {
    if (checkService && checkPrivacy) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [checkService, checkPrivacy]);

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
            required: "잘못된 이메일 형식입니다.",
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
            required: "10자 이하로 작성해 주세요.",
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
        <div className="flex flex-col w-full border-2 border-dashed border-blue-200 rounded-2xl p-6 gap-4 bg-gray-50/50 text-xs md:text-sm relative overflow-hidden">
          <div className="absolute right-4 top-3 text-3xl opacity-10 select-none flex gap-1">
            📝
          </div>

          {/* 전체동의 */}
          <label className="flex items-center gap-3 font-bold text-gray-800 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={checkAll}
              onChange={handleAllAgreements}
              className="w-5 h-5 rounded-full border-2 border-gray-300 text-blue-500 focus:ring-blue-400 cursor-pointer transition-all group-hover:scale-105"
            />
            <span className="text-sm md:text-base text-blue-600 font-extrabold">
              GlobalNomad 서비스 이용약관동의서
            </span>
          </label>

          <hr className="border-dashed border-gray-200" />

          {/* 필수약관 1: 서비스이용약관 */}
          <div className="flex items-center justify-between text-gray-600 gap-2 w-full">
            <label className="flex items-start md:items-center gap-3 cursor-pointer select-none group flex-1">
              <input
                type="checkbox"
                checked={checkService}
                onChange={(e) => setCheckService(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400 cursor-pointer transition-all shrink-0 mt-0.5 md:mt-0"
              />
              <span className="leading-tight">
                <span className="font-semibold text-blue-500">[필수]</span>
                <b> 체험 예약/상품 등록 동의</b>
              </span>
            </label>
          </div>

          {/* 필수약관 2: 개인정보처리방침 */}
          <div className="flex items-center justify-between text-gray-600 gap-2 w-full">
            <label className="flex items-start md:items-center gap-3 cursor-pointer select-none group flex-1">
              <input
                type="checkbox"
                checked={checkPrivacy}
                onChange={(e) => setCheckPrivacy(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400 cursor-pointer transition-all shrink-0 mt-0.5 md:mt-0"
              />
              <span className="leading-tight">
                <span className="font-semibold text-blue-500">[필수]</span>{" "}
                <b>캘린더뷰 주소 기반 서비스 제공을 위한 개인정보 수집 동의</b>
              </span>
            </label>
          </div>
        </div>

        {/* 회원가입하기 버튼 */}
        <Button
          type="submit"
          variant="mainBlue"
          height="54lg"
          disabled={!(isValid && checkService && checkPrivacy)}
          className="self-stretch shadow-md disabled:shadow-none transition-all font-bold text-base"
        >
          GlobalNomad 회원가입하기
        </Button>
      </form>

      {/* 구분선 */}
      <div className="flex items-center gap-4 self-stretch">
        <hr className="flex-1 border-[#DDDDDD]" />
        <span className="text-[#79747E] text-center text-base font-medium tracking-[-0.4px">
          SNS 계정으로 회원가입하기
        </span>
        <hr className="flex-1 border-[#DDDDDD]" />
      </div>

      {/* 카카오 회원가입 */}
      <Button
        type="button"
        variant="easyKakao"
        height="54lg"
        className="self-stretch"
        onClick={() => {
          const QAuth_KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
          window.location.href = QAuth_KAKAO_URL;
        }}
      >
        카카오 회원가입
      </Button>

      {/* 로그인하기 underline글 로그인페이지로 이동 */}
      <p className="text-gray-400 text-center text-sm font-medium tracking-[-0.4px]">
        회원이신가요?{" "}
        <Link href="/login" className="underline">
          로그인하기
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
