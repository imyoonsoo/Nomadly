import ReviewSection from "./components/ReviewSection/ReviewSection";
import BannerImageSection from "./components/BannerImageSection/BannerImageSection";
import TitleSection from "./components/TitleSection/TitleSection";
import ReservationSection from "./components/ReservationSection/ReservationSection";
import DescriptionSection from "./components/DescriptionSection/DescriptionSection";
import MapSection from "./components/MapSection/MapSection";
import bannerImageData from "./mock/bannerImageData";
import activitiesData from "./mock/activitiesData";

const ActivitiesPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const data = activitiesData;

  return (
    <div className="flex w-full flex-col gap-5 px-6 pb-5 md:px-7.5 lg:grid lg:grid-cols-[670px_minmax(0,1fr)] lg:items-start lg:gap-x-12 lg:gap-y-5 lg:px-10">
      <div className="lg:col-start-1">
        <BannerImageSection images={bannerImageData} />
      </div>

      <div className="flex flex-col gap-5 lg:col-start-2 lg:row-start-1 lg:self-start">
        <TitleSection
          id={data.id}
          title={data.title}
          category={data.category}
          address={data.address}
          reviewCount={data.reviewCount}
          rating={data.rating}
        />
        <div className="hidden lg:block">
          <ReservationSection />
        </div>
      </div>

      <div className="lg:col-start-1">
        <DescriptionSection description={data.description} />
      </div>

      <div className="lg:col-start-1">
        <MapSection address={data.address} />
      </div>

      <div className="lg:col-start-1">
        <ReviewSection />
      </div>
    </div>
  );
};

export default ActivitiesPage;
