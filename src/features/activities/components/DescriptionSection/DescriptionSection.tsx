import DescriptionSectionProps from "./type";

const DescriptionSection = ({ description }: DescriptionSectionProps) => {
  return (
    <div className="flex flex-col gap-2 border-b border-gray-100 pb-5 md:gap-3.5 md:pb-10 lg:gap-2">
      <h2 className="text-16-bold md:text-18-bold text-gray-950">체험 상세</h2>
      <p className="text-16-medium font-normal break-keep whitespace-pre-wrap text-gray-950">
        {description}
      </p>
    </div>
  );
};

export { DescriptionSection };
