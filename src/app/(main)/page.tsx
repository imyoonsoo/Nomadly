"use client";
import Image from "next/image";
import SearchBox from "./components/SearchBox";
import MainBanner from "./components/MainBanner";
import BestList from "./components/BestList";
import ActivitiesList from "./components/ActivitiesList";
import { Cloud } from "@/constants/images";
import { useEffect, useState } from "react";
import { CardItem } from "./components/type";
import api from "@/lib/api/axios";

const Home = () => {
  const [activities, setActivities] = useState<CardItem[]>([]);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

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

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setKeyword(search);
  };
  const handleSearchInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const getFilter = () => {
    if (keyword.trim() === "") {
      return activities;
    }
    return activities.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase()),
    );
  };
  const getFiltered = getFilter();

  return (
    <div
      className="cloud-bg bg-cover bg-center"
      style={{
        backgroundImage: `url(${Cloud.src}), linear-gradient(to top, transparent 70%, #BBDDFF)`,
        backgroundRepeat: "repeat-x, no-repeat",
        backgroundPosition: "0 100px, center top",
        backgroundSize: "auto, cover",
      }}
    >
      {/* 메인배너 */}
      <div className="mx-auto max-w-[1200px] px-6 pt-[122px] md:px-10 md:pt-[183px]">
        <MainBanner items={activities} />
      </div>
      {/* 체험검색 */}
      <div className="mx-auto my-4 my-10 max-w-[1120px] px-5 py-4 md:my-12 md:px-10 md:py-8">
        <p className="text-16-bold md:text-32-bold mb-3 text-center md:mb-9">
          무엇을 체험하고 싶으신가요?
        </p>
        <SearchBox
          onKeyDown={handleSearchInputKeyDown}
          onChange={handleSearchInputChange}
          onSearch={handleSearch}
        />
      </div>
      {/* 인기체험 */}
      <>
        {keyword === "" && (
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <h2 className="text-18-bold md:text-32-bold mb-3.5 md:mb-5">
              🔥 인기 체험
            </h2>
            <div className="flex">
              <BestList items={activities} />
            </div>
          </div>
        )}
      </>
      {/* 모든체험 */}
      <div className="mx-auto mt-10 max-w-[1200px] px-6 md:px-10">
        {keyword === "" ? (
          <h2 className="text-18-bold md:text-32-bold mb-5">🎈 모든 체험</h2>
        ) : getFiltered.length === 0 ? (
          <div className="flex flex-col items-center pt-20 pb-50">
            <Image
              src="/notFound/404-earth.svg"
              alt="404 지구 일러스트"
              width={150}
              height={150}
            />
            <p className="text-center text-gray-400">검색결과가 없습니다</p>
          </div>
        ) : (
          <div className="mb-9.5">
            <p className="text-18-medium md:text-24-medium">
              <b className="font-bold">{keyword}</b>으로 검색한 결과입니다.
            </p>
            <p className="text-14-medium md:text-18-medium mt-2 text-gray-700">
              {getFiltered.length} 개의 검색결과
            </p>
          </div>
        )}

        <div className="mb-[218px] flex">
          <ActivitiesList items={getFiltered} keyword={keyword} />
        </div>
      </div>
    </div>
  );
};

export default Home;
