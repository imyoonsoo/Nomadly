"use client";

import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { Delete, EyeOff } from "@/constants/icons";
import { MultiImageInputProps, PreviewImage } from "./type";

const MultiImageInput = ({
  id,
  name,
  label,
  maxCount = 4,
  accept = "image/*",
  ...props
}: MultiImageInputProps) => {
  const inputId = id ?? useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const previewsRef = useRef<PreviewImage[]>([]);
  const [previews, setPreviews] = useState<PreviewImage[]>([]);

  previewsRef.current = previews;

  const syncInputImages = (files: File[]) => {
    if (!inputRef.current) {
      return;
    }

    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    inputRef.current.files = dataTransfer.files;
  };

  useEffect(() => {
    return () => {
      previewsRef.current.forEach((preview) => {
        URL.revokeObjectURL(preview.url);
      });
    };
  }, []);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (!selectedFiles.length) {
      return;
    }

    const remainingSlots = maxCount - previews.length;

    if (remainingSlots <= 0) {
      return;
    }

    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    const nextPreviews = filesToAdd.map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedPreviews = [...previews, ...nextPreviews];
    setPreviews(updatedPreviews);
    syncInputImages(updatedPreviews.map((preview) => preview.file));
    event.target.value = "";
  };

  const handleRemoveButtonClick = (previewId: string) => {
    const targetPreview = previews.find((preview) => preview.id === previewId);

    if (targetPreview) {
      URL.revokeObjectURL(targetPreview.url);
    }

    const updatedPreviews = previews.filter(
      (preview) => preview.id !== previewId,
    );
    setPreviews(updatedPreviews);
    syncInputImages(updatedPreviews.map((preview) => preview.file));
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <p className="text-16-bold text-gray-950">{label}</p>

      <input
        ref={inputRef}
        type="file"
        id={inputId}
        name={name}
        multiple
        accept={accept}
        onChange={handleImageChange}
        className="hidden"
        {...props}
      />

      <ul className="flex flex-wrap gap-3 md:gap-[14px]">
        <li>
          <label
            htmlFor={inputId}
            className="flex h-20 w-20 md:h-[126px] lg:h-32 md:w-[126px] lg:w-32 cursor-pointer flex-col items-center justify-center gap-[2px] md:gap-[10px] rounded-2xl border border-gray-100 bg-white hover:bg-gray-50"
          >
            <EyeOff className="h-10 w-10 text-gray-400" />
            <span className="text-13-medium md:text-14-medium text-gray-600">
              {previews.length}/{maxCount}
            </span>
          </label>
        </li>

        {previews.map((preview) => (
          <li key={preview.id} className="relative">
            <div className="relative h-20 w-20 md:h-[126px] lg:h-32 md:w-[126px] lg:w-32 overflow-hidden rounded-2xl border border-gray-100">
              <img
                src={preview.url}
                alt={`${label} 미리보기`}
                className="h-full w-full object-cover"
              />
            </div>
            <button
              type="button"
              aria-label={`${label} 이미지 삭제`}
              onClick={() => {
                handleRemoveButtonClick(preview.id);
              }}
              className="absolute right-[-4px] top-[-4px] flex h-5 w-5 md:h-[26px] md:w-[26px] items-center justify-center rounded-full bg-black"
            >
              <Delete className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiImageInput;
