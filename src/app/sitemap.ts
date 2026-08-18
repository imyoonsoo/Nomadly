// 검색엔진이 읽을 /sitemap.xml 응답
import type { MetadataRoute } from "next";

import { getActivities } from "@/features/activities/api/api";
import { SITE_URL } from "@/constants/site";

const STATIC_PATHS = [
  "",
  "/policy/faq",
  "/policy/privacy",
  "/recommendation",
  "/game",
] as const;

const toDate = (value: string): Date | undefined => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.5,
  }));

  try {
    // 체험 추가 대비해 totalCount만큼 요청
    const first = await getActivities();
    const activities =
      first.activities.length < first.totalCount
        ? (await getActivities({ size: first.totalCount })).activities
        : first.activities;

    const activityEntries: MetadataRoute.Sitemap = activities.map(
      (activity) => ({
        url: `${SITE_URL}/activities/${activity.id}`,
        lastModified: toDate(activity.updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    );

    return [...staticEntries, ...activityEntries];
  } catch (error) {
    console.error("[sitemap] 체험 목록을 불러오지 못했습니다.", error);
    return staticEntries;
  }
};

export default sitemap;
