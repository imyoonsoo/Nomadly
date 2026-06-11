import { Review } from "../../../../app/(main)/activities/type";

type ReviewCardProps = Pick<
  Review,
  "user" | "rating" | "content" | "createdAt"
>;

export default ReviewCardProps;
