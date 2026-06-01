import CalendarIcon from "@/assets/icons/calendar.svg";

const DatePicker = () => {
  return (
    <div>
      <label className="text-16-medium mb-[10px] block">날짜</label>
      <div className="relative h-13.5 border-2 border-gray-100 rounded-2xl shadow-[0_2px_6px_0_rgba(0,0,0,0.02)] flex items-center justify-between px-5">
        <input type="text" placeholder="yy/mm/dd" disabled />
        <button className="w-6 h-6">
          <CalendarIcon width={24} height={24} />
        </button>
      </div>
      <div className="w-full h-px bg-gray-100 my-5"></div>
    </div>
  );
};

export default DatePicker;
