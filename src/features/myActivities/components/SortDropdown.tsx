"use client";

import SelectDropdown from "@/components/SelectDropdown/SelectDropdown";

const sortOptions = [
  { value: "latest", label: "최신등록순" },
  { value: "price_desc", label: "가격 높은순" },
  { value: "price_asc", label: "가격 낮은순" },
  { value: "review", label: "리뷰많은 순" },
] as const;

interface SortDropdownProps {
  currentSort: string | number;
  onChange: (value: string | number) => void;
}

const SortDropdown = ({ currentSort, onChange }: SortDropdownProps) => {
  return (
    <div className="w-30 md:w-36 mr-auto mb-5">
      <SelectDropdown
        options={sortOptions}
        selectedValue={currentSort}
        onChange={onChange}
      />
    </div>
  );
};

export default SortDropdown;
