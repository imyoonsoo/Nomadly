import { Back } from "@/constants/icons";
import TicTacToeGame from "@/features/game/tic-tac-toe/TicTacToeGame";
import Link from "next/link";

const TicTacToePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="absolute top-32 md:top-24 md:left-56">
        <Link
          href="/game"
          className="text-14-bold hover:bg-primary-100 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-700 transition"
        >
          <Back className="text-primary-500 h-5 w-5 md:h-6 md:w-6" />
          게임 목록
        </Link>
      </div>

      <h1 className="text-24-bold text-gray-900">틱택토</h1>
      <p className="text-16-medium mt-2 mb-8 text-gray-500">
        같은 표시를 한 줄로 먼저 완성하면 승리!
      </p>

      <TicTacToeGame />
    </main>
  );
};

export default TicTacToePage;
