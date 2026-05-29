"use client";

import { ChangeEvent, useEffect, useId, useState } from "react";
import { DefaultProfile } from "@/constants/images";
import ImageInputProps from "./type";
import { Edit } from "@/constants/icons";

const ProfileImageInput = ({ id, name, label, ...props }: ImageInputProps) => {
  const inputId = id ?? useId();
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
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
        {...props}
      />

      <label
        htmlFor={inputId}
        className="relative inline-flex items-center justify-center overflow-hidden cursor-pointer w-32 h-32"
      >
        {preview ? (
          <img
            src={preview}
            alt={`${label} 미리보기`}
            className="object-cover object-center w-30 h-30 rounded-full"
          />
        ) : (
          <div className="w-full h-full">
            <DefaultProfile className="h-full w-full object-cover" />
          </div>
        )}
        <div className="flex items-center justify-center absolute bottom-3 right-2.5 w-[30px] h-[30px] bg-gray-300 rounded-full">
          <Edit className="w-4 h-4 text-white" />
        </div>
      </label>
    </div>
  );
};

export default ProfileImageInput;
