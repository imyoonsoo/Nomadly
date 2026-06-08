import EmptyImage from "@/assets/images/empty.svg";

const EmptyCardList = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <EmptyImage width={182} height={182} />
      <p className="text-18-medium text-gray-600 text-center">
        아직 등록한 체험이 없어요
      </p>
    </div>
  );
};

export default EmptyCardList;
