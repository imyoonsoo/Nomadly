// 크롤러가 읽을 /robots.txt 응답
import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/site";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/", "/mypage/", "/oauth/"],
  },
  sitemap: `${SITE_URL}/sitemap.xml`,
});

export default robots;
