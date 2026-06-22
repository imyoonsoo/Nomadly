export type Category =
  | "문화예술"
  | "식음료"
  | "스포츠"
  | "투어"
  | "관광"
  | "웰빙";

export interface MbtiResult {
  mbti: string;
  title: string;
  categories: Category[];
  description: string;
}
