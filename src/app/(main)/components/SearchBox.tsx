import Button from "@/components/Button/Button";
import { Search } from "@/constants/icons";

const SearchBox = ({
  onKeyDown,
  onChange,
  onSearch,
}: {
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSearch: () => void;
}) => {
  return (
    <div className="hover:ring-primary-500 flex items-center gap-2.5 rounded-2xl bg-white py-1.5 pr-2 pl-5 shadow-[0_4px_16px_rgb(187_221_255/50%)] transition ease-in hover:shadow-[0_4px_16px_rgb(187_221_255/70%)] hover:ring-2 md:rounded-3xl md:py-2.5 md:pr-3 md:pl-8">
      <Search className="size-5" />
      <input
        type="text"
        placeholder="내가 원하는 체험은?"
        className="placeholder:text-14-medium md:placeholder:text-16-medium h-6 w-full flex-1 outline-none md:h-12.5"
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <Button
        className="w-fit px-5! py-3! md:px-7!"
        variant="mainBlue"
        height="h50"
        type="button"
        onClick={onSearch}
      >
        검색하기
      </Button>
    </div>
  );
};

export default SearchBox;
