import { BalanceOption } from "../type";

interface BalanceQuestionProps {
  left: BalanceOption;
  right: BalanceOption;
  onSelect: (option: BalanceOption) => void;
}

const BalanceQuestion = ({ left, right, onSelect }: BalanceQuestionProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
      <button
        type="button"
        onClick={() => onSelect(left)}
        className="flex min-h-[180px] flex-col items-center justify-center rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
      >
        <span className="text-48-bold">{left.emoji}</span>
        <span className="text-18-bold mt-4 text-gray-900">{left.label}</span>
        <span className="bg-primary-100 text-13-bold text-primary-500 mt-2 rounded-full px-4 py-2">
          {left.category}
        </span>
      </button>

      <div className="text-24-bold flex items-center justify-center text-gray-400">
        VS
      </div>

      <button
        type="button"
        onClick={() => onSelect(right)}
        className="flex min-h-[180px] flex-col items-center justify-center rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
      >
        <span className="text-48-bold">{right.emoji}</span>
        <span className="text-18-bold mt-4 text-gray-900">{right.label}</span>
        <span className="bg-primary-100 text-13-bold text-primary-500 mt-2 rounded-full px-4 py-2">
          {right.category}
        </span>
      </button>
    </div>
  );
};

export default BalanceQuestion;
