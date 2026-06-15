"use client";

import { useCallback, useEffect, useRef } from "react";
import MapSectionProps from "./type";
import { MapBlue } from "@/constants/icons";

const KAKAO_MAP_LINK = "https://map.kakao.com/link/map";

const MapSection = ({ address }: MapSectionProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<{ lat: number; lng: number } | null>(null);

  const handleMapClick = useCallback(() => {
    const coords = coordsRef.current;
    const kakaoMapUrl = coords
      ? `${KAKAO_MAP_LINK}/${encodeURIComponent(address)},${coords.lat},${coords.lng}`
      : `${KAKAO_MAP_LINK}/${encodeURIComponent(address)}`;
    window.open(kakaoMapUrl, "_blank", "noopener,noreferrer");
  }, [address]);

  useEffect(() => {
    if (!address || !mapRef.current) {
      return;
    }

    const container = mapRef.current;

    const initMap = () => {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, status) => {
        if (status !== kakao.maps.services.Status.OK || !result[0]) {
          return;
        }

        const lat = parseFloat(result[0].y);
        const lng = parseFloat(result[0].x);
        coordsRef.current = { lat, lng };
        const center = new kakao.maps.LatLng(lat, lng);

        container.innerHTML = "";

        const map = new kakao.maps.Map(container, {
          center,
          level: 3,
          draggable: false,
          scrollwheel: false,
          disableDoubleClick: true,
          disableDoubleClickZoom: true,
          keyboardShortcuts: false,
        });

        new kakao.maps.Marker({
          map,
          position: center,
        });

        kakao.maps.event.addListener(map, "click", handleMapClick);
      });
    };

    const loadMap = () => {
      if (!window.kakao?.maps) {
        return false;
      }

      window.kakao.maps.load(initMap);
      return true;
    };

    if (loadMap()) {
      return;
    }

    const timer = window.setInterval(() => {
      if (loadMap()) {
        window.clearInterval(timer);
      }
    }, 100);

    return () => {
      window.clearInterval(timer);
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
      <div
        ref={mapRef}
        className="w-full h-45 md:h-75 lg:h-112.5 rounded-2xl cursor-pointer"
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
  );
};

export default MapSection;
