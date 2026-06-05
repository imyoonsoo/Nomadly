"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginFormInputFields } from "./type";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";
import { LogoPcTb, LogoMobile } from "@/constants/images";

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginFormInputFields>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginForm = async (data: LoginFormInputFields) => {
    try {
      console.log(data);
      router.push("/");
    } catch (error) {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="w-full sm:w-81.75 md:w-119 lg:w-160 mx-auto flex flex-col items-center gap-6 px-4">
      {/* 로고 → 메인 페이지로 이동 */}
      <Link
        href="/"
        aria-label="GlobalNomad 홈으로"
        className="flex flex-col items-center gap-6"
      >
        {/* 데스크탑/태블릿 */}
        <LogoPcTb
          className="hidden md:block w-[255px] h-[200px]"
          aria-hidden="true"
        />
        {/* 모바일 → 144 × 144 */}
        <LogoMobile className="block md:hidden w-36 h-36" aria-hidden="true" />
      </Link>

      <form
        onSubmit={handleSubmit(loginForm)}
        className="flex flex-col items-center gap-6 self-stretch"
      >
        {/* 이메일 */}
        <TextInput
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.email?.message}
          {...register("email", {
            required: "이메일을 입력해 주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "이메일 형식으로 작성해 주세요.",
            },
          })}
        />

        {/* 비밀번호 */}
        <TextInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          className="self-stretch"
          errorMessage={errors.password?.message}
          {...register("password", {
            required: "비밀번호를 입력해 주세요.",
            minLength: {
              value: 8,
              message: "8자 이상 작성해 주세요.",
            },
          })}
        />

        {/* 로그인하기 */}
        <Button
          type="submit"
          variant="mainBlue"
          height="47md"
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
        variant="kakao"
        height="47md"
        className="self-stretch"
        onClick={() => {
          // To do:
        }}
      >
        카카오 로그인
      </Button>

      {/* 회원가입하기 */}
      <p className="text-sm text-gray-500">
        회원이 아니신가요?{" "}
        <Link href="/signup" className="underline">
          회원가입하기
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
