import { RouletteItem } from "./type";

export const ROULETTE_ITEMS: RouletteItem[] = [
  {
    category: "문화예술",
    emoji: "🎨",
    description: "전시, 공방, 만들기 체험을 추천해요.",
  },
  {
    category: "식음료",
    emoji: "🍽️",
    description: "쿠킹 클래스, 베이킹, 맛집 체험을 추천해요.",
  },
  {
    category: "스포츠",
    emoji: "⚽",
    description: "액티비티, 클라이밍, 야외 스포츠를 추천해요.",
  },
  {
    category: "투어",
    emoji: "🧭",
    description: "가이드 투어, 로컬 탐방, 도심 투어를 추천해요.",
  },
  {
    category: "관광",
    emoji: "🏛️",
    description: "랜드마크, 명소, 야경 관광을 추천해요.",
  },
  {
    category: "웰빙",
    emoji: "🌿",
    description: "힐링, 명상, 스파 같은 편안한 체험을 추천해요.",
  },
];

export const getRandomRouletteIndex = () => {
  return Math.floor(Math.random() * ROULETTE_ITEMS.length);
};
