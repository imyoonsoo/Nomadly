interface ProgressBarProps {
  currentStep: number;
  totalStep: number;
}

const ProgressBar = ({ currentStep, totalStep }: ProgressBarProps) => {
  const progress = ((currentStep + 1) / totalStep) * 100;

  return (
    <div className="mb-8">
      <div className="text-13-bold mb-2 flex justify-between text-gray-500">
        <span>
          {currentStep + 1} / {totalStep}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="bg-primary-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
