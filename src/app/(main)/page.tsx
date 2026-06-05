"use client";

import SearchBox from "./components/SearchBox";
import MainBanner from "./components/MainBanner";
import CardList from "./components/BestList";
import {
  Cloude,
  MainBannertest,
  MockImage1,
  MockImage2,
  MockImage3,
} from "@/constants/images";
import { useState } from "react";
import ActivitiesList from "./components/ActivitiesList";

export const MockData = [
  {
    id: 1,
    title: "영남알프스 온천마을호텔 등산 여행(알레버스)",
    category: "투어",
    price: 350,
    imageUrl: MockImage1,
    link: "/",
    reviewCount: 1234,
  },
  {
    id: 2,
    title: "안개소녀 마법의 기차마을",
    category: "투어",
    price: 15000,
    imageUrl: MockImage2,
    link: "/activities",
    reviewCount: 21,
  },
  {
    id: 3,
    title: "별의기억1.5 : 시간이탈자",
    category: "식음료",
    price: 3000,
    imageUrl: MockImage3,
    link: "/activities",
    reviewCount: 1,
  },
  {
    id: 4,
    title: "우리 가족 토닥토닥 명상여행_2박3일",
    category: "관광",
    price: 115000,
    imageUrl: MainBannertest,
    link: "/activities",
    reviewCount: 177,
  },
  {
    id: 5,
    title: "ESG 농업친화 생태여행",
    category: "문화예술",
    price: 15000,
    imageUrl: MockImage1,
    link: "/activities",
    reviewCount: 1899,
  },
];

const Home = () => {
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = () => {
    setKeyword(search);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  const getFilter = () => {
    if (keyword.trim() === "") {
      return MockData;
    }
    return MockData.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase()),
    );
  };
  const getFiltered = getFilter();

  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${Cloude.src}), linear-gradient(to top, transparent 70%, #BBDDFF)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 100px, center top",
        backgroundSize: "auto",
      }}
    >
      {/* 메인배너 */}
      <div className="mx-auto max-w-[1200px] px-6 pt-[122px] md:px-10 md:pt-[183px]">
        <MainBanner items={MockData} />
      </div>
      {/* 체험검색 */}
      <div className="mx-auto my-4 max-w-[1120px] px-5 py-4 md:my-12 md:px-10 md:py-8">
        <p className="mb-3 text-center text-16-bold md:mb-9 md:text-32-bold">
          무엇을 체험하고 싶으신가요?
        </p>
        <SearchBox
          onKeyDown={onKeyDown}
          onChange={onChange}
          onSearch={onSearch}
        />
      </div>
      {/* 인기체험 */}
      <>
        {keyword === "" && (
          <div className="px-6 md:px-10 max-w-[1200px] mx-auto">
            <h2 className="mb-3.5 text-18-bold md:mb-5 md:text-32-bold">
              🔥 인기 체험
            </h2>
            <div className="flex">
              <CardList items={MockData} />
            </div>
          </div>
        )}
      </>
      {/* 모든체험 */}
      <div className="px-6 md:px-10 mt-10 max-w-[1200px] mx-auto">
        {keyword == "" ? (
          <h2 className="text-18-bold md:text-32-bold mb-3.5 md:mb-5">
            🎠 모든 체험
          </h2>
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
        <div className="flex mb-[218px]">
          <ActivitiesList items={getFiltered} keyword={keyword} />
        </div>
      </div>
    </div>
  );
};

export default Home;
