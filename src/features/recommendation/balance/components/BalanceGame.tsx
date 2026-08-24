"use client";

import { useState } from "react";
import { BALANCE_QUESTIONS } from "../questions";
import { BalanceCategory, BalanceOption } from "../type";
import { getBalanceResult } from "../utils";
import BalanceQuestion from "./BalanceQuestion";
import BalanceResult from "./BalanceResult";

const BalanceGame = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<
    BalanceCategory[]
  >([]);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = BALANCE_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / BALANCE_QUESTIONS.length) * 100;

  const handleSelect = (option: BalanceOption) => {
    const nextSelectedCategories = [...selectedCategories, option.category];

    setSelectedCategories(nextSelectedCategories);

    if (currentStep === BALANCE_QUESTIONS.length - 1) {
      setShowResult(true);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedCategories([]);
    setShowResult(false);
  };

  if (showResult) {
    const results = getBalanceResult(selectedCategories);

    return <BalanceResult results={results} onRestart={handleRestart} />;
  }

  return (
    <section className="w-full max-w-195">
      <div className="mb-8 text-center md:mt-20">
        <h2 className="text-24-bold text-gray-900">여행지 밸런스 게임</h2>
        <p className="text-16-medium mt-2 text-gray-500">
          더 끌리는 체험을 선택해보세요.
        </p>
      </div>

      <div className="mb-6">
        <div className="text-13-bold mb-2 flex justify-between text-gray-500">
          <span>
            {currentStep + 1} / {BALANCE_QUESTIONS.length}
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

      <BalanceQuestion
        left={currentQuestion.left}
        right={currentQuestion.right}
        onSelect={handleSelect}
      />
    </section>
  );
};

export default BalanceGame;
