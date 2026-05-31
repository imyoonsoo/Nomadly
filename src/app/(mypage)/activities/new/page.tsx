import MultiImageInput from "@/components/ImageInput/MultiImageInput";
import TextArea from "@/components/Input/TextArea";
import TextInput from "@/components/Input/TextInput";
import Button from "@/components/Button/Button";

const CreateActivityForm = () => {
  return (
    <div>
      <h1>내 체험 등록</h1>
      <form>
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
        />
        <TextInput
          name="price"
          label="가격"
          placeholder="체험 금액을 입력해 주세요"
        />
        <TextInput
          name="address"
          label="주소"
          placeholder="주소를 입력해 주세요"
        />
        <div>
          <p>예약 가능한 시간대</p>
        </div>

        <MultiImageInput name="bannerImageUrl" label="배너 이미지 등록" />
        <MultiImageInput name="subImages" label="소개 이미지 등록" />

        <Button>등록하기</Button>
      </form>
    </div>
  );
};

export default CreateActivityForm;
