"use client";

import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { DefaultProfile } from "@/constants/images";
import { ProfileImageInputProps } from "./type";
import { Edit } from "@/constants/icons";

const ProfileImageInput = ({
  id,
  name,
  label,
  onFileSelect,
  ...props
}: ProfileImageInputProps) => {
  const inputId = id ?? useId();
  const previewRef = useRef<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  previewRef.current = preview;

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onFileSelect?.(file);
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
        {...props}
      />

      <label
        htmlFor={inputId}
        className="relative inline-flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden"
      >
        {preview ? (
          <img
            src={preview}
            alt={`${label} 미리보기`}
            className="h-30 w-30 rounded-full object-cover object-center"
          />
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
