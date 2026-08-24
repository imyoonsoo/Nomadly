"use client";

import { forwardRef, useState } from "react";
import { TextAreaProps } from "./type";

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      errorMessage,
      onChange,
      onBlur,
      disabled = false,
      className = "",
      textareaClassName = "",
      textCount,
      labelClassName = "text-16-bold md:text-18-bold",
    },
    ref,
  ) => {
    const inputId = id || name;
    const [isFocused, setIsFocused] = useState(false);
    const [count, setCount] = useState(0);

    const status = errorMessage ? "error" : isFocused ? "focus" : "default";
    const maxLength = 100;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className={className}>
        {label && (
          <label htmlFor={inputId} className={`mb-2.5 block ${labelClassName}`}>
            {label}
          </label>
        )}

        <div
          className={`relative rounded-2xl border-2 border-gray-100 shadow-[0_2px_6px_0_rgba(0,0,0,0.02)] ${status === "focus" ? "border-primary-500" : ""} ${status === "error" ? "border-red-500" : ""} ${textareaClassName}`}
        >
          <textarea
            ref={ref}
            id={inputId}
            name={name}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            maxLength={textCount ? maxLength : undefined}
            className="text-16-medium h-full w-full resize-none rounded-2xl border-none bg-white p-5 placeholder-gray-400 outline-none focus:ring-0 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-200"
          />
        </div>

        {(errorMessage || textCount) && (
          <div className="mt-2 flex justify-between">
            <div>
              {errorMessage && (
                <p className="text-14-medium ml-2 text-red-500">
                  {errorMessage}
                </p>
              )}
            </div>

            {textCount && (
              <span className="text-14-medium text-gray-600">
                {count}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
