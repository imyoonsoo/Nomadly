"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  kakaoSignInAction,
  kakaoSignUpAction,
} from "@/features/login/actions/kakaoOAuthAction";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";

// TODO: 임시로 생성한 상태. 로딩 UI 추가필요
const KakaoCallbackLoading = () => (
  <div className="flex items-center justify-center h-screen">
    카카오 로그인 처리 중...
  </div>
);

const KakaoCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [nickname, setNickname] = useState("");
  const [isNeedNickname, setIsNeedNickname] = useState(false);
  const codeRef = useRef("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const authCode = searchParams.get("code");
    const state = searchParams.get("state");
    if (!authCode) {
      router.push("/login");
      return;
    }
    codeRef.current = authCode;

    // 회원가입 플로우: 인가 코드는 1회용이므로 sign-in으로 소비하지 않고
    // 바로 닉네임을 받아 sign-up에 사용한다
    if (state === "signup") {
      setIsNeedNickname(true);
      return;
    }

    kakaoSignInAction(authCode).then((result) => {
      if (result.success) {
        router.push("/");
      } else if (result.isNewUser) {
        // sign-in 시도에서 코드가 이미 소비됨 → 새 코드를 받아 회원가입 플로우로 재진입
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=signup`;
      } else {
        router.push("/login");
      }
    });
  }, []);

  const handleSignUpButtonClick = async () => {
    if (!nickname.trim()) return;
    const result = await kakaoSignUpAction(codeRef.current, nickname);
    if (result.success) {
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  if (isNeedNickname) {
    const isNicknameInvalid = !nickname.trim() || nickname.length > 10;

    return (
      <div
        className="flex items-center justify-center w-full
        pt-10 pb-20 px-6
        md:pt-20 md:pb-25 md:px-13
        lg:px-0"
      >
        <div className="w-full md:w-160 mx-auto flex flex-col gap-6">
          <p className="text-18-bold text-center">
            사용할 닉네임을 입력해 주세요
          </p>
          <TextInput
            name="nickname"
            label="닉네임"
            placeholder="닉네임을 입력해 주세요"
            className="self-stretch"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            errorMessage={
              nickname.length > 10 ? "열 자 이하로 작성해 주세요." : undefined
            }
          />
          <Button
            type="button"
            variant="mainBlue"
            height="54lg"
            disabled={isNicknameInvalid}
            onClick={handleSignUpButtonClick}
            className="self-stretch"
          >
            가입하기
          </Button>
        </div>
      </div>
    );
  }

  return <KakaoCallbackLoading />;
};

const KakaoCallbackPage = () => {
  return (
    <Suspense fallback={<KakaoCallbackLoading />}>
      <KakaoCallbackContent />
    </Suspense>
  );
};

export default KakaoCallbackPage;
