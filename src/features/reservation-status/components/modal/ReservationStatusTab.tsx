import { ReservationStatus } from "@/features/reservation-status/type";

interface ReservationStatusTabProps {
  selectedStatus: ReservationStatus;
  onChangeStatus: (status: ReservationStatus) => void;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

const tabs: { label: string; value: ReservationStatus }[] = [
  { label: "신청", value: "pending" },
  { label: "승인", value: "confirmed" },
  { label: "거절", value: "declined" },
];

const ReservationStatusTab = ({
  selectedStatus,
  onChangeStatus,
  count,
}: ReservationStatusTabProps) => {
  const selectedIndex = tabs.findIndex((tab) => tab.value === selectedStatus);

  return (
    <div className="relative mt-4 border-b border-gray-300">
      <div className="grid grid-cols-3">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChangeStatus(tab.value)}
            className={`pb-3 ${
              selectedStatus === tab.value
                ? "border-primary-500 text-primary-500 text-16-bold border-b-2"
                : "text-16-medium text-gray-400"
            }`}
          >
            {tab.label} {count[tab.value]}
          </button>
        ))}
      </div>

      <span
        className="bg-primary-500 absolute -bottom-0.25 left-0 h-0.5 w-1/3 rounded-full transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(${selectedIndex * 100}%)`,
        }}
      />
    </div>
  );
};

export default ReservationStatusTab;
