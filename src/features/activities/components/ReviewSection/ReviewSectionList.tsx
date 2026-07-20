"use client";

import { useState } from "react";
import Dropdown from "@/components/Dropdown/Dropdown";
import { Pagination } from "@/components/Pagination/Pagination";
import { AltDown } from "@/constants/icons";
import ReviewCard from "../ReviewCard/ReviewCard";
import type { Review } from "@/features/activities/type";

const REVIEWS_PER_PAGE = 3;
const SORT_OPTIONS = ["최신순", "별점 높은순", "별점 낮은순"] as const;

type SortOption = (typeof SORT_OPTIONS)[number];

interface ReviewSectionListProps {
  reviews: Review[];
}

const ReviewSectionList = ({ reviews }: ReviewSectionListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState<SortOption>("최신순");

  const sortOptions = SORT_OPTIONS.map((option) => ({
    label: option,
    onSelect: () => {
      setSelectedSort(option);
      setCurrentPage(1);
    },
  }));

  const sortedReviews = [...reviews].sort((firstReview, secondReview) => {
    if (selectedSort === "최신순") {
      return (
        new Date(secondReview.createdAt).getTime() -
        new Date(firstReview.createdAt).getTime()
      );
    }

    if (selectedSort === "별점 높은순") {
      return secondReview.rating - firstReview.rating;
    }

    if (selectedSort === "별점 낮은순") {
      return firstReview.rating - secondReview.rating;
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = sortedReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE,
  );

  if (sortedReviews.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex justify-end px-5">
        <Dropdown options={sortOptions}>
          {({ toggle }) => (
            <button
              type="button"
              className="flex h-9 items-center px-3"
              onClick={toggle}
            >
              {selectedSort}
              <AltDown />
            </button>
          )}
        </Dropdown>
      </div>

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
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default ReviewSectionList;
