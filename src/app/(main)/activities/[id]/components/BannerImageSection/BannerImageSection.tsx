import Image from "next/image";
import type { BannerImageGridProps, BannerImageItemProps } from "./type";

const BannerImageItem = ({
  src,
  alt,
  className = "",
}: BannerImageItemProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="50vw" />
    </div>
  );
};

const BannerImageSection = ({ images }: BannerImageGridProps) => {
  const displayImages = images.slice(0, 4);
  const imageCount = displayImages.length;

  if (imageCount === 0) {
    return null;
  }

  if (imageCount === 1) {
    return (
      <div className="relative h-81.75 w-full overflow-hidden rounded-3xl md:h-100">
        <BannerImageItem
          src={displayImages[0]}
          alt="체험 대표 이미지"
          className="h-full w-full"
        />
      </div>
    );
  }

  if (imageCount === 2) {
    return (
      <div className="grid h-81.75 w-full grid-cols-2 gap-3 overflow-hidden rounded-3xl md:h-100">
        {displayImages.map((src, index) => (
          <BannerImageItem
            key={src}
            src={src}
            alt={`체험 이미지 ${index + 1}`}
            className="h-full w-full"
          />
        ))}
      </div>
    );
  }

  if (imageCount === 3) {
    return (
      <div className="grid h-81.75 w-full grid-cols-2 grid-rows-2 gap-3 overflow-hidden rounded-3xl md:h-100">
        <BannerImageItem
          src={displayImages[0]}
          alt="체험 이미지 1"
          className="row-span-2 h-full w-full"
        />
        <BannerImageItem
          src={displayImages[1]}
          alt="체험 이미지 2"
          className="h-full w-full"
        />
        <BannerImageItem
          src={displayImages[2]}
          alt="체험 이미지 3"
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className="grid h-81.75 w-full grid-cols-2 grid-rows-2 gap-3 overflow-hidden rounded-3xl md:h-100">
      {displayImages.map((src, index) => (
        <BannerImageItem
          key={src}
          src={src}
          alt={`체험 이미지 ${index + 1}`}
          className="h-full w-full"
        />
      ))}
    </div>
  );
};

export default BannerImageSection;
