export type BalanceCategory =
  | "문화예술"
  | "식음료"
  | "스포츠"
  | "투어"
  | "관광"
  | "웰빙";

export interface BalanceOption {
  label: string;
  emoji: string;
  category: BalanceCategory;
}

export interface BalanceQuestion {
  left: BalanceOption;
  right: BalanceOption;
}

export interface BalanceResultItem {
  category: BalanceCategory;
  count: number;
  percent: number;
}
