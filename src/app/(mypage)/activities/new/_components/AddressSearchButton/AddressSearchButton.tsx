import Button from "@/components/Button/Button";
import { useDaumPostcode } from "./useDaumPostcode";

type AddressSearchButtonProps = {
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
