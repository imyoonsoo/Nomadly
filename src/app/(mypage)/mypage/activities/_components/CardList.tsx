import Card from "./Card";

// Todo: api 연동 시 type 생성 후 제거
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

const CardList = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {MOCK_CARDS.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default CardList;
