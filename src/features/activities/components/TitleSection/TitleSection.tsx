"use client";

import { Map, More, StarOn } from "@/constants/icons";
import TitleSectionProps from "./type";
import Dropdown from "@/components/Dropdown/Dropdown";
import { useUserSession } from "@/hooks/useUserSession";

const TitleSection = ({
  id,
  userId,
  title,
  category,
  address,
  reviewCount,
  rating,
}: TitleSectionProps) => {
  const { data: session } = useUserSession();
  const isOwner = session?.userId === userId;

  const options = [
    {
      label: "수정하기",
      onSelect: () => {
        console.log("마이페이지로 이동");
      },
    },
    {
      label: "삭제하기",
      onSelect: () => {
        console.log("로그아웃 실행");
      },
    },
  ];

  return (
    <div className="flex justify-between pb-5 md:pb-6 lg:pb-7.5 border-b lg:border-0 border-gray-100">
      <div className="flex flex-col gap-1 md:gap-2.5 lg:gap-2">
        <span className="text-13-medium md:text-14-medium text-gray-700 md:text-gray-950">
          {category}
        </span>
        <div className="flex flex-col gap-4">
          <h1 className="text-18-bold text-gray-950">{title}</h1>
          <div className="flex flex-col items-start gap-2.5">
            <div className="flex items-center gap-1">
              <StarOn className="w-4 h-4" />
              <span className="text-14-medium text-gray-700">
                {rating} ({reviewCount})
              </span>
            </div>
            <div className="flex items-center gap-0.5">
              <Map className="w-4 h-4" />
              <span className="text-14-medium text-gray-700">{address}</span>
            </div>
          </div>
        </div>
      </div>
      {isOwner && (
        <Dropdown options={options}>
          {({ toggle }) => (
            <More className="w-7 h-7 cursor-pointer" onClick={toggle} />
          )}
        </Dropdown>
      )}
    </div>
  );
};
export default TitleSection;
