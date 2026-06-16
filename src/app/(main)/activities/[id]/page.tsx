import { notFound } from "next/navigation";
import ReviewSection from "@/features/activities/components/ReviewSection/ReviewSection";
import BannerImageSection from "@/features/activities/components/BannerImageSection/BannerImageSection";
import TitleSection from "@/features/activities/components/TitleSection/TitleSection";
import ReservationSection from "@/features/activities/components/ReservationSection/ReservationSection";
import DescriptionSection from "@/features/activities/components/DescriptionSection/DescriptionSection";
import MapSection from "@/features/activities/components/MapSection/MapSection";
import MobileReservationFooter from "@/features/activities/components/MobileReservationFooter/MobileReservationFooter";
import TabletReservationFooter from "@/features/activities/components/TabletReservationFooter/TabletReservationFooter";
import { getActivityDetail } from "@/features/activities/api/api";
import type { ActivityDetailResponse } from "@/features/activities/type";

const getBannerImages = (data: ActivityDetailResponse) => {
  return [
    data.bannerImageUrl,
    ...data.subImages.map((image) => image.imageUrl),
  ];
};

const ActivitiesPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const activityId = Number(id);

  if (Number.isNaN(activityId)) {
    notFound();
  }

  let activityData: ActivityDetailResponse;

  try {
    activityData = await getActivityDetail({ activityId });
  } catch {
    notFound();
  }

  const bannerImages = getBannerImages(activityData);

  return (
    <div className="flex w-full flex-col gap-5 px-6 pb-5 md:px-7.5 lg:px-10">
      <div className="flex flex-col gap-5 pb-36 lg:hidden">
        <BannerImageSection images={bannerImages} />
        <TitleSection
          id={activityData.id}
          userId={activityData.userId}
          title={activityData.title}
          category={activityData.category}
          address={activityData.address}
          reviewCount={activityData.reviewCount}
          rating={activityData.rating}
        />
        <DescriptionSection description={activityData.description} />
        <MapSection address={activityData.address} />
        <ReviewSection activityId={activityId} />
      </div>

      <div className="hidden lg:grid lg:grid-cols-[670px_410px] lg:items-start lg:gap-x-12">
        <div className="flex flex-col gap-5">
          <BannerImageSection images={bannerImages} />
          <DescriptionSection description={activityData.description} />
          <MapSection address={activityData.address} />
          <ReviewSection activityId={activityId} />
        </div>

        <div className="flex w-[410px] flex-col gap-5">
          <TitleSection
            id={activityData.id}
            userId={activityData.userId}
            title={activityData.title}
            category={activityData.category}
            address={activityData.address}
            reviewCount={activityData.reviewCount}
            rating={activityData.rating}
          />
          <ReservationSection
            activityId={activityId}
            price={activityData.price}
          />
        </div>
      </div>

      <MobileReservationFooter
        activityId={activityId}
        price={activityData.price}
      />
      <TabletReservationFooter
        activityId={activityId}
        price={activityData.price}
      />
    </div>
  );
};

export default ActivitiesPage;
