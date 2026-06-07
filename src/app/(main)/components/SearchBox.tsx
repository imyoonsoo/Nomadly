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
    <div className="flex items-center gap-2.5 shadow-[0_4px_16px_rgb(187_221_255_/_50%)] pl-5 md:pl-8 pr-2 md:pr-3 py-1.5 md:py-2.5 rounded-2xl md:rounded-3xl bg-white hover:shadow-[0_4px_16px_rgb(187_221_255_/_70%)] hover:ring-2 hover:ring-primary-500 transition ease-in ">
      <Search />
      <input
        type="text"
        placeholder="내가 원하는 체험은?"
        className="flex-1 h-6 md:h-[50px] w-full outline-none placeholder:text-14-medium md:placeholder:text-16-medium"
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <Button
        className="w-fit !px-7"
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
