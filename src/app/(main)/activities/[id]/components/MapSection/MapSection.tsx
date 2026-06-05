import MapSectionProps from "./type";
import { MapBlue } from "@/constants/icons";

const MapSection = ({ address }: MapSectionProps) => {
  return (
    <div className="flex flex-col gap-2 md:gap-3.5 lg:gap-2 pb-5 md:pb-10 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <MapBlue className="w-6 h-6" />
        <h2 className="text-16-bold md:text-18-bold text-gray-950">
          오시는 길
        </h2>
      </div>
      <span className="text-14-medium font-semibold text-gray-950">
        {address}
      </span>
      {/** TODO: 지도 컴포넌트 추가 */}
    </div>
  );
};

export default MapSection;
