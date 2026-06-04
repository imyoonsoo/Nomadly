import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="flex min-h-screen flex-col items-center bg-cover bg-[position:0%_center] bg-no-repeat text-center"
      style={{
        backgroundImage: "url('/notFound/404-bg.svg')",
      }}
    >
      <div className="mt-[58px] flex flex-col items-center md:mt-[90px] lg:mt-[95px]">
        <Image
          src="/notFound/404-earth.svg"
          alt="404 지구 일러스트"
          width={180}
          height={180}
          priority
          className="w-[360px] md:w-[400px] lg:w-[506px]"
        />

        <h1 className="text-[24px] font-bold text-black md:text-[40px]">
          요청하신 페이지를 찾을 수 없습니다.
        </h1>

        <div className="flex flex-col gap-[26px] md:gap-[24px] mt-12 md:mt-[45px] lg:mt-[53px] text-gray-500 text-[14px] md:text-[16px] leading-[22px]">
          <p>
            페이지 주소가 잘못 입력되었거나, 주소가 변경 또는 삭제되어
            <br />
            요청하신 페이지를 찾을 수 없습니다.
          </p>
          <p>서비스 이용에 불편을 드려 죄송합니다.</p>
        </div>

        <Link
          href="/"
          className="mt-6 md:mt-10 rounded-[8px] bg-blue-500 hover:bg-blue-600 hover:shadow-2xl px-6 py-2 text-[12px] md:text-[16px] text-white md:px-8 md:py-2.5"
        >
          홈으로 가기
        </Link>
      </div>
    </main>
  );
}
