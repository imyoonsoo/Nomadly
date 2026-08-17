import type { Metadata } from "next";

import HomeContent from "./components/HomeContent";
import { CardItem } from "./components/type";
import { getActivities } from "@/features/activities/api/api";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/constants/site";

// openGraph는 통째로 교체되니 RootLayout 값 그대로 사용
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const getInitialActivities = async (): Promise<CardItem[]> => {
  try {
    const { activities } = await getActivities();
    return activities;
  } catch (error) {
    console.error("[Home] 체험 목록을 불러오지 못했습니다.", error);
    return [];
  }
};

const Home = async () => {
  const activities = await getInitialActivities();

  return <HomeContent activities={activities} />;
};

export default Home;
