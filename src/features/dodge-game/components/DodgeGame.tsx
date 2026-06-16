"use client";

import { useEffect, useRef, useState } from "react";
import { DodgeGameProps } from "@/features/dodge-game/utils/game";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 550;

const DodgeGame = ({ onChangeScore }: DodgeGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const moveDirectionRef = useRef<"left" | "right" | null>(null);
  const restartRef = useRef<() => void>(() => {});
  const startRef = useRef<() => void>(() => {});

  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const playerImage = new window.Image();
    playerImage.src = "/logo-symbol.svg";

    let animationId: number;
    let startTime = Date.now();
    let gameOver = false;

    const player = {
      x: CANVAS_WIDTH / 2 - 28,
      y: CANVAS_HEIGHT - 80,
      size: 56,
      speed: 6,
    };

    const createBullets = () =>
      Array.from({ length: 10 }, () => ({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * -700,
        size: 8,
        speed: 2.4 + Math.random() * 3.4,
      }));

    let bullets = createBullets();

    const drawReadyScreen = () => {
      ctx.fillStyle = "#1F2937";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "준비되면 시작하세요!",
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 2 - 50,
      );
    };

    const startGame = () => {
      gameOver = false;
      setIsGameOver(false);
      setIsStarted(true);
      onChangeScore(0);

      startTime = Date.now();
      player.x = CANVAS_WIDTH / 2 - player.size / 2;
      bullets = createBullets();

      draw();
    };

    const resetGame = () => {
      gameOver = false;
      setIsGameOver(false);
      onChangeScore(0);

      startTime = Date.now();
      player.x = CANVAS_WIDTH / 2 - player.size / 2;
      bullets = createBullets();

      draw();
    };

    restartRef.current = resetGame;
    startRef.current = startGame;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") moveDirectionRef.current = "left";
      if (e.key === "ArrowRight") moveDirectionRef.current = "right";
    };

    const handleKeyUp = () => {
      moveDirectionRef.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const scaleX = CANVAS_WIDTH / rect.width;

      player.x = touchX * scaleX - player.size / 2;
      player.x = Math.max(0, Math.min(CANVAS_WIDTH - player.size, player.x));
    };

    const checkCollision = (bullet: (typeof bullets)[number]) => {
      return (
        player.x < bullet.x + bullet.size &&
        player.x + player.size > bullet.x &&
        player.y < bullet.y + bullet.size &&
        player.y + player.size > bullet.y
      );
    };

    const drawPlayer = () => {
      if (playerImage.complete) {
        ctx.drawImage(
          playerImage,
          player.x,
          player.y,
          player.size,
          player.size,
        );
        return;
      }

      ctx.fillStyle = "#1790A0";
      ctx.beginPath();
      ctx.arc(
        player.x + player.size / 2,
        player.y + player.size / 2,
        player.size / 2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    };

    const draw = () => {
      if (gameOver) return;

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      const currentScore = Math.floor((Date.now() - startTime) / 100);
      onChangeScore(currentScore);

      if (moveDirectionRef.current === "left") player.x -= player.speed;
      if (moveDirectionRef.current === "right") player.x += player.speed;

      player.x = Math.max(0, Math.min(CANVAS_WIDTH - player.size, player.x));

      ctx.fillStyle = "#1F2937";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      drawPlayer();

      ctx.fillStyle = "#FACC15";

      for (const bullet of bullets) {
        bullet.y += bullet.speed + currentScore * 0.003;

        if (bullet.y > CANVAS_HEIGHT) {
          bullet.y = -bullet.size;
          bullet.x = Math.random() * (CANVAS_WIDTH - bullet.size);
          bullet.speed = 2.4 + Math.random() * 3.4;
        }

        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2);
        ctx.fill();

        if (checkCollision(bullet)) {
          gameOver = true;
          setIsGameOver(true);
          cancelAnimationFrame(animationId);

          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 32px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("Game Over", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);

          return;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    drawReadyScreen();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [onChangeScore]);

  const handleMoveStart = (direction: "left" | "right") => {
    moveDirectionRef.current = direction;
  };

  const handleMoveEnd = () => {
    moveDirectionRef.current = null;
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="
            w-full
            max-w-[320px]
            rounded-2xl
            border
            border-gray-700
            bg-gray-800
            shadow-lg
            md:max-w-[360px]
            xl:max-w-[400px]
          "
        />

        {!isStarted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => startRef.current()}
              className="h-12 w-32 rounded-xl bg-yellow-400 text-16-bold text-gray-900 shadow-lg transition hover:scale-105"
            >
              시작하기
            </button>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => restartRef.current()}
              className="mt-18 h-12 w-32 rounded-xl bg-blue-500 text-16-bold text-white shadow-lg transition hover:scale-105"
            >
              다시하기
            </button>
          </div>
        )}
      </div>

      {isStarted && !isGameOver && (
        <div className="flex gap-4 md:hidden">
          <button
            type="button"
            onTouchStart={() => handleMoveStart("left")}
            onTouchEnd={handleMoveEnd}
            onMouseDown={() => handleMoveStart("left")}
            onMouseUp={handleMoveEnd}
            onMouseLeave={handleMoveEnd}
            className="h-14 w-24 rounded-xl bg-gray-200 text-20-bold text-gray-800"
          >
            ◀
          </button>

          <button
            type="button"
            onTouchStart={() => handleMoveStart("right")}
            onTouchEnd={handleMoveEnd}
            onMouseDown={() => handleMoveStart("right")}
            onMouseUp={handleMoveEnd}
            onMouseLeave={handleMoveEnd}
            className="h-14 w-24 rounded-xl bg-gray-200 text-20-bold text-gray-800"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default DodgeGame;
