import Link from "next/link";
import { House } from "@/constants/icons";

const GAME_LIST = [
  {
    id: "dodge",
    title: "총알 피하기",
    description: "떨어지는 총알을 피하면서 오래 버텨보세요.",
    href: "/game/dodge",
    status: "play",
  },
  {
    id: "coming-soon",
    title: "준비 중",
    description: "새로운 게임이 곧 추가될 예정이에요.",
    href: "",
    status: "disabled",
  },
];

const GamePage = () => {
  return (
    <main className="min-h-screen bg-gray-50 px-6 pt-24 pb-10">
      <section className="mx-auto w-full max-w-[960px]">
        <div className="mb-6">
          <Link
            href="/"
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
            <House className="h-4 w-4 text-primary-500" />
            홈으로
          </Link>
        </div>

        <h1 className="text-24-bold text-gray-900">게임</h1>
        <p className="mt-2 text-16-medium text-gray-500">
          원하는 게임을 선택해 플레이해보세요.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {GAME_LIST.map((game) =>
            game.status === "play" ? (
              <Link
                key={game.id}
                href={game.href}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h2 className="text-18-bold text-gray-900">{game.title}</h2>
                <p className="mt-2 text-14-medium text-gray-500">
                  {game.description}
                </p>

                <span className="mt-5 inline-flex rounded-full bg-primary-100 px-4 py-2 text-14-bold text-primary-500">
                  플레이하기
                </span>
              </Link>
            ) : (
              <div
                key={game.id}
                className="rounded-2xl border border-gray-200 bg-gray-100 p-5 opacity-70"
              >
                <h2 className="text-18-bold text-gray-500">{game.title}</h2>
                <p className="mt-2 text-14-medium text-gray-400">
                  {game.description}
                </p>

                <span className="mt-5 inline-flex rounded-full bg-gray-200 px-4 py-2 text-14-bold text-gray-400">
                  준비 중
                </span>
              </div>
            ),
          )}
        </div>
      </section>
    </main>
  );
};

export default GamePage;
