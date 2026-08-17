"use client";
import { CardItem } from "@/app/(main)/components/type";
import Title from "../../_components/Title";
import { ActivitiesCard } from "@/app/(main)/components/ActivitiesCard";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination/Pagination";
import api from "@/lib/api/axios";
import { useBookmarkedIds } from "@/features/activities/hooks/useBookmarkedIds";

const Page = () => {
  const [page, setPage] = useState(1);
  const [activities, setActivities] = useState<CardItem[]>([]);
  // 북마크 취소 시 목록에서 제거되도록
  const bookmarkedIds = useBookmarkedIds();

  useEffect(() => {
    const getActivities = async () => {
      const res = await api.get("/activities", {
        params: {
          method: "offset",
        },
      });

      setActivities(res.data.activities);
    };

    getActivities();
  }, []);

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
              <ActivitiesCard {...item} />
            </div>
          ))}
        </div>
      )}

      {bookmarkedActivities.length > 0 && totalPages > 1 && (
        <div className="mt-7.5 flex justify-center">
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
