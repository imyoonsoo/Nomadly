import useDaumPostcode from "@/features/activity-form/hooks/useDaumPostcode";
import Button from "@/components/Button/Button";

export type AddressSearchButtonProps = {
  onSelect: (address: string) => void;
};

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
