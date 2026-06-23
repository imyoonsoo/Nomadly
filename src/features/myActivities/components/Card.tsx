"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ActivitiesProps } from "../type";
import useDeleteMyActivityMutation from "../hooks/useDeleteActivityMutation";
import { showToast } from "@/lib/utils/toast";

import Button from "@/components/Button/Button";
import WarningModal from "@/components/Modal/WarningModal";
import StarIcon from "@/assets/icons/star-on.svg";

const Card = ({
  id,
  title,
  rating,
  reviewCount,
  price,
  bannerImageUrl,
}: ActivitiesProps) => {
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const deleteMutation = useDeleteMyActivityMutation(() => {
    showToast.success("체험이 삭제되었습니다.");
  });

  const handleDeleteConfirmButtonClick = () => {
    if (deleteMutation.isPending) {
      return;
    }

    deleteMutation.mutate(id, {
      onSettled: () => {
        setIsConfirmModalOpen(false);
      },
    });
  };

  return (
    <>
      <div
        onClick={() => router.push(`/activities/${id}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            router.push(`/activities/${id}`);
          }
        }}
        role="button"
        tabIndex={0}
        className="w-full p-7.5 bg-white rounded-3xl shadow-[0_4px_24px_rgba(156,180,202,0.3)] flex justify-between items-center gap-6 hover:cursor-pointer"
      >
        <div className="w-full flex flex-col justify-center items-start gap-3">
          <h2 className="text-16-bold lg:text-18-bold text-gray-950 line-clamp-2">
            {title}
          </h2>
          <div className="flex items-center gap-0.5 text-13-medium lg:text-16-medium text-gray-500">
            <StarIcon width={16} height={16} />
            <span>{rating}</span>
            <span>({reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-16-bold lg:text-18-bold text-gray-950">
              ₩{price.toLocaleString()}
            </span>
            <span className="text-14-medium lg:text-16-medium text-gray-400">
              / 인
            </span>
          </div>
          <div className="flex items-center gap-3 pt-3 lg:pt-5">
            <Button
              variant="whitenGray"
              height="h29"
              className="px-2.5 py-1.5 hover:border-gray-400"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/activities/${id}/edit`);
              }}
            >
              수정하기
            </Button>
            <Button
              variant="onlyGray"
              height="h29"
              className="px-2.5 py-1.5 rounded-lg text-14-medium hover:bg-red-50 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                setIsConfirmModalOpen(true);
              }}
              disabled={deleteMutation.isPending}
            >
              삭제하기
            </Button>
          </div>
        </div>

        <div className="relative shrink-0 w-20.5 h-20.5 md:w-35.5 md:h-35.5 rounded-3xl overflow-hidden">
          <Image
            src={bannerImageUrl}
            alt="배너 이미지"
            width={142}
            height={142}
            priority
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
      <WarningModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteConfirmButtonClick}
        message="삭제하시겠습니까?"
      />
    </>
  );
};

export default Card;
