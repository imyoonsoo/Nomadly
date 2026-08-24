import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <main
      className="flex min-h-screen flex-col items-center bg-cover bg-[position:0%_center] bg-no-repeat text-center"
      style={{
        backgroundImage: "url('/notFound/404-bg.svg')",
      }}
    >
      <div className="mt-14.5 flex flex-col items-center md:mt-22.5 lg:mt-23.75">
        <Image
          src="/notFound/404-earth.svg"
          alt="404 지구 일러스트"
          width={180}
          height={180}
          className="w-90 md:w-100 lg:w-126.5"
        />

        <h1 className="text-[24px] font-bold text-black md:text-[40px]">
          요청하신 페이지를 찾을 수 없습니다.
        </h1>

        <div className="mt-12 flex flex-col gap-6.5 text-[14px] leading-[22px] text-gray-500 md:mt-11.25 md:gap-6 md:text-[16px] lg:mt-13.25">
          <p>
            페이지 주소가 잘못 입력되었거나, 주소가 변경 또는 삭제되어
            <br />
            요청하신 페이지를 찾을 수 없습니다.
          </p>
          <p>서비스 이용에 불편을 드려 죄송합니다.</p>
        </div>

        <Link
          href="/"
          className="mt-6 rounded-[8px] bg-blue-500 px-6 py-2 text-[12px] text-white hover:bg-blue-600 hover:shadow-2xl md:mt-10 md:px-8 md:py-2.5 md:text-[16px]"
        >
          홈으로 가기
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
