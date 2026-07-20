import DescriptionSectionProps from "./type";

const DescriptionSection = ({ description }: DescriptionSectionProps) => {
  return (
    <div className="flex flex-col gap-2 md:gap-3.5 lg:gap-2 pb-5 md:pb-10 border-b border-gray-100">
      <h2 className="text-16-bold md:text-18-bold text-gray-950">체험 상세</h2>
      <p className="text-16-medium font-normal text-gray-950 whitespace-pre-wrap break-keep">
        {description}
      </p>
    </div>
  );
};

export { DescriptionSection };
