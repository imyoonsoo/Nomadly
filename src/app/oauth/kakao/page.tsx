"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  kakaoSignInAction,
  kakaoSignUpAction,
} from "@/features/login/actions/kakaoOAuthAction";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";
import EmptyLoading from "@/assets/images/empty-loading.svg";
import {
  buildKakaoAuthorizeUrl,
  getKakaoRedirectUri,
} from "@/features/login/kakao/redirectUri";

const KakaoCallbackLoading = () => (
  <div className="flex h-screen items-center justify-center">
    <EmptyLoading width={200} height={200} />
  </div>
);

const KakaoCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [nickname, setNickname] = useState("");
  const hasRun = useRef(false);

  // isNeedNickname state 대신 URL에서 파생 ➝ effect 내 setState 방지
  const authCode = searchParams.get("code");
  const isSignup = searchParams.get("state") === "signup";

  useEffect(() => {
    // 인가코드는 1회용 ➝ hasRun으로 중복 처리 방지 (StrictMode 대응)
    if (hasRun.current) return;
    hasRun.current = true;

    if (!authCode) {
      router.push("/login");
      return;
    }

    // signup은 닉네임 화면에서 처리, 로그인만 signin
    if (isSignup) return;

    kakaoSignInAction(authCode, getKakaoRedirectUri()).then((result) => {
      if (result.success) {
        router.push("/");
      } else if (result.isNewUser) {
        // 코드 이미 소비됨 ➝ 새 코드 받아 회원가입 재진입
        window.location.href = buildKakaoAuthorizeUrl("signup");
      } else {
        router.push("/login");
      }
    });
  }, [authCode, isSignup, router]);

  const handleSignUpButtonClick = async () => {
    if (!nickname.trim() || !authCode) return;
    const result = await kakaoSignUpAction(
      authCode,
      nickname,
      getKakaoRedirectUri(),
    );
    if (result.success) {
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  if (authCode && isSignup) {
    const isNicknameInvalid = !nickname.trim() || nickname.length > 10;

    return (
      <div className="flex w-full items-center justify-center px-6 pt-10 pb-20 md:px-13 md:pt-20 md:pb-25 lg:px-0">
        <div className="mx-auto flex w-full flex-col gap-6 md:w-160">
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
