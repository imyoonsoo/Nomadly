import ReviewSection from "@/features/activities/components/ReviewSection/ReviewSection";
import BannerImageSection from "@/features/activities/components/BannerImageSection/BannerImageSection";
import TitleSection from "@/features/activities/components/TitleSection/TitleSection";
import ReservationSection from "@/features/activities/components/ReservationSection/ReservationSection";
import DescriptionSection from "@/features/activities/components/DescriptionSection/DescriptionSection";
import MapSection from "@/features/activities/components/MapSection/MapSection";
import MobileReservationFooter from "@/features/activities/components/MobileReservationFooter/MobileReservationFooter";
import TabletReservationFooter from "@/features/activities/components/TabletReservationFooter/TabletReservationFooter";
import bannerImageData from "@/features/activities/mock/bannerImageData";
import activitiesData from "@/features/activities/mock/activitiesData";

const ActivitiesPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const data = activitiesData;

  return (
    <div className="flex w-full flex-col gap-5 px-6 pb-5 md:px-7.5 lg:px-10">
      <div className="flex flex-col gap-5 lg:hidden">
        <BannerImageSection images={bannerImageData} />
        <TitleSection
          id={data.id}
          title={data.title}
          category={data.category}
          address={data.address}
          reviewCount={data.reviewCount}
          rating={data.rating}
        />
        <DescriptionSection description={data.description} />
        <MapSection address={data.address} />
        <ReviewSection />
      </div>

      <div className="hidden lg:grid lg:grid-cols-[670px_410px] lg:items-start lg:gap-x-12">
        <div className="flex flex-col gap-5">
          <BannerImageSection images={bannerImageData} />
          <DescriptionSection description={data.description} />
          <MapSection address={data.address} />
          <ReviewSection />
        </div>

        <div className="flex w-[410px] flex-col gap-5">
          <TitleSection
            id={data.id}
            title={data.title}
            category={data.category}
            address={data.address}
            reviewCount={data.reviewCount}
            rating={data.rating}
          />
          <ReservationSection price={data.price} schedules={data.schedules} />
        </div>
      </div>

      <MobileReservationFooter price={data.price} schedules={data.schedules} />
      <TabletReservationFooter price={data.price} schedules={data.schedules} />
    </div>
  );
};

export default ActivitiesPage;
