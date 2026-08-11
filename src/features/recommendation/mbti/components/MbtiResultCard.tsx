import { MbtiResult } from "@/features/recommendation/mbti/type";

interface MbtiResultCardProps {
  result: MbtiResult;
}

const MbtiResultCard = ({ result }: MbtiResultCardProps) => {
  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-md">
      <p className="text-14-bold text-primary-500">{result.mbti}</p>

      <h2 className="text-24-bold mt-2 text-gray-900">{result.title}</h2>

      <p className="text-16-medium mt-3 leading-7 text-gray-500">
        {result.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {result.categories.map((category) => (
          <span
            key={category}
            className="bg-primary-100 text-14-bold text-primary-500 rounded-full px-4 py-2"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MbtiResultCard;
