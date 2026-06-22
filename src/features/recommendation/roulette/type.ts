export type RouletteCategory =
  | "문화예술"
  | "식음료"
  | "스포츠"
  | "투어"
  | "관광"
  | "웰빙";

export interface RouletteItem {
  category: RouletteCategory;
  emoji: string;
  description: string;
}
