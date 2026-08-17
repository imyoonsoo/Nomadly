// 관심 체험 목록 읽고 바꾸기
"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "bookmarkedActivities";
const EMPTY: number[] = [];

// 매번 새 배열이면 무한 리렌더라 raw 같으면 이전 배열 재사용
let cachedRaw: string | null = null;
let cachedIds: number[] = EMPTY;

const listeners = new Set<() => void>();

const emit = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (onStoreChange: () => void) => {
  listeners.add(onStoreChange);
  // 다른 탭에서 바꿔도 반영
  window.addEventListener("storage", onStoreChange);

  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
};

const getSnapshot = (): number[] => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw === cachedRaw) {
    return cachedIds;
  }

  cachedRaw = raw;

  try {
    const parsed = raw ? JSON.parse(raw) : EMPTY;
    cachedIds = Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    cachedIds = EMPTY;
  }

  return cachedIds;
};

// 서버에는 localStorage 없어 빈 배열 반환
const getServerSnapshot = (): number[] => EMPTY;

export const toggleBookmark = (id: number) => {
  const current = getSnapshot();
  const next = current.includes(id)
    ? current.filter((bookmarkedId) => bookmarkedId !== id)
    : [...current, id];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
};

export const useBookmarkedIds = (): number[] =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
