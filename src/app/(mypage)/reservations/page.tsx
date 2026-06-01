"use client";
import { useState } from "react";
import ReservedCard from "./components/ReservedCard";
import ReservedCardList from "./components/ReservedCardList";
import ReviewSubmitModal from "./components/ReviewSubmitModal";

const ReservationsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="max-sm:px-[20px]">
      <header className="flex flex-col gap-">
        <div>
          <h1 className="text-18-bold text-gray-950 mb-[10px]">예약 내역</h1>
          <p className="text-14-medium text-gray-500">
            예약내역 변경 및 취소할 수 있습니다.
          </p>
        </div>
      </header>
      {/* Todo: 필터 버튼 추가 */}
      <ReservedCardList />
      <button onClick={handleClick}>모달 열기</button>
      <ReviewSubmitModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default ReservationsPage;
