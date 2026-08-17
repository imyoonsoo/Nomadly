import type { Metadata } from "next";

import { HomeContent } from "./components/HomeContent";
import { CardItem } from "./components/type";
import { getActivities } from "@/features/activities/api/api";

// openGraph는 통째로 교체되니 RootLayout 값 그대로 사용
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const getInitialActivities = async (): Promise<{
  activities: CardItem[];
  loadFailed: boolean;
}> => {
  try {
    const { activities } = await getActivities();
    return { activities, loadFailed: false };
  } catch (error) {
    console.error("[Home] 체험 목록을 불러오지 못했습니다.", error);
    return { activities: [], loadFailed: true };
  }
};

const Home = async () => {
  const { activities, loadFailed } = await getInitialActivities();

  return <HomeContent activities={activities} loadFailed={loadFailed} />;
};

export default Home;
