const KAKAO_AUTHORIZE_ENDPOINT = "https://kauth.kakao.com/oauth/authorize";

// authorize URL과 백엔드 요청의 redirect_uri는 같아야 함 (다르면 토큰 교환 실패)
export const getKakaoRedirectUri = (): string => {
  const fromEnv = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  if (fromEnv) return fromEnv;

  // env 없을 시 현재 origin으로 자동 생성
  if (typeof window !== "undefined") {
    return `${window.location.origin}/oauth/kakao`;
  }

  return "";
};

export const buildKakaoAuthorizeUrl = (state: "login" | "signup"): string => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

  if (!clientId) {
    console.error(
      "[Kakao OAuth] NEXT_PUBLIC_KAKAO_REST_API_KEY 가 설정되지 않았습니다.",
    );
  }

  const params = new URLSearchParams({
    client_id: clientId ?? "",
    redirect_uri: getKakaoRedirectUri(),
    response_type: "code",
    state,
  });

  return `${KAKAO_AUTHORIZE_ENDPOINT}?${params.toString()}`;
};
