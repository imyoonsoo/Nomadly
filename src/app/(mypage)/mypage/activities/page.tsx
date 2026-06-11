"use client";

import { useRouter } from "next/navigation";
import Title from "@/app/(mypage)/_components/Title";
import ActivitiesList from "@/features/myActivities/components/ActivitiesList";

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

      <ActivitiesList />
    </div>
  );
};

export default Activities;
