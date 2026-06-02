import { Empty } from "@/constants/images";

const EmptyReservationStatus = () => {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center">
      <Empty className="h-[182px] w-[182px]" />

      <p className="mt-6 text-18-medium text-gray-600">
        아직 등록한 체험이 없어요
      </p>
    </div>
  );
};

export default EmptyReservationStatus;
