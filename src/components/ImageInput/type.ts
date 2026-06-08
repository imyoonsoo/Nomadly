import type { InputHTMLAttributes } from "react";

export interface PreviewImage {
  id: string;
  file: File;
  url: string;
}

export interface MultiImageInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "type" | "multiple" | "value" | "defaultValue" | "onChange"
> {
  id?: string;
  name: string;
  label: string;
  maxCount?: number;
}

export interface ProfileImageInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "type" | "onChange"
> {
  id?: string;
  name: string;
  label: string;
  onFileSelect?: (file: File) => void;
}
