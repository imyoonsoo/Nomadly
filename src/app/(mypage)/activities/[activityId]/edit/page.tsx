import ActivityForm from "@/features/activity-form/components/ActivityForm";
import type { ActivityFormValues } from "@/features/activity-form/types";

interface EditActivityFormProps {
  params: { id: string };
}

export const mockActivityDetailData: ActivityFormValues = {
  title: "함께 배우면 즐거운 힙합 스트릿 댄스 클래스",
  category: "문화·예술", // 혹은 CATEGORY_OPTIONS의 value에 맞춰 "CULTURE" 등으로 변경
  description:
    "안녕하세요! 초보자부터 전문가까지 누구나 신나고 재미있게 즐길 수 있는 스트릿 댄스 체험입니다. 크럼프, 락킹, 힙합 등 다양한 스타일을 기초부터 차근차근 배워보세요. 음악에 몸을 맡기고 스트레스를 날려버릴 수 있는 최고의 시간을 선사합니다!",
  price: 15000, // 폼 내부에서 문자열로 처리 중이므로 string 유지
  address: "서울 중구 청계천로 100 10F",
  schedules: [
    {
      date: "26/07/15",
      startTime: "14:00",
      endTime: "16:00",
    },
    {
      date: "26/07/16",
      startTime: "15:00",
      endTime: "17:00",
    },
    {
      date: "26/07/18",
      startTime: "19:00",
      endTime: "21:00",
    },
  ],
  bannerImageUrl:
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad", // 배너 이미지 URL 예시
  subImageUrls: [
    "https://images.unsplash.com/photo-1547153760-18fc86324498",
    "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4",
  ],
};

const EditActivityForm = ({ params }: EditActivityFormProps) => {
  return <ActivityForm mode="edit" defaultValues={mockActivityDetailData} />;
};

export default EditActivityForm;
