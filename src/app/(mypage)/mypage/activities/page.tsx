import CardList from "./_components/CardList";
import EmptyCardList from "./_components/EmptyCardList";

// Todo: api 연동 시 type 분리
export type CardProps = {
  id: number;
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
};

// Todo: api 연동 후 제거
const MOCK_CARDS: CardProps[] = [
  {
    id: 1,
    title: "함께 배우면 즐거운 스트릿 댄스",
    price: 10000,
    rating: 4.9,
    reviewCount: 293,
    bannerImageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 2,
    title: "초보자를 위한 뚝딱뚝딱 브레이킹 댄스",
    price: 25000,
    rating: 4.5,
    reviewCount: 12,
    bannerImageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 3,
    title: "초보자를 위한 뚝딱뚝딱 브레이킹 댄스",
    price: 25000,
    rating: 4.8,
    reviewCount: 12,
    bannerImageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
];

const Activities = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-start gap-3.5 mb-7.5 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col justify-center items-start gap-2.5">
          <h1 className="text-18-bold text-gray-950">내 체험 관리</h1>
          <p className="text-14-medium text-gray-500">
            체험을 등록하거나 수정 및 삭제가 가능합니다.
          </p>
        </div>
        {/* Todo: button 공통 컴포넌트로 변경 */}
        <button>체험 등록하기</button>
      </div>

      {MOCK_CARDS.length === 0 ? (
        <EmptyCardList />
      ) : (
        <CardList cards={MOCK_CARDS} />
      )}
    </div>
  );
};

export default Activities;
