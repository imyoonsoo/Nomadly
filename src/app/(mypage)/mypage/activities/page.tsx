"use client";

import { useRouter } from "next/navigation";
import Title from "@/app/(mypage)/_components/Title";
import ActivitiesList from "./_components/ActivitiesList";

// Todo: api 연동 후 type 분리
export interface CardProps {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl?: string; // api 연동 후 수정
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

// Todo: api 연동 후 제거
const MOCK_CARDS: CardProps[] = [
  {
    id: 1,
    userId: 101,
    title: "함께 배우면 즐거운 스트릿 댄스",
    description: "초보자도 쉽게 따라 할 수 있는 힙합, 팝핀 기초 클래스입니다.",
    category: "댄스",
    price: 15000,
    address: "서울시 마포구",
    // bannerImageUrl:
    //   "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
    rating: 4.9,
    reviewCount: 293, // 리뷰 가장 많음
    createdAt: "2026-05-01T10:00:00.000Z",
    updatedAt: "2026-05-01T10:00:00.000Z",
  },
  {
    id: 2,
    userId: 102,
    title: "초보자를 위한 뚝딱뚝딱 브레이킹 댄스",
    description: "비보잉의 기본 탑락과 고다운을 안전하게 배워보세요.",
    category: "댄스",
    price: 35000,
    address: "서울시 강남구",
    // bannerImageUrl: "https://images.unsplash.com/photo-1547153760-18fc86324498",
    rating: 4.5,
    reviewCount: 12,
    createdAt: "2026-06-01T14:20:00.000Z",
    updatedAt: "2026-06-01T14:20:00.000Z",
  },
  {
    id: 3,
    userId: 103,
    title: "감성 가득한 한강 야경 팝핀 클래스",
    description: "시원한 강바람을 맞으며 배우는 야외 팝핀 워크숍!",
    category: "댄스",
    price: 10000,
    address: "서울시 성동구",
    // bannerImageUrl:
    //   "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4",
    rating: 4.8,
    reviewCount: 84,
    createdAt: "2026-06-04T16:30:00.000Z",
    updatedAt: "2026-06-04T16:30:00.000Z",
  },
];

const Activities = () => {
  const router = useRouter();
  return (
    <div>
      <Title
        title="내 체험 관리"
        description="체험을 등록하거나 수정 및 삭제가 가능합니다."
        buttonText="체험 등록하기"
        onButtonClick={() => router.push("/activities/new")}
      />

      <ActivitiesList initialCards={MOCK_CARDS} />
    </div>
  );
};

export default Activities;
