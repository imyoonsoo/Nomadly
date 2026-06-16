import { Review } from "@/features/activities/type";

type ReviewCardProps = Pick<
  Review,
  "user" | "rating" | "content" | "createdAt"
>;

export default ReviewCardProps;
