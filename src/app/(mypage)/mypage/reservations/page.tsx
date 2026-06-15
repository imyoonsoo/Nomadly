import Title from "../../_components/Title";
import ReservedCardList from "../../../../features/reservations/components/ReservedCardList";

const ReservationsPage = () => {
  return (
    <div className="max-sm:px-[20px]">
      <header className="flex flex-col">
        <Title
          title="예약 내역"
          description="예약내역 변경 및 취소할 수 있습니다."
        />
      </header>
      <ReservedCardList />
    </div>
  );
};

export default ReservationsPage;
