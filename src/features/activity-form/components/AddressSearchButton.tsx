import type { AddressSearchButtonProps } from "@/features/activity-form/types";
import { useDaumPostcode } from "@/features/activity-form/hooks/useDaumPostcode";
import Button from "@/components/Button/Button";

export default function AddressSearchButton({
  onSelect,
}: AddressSearchButtonProps) {
  const { openPostcode } = useDaumPostcode();

  return (
    <Button
      variant="mainBlue"
      height="h50"
      type="button"
      onClick={() => openPostcode(onSelect)}
      className="hover:brightness-90"
    >
      주소 찾기
    </Button>
  );
}
