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
    label: "에약 거절",
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
      className={`
      inline-flex
      items-center
      justify-center
      rounded-full
      w-[63px]
      h-6
      text-13-bold
      leading-none
      tracking-[-0.5px]
      cursor-default
      ${state.className}
      ${className}
    `}
    >
      {state.label}
    </span>
  );
};

export default ReservationStateBadge;
