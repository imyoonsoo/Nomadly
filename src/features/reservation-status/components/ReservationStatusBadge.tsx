type ReservationStatusBadgeProps = {
  label: string;
  count: number;
  color: "gray" | "blue" | "yellow";
};

const ReservationStatusBadge = ({
  label,
  count,
  color,
}: ReservationStatusBadgeProps) => {
  if (count === 0) {
    return null;
  }

  const colorClass = {
    gray: "bg-gray-50 text-gray-500",
    blue: "bg-primary-100 text-primary-500",
    yellow: "bg-[#FFF8DD] text-orange-400",
  };

  return (
    <span
      className={`text-10-medium md:text-14-medium flex w-full items-center justify-center rounded-[4px] px-1.5 py-0.5 ${colorClass[color]}`}
    >
      {label} {count}
    </span>
  );
};

export default ReservationStatusBadge;
