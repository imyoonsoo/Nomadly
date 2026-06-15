"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Map, More, StarOn } from "@/constants/icons";
import TitleSectionProps from "./type";
import Dropdown from "@/components/Dropdown/Dropdown";
import WarningModal from "@/components/Modal/WarningModal";
import { deleteMyActivity } from "@/features/myActivities/api";
import { useUserSession } from "@/hooks/useUserSession";
import { showToast } from "@/lib/utils/toast";
import { getApiErrorMessage } from "@/lib/utils/getApiErrorMessage";

const TitleSection = ({
  id,
  userId,
  title,
  category,
  address,
  reviewCount,
  rating,
}: TitleSectionProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useUserSession();
  const isOwner = session?.userId === userId;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: deleteMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-activities"],
      });
      setIsDeleteModalOpen(false);
      router.push("/mypage/activities");
    },
    onError: (error) => {
      showToast.error(getApiErrorMessage(error, "체험 삭제에 실패했습니다."));
    },
  });

  const handleDeleteConfirm = () => {
    deleteMutation.mutate(id);
  };

  const options = useMemo(
    () => [
      {
        label: "수정하기",
        onSelect: () => {
          router.push(`/activities/${id}/edit`);
        },
      },
      {
        label: "삭제하기",
        onSelect: () => {
          setIsDeleteModalOpen(true);
        },
      },
    ],
    [id, router],
  );

  return (
    <>
      <div className="flex justify-between pb-5 md:pb-6 lg:pb-7.5 border-b lg:border-0 border-gray-100">
        <div className="flex flex-col gap-1 md:gap-2.5 lg:gap-2">
          <span className="text-13-medium md:text-14-medium text-gray-700 md:text-gray-950">
            {category}
          </span>
          <div className="flex flex-col gap-4">
            <h1 className="text-18-bold text-gray-950">{title}</h1>
            <div className="flex flex-col items-start gap-2.5">
              <div className="flex items-center gap-1">
                <StarOn className="w-4 h-4" />
                <span className="text-14-medium text-gray-700">
                  {rating} ({reviewCount})
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                <Map className="w-4 h-4" />
                <span className="text-14-medium text-gray-700">{address}</span>
              </div>
            </div>
          </div>
        </div>
        {isOwner && (
          <Dropdown options={options}>
            {({ toggle }) => (
              <More className="w-7 h-7 cursor-pointer" onClick={toggle} />
            )}
          </Dropdown>
        )}
      </div>
      <WarningModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="체험을 삭제하시겠습니까?"
      />{" "}
    </>
  );
};

export default TitleSection;
