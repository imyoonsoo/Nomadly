import { Review } from "../../../type";

type ReviewCardProps = Pick<
  Review,
  "user" | "rating" | "content" | "createdAt"
>;

export default ReviewCardProps;
