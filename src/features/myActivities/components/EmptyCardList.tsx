import EmptyImage from "@/assets/images/empty.svg";

interface EmptyCardListProps {
  message?: string;
}

const EmptyCardList = ({
  message = "아직 등록한 체험이 없어요",
}: EmptyCardListProps) => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <EmptyImage width={182} height={182} />
      <p className="text-18-medium text-gray-600 text-center">{message}</p>
    </div>
  );
};

export default EmptyCardList;
