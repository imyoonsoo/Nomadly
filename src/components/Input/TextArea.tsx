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
          <label htmlFor={inputId} className="text-16-medium mb-[10px] block">
            {label}
          </label>
        )}

        <div
          className={`relative border-2 border-gray-100 rounded-[16px] shadow-[0_2px_6px_0_rgba(0,0,0,0.02)]
            ${status === "focus" ? "border-primary-500" : ""}
            ${status === "error" ? "border-red-500" : ""}
            ${textareaClassName}`}
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
            className="w-full h-full p-[20px] border-none rounded-[16px] outline-none focus:outline-none focus:ring-0 text-16-medium bg-white placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-200 resize-none"
          />
        </div>

        {(errorMessage || textCount) && (
          <div className="flex justify-between mt-2">
            <div>
              {errorMessage && (
                <p className="text-red-500 text-14-medium ml-2">
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
