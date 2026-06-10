"use client";

import axios from "axios";
import { useSignup } from "../hooks/useSignup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";
import SuccessModal from "@/components/Modal/SuccessModal";
import { SignupFormValues } from "../type";

const SignupForm = () => {
  const { mutate } = useSignup();
  const [alertMessage, setAlertMessage] = useState("");
  const [isSignupSucceed, setIsSignupSucceed] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
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

  const startLogin = () => {
    setIsSignupSucceed(false);
    router.push("/login");
  };

  const postSignup = (data: SignupFormValues) => {
    const { passwordConfirm, ...signupData } = data;
    mutate(signupData, {
      // onSuccess 시 가입완료 모달 오픈
      onSuccess: () => {
        setIsSignupSucceed(true);
        setTimeout(startLogin, 3000);
      },
      onError: (error) => {
        // 409 duplicated
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          setAlertMessage("이미 사용 중인 이메일입니다.");
        } else {
          // 그 외 에러들은 에러원인 모달로 띄워 회원가입 실패 알리기
          setAlertMessage(`${error.message} 발생으로 회원가입 실패하였습니다.`);
        }
      },
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(postSignup)}
        className="flex flex-col items-center gap-6 self-stretch"
      >
        <TextInput
          label="이메일"
          type="email"
          placeholder="이메일을 입력해 주세요."
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

        <TextInput
          label="비밀번호"
          type="password"
          placeholder="8자 이상 입력해 주세요."
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

        <TextInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해 주세요."
          className="self-stretch"
          errorMessage={errors.passwordConfirm?.message}
          {...register("passwordConfirm", {
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

      <div className="flex items-center gap-4 self-stretch">
        <hr className="flex-1 border-gray-100" />
        <span className="text-base font-medium tracking-[-0.4px] text-gray-500">
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
          const QAuth_KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
          window.location.href = QAuth_KAKAO_URL;
        }}
      >
        카카오 간편 회원가입
      </Button>

      <p className="text-base font-medium tracking-[-0.4px] text-gray-400">
        회원이신가요?{" "}
        <Link href="/login" className="underline">
          로그인하기
        </Link>
      </p>

      <SuccessModal
        isOpen={isSignupSucceed}
        onClose={startLogin}
        message={"회원가입이 완료되었습니다! GlobalNomad와 함께 떠나보세요."}
      />

      <SuccessModal
        isOpen={!!alertMessage}
        onClose={() => setAlertMessage("")}
        message={alertMessage}
      />
    </>
  );
};

export default SignupForm;
