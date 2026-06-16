"use client";

import { useState } from "react";
import DodgeGame from "@/features/dodge-game/components/DodgeGame";
import BgCloud from "@/assets/images/bg-cloude.png";
import Link from "next/link";
import { Back } from "@/constants/icons";

const GamePage = () => {
  const [score, setScore] = useState(0);

  return (
    <>
      <main
        className="relative flex min-h-screen flex-col items-center justify-center bg-primary-100 px-4 py-8"
        style={{
          backgroundImage: `url(${BgCloud.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute md:top-24 md:left-56 top-32">
          <Link
            href="/game"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              py-2
              text-14-bold
              text-gray-700
              transition
              hover:bg-primary-100
            "
          >
            <Back className="w-5 h-5 md:w-6 md:h-6 text-primary-500" />
            게임 목록
          </Link>
        </div>

        <h1 className="text-24-bold text-gray-900">총알 피하기</h1>

        <p className="mb-4 mt-2 text-18-bold text-gray-700">점수 : {score}</p>

        <DodgeGame onChangeScore={setScore} />
      </main>
    </>
  );
};

export default GamePage;
