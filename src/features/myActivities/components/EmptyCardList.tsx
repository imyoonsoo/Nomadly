import EmptyImage from "@/assets/images/empty.svg";

interface EmptyCardListProps {
  message?: string;
  image?: React.ReactNode;
}

const EmptyCardList = ({
  message = "아직 등록한 체험이 없어요",
  image = <EmptyImage className="w-45.5 h-45.5" />,
}: EmptyCardListProps) => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      {image}
      <p className="text-18-medium text-gray-600 text-center">{message}</p>
    </div>
  );
};

export default EmptyCardList;
