"use client";

import { useState } from "react";
import { QUESTIONS } from "@/features/recommendation/experience/constants/questions";
import { getRecommendationResult } from "@/features/recommendation/experience/utils";
import ProgressBar from "@/features/recommendation/experience/components/ProgressBar";
import QuestionSlide from "@/features/recommendation/experience/components/QuestionSlide";
import ResultCard from "@/features/recommendation/experience/components/ResultCard";

const RecommendationTest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    Array(QUESTIONS.length).fill(-1),
  );
  const [showResult, setShowResult] = useState(false);

  const isLastStep = currentStep === QUESTIONS.length - 1;
  const isSelectedCurrentAnswer = selectedAnswers[currentStep] !== -1;

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    const nextAnswers = [...selectedAnswers];
    nextAnswers[questionIndex] = optionIndex;

    setSelectedAnswers(nextAnswers);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (!isSelectedCurrentAnswer) return;

    setCurrentStep((prev) => Math.min(prev + 1, QUESTIONS.length - 1));
  };

  const handleShowResult = () => {
    if (!isSelectedCurrentAnswer) return;

    setShowResult(true);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers(Array(QUESTIONS.length).fill(-1));
    setShowResult(false);
  };

  if (showResult) {
    const results = getRecommendationResult(selectedAnswers);

    return (
      <section className="mx-auto w-full max-w-[700px]">
        <h1 className="text-28-bold md:text-32-bold text-center text-gray-900">
          🎉 추천 결과
        </h1>

        <p className="text-16-medium mt-3 text-center text-gray-500">
          선택한 답변을 바탕으로 어울리는 카테고리를 추천해드릴게요.
        </p>

        <div className="mt-8 space-y-4">
          {results.map((result, index) => (
            <ResultCard key={result.category} result={result} rank={index} />
          ))}
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="bg-primary-500 text-16-bold hover:bg-primary-600 mt-8 h-12 w-full rounded-xl text-white transition"
        >
          다시 테스트하기
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[700px]">
      <h1 className="text-28-bold md:text-32-bold text-center text-gray-900">
        체험 추천 테스트
      </h1>

      <p className="text-16-medium mt-3 text-center text-gray-500">
        몇 가지 질문에 답하면 어울리는 체험 카테고리를 추천해드릴게요.
      </p>

      <div className="mt-8">
        <ProgressBar currentStep={currentStep} totalStep={QUESTIONS.length} />
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentStep * 100}%)`,
          }}
        >
          {QUESTIONS.map((question, questionIndex) => (
            <QuestionSlide
              key={question.question}
              question={question}
              questionIndex={questionIndex}
              selectedAnswer={selectedAnswers[questionIndex]}
              onSelectAnswer={handleSelectAnswer}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between gap-3">
        <button
          type="button"
          disabled={currentStep === 0}
          onClick={handlePrev}
          className="text-16-bold h-12 w-28 rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          이전
        </button>

        {isLastStep ? (
          <button
            type="button"
            disabled={!isSelectedCurrentAnswer}
            onClick={handleShowResult}
            className="bg-primary-500 text-16-bold hover:bg-primary-600 h-12 w-32 rounded-xl text-white transition disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            결과보기
          </button>
        ) : (
          <button
            type="button"
            disabled={!isSelectedCurrentAnswer}
            onClick={handleNext}
            className="bg-primary-500 text-16-bold hover:bg-primary-600 h-12 w-28 rounded-xl text-white transition disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            다음
          </button>
        )}
      </div>
    </section>
  );
};

export default RecommendationTest;
