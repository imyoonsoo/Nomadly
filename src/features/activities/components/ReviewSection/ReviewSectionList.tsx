"use client";

import { useMemo, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import ReviewCard from "../ReviewCard/ReviewCard";
import type { Review } from "@/features/activities/type";

const REVIEWS_PER_PAGE = 3;

interface ReviewSectionListProps {
  reviews: Review[];
}

const ReviewSectionList = ({ reviews }: ReviewSectionListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const sortedReviews = useMemo(
    () =>
      [...reviews].sort((firstReview, secondReview) =>
        secondReview.updatedAt.localeCompare(firstReview.updatedAt),
      ),
    [reviews],
  );

  const totalPages = Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = sortedReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (sortedReviews.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-7.5 p-5">
        {paginatedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            user={review.user}
            rating={review.rating}
            content={review.content}
            createdAt={review.createdAt}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default ReviewSectionList;
