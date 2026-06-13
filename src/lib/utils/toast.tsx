import toast, { CheckmarkIcon, ErrorIcon, ToastOptions } from "react-hot-toast";

const DEFAULT_OPTIONS: ToastOptions = {
  duration: 3000,
  id: "unique-toast",
  className: "custom-toast",
};

type OpenToast = {
  (message: string, options?: ToastOptions): string;
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
};

export const showToast = ((message: string, options?: ToastOptions) => {
  return toast(message, {
    ...DEFAULT_OPTIONS,
    ...options,
    icon: null,
    className: `custom-toast ${options?.className || ""}`,
  });
}) as OpenToast;

showToast.success = (message: string, options?: ToastOptions) => {
  return toast.success(message, {
    ...DEFAULT_OPTIONS,
    ...options,
    icon: <CheckmarkIcon />,
    className: `custom-toast ${options?.className || ""}`,
  });
};

showToast.error = (message: string, options?: ToastOptions) => {
  return toast.error(message, {
    ...DEFAULT_OPTIONS,
    ...options,
    icon: <ErrorIcon />,
    className: `custom-toast ${options?.className || ""}`,
  });
};
