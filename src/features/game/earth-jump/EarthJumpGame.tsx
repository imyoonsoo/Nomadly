"use client";

import { useEffect, useRef, useState } from "react";
import { Obstacle } from "./type";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 550;

const GROUND_Y = 460;
const PLAYER_SIZE = 54;

const EarthJumpGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startRef = useRef<() => void>(() => {});
  const restartRef = useRef<() => void>(() => {});

  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const earthImage = new window.Image();
    earthImage.src = "/logo-symbol.svg";

    let animationId: number;
    let startTime = Date.now();
    let gameOver = false;

    const player = {
      x: 70,
      y: GROUND_Y - PLAYER_SIZE,
      size: PLAYER_SIZE,
      velocityY: 0,
      isJumping: false,
    };

    const createObstacleGroup = (): Obstacle[] => {
      const obstacleCount = Math.random() < 0.35 ? 2 : 1;

      return Array.from({ length: obstacleCount }, (_, index) => ({
        x: CANVAS_WIDTH + 80 + index * 44,
        y: GROUND_Y - 38,
        width: 28,
        height: 38,
      }));
    };

    let obstacles = createObstacleGroup();

    const drawReadyScreen = () => {
      ctx.fillStyle = "#1F2937";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("지구 점프 게임", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 60);

      ctx.font = "16px sans-serif";
      ctx.fillText(
        "장애물을 피해 점프하세요!",
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 2 - 28,
      );
    };

    const jump = () => {
      if (player.isJumping || gameOver) return;

      player.velocityY = -14;
      player.isJumping = true;
    };

    const resetObjects = () => {
      player.y = GROUND_Y - PLAYER_SIZE;
      player.velocityY = 0;
      player.isJumping = false;

      obstacles = createObstacleGroup();
    };

    const startGame = () => {
      gameOver = false;
      setIsStarted(true);
      setIsGameOver(false);
      setScore(0);

      startTime = Date.now();
      resetObjects();

      draw();
    };

    const restartGame = () => {
      gameOver = false;
      setIsGameOver(false);
      setScore(0);

      startTime = Date.now();
      resetObjects();

      draw();
    };

    startRef.current = startGame;
    restartRef.current = restartGame;

    const checkCollision = (obstacle: Obstacle) => {
      return (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.size > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.size > obstacle.y
      );
    };

    const drawPlayer = () => {
      if (earthImage.complete) {
        ctx.drawImage(earthImage, player.x, player.y, player.size, player.size);
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

      const currentScore = Math.floor((Date.now() - startTime) / 100);
      setScore(currentScore);

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = "#1F2937";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`점수: ${currentScore}`, 20, 32);

      ctx.strokeStyle = "#9CA3AF";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
      ctx.stroke();

      player.velocityY += 0.7;
      player.y += player.velocityY;

      if (player.y >= GROUND_Y - PLAYER_SIZE) {
        player.y = GROUND_Y - PLAYER_SIZE;
        player.velocityY = 0;
        player.isJumping = false;
      }

      const obstacleSpeed = 5 + currentScore * 0.005;

      obstacles = obstacles.map((obstacle) => ({
        ...obstacle,
        x: obstacle.x - obstacleSpeed,
      }));

      const lastObstacle = obstacles[obstacles.length - 1];

      if (lastObstacle.x + lastObstacle.width < 0) {
        obstacles = createObstacleGroup();
      }

      drawPlayer();

      ctx.fillStyle = "#FACC15";

      obstacles.forEach((obstacle) => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });

      const isCollided = obstacles.some((obstacle) => checkCollision(obstacle));

      if (isCollided) {
        gameOver = true;
        setIsGameOver(true);
        cancelAnimationFrame(animationId);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 32px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);

        return;
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "ArrowUp") {
        jump();
      }
    };

    const handleCanvasClick = () => {
      jump();
    };

    drawReadyScreen();

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("touchstart", handleCanvasClick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("click", handleCanvasClick);
      canvas.removeEventListener("touchstart", handleCanvasClick);
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <p className="text-18-bold text-gray-700">점수: {score}</p>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full max-w-80 rounded-2xl border border-gray-700 bg-gray-800 shadow-lg md:max-w-90 xl:max-w-100"
        />

        {!isStarted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => startRef.current()}
              className="text-16-bold mt-18 h-12 w-32 rounded-xl bg-yellow-400 text-gray-900 shadow-lg transition hover:scale-105"
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
              className="text-16-bold mt-18 h-12 w-32 rounded-xl bg-blue-500 text-white shadow-lg transition hover:scale-105"
            >
              다시하기
            </button>
          </div>
        )}
      </div>

      {isStarted && !isGameOver && (
        <p className="text-14-medium text-gray-500">
          PC: Space / ↑ · 모바일: 화면 터치
        </p>
      )}
    </div>
  );
};

export default EarthJumpGame;
