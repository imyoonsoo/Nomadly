"use client";

import { faqContent } from "@/constants/policy";
import { useState } from "react";

const FaqPage = () => {
  const { title, description, userItems, hostItems } = faqContent;
  const [isUserListOpen, setIsUserListOpen] = useState(true);
  const [isHostListOpen, setIsHostListOpen] = useState(false);

  const faqList = isUserListOpen ? userItems : hostItems;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 w-full max-w-300 mx-auto gap-12 p-7.5 mt-12 md:mt-20">
        <div className="flex flex-col justify-center gap-1.5 items-center mb-10">
          <span className="text-16-bold mb-3 text-primary-500">FAQ</span>
          <h1 className="text-32-bold">{title}</h1>
          <p className="text-14-medium text-gray-500">{description}</p>
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <div className="mx-auto mt-8 flex w-fit rounded-full bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => {
                setIsUserListOpen(true);
                setIsHostListOpen(false);
              }}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 md:text-base ${
                isUserListOpen
                  ? "bg-white text-gray-950 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              이용자
            </button>

            <button
              type="button"
              onClick={() => {
                setIsHostListOpen(true);
                setIsUserListOpen(false);
              }}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 md:text-base ${
                isHostListOpen
                  ? "bg-white text-primary-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              호스트
            </button>
          </div>

          <div className="mt-10 space-y-4 w-full mb-10">
            {faqList.map((item) => (
              <details
                key={item.id}
                className="group rounded-2xl border border-gray-200 bg-white px-5 shadow-sm transition-all duration-300 open:border-primary-500 open:shadow-md md:px-7"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden md:py-6">
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-14 font-semibold text-gray-600 group-open:bg-primary-500 group-open:text-white">
                      {String(item.id).padStart(2, "0")}
                    </span>

                    <span className="break-keep text-16-medium text-gray-800 transition-colors group-open:text-primary-500 md:text-18-medium">
                      {item.question}
                    </span>
                  </div>

                  <span className="relative h-8 w-8 shrink-0 rounded-full bg-gray-100 transition-all duration-300 group-open:bg-primary-100">
                    <span className="absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500 transition-colors group-open:bg-primary-500" />
                    <span className="absolute left-1/2 top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500 transition-all duration-300 group-open:rotate-90 group-open:opacity-0 group-open:bg-primary-500" />
                  </span>
                </summary>

                <div className="border-t border-gray-100 pb-6 pt-4 md:pb-7">
                  <p className="whitespace-pre-wrap break-keep pl-13 text-14-medium leading-[1.8] text-gray-600 md:pl-13 md:text-16-medium">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
