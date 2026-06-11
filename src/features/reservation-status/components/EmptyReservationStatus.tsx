import { Empty } from "@/constants/images";

interface EmptyReservationStatusProps {
  message: string;
  image?: React.ReactNode;
}

const EmptyReservationStatus = ({
  message,
  image = <Empty className="h-[182px] w-[182px]" />,
}: EmptyReservationStatusProps) => {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center">
      {image}

      <p className="mt-6 text-18-medium text-gray-600">{message}</p>
    </div>
  );
};

export default EmptyReservationStatus;
