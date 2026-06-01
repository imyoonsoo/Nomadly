import Button from "@/components/Button/Button";

interface TitleProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Title = ({
  title,
  description,
  buttonText,
  onButtonClick,
}: TitleProps) => {
  return (
    <div className="flex flex-col justify-center items-start gap-3.5 mb-7.5 md:flex-row md:justify-between md:items-center">
      <div className="flex flex-col justify-center items-start gap-2.5">
        <h1 className="text-18-bold text-gray-950">{title}</h1>
        <p className="text-14-medium text-gray-500">{description}</p>
      </div>
      {buttonText && (
        <Button
          styleVariant="fillPrimaryBlue"
          heightSize="md47"
          onClick={onButtonClick}
          className="w-full md:w-34.5"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default Title;
