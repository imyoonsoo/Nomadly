import CardList from "./_components/CardList";

const Activities = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-start gap-3.5 mb-7.5 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col justify-center items-start gap-2.5">
          <h1 className="text-18-bold text-gray-950">내 체험 관리</h1>
          <p className="text-14-medium text-gray-500">
            체험을 등록하거나 수정 및 삭제가 가능합니다.
          </p>
        </div>
        {/* Todo: button 공통 컴포넌트로 변경 */}
        <button>체험 등록하기</button>
      </div>

      <CardList />
    </div>
  );
};

export default Activities;
