import { ActivitiesProps } from "../type";
import Card from "./Card";

interface CardListProps {
  cards: ActivitiesProps[];
}

const CardList = ({ cards }: CardListProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default CardList;
