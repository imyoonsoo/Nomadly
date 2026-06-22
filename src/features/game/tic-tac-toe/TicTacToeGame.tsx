"use client";

import { useState } from "react";
import { Cell, Player } from "./type";

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const calculateWinnerInfo = (
  board: Cell[],
): {
  winner: Cell;
  winningLine: number[];
} => {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningLine: [a, b, c],
      };
    }
  }

  return {
    winner: null,
    winningLine: [],
  };
};

const TicTacToeGame = () => {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  const { winner, winningLine } = calculateWinnerInfo(board);
  const isDraw = !winner && board.every(Boolean);

  const handleCellClick = (idx: number) => {
    if (board[idx] || winner) {
      return;
    }

    const nextBoard = [...board];
    nextBoard[idx] = currentPlayer;

    setBoard(nextBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  };

  let statusText = `${currentPlayer} 차례`;
  let statusColor = currentPlayer === "X" ? "text-red-500" : "text-blue-500";

  if (winner) {
    statusText = `${winner} 승리!`;
    statusColor = winner === "X" ? "text-red-500" : "text-blue-500";
  }

  if (isDraw) {
    statusText = "무승부!";
    statusColor = "text-gray-900";
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p
        className={`rounded-3xl border border-primary-500 bg-white px-6 py-1 md:px-8 shadow-md text-20-bold md:text-24-bold ${statusColor}`}
      >
        {statusText}
      </p>

      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, idx) => {
          const isWinningCell = winningLine.includes(idx);

          let cellStyle = "bg-white text-gray-900 hover:bg-gray-100";

          if (cell === "X") {
            cellStyle = "bg-red-500 text-white";
          }

          if (cell === "O") {
            cellStyle = "bg-blue-500 text-white";
          }

          if (isWinningCell) {
            cellStyle +=
              " ring-5 ring-sky-300 scale-100 -translate-y-1 shadow-[0_12px_30px_rgba(56,189,248,0.45)]";
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleCellClick(idx)}
              className={`flex h-24 w-24 items-center justify-center rounded-2xl text-32-bold shadow-md transition-all duration-300 md:h-28 md:w-28 ${cellStyle}`}
            >
              {cell}
            </button>
          );
        })}
      </div>

      {(winner || isDraw) && (
        <button
          type="button"
          onClick={handleReset}
          className="h-12 w-32 rounded-xl bg-primary-500 text-16-bold text-white"
        >
          다시하기
        </button>
      )}
    </div>
  );
};

export default TicTacToeGame;
