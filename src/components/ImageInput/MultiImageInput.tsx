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
  defaultImages = [],
  onChange,
  ...props
}: MultiImageInputProps) => {
  const inputId = id ?? useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const previewsRef = useRef<PreviewImage[]>([]);
  const [previews, setPreviews] = useState<PreviewImage[]>([]);

  previewsRef.current = previews;

  // 받아오는 이미지 URL 미리보기로 보여주기
  useEffect(() => {
    const initialPreviews = defaultImages.map((url) => ({
      id: crypto.randomUUID(),
      url,
      isExisting: true,
    }));

    setPreviews(initialPreviews);
  }, [defaultImages]);

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
      isExisting: false,
    }));

    const updatedPreviews = [...previews, ...nextPreviews];
    setPreviews(updatedPreviews);
    syncInputImages(
      updatedPreviews
        .filter((preview) => preview.file)
        .map((preview) => preview.file as File),
    );

    if (onChange) {
      onChange(event);
    }

    event.target.value = "";
  };

  const handleRemoveButtonClick = (previewId: string) => {
    const targetPreview = previews.find((preview) => preview.id === previewId);

    // 새 이미지에만 revokeObjectURL 실행
    if (targetPreview && !targetPreview.isExisting) {
      URL.revokeObjectURL(targetPreview.url);
    }

    const updatedPreviews = previews.filter(
      (preview) => preview.id !== previewId,
    );
    setPreviews(updatedPreviews);
    syncInputImages(
      updatedPreviews
        .filter((preview) => preview.file)
        .map((preview) => preview.file as File),
    );

    if (onChange && inputRef.current) {
      const changeEvent = {
        target: inputRef.current,
        currentTarget: inputRef.current,
      } as ChangeEvent<HTMLInputElement>;

      onChange(changeEvent);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
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

      <ul className="flex flex-wrap gap-3 md:gap-3.5">
        <li>
          <label
            htmlFor={inputId}
            className="flex h-20 w-20 md:h-31.5 lg:h-32 md:w-31.5 lg:w-32 cursor-pointer flex-col items-center justify-center gap-0.5 md:gap-2.5 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50"
          >
            <EyeOff className="h-10 w-10 text-gray-400" />
            <span className="text-13-medium md:text-14-medium text-gray-600">
              {previews.length}/{maxCount}
            </span>
          </label>
        </li>

        {previews.map((preview) => (
          <li key={preview.id} className="relative">
            <div className="relative h-20 w-20 md:h-31.5 lg:h-32 md:w-31.5 lg:w-32 overflow-hidden rounded-2xl border border-gray-100">
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
              className="absolute -right-1 -top-1 flex h-5 w-5 md:h-6.5 md:w-6.5 items-center justify-center rounded-full bg-black"
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
