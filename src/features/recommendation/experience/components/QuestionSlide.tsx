import { Question } from "@/features/recommendation/experience/type";

interface QuestionSlideProps {
  question: Question;
  questionIndex: number;
  selectedAnswer: number;
  onSelectAnswer: (questionIndex: number, optionIndex: number) => void;
}

const QuestionSlide = ({
  question,
  questionIndex,
  selectedAnswer,
  onSelectAnswer,
}: QuestionSlideProps) => {
  return (
    <div className="w-full shrink-0">
      <div className="rounded-3xl bg-white p-6 shadow-md md:p-8">
        <h2 className="text-20-bold md:text-24-bold mb-6 text-gray-900">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, optionIndex) => {
            const isSelected = selectedAnswer === optionIndex;

            return (
              <button
                key={option.label}
                type="button"
                onClick={() => onSelectAnswer(questionIndex, optionIndex)}
                className={`text-16-bold w-full rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? "border-primary-500 bg-primary-100 text-primary-500"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionSlide;
