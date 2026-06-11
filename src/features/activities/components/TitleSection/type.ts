import { ActivityDetailResponse } from "@/app/(main)/activities/type";

type TitleSectionProps = Pick<
  ActivityDetailResponse,
  "id" | "title" | "category" | "address" | "reviewCount" | "rating"
>;

export default TitleSectionProps;
