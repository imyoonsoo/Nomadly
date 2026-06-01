import ReservedCard from "./components/ReservedCard";
import ReservedCardList from "./components/ReservedCardList";

const ReservationsPage = () => {
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
    </div>
  );
};

export default ReservationsPage;
