import { MbtiResult } from "@/features/recommendation/mbti/type";

interface MbtiResultCardProps {
  result: MbtiResult;
}

const MbtiResultCard = ({ result }: MbtiResultCardProps) => {
  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-md">
      <p className="text-14-bold text-primary-500">{result.mbti}</p>

      <h2 className="mt-2 text-24-bold text-gray-900">{result.title}</h2>

      <p className="mt-3 text-16-medium leading-7 text-gray-500">
        {result.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {result.categories.map((category) => (
          <span
            key={category}
            className="rounded-full bg-primary-100 px-4 py-2 text-14-bold text-primary-500"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MbtiResultCard;
