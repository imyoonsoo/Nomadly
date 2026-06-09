"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ActivitiesProps } from "../type";

import Button from "@/components/Button/Button";
import WarningModal from "@/components/Modal/WarningModal";
import StarIcon from "@/assets/icons/star-on.svg";
import { deleteMyActivity } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Card = ({
  id,
  title,
  rating,
  reviewCount,
  price,
  bannerImageUrl,
}: ActivitiesProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-activities"],
      });

      setIsModalOpen(false);
    },
  });

  const handleDeleteConfirmButtonClick = () => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="w-full p-7.5 bg-white rounded-3xl shadow-[0_4px_24px_rgba(156,180,202,0.3)] flex justify-between items-center gap-6">
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
            className="px-2.5 py-1.5"
            onClick={() => router.push(`/activities/${id}/edit`)}
          >
            수정하기
          </Button>
          <Button
            variant="onlyGray"
            height="h29"
            className="px-2.5 py-1.5 rounded-lg text-14-medium"
            onClick={() => setIsModalOpen(true)}
          >
            삭제하기
          </Button>
        </div>
      </div>

      <Image
        src={bannerImageUrl}
        alt={`${title} 배너 이미지`}
        width={142}
        height={142}
        className="w-20.5 h-20.5 lg:w-35.5 lg:h-35.5 object-cover rounded-3xl"
      />

      {isModalOpen && (
        <WarningModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteConfirmButtonClick}
          message="삭제하시겠습니까?"
        />
      )}
    </div>
  );
};

export default Card;
