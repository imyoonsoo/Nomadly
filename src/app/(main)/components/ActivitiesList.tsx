"use client";
import FilterButton from "@/components/FilterButton/FilterButton";
import ActivitiesCard from "./ActivitiesCard";
import { CardItem } from "./type";
import { AltDown } from "@/constants/icons";
import { useEffect, useState, useRef } from "react";
import Pagination from "@/components/Pagination/Pagination";

type CardListProps = {
  items: CardItem[];
  keyword: string;
};

const CATEGORIES = [
  {
    id: 1,
    name: "전체",
  },
  {
    id: 2,
    name: "문화예술",
    icon: "🎨",
  },
  {
    id: 3,
    name: "식음료",
    icon: "🍰",
  },
  {
    id: 4,
    name: "투어",
    icon: "🚩",
  },
  {
    id: 5,
    name: "관광",
    icon: "🚆",
  },
  {
    id: 6,
    name: "웰빙",
    icon: "🍀",
  },
];

const ActivitiesList = ({ items, keyword }: CardListProps) => {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedText, setSelectedText] = useState("가격순");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const OPTIONS = ["가격순", "인기순"];

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const handleSelect = (option: string) => {
    setSelectedText(option);
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(target)
      ) {
        setIsOpen2(false);
      }

      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedText("가격순");
    setSelectedCategory("전체");
  }, [keyword]);

  // 체험리스트 필터링

  const selectedCategoryItem = CATEGORIES.find(
    (item) => item.name === selectedCategory,
  );
  const filteredItems =
    selectedCategory === "전체"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (selectedText === "가격순") {
      return a.price - b.price;
    }

    if (selectedText === "인기순") {
      return b.reviewCount - a.reviewCount;
    }

    return 0;
  });
  return (
    <div className="relative w-full">
      {keyword == "" && (
        <div className="flex justify-between mb-[25px] items-end">
          <div>
            <div
              ref={categoryDropdownRef}
              className="relative block md:hidden w-[150px]"
            >
              <button
                type="button"
                className="py-2.5 px-5 flex items-center border border-gray-200 rounded-full bg-white gap-2"
                onClick={() => setIsOpen2((prev) => !prev)}
              >
                {selectedCategoryItem?.icon}
                {selectedCategory}
                <span>
                  <AltDown
                    className={`${isOpen2 ? "rotate-180" : ""} transition`}
                  />
                </span>
              </button>

              {isOpen2 && (
                <div className="absolute right-0 top-[50px] bg-white rounded-[15px] p-3 flex flex-col gap-3 text-center w-full z-1 shadow-[0_4px_16px_rgb(187_187_187_/_50%)]">
                  {CATEGORIES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(item.name);
                        setIsOpen2(false);
                        setPage(1);
                      }}
                      className="flex gap-2 items-center"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden gap-1 md:flex">
              {CATEGORIES.map((item) => (
                <FilterButton
                  key={item.id}
                  onClick={() => {
                    setSelectedCategory(item.name);
                    setPage(1);
                  }}
                  className={`
                    flex gap-4
                    ${
                      selectedCategory === item.name
                        ? "!bg-primary-500 border-primary-500 !text-white "
                        : ""
                    }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </FilterButton>
              ))}
            </div>
          </div>

          {/* 가격순 인기순 정렬 */}
          <div ref={sortDropdownRef} className="relative">
            <button
              type="button"
              className="h-[36px] px-3 flex items-center"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {selectedText}
              <span>
                <AltDown
                  className={`${isOpen ? "rotate-180" : ""} transition`}
                />
              </span>
            </button>

            {isOpen && (
              <ul className="absolute right-0 top-[40px] bg-white rounded-[15px] p-3 flex flex-col gap-3 text-center w-full  z-1 shadow-[0_4px_16px_rgb(187_187_187_/_50%)]">
                {OPTIONS.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => {
                        handleSelect(option);
                      }}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-4 md:gap-6">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="w-[calc((100%-16px)/2)] md:w-[calc((100%-72px)/4)]"
          >
            <ActivitiesCard {...item} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-[30px]">
        <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default ActivitiesList;
