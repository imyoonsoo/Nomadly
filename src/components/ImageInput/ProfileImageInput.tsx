"use client";

import { ChangeEvent, useEffect, useId, useState } from "react";
import Image from "next/image";
import { DefaultProfile } from "@/constants/images";
import { ProfileImageInputProps } from "./type";
import { Edit } from "@/constants/icons";
import { ImageWebpLoader } from "./imageWebpLoader";

const ProfileImageInput = ({
  id,
  name,
  label,
  onFileSelect,
  onError,
  defaultImage,
  disabled,
  ...props
}: ProfileImageInputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [preview, setPreview] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const displayImage = preview ?? defaultImage;

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setIsConverting(true);

    try {
      const convertedFile = await ImageWebpLoader(file);
      const objectUrl = URL.createObjectURL(convertedFile);

      setPreview((previousPreview) => {
        if (previousPreview) {
          URL.revokeObjectURL(previousPreview);
        }

        return objectUrl;
      });
      onFileSelect?.(convertedFile);
    } catch {
      onError?.("이미지 변환에 실패했습니다. 다른 이미지를 선택해 주세요.");
    } finally {
      setIsConverting(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <input
        type="file"
        id={inputId}
        name={name}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
        disabled={disabled || isConverting}
        {...props}
      />

      <label
        htmlFor={inputId}
        aria-busy={isConverting}
        className={`relative inline-flex h-32 w-32 items-center justify-center overflow-hidden ${
          isConverting ? "cursor-wait opacity-60" : "cursor-pointer"
        }`}
      >
        {displayImage ? (
          <div className="relative h-30 w-30 overflow-hidden rounded-full">
            <Image
              src={displayImage}
              alt={`${label} 미리보기`}
              fill
              className="object-cover object-center"
              unoptimized={displayImage.startsWith("blob:")}
            />
          </div>
        ) : (
          <DefaultProfile className="h-30 w-30 object-cover" />
        )}
        <div className="absolute bottom-3 right-2.5 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-gray-300">
          <Edit className="h-4 w-4 text-white" />
        </div>
      </label>
    </div>
  );
};

export default ProfileImageInput;
