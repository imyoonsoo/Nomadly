"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MapSectionProps from "./type";
import { loadKakaoMapsSdk } from "./kakaoMapsLoader";
import { MapBlue } from "@/constants/icons";
import Skeleton from "@/components/Skeleton/Skeleton";

const KAKAO_MAP_LINK = "https://map.kakao.com/link/map";

const MapSection = ({ address }: MapSectionProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleMapClick = useCallback(() => {
    const coords = coordsRef.current;
    const kakaoMapUrl = coords
      ? `${KAKAO_MAP_LINK}/${encodeURIComponent(address)},${coords.lat},${coords.lng}`
      : `${KAKAO_MAP_LINK}/${encodeURIComponent(address)}`;
    window.open(kakaoMapUrl, "_blank", "noopener,noreferrer");
  }, [address]);

  useEffect(() => {
    if (!address || !mapRef.current) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    coordsRef.current = null;

    const container = mapRef.current;
    let isCancelled = false;

    const initMap = () => {
      const maps = kakao.maps;
      const geocoder = new maps.services.Geocoder();

      geocoder.addressSearch(address, (result, status) => {
        if (isCancelled || status !== maps.services.Status.OK || !result[0]) {
          if (!isCancelled) {
            setIsLoading(false);
          }
          return;
        }

        const lat = parseFloat(result[0].y);
        const lng = parseFloat(result[0].x);
        coordsRef.current = { lat, lng };
        const center = new maps.LatLng(lat, lng);

        container.innerHTML = "";

        const map = new maps.Map(container, {
          center,
          level: 3,
          draggable: false,
          scrollwheel: false,
          disableDoubleClick: true,
          disableDoubleClickZoom: true,
          keyboardShortcuts: false,
        });

        new maps.Marker({
          map,
          position: center,
        });

        maps.event.addListener(map, "click", handleMapClick);
        setIsLoading(false);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();

        void loadKakaoMapsSdk()
          .then(() => {
            if (!isCancelled) {
              kakao.maps.load(initMap);
            }
          })
          .catch((error) => {
            console.error("Kakao Maps SDK loading failed:", error);
            if (!isCancelled) {
              setIsLoading(false);
            }
          });
      },
      {
        rootMargin: "300px 0px",
      },
    );

    observer.observe(container);

    return () => {
      isCancelled = true;
      observer.disconnect();
      container.innerHTML = "";
    };
  }, [address, handleMapClick]);

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
      <div className="relative w-full h-45 md:h-75 lg:h-112.5">
        {isLoading && (
          <Skeleton className="absolute inset-0 z-10 h-full w-full rounded-2xl" />
        )}
        <div
          ref={mapRef}
          className="h-full w-full rounded-2xl cursor-pointer bg-gray-50"
          role="button"
          tabIndex={0}
          aria-label={`${address} 카카오맵에서 보기`}
          onClick={handleMapClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleMapClick();
            }
          }}
        />
      </div>
    </div>
  );
};

export default MapSection;
