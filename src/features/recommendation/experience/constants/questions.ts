import { Question } from "@/features/recommendation/experience/type";

export const QUESTIONS: Question[] = [
  {
    question: "누구와 함께 가시나요?",
    options: [
      { label: "혼자", scores: { 문화예술: 2, 웰빙: 2 } },
      { label: "친구", scores: { 스포츠: 2, 투어: 2 } },
      { label: "연인", scores: { 문화예술: 2, 식음료: 2 } },
      { label: "가족", scores: { 관광: 2, 투어: 2 } },
    ],
  },
  {
    question: "실내와 실외 중 어디가 좋나요?",
    options: [
      { label: "실내", scores: { 문화예술: 2, 식음료: 2, 웰빙: 1 } },
      { label: "실외", scores: { 스포츠: 2, 관광: 2, 투어: 1 } },
      { label: "상관없음", scores: { 관광: 1, 문화예술: 1 } },
    ],
  },
  {
    question: "움직이는 활동을 좋아하나요?",
    options: [
      { label: "좋아함", scores: { 스포츠: 3, 투어: 1 } },
      { label: "보통", scores: { 관광: 1, 투어: 1 } },
      { label: "싫어함", scores: { 문화예술: 2, 웰빙: 2 } },
    ],
  },
  {
    question: "맛집이나 음식 체험에 관심이 있나요?",
    options: [
      { label: "매우 관심 있음", scores: { 식음료: 3 } },
      { label: "조금 있음", scores: { 식음료: 1, 관광: 1 } },
      { label: "관심 없음", scores: { 웰빙: 1 } },
    ],
  },
  {
    question: "여행을 간다면 어떤 스타일이 좋나요?",
    options: [
      { label: "힐링", scores: { 웰빙: 3 } },
      { label: "직접 체험", scores: { 문화예술: 2, 식음료: 2 } },
      { label: "탐방", scores: { 관광: 3, 투어: 2 } },
    ],
  },
];
