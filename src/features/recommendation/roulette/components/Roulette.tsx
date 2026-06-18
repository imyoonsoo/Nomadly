"use client";

import { useState } from "react";
import { getRandomRouletteIndex, ROULETTE_ITEMS } from "../utils";
import { RouletteItem } from "../type";

const RouletteGame = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedItem, setSelectedItem] = useState<RouletteItem | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;

    const itemCount = ROULETTE_ITEMS.length;
    const anglePerItem = 360 / itemCount;
    const selectedIndex = getRandomRouletteIndex();

    const spinCount = 6;

    const currentRotation = rotation % 360;

    const targetAngle = selectedIndex * anglePerItem + anglePerItem / 2;

    const targetRotation = (360 - targetAngle) % 360;

    const diff = (targetRotation - currentRotation + 360) % 360;

    const nextRotation = rotation + spinCount * 360 + diff;

    setIsSpinning(true);
    setSelectedItem(null);
    setRotation(nextRotation);

    setTimeout(() => {
      setSelectedItem(ROULETTE_ITEMS[selectedIndex]);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <section className="flex w-full flex-col items-center">
      <div className="relative mt-6 flex h-[300px] w-[300px] items-center justify-center md:h-[400px] md:w-[400px]">
        <div className="absolute -top-2 z-20 h-0 w-0 border-x-[16px] border-t-[28px] border-x-transparent border-t-red-500" />

        <div
          className="relative h-full w-full rounded-full border-8 border-white bg-white shadow-xl transition-transform duration-[3000ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {ROULETTE_ITEMS.map((item, index) => {
            const anglePerItem = 360 / ROULETTE_ITEMS.length;
            const angle = index * anglePerItem + anglePerItem / 2;

            return (
              <div
                key={item.category}
                className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 text-18-bold text-gray-900"
                style={{
                  transform: `rotate(${angle}deg) translateY(-105px) rotate(-${angle}deg)`,
                }}
              >
                {index + 1}
              </div>
            );
          })}

          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-500 text-18-bold text-white shadow-md">
            GO
          </div>
        </div>
      </div>

      <div className="mt-6 grid w-full max-w-[420px] grid-cols-2 gap-2 md:grid-cols-3">
        {ROULETTE_ITEMS.map((item, index) => (
          <div
            key={item.category}
            className="rounded-xl bg-white px-3 py-2 text-center text-14-bold text-gray-700 shadow-sm"
          >
            {index + 1}. {item.emoji} {item.category}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSpin}
        disabled={isSpinning}
        className="mt-8 h-12 w-36 rounded-xl bg-yellow-400 text-16-bold text-gray-900 shadow-md transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSpinning ? "돌리는 중..." : "돌리기"}
      </button>

      {selectedItem && (
        <div className="mt-8 w-full max-w-[420px] rounded-3xl bg-white p-6 text-center shadow-md">
          <p className="text-40-bold">{selectedItem.emoji}</p>
          <h2 className="mt-2 text-24-bold text-gray-900">
            {selectedItem.category}
          </h2>
          <p className="mt-3 text-15-medium leading-6 text-gray-500">
            {selectedItem.description}
          </p>
        </div>
      )}
    </section>
  );
};

export default RouletteGame;
