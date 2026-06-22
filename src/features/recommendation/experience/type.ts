export type Category =
  | "문화예술"
  | "식음료"
  | "스포츠"
  | "투어"
  | "관광"
  | "웰빙";

export type CategoryScores = Partial<Record<Category, number>>;

export interface Option {
  label: string;
  scores: CategoryScores;
}

export interface Question {
  question: string;
  options: Option[];
}

export interface RecommendationResult {
  category: Category;
  score: number;
}
