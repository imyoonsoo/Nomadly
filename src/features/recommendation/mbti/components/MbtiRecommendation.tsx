"use client";

import { useState } from "react";
import {
  getMbtiResult,
  isValidMbti,
  normalizeMbti,
} from "@/features/recommendation/mbti/utils";
import MbtiResultCard from "./MbtiResultCard";

const MbtiRecommendation = () => {
  const [mbtiInput, setMbtiInput] = useState("");
  const [submittedMbti, setSubmittedMbti] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const result = submittedMbti ? getMbtiResult(submittedMbti) : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedMbti = normalizeMbti(mbtiInput);

    if (!isValidMbti(normalizedMbti)) {
      setSubmittedMbti("");
      setErrorMessage("올바른 MBTI를 입력해주세요. 예: ENFP, istj");
      return;
    }

    setErrorMessage("");
    setSubmittedMbti(normalizedMbti);
  };

  const handleReset = () => {
    setMbtiInput("");
    setSubmittedMbti("");
    setErrorMessage("");
  };

  return (
    <section className="mx-auto w-full max-w-[700px]">
      <h1 className="text-center text-24-bold text-gray-900 md:text-32-bold">
        MBTI 체험 추천
      </h1>

      <p className="mt-3 text-center text-14-medium md:text-16-medium text-gray-500">
        MBTI를 입력하면 어울리는 체험 카테고리를 추천해드릴게요.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl bg-white p-6 shadow-md"
      >
        <label htmlFor="mbti" className="text-16-bold text-gray-900">
          MBTI 입력
        </label>

        <div className="mt-3 flex flex-col gap-3 md:flex-row">
          <input
            id="mbti"
            value={mbtiInput}
            onChange={(e) => setMbtiInput(e.target.value)}
            placeholder="예: ENFP"
            maxLength={4}
            className="h-12 flex-1 rounded-xl border border-gray-200 px-4 text-16-bold md:text-18-bold uppercase outline-none focus:border-primary-500"
          />

          <button
            type="submit"
            className="h-12 rounded-xl bg-primary-500 px-6 text-16-bold text-white transition hover:bg-primary-600"
          >
            추천받기
          </button>
        </div>

        {errorMessage && (
          <p className="mt-3 text-14-medium text-red-500">{errorMessage}</p>
        )}
      </form>

      {result && (
        <>
          <MbtiResultCard result={result} />

          <button
            type="button"
            onClick={handleReset}
            className="mt-5 h-12 w-full rounded-xl border border-gray-200 bg-white text-16-bold text-gray-700 transition hover:bg-gray-50"
          >
            다시 입력하기
          </button>
        </>
      )}
    </section>
  );
};

export default MbtiRecommendation;
