import MultiImageInput from "@/components/ImageInput/MultiImageInput";
import TextArea from "@/components/Input/TextArea";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";

const CreateActivityForm = () => {
  return (
    <div className="w-full">
      <h1 className="py-5 text-18-bold text-gray-950">내 체험 등록</h1>
      <form className="w-full flex flex-col justify-center gap-6 md:gap-7.5">
        <TextInput
          name="title"
          label="제목"
          placeholder="제목을 입력해 주세요"
        />
        <select>
          <option>문화.예술</option>
          <option>식음료</option>
          <option>스포츠</option>
          <option>투어</option>
          <option>관광</option>
        </select>
        <TextArea
          name="description"
          label="설명"
          placeholder="체험에 대한 설명을 입력해 주세요"
          textareaClassName="min-h-[140px] md:min-h-[200px]"
        />
        {/* Todo: type에 number 필요 */}
        <TextInput
          name="price"
          label="가격"
          placeholder="체험 금액을 입력해 주세요"
        />
        <div className="flex items-end gap-3">
          <TextInput
            name="address"
            label="주소"
            placeholder="주소를 입력해 주세요"
            className="flex-1"
          />
          <Button className="flex-0">주소 찾기</Button>
        </div>
        <div>
          <p>예약 가능한 시간대</p>
        </div>

        <MultiImageInput
          name="bannerImageUrl"
          label="배너 이미지 등록"
          maxCount={1}
        />
        <MultiImageInput name="subImages" label="소개 이미지 등록" />

        <Button>등록하기</Button>
      </form>
    </div>
  );
};

export default CreateActivityForm;
