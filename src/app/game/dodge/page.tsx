"use client";

import { useState } from "react";
import DodgeGame from "@/features/game/dodge-game/DodgeGame";
import BgCloud from "@/assets/images/bg-cloude.png";
import Link from "next/link";
import { Back } from "@/constants/icons";

const GamePage = () => {
  const [score, setScore] = useState(0);

  return (
    <>
      <main
        className="bg-primary-100 relative flex min-h-screen flex-col items-center justify-center px-4 py-8"
        style={{
          backgroundImage: `url(${BgCloud.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-32 md:top-24 md:left-56">
          <Link
            href="/game"
            className="text-14-bold hover:bg-primary-100 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-700 transition"
          >
            <Back className="text-primary-500 h-5 w-5 md:h-6 md:w-6" />
            게임 목록
          </Link>
        </div>

        <h1 className="text-24-bold text-gray-900">총알 피하기</h1>

        <p className="text-18-bold mt-2 mb-4 text-gray-700">점수 : {score}</p>

        <DodgeGame onChangeScore={setScore} />
      </main>
    </>
  );
};

export default GamePage;
