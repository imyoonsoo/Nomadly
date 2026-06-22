import type { InputHTMLAttributes } from "react";

export interface PreviewImage {
  id: string;
  file?: File;
  url: string;
  isExisting?: boolean;
}

export interface MultiImageInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "name"
  | "type"
  | "multiple"
  | "value"
  | "defaultValue"
  | "onChange"
  | "onError"
> {
  id?: string;
  name: string;
  label: string;
  maxCount?: number;
  defaultImages?: string[];
  onChange?: (files: File[], existingUrls: string[]) => void;
  onError?: (message: string) => void;
}

export interface ProfileImageInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "type" | "onChange" | "onError"
> {
  id?: string;
  name: string;
  label: string;
  defaultImage?: string | null;
  onFileSelect?: (file: File) => void;
  onError?: (message: string) => void;
}
