interface ReservationStateBadgeProps {
  status: "confirmed" | "declined";
  className?: string;
}

const STATUS_MAP = {
  confirmed: {
    label: "예약 승인",
    className: "bg-[#DDF9F9] text-[#1790A0]",
  },
  declined: {
    label: "예약 거절",
    className: "bg-[#FCECEA] text-[#F96767]",
  },
} as const;

const ReservationStateBadge = ({
  status,
  className = "",
}: ReservationStateBadgeProps) => {
  const state = STATUS_MAP[status];

  return (
    <span
      className={`text-13-bold inline-flex h-6 w-15.75 cursor-default items-center justify-center rounded-full leading-none tracking-[-0.5px] ${state.className} ${className} `}
    >
      {state.label}
    </span>
  );
};

export default ReservationStateBadge;
