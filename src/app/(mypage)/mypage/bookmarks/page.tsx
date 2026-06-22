"use client";
import { CardItem } from "@/app/(main)/components/type";
import Title from "../../_components/Title";
import ActivitiesCard from "@/app/(main)/components/ActivitiesCard";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import api from "@/lib/api/axios";

const Page = () => {
  const [page, setPage] = useState(1);
  const [activities, setActivities] = useState<CardItem[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bookmarkedActivities");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    const getActivities = async () => {
      const res = await api.get("/activities", {
        params: {
          method: "offset",
        },
      });

      res.data.activities.map((item: CardItem) => {
        item.isBookmarked = bookmarkedIds.includes(item.id);
      });

      setActivities(res.data.activities);
    };

    getActivities();
  }, []);

  const handleToggleBookmark = (id: number) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((bookmarkId) => bookmarkId !== id)
        : [...prev, id];

      localStorage.setItem("bookmarkedActivities", JSON.stringify(next));

      return next;
    });
  };

  const bookmarkedActivities = activities.filter((item) =>
    bookmarkedIds.includes(item.id),
  );

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(bookmarkedActivities.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = bookmarkedActivities.slice(startIndex, endIndex);

  return (
    <div className="max-sm:px-5">
      <header className="flex flex-col">
        <Title
          title="관심 체험"
          description="내가 찜한 체험리스트를 볼 수 있습니다"
        />
      </header>

      {bookmarkedActivities.length === 0 ? (
        <p className="mt-10 text-center text-gray-400">
          북마크한 체험이 없습니다.
        </p>
      ) : (
        <div className="flex flex-wrap gap-4 md:gap-6">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              className="w-[calc((100%-16px)/2)] md:w-[calc((100%-72px)/3)]"
            >
              <ActivitiesCard
                {...item}
                onToggleBookmark={handleToggleBookmark}
              />
            </div>
          ))}
        </div>
      )}

      {bookmarkedActivities.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-7.5">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
