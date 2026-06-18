import { MBTI_RESULTS } from "@/features/recommendation/mbti/constants/mbtiResults";

export const normalizeMbti = (value: string) => {
  return value.trim().toUpperCase();
};

export const isValidMbti = (value: string) => {
  const mbti = normalizeMbti(value);

  return /^[EI][NS][FT][JP]$/.test(mbti);
};

export const getMbtiResult = (value: string) => {
  const mbti = normalizeMbti(value);

  return MBTI_RESULTS.find((result) => result.mbti === mbti) ?? null;
};
