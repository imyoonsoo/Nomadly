import type { UpdateActivityResponse } from "@/features/activity-form/types";

// Todo: api 연결 후 제거
export const mockActivityDetailData: UpdateActivityResponse = {
  id: 7,
  userId: 21,
  title: "함께 배우면 즐거운 스트릿댄스",
  description: "둠칫 둠칫 두둠칫",
  category: "투어",
  price: 10000,
  address: "서울특별시 강남구 테헤란로 427",
  bannerImageUrl:
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png",
  subImages: [
    {
      id: 1,
      imageUrl:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/b.png",
    },
  ],
  schedules: [
    {
      times: [{ id: 1, startTime: "12:00", endTime: "13:00" }],
      date: "2023-12-01",
    },
    {
      times: [{ id: 2, startTime: "12:00", endTime: "13:00" }],
      date: "2023-12-05",
    },
  ],
  reviewCount: 5,
  rating: 4.74,
  createdAt: "2023-12-31T21:28:50.589Z",
  updatedAt: "2023-12-31T21:28:50.589Z",
};
